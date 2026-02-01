#!/usr/bin/env node
/**
 * Payment Monitor - Watches for $GAN token transfers
 * 
 * Usage: node src/payment-monitor.mjs [command]
 * Commands: watch, balance, check <txHash>
 */

import { createPublicClient, http, formatUnits, parseAbiItem } from 'viem';
import { base } from 'viem/chains';
import { CONFIG, ERC20_ABI } from './config.mjs';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';

// Load Alchemy key if available
const ALCHEMY_KEY = (() => {
  try {
    return readFileSync(join(homedir(), '.local/secrets/alchemy-api-key'), 'utf8').trim();
  } catch { return null; }
})();

const RPC_URL = ALCHEMY_KEY 
  ? `https://base-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`
  : CONFIG.RPC_URL;

const client = createPublicClient({
  chain: base,
  transport: http(RPC_URL)
});

// Orders database (simple JSON file)
const ORDERS_FILE = join(process.cwd(), 'data/orders.json');

function loadOrders() {
  try {
    if (existsSync(ORDERS_FILE)) {
      return JSON.parse(readFileSync(ORDERS_FILE, 'utf8'));
    }
  } catch {}
  return { pending: {}, completed: [], failed: [] };
}

function saveOrders(orders) {
  const dir = join(process.cwd(), 'data');
  if (!existsSync(dir)) {
    require('fs').mkdirSync(dir, { recursive: true });
  }
  writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
}

/**
 * Get $GAN balance for an address
 */
async function getGanBalance(address) {
  const balance = await client.readContract({
    address: CONFIG.GAN_TOKEN,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: [address]
  });
  return balance;
}

/**
 * Watch for incoming $GAN transfers
 */
async function watchTransfers() {
  console.log('👁️  Watching for $GAN transfers to:', CONFIG.GAN_WALLET);
  console.log('   Token:', CONFIG.GAN_TOKEN);
  console.log('   Price:', CONFIG.PRICE_DISPLAY);
  console.log('');
  
  const unwatch = client.watchContractEvent({
    address: CONFIG.GAN_TOKEN,
    abi: ERC20_ABI,
    eventName: 'Transfer',
    args: {
      to: CONFIG.GAN_WALLET
    },
    onLogs: (logs) => {
      for (const log of logs) {
        const { from, value } = log.args;
        const amount = formatUnits(value, 18);
        console.log(`💰 Received ${amount} $GAN from ${from}`);
        console.log(`   Tx: ${log.transactionHash}`);
        
        // Check if this matches a pending order
        processPayment(from, value, log.transactionHash);
      }
    },
    onError: (error) => {
      console.error('Watch error:', error.message);
    }
  });
  
  console.log('Watching... (Ctrl+C to stop)\n');
  
  // Keep process alive
  process.on('SIGINT', () => {
    unwatch();
    process.exit(0);
  });
}

/**
 * Process incoming payment and match to order
 */
function processPayment(from, value, txHash) {
  const orders = loadOrders();
  const fromLower = from.toLowerCase();
  
  // Find matching pending order
  for (const [orderId, order] of Object.entries(orders.pending)) {
    if (order.payerAddress?.toLowerCase() === fromLower) {
      if (value >= CONFIG.PRICE_PER_IMAGE) {
        console.log(`✅ Payment matched to order ${orderId}!`);
        order.status = 'paid';
        order.txHash = txHash;
        order.paidAt = Date.now();
        orders.completed.push(order);
        delete orders.pending[orderId];
        saveOrders(orders);
        
        // Trigger generation callback
        console.log(`🎨 Ready to generate: "${order.prompt}"`);
        return order;
      } else {
        console.log(`⚠️  Insufficient payment: ${formatUnits(value, 18)} < ${CONFIG.PRICE_DISPLAY}`);
      }
    }
  }
  
  console.log('ℹ️  No matching pending order for this payment');
}

/**
 * Create a new pending order
 */
function createOrder(xHandle, prompt, tweetId) {
  const orders = loadOrders();
  const orderId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  
  orders.pending[orderId] = {
    orderId,
    xHandle: xHandle.toLowerCase().replace('@', ''),
    prompt,
    tweetId,
    payerAddress: null, // Will be set when they send payment
    status: 'awaiting_payment',
    createdAt: Date.now(),
    expiresAt: Date.now() + CONFIG.ORDER_EXPIRY_MS
  };
  
  saveOrders(orders);
  return orders.pending[orderId];
}

/**
 * Link wallet address to order
 */
function linkWalletToOrder(orderId, walletAddress) {
  const orders = loadOrders();
  if (orders.pending[orderId]) {
    orders.pending[orderId].payerAddress = walletAddress;
    saveOrders(orders);
    return true;
  }
  return false;
}

// CLI
const commands = {
  async watch() {
    await watchTransfers();
  },
  
  async balance() {
    const balance = await getGanBalance(CONFIG.GAN_WALLET);
    console.log(`$GAN Balance: ${formatUnits(balance, 18)} GAN`);
  },
  
  async check(txHash) {
    if (!txHash) {
      console.error('Usage: check <txHash>');
      process.exit(1);
    }
    const receipt = await client.getTransactionReceipt({ hash: txHash });
    console.log('Status:', receipt.status);
    console.log('Block:', receipt.blockNumber);
  },
  
  async create(handle, prompt) {
    const order = createOrder(handle, prompt, 'test');
    console.log('Order created:', order);
  },
  
  async orders() {
    const orders = loadOrders();
    console.log('Pending:', Object.keys(orders.pending).length);
    console.log('Completed:', orders.completed.length);
    console.log(JSON.stringify(orders, null, 2));
  }
};

const [cmd, ...args] = process.argv.slice(2);

if (!cmd || !commands[cmd]) {
  console.log('GAN Payment Monitor');
  console.log('Commands:', Object.keys(commands).join(', '));
  process.exit(0);
}

commands[cmd](...args).catch(console.error);

export { createOrder, linkWalletToOrder, getGanBalance, loadOrders };
