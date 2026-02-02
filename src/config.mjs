/**
 * GAN Art Service Configuration
 * Dynamic pricing based on $GAN token price
 * 
 * Payment Wallet: 0xc4EF7d096541338FBE007E146De4a7Cd99cb9e40
 * Derived from Ganland HD wallet system (user: gan-service)
 * 
 * DEPRECATED: 0x834b9617aa6291dd6d246402b3e05d1e2efe3c55 (no key access)
 * DEPRECATED: 0xF393AA12E547880b76c5b7Ff8151F539011257C6 (Austin Griffith scaffold default)
 */

export const CONFIG = {
  // === PAYMENT WALLET ===
  // BANKR-created wallet, accessible via X (@GanlandNFT) and email
  // IGLI has access through BANKR integration
  GAN_WALLET: '0x834b9617aa6291dd6d246402b3e05d1e2efe3c55',
  
  // === TOKEN INFO ===
  GAN_TOKEN: '0xc2fa8cfa51B02fDeb84Bb22d3c9519EAEB498b07',
  CHAIN_ID: 8453, // Base
  DEXSCREENER_PAIR: '0x38a8e380ebd4fbc9d4e16082e13a45162382622e6a517a9cdd9302bf30f677b2',
  
  // === COST STRUCTURE ===
  // Leonardo API costs vary by model:
  // - Diffusion XL: ~$0.05
  // - Phoenix: ~$0.08
  // - Flux + Alchemy: ~$0.13-$0.21
  // Average: ~$0.10
  API_COST_USD: 0.10,
  
  // === PROFIT MARGINS ===
  // $0.10 flat profit on top of API cost
  // + 10% additional (5% founders overhead, 5% artist fund)
  FLAT_PROFIT_USD: 0.10,
  ADDITIONAL_MARGIN_PERCENT: 10,
  
  // Revenue allocation of the 10% margin:
  REVENUE_SPLIT: {
    FOUNDERS_PERCENT: 5,    // Operational overhead (IGLI & Fractalicia)
    ARTIST_FUND_PERCENT: 5  // Featured artist rewards
  },
  
  // === DYNAMIC PRICING (Sliding Scale) ===
  // Target USD per generation: API cost + flat profit + margin
  // At current price (~$0.00000023), ~500,000 $GAN = ~$0.12 USD
  
  PRICING_BANDS: [
    // { maxPrice: GAN price ceiling, ganAmount: fee in $GAN }
    { maxPrice: 0.0000005, ganAmount: 500000 },   // Very low price
    { maxPrice: 0.000001,  ganAmount: 250000 },   // Low
    { maxPrice: 0.000002,  ganAmount: 125000 },   // Below current
    { maxPrice: 0.000005,  ganAmount: 50000 },    // Moderate growth
    { maxPrice: 0.00001,   ganAmount: 25000 },    // Good growth
    { maxPrice: 0.0001,    ganAmount: 2500 },     // Strong growth
    { maxPrice: 0.001,     ganAmount: 250 },      // Moon scenario
    { maxPrice: Infinity,  ganAmount: 100 }       // Cap at 100 $GAN minimum
  ],
  
  // Current default (updated manually or via oracle)
  CURRENT_PRICE_USD: 0.0000002328,
  DEFAULT_GAN_AMOUNT: 500000,
  
  // === FEATURED ARTISTS (Free Tier) ===
  // These accounts get free generations
  // Benefits: Free art + share of artist fund rewards
  FEATURED_ARTISTS: [
    // Founders
    { handle: 'iglivision', name: 'IGLI', role: 'Co-founder' },
    { handle: 'artfractalicia', name: 'Fractalicia', role: 'Co-founder' },
    
    // Brand accounts
    { handle: 'fractal_visions', name: 'Fractal Visions', role: 'Brand' },
    { handle: 'ganlandnft', name: 'GAN', role: 'AI Agent' },
    
    // Featured Artists (add as they join)
    // { handle: 'artist_handle', name: 'Artist Name', role: 'Featured Artist' }
  ],
  
  // === FREE TIER ALLOWLIST (lowercase handles for matching) ===
  FREE_ALLOWLIST: [
    'iglivision',
    'artfractalicia',
    'fractal_visions',
    'ganlandnft'
  ],
  
  // === NETWORK ===
  RPC_URL: 'https://mainnet.base.org',
  BASESCAN_URL: 'https://basescan.org',
  DEXSCREENER_URL: 'https://dexscreener.com/base/0xc2fa8cfa51B02fDeb84Bb22d3c9519EAEB498b07',
  DEXSCREENER_API: 'https://api.dexscreener.com/latest/dex/pairs/base/0x38a8e380ebd4fbc9d4e16082e13a45162382622e6a517a9cdd9302bf30f677b2',
  
  // === ORDER SETTINGS ===
  ORDER_EXPIRY_MS: 30 * 60 * 1000, // 30 minutes to pay
  CONFIRMATIONS_REQUIRED: 2,
  
  // === BOT CONFIG ===
  BOT_HANDLE: 'ganlandnft',
  
  // === PAYMENT METHODS ===
  PAYMENT_METHODS: {
    GANLAND_WALLET: {
      enabled: true,
      instructions: 'Fund your Ganland wallet with $GAN, then request art'
    },
    DIRECT_TRANSFER: {
      enabled: true,
      instructions: 'Send $GAN directly to the payment wallet on Base'
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

/**
 * Get current $GAN price from DexScreener
 */
export async function fetchGanPrice() {
  try {
    const res = await fetch(CONFIG.DEXSCREENER_API);
    const data = await res.json();
    return parseFloat(data.pair?.priceUsd || CONFIG.CURRENT_PRICE_USD);
  } catch {
    return CONFIG.CURRENT_PRICE_USD;
  }
}

/**
 * Calculate required $GAN based on current price (sliding scale)
 */
export function calculateGanFee(priceUsd = CONFIG.CURRENT_PRICE_USD) {
  for (const band of CONFIG.PRICING_BANDS) {
    if (priceUsd <= band.maxPrice) {
      return band.ganAmount;
    }
  }
  return CONFIG.DEFAULT_GAN_AMOUNT;
}

/**
 * Check if user is in free tier
 */
export function isFreeUser(handle) {
  return CONFIG.FREE_ALLOWLIST.includes(handle.toLowerCase().replace('@', ''));
}

/**
 * Format payment instructions for user
 */
export function getPaymentInstructions(ganAmount = CONFIG.DEFAULT_GAN_AMOUNT, priceUsd = CONFIG.CURRENT_PRICE_USD) {
  const usdValue = (ganAmount * priceUsd).toFixed(4);
  
  return `
🎨 GAN Art Service

💰 Current Fee: ${ganAmount.toLocaleString()} $GAN (~$${usdValue} USD)

📋 Payment Options:

1️⃣ Ganland Wallet (recommended):
   Tweet: @GanlandNFT create wallet
   Fund with $GAN, then request art

2️⃣ Direct Transfer:
   Send ${ganAmount.toLocaleString()} $GAN to:
   0x834b9617aa6291dd6d246402b3e05d1e2efe3c55
   (Base network)

⏰ Payment window: 30 minutes
🔗 Get $GAN: dexscreener.com/base/$GAN

📊 Price updates dynamically with $GAN value
`.trim();
}

/**
 * Get revenue breakdown for a generation
 */
export function getRevenueBreakdown(ganAmount, priceUsd = CONFIG.CURRENT_PRICE_USD) {
  const totalUsd = ganAmount * priceUsd;
  const apiCost = CONFIG.API_COST_USD;
  const flatProfit = CONFIG.FLAT_PROFIT_USD;
  const grossProfit = totalUsd - apiCost;
  const margin = grossProfit * (CONFIG.ADDITIONAL_MARGIN_PERCENT / 100);
  const foundersShare = margin * (CONFIG.REVENUE_SPLIT.FOUNDERS_PERCENT / CONFIG.ADDITIONAL_MARGIN_PERCENT);
  const artistShare = margin * (CONFIG.REVENUE_SPLIT.ARTIST_FUND_PERCENT / CONFIG.ADDITIONAL_MARGIN_PERCENT);
  
  return {
    totalUsd,
    apiCost,
    grossProfit,
    flatProfit,
    foundersShare,
    artistShare,
    netProfit: grossProfit - foundersShare - artistShare
  };
}
