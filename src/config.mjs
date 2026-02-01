/**
 * GAN Art Service Configuration
 * 
 * Wallet: 0x834b9617aa6291dd6d246402b3e05d1e2efe3c55 (bankr wallet)
 * Note: Previous wallet 0xF393...57c6 seed was lost - DO NOT USE
 */

export const CONFIG = {
  // === PAYMENT WALLET (BANKR) ===
  // This is the ONLY wallet that accepts $GAN for image generation
  GAN_WALLET: '0x834b9617aa6291dd6d246402b3e05d1e2efe3c55',
  
  // $GAN Token on Base
  GAN_TOKEN: '0xc2fa8cfa51B02fDeb84Bb22d3c9519EAEB498b07',
  CHAIN_ID: 8453, // Base
  
  // === PRICING ===
  // Cost breakdown:
  // - Leonardo API: ~$0.03/image
  // - + 10% buffer: $0.003
  // - + 5% artist fund: $0.00165
  // - Total cost basis: ~$0.035
  // We charge 500 $GAN (healthy margin at current prices)
  
  PRICE_PER_IMAGE: 500n * 10n ** 18n, // 500 $GAN
  PRICE_DISPLAY: '500 $GAN',
  
  // Revenue allocation (of profit after API costs)
  ARTIST_FUND_PERCENT: 5, // 5% to featured artist fund
  
  // === FREE TIER ===
  // Featured artists on Fractal Visions marketplace
  // They get free generations + share of artist fund rewards
  FREE_ALLOWLIST: [
    'iglivision',
    'artfractalicia', 
    'fractal_visions'
  ],
  
  // === NETWORK ===
  RPC_URL: 'https://mainnet.base.org',
  
  // === ORDER SETTINGS ===
  ORDER_EXPIRY_MS: 30 * 60 * 1000, // 30 minutes to pay
  CONFIRMATIONS_REQUIRED: 2,
  
  // === X INTEGRATION ===
  // Bot handle for mentions
  BOT_HANDLE: 'ganlandnft',
  
  // Payment instruction template
  PAYMENT_INSTRUCTIONS: `
🎨 GAN Art Service

Price: 500 $GAN

To pay:
1. Send 500 $GAN to:
   0x834b...3c55

2. Reply with your wallet address after sending

⏰ Payment window: 30 minutes
🔗 $GAN on Base: basescan.org/token/0xc2fa...8b07
  `.trim()
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
  }
];
