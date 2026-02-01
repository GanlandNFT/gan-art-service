/**
 * GAN Art Service Configuration
 */

export const CONFIG = {
  // Wallet & Token
  GAN_WALLET: '0xF393AA12E547880b76c5b7Ff8151F539011257C6',
  GAN_TOKEN: '0xc2fa8cfa51B02fDeb84Bb22d3c9519EAEB498b07',
  CHAIN_ID: 8453, // Base
  
  // Pricing (in $GAN tokens - 18 decimals)
  // Leonardo costs ~$0.03/image, we charge 500 $GAN (~$0.50 at launch pricing)
  // Adjust as token value changes
  PRICE_PER_IMAGE: 500n * 10n ** 18n, // 500 $GAN
  PRICE_DISPLAY: '500 $GAN',
  
  // Allowed free generation list (X handles, lowercase)
  FREE_ALLOWLIST: [
    'iglivision',
    'artfractalicia', 
    'fractal_visions'
  ],
  
  // RPC
  RPC_URL: 'https://mainnet.base.org',
  
  // Order expiry (ms)
  ORDER_EXPIRY_MS: 30 * 60 * 1000, // 30 minutes
  
  // Payment confirmation blocks
  CONFIRMATIONS_REQUIRED: 2
};

// ERC20 ABI for Transfer event
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
