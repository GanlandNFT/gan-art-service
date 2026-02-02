/**
 * GAN Art Service Configuration
 * 
 * Payment Wallet: 0x834b9617aa6291dd6d246402b3e05d1e2efe3c55 (bankr wallet)
 * ⚠️ DO NOT USE: 0xF393...57c6 (seed was lost)
 */

export const CONFIG = {
  // === PAYMENT WALLET ===
  GAN_WALLET: '0x834b9617aa6291dd6d246402b3e05d1e2efe3c55',
  
  // === TOKEN INFO ===
  GAN_TOKEN: '0xc2fa8cfa51B02fDeb84Bb22d3c9519EAEB498b07',
  CHAIN_ID: 8453, // Base
  
  // === PRICING TIERS ===
  // Base cost: Leonardo API ~$0.03/image
  // + 10% operational buffer
  // + 5% artist fund allocation
  // Total cost basis: ~$0.035/image
  // 
  // Current liquidity: ~$24K - warn on large swaps!
  
  PRICING: {
    // Standard tier - 500 $GAN (~$0.50 at current prices)
    STANDARD: {
      amount: 500n * 10n ** 18n,
      display: '500 $GAN',
      description: 'Standard AI art generation'
    },
    
    // Premium tier - higher quality/resolution
    PREMIUM: {
      amount: 1000n * 10n ** 18n,
      display: '1000 $GAN',
      description: 'Premium quality with upscaling'
    },
    
    // Bulk discount - 5 images
    BULK_5: {
      amount: 2000n * 10n ** 18n,
      display: '2000 $GAN',
      description: '5 images (20% discount)',
      imageCount: 5
    }
  },
  
  // Default pricing
  PRICE_PER_IMAGE: 500n * 10n ** 18n,
  PRICE_DISPLAY: '500 $GAN',
  
  // === REVENUE ALLOCATION ===
  // From each paid generation:
  ALLOCATION: {
    API_COST_PERCENT: 6,      // ~$0.03 of $0.50 = 6%
    BUFFER_PERCENT: 4,        // 10% of API cost = ~0.6% of revenue
    ARTIST_FUND_PERCENT: 5,   // 5% to featured artist rewards
    TREASURY_PERCENT: 85      // Remainder to Fractal Visions treasury
  },
  
  // === FREE TIER ===
  // Featured artists on Fractal Visions marketplace
  // Benefits: Free generations + share of artist fund rewards
  FREE_ALLOWLIST: [
    'iglivision',
    'artfractalicia', 
    'fractal_visions',
    'ganlandnft'  // GAN's own account for timeline posts
  ],
  
  // === NETWORK ===
  RPC_URL: 'https://mainnet.base.org',
  BASESCAN_URL: 'https://basescan.org',
  DEXSCREENER_URL: 'https://dexscreener.com/base/0xc2fa8cfa51B02fDeb84Bb22d3c9519EAEB498b07',
  
  // === ORDER SETTINGS ===
  ORDER_EXPIRY_MS: 30 * 60 * 1000, // 30 minutes to pay
  CONFIRMATIONS_REQUIRED: 2,
  
  // === LIQUIDITY WARNING ===
  // Current pool liquidity: ~$24K
  // Warn users about slippage on large purchases
  LIQUIDITY: {
    currentUSD: 24000,
    warnThresholdUSD: 500,  // Warn if swap > $500
    warnMessage: '⚠️ Large swap detected. Current liquidity is ~$24K. Consider smaller amounts to minimize slippage.'
  },
  
  // === BOT CONFIG ===
  BOT_HANDLE: 'ganlandnft',
  
  // === PAYMENT METHODS ===
  PAYMENT_METHODS: {
    BANKRBOT: {
      enabled: true,
      instructions: '@bankrbot send {amount} $GAN to 0x834b9617aa6291dd6d246402b3e05d1e2efe3c55'
    },
    GANLAND_WALLET: {
      enabled: true,
      instructions: 'Fund your Ganland wallet with $GAN, then request art'
    },
    DIRECT_TRANSFER: {
      enabled: true,
      instructions: 'Send $GAN directly to 0x834b9617aa6291dd6d246402b3e05d1e2efe3c55'
    }
  }
};

// ERC20 ABI for Transfer event monitoring
export const ERC20_ABI = [
  {
    type: 'event',
    name: 'Transfer',
    inputs: [
      { indexed: true, name: 'from', type: 'address' },
      { indexed: true, name: 'to', type: 'address' },
      { indexed: false, name: 'value', type: 'uint256' }
    ]
  },
  {
    type: 'function',
    name: 'balanceOf',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'decimals',
    inputs: [],
    outputs: [{ name: '', type: 'uint8' }],
    stateMutability: 'view'
  }
];

// Helper to format payment instructions
export function getPaymentInstructions(tier = 'STANDARD') {
  const pricing = CONFIG.PRICING[tier] || CONFIG.PRICING.STANDARD;
  
  return `
🎨 GAN Art Service - ${pricing.description}

💰 Price: ${pricing.display}

📋 Payment Options:

1️⃣ Via Bankrbot (easiest):
   Tweet: @bankrbot send ${pricing.display} to 0x834b9617aa6291dd6d246402b3e05d1e2efe3c55

2️⃣ Via Ganland Wallet:
   Tweet: @GanlandNFT create wallet
   Fund with ETH + $GAN, then request art

3️⃣ Direct Transfer:
   Send ${pricing.display} to 0x834b9617aa6291dd6d246402b3e05d1e2efe3c55 on Base

⏰ Payment window: 30 minutes
🔗 Get $GAN: dexscreener.com/base/$GAN
`.trim();
}
