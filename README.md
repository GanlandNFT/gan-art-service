# GAN Art Service

Pay-per-generation AI art service powered by $GAN token on Base.

## 🎨 Overview

GAN Art Service lets anyone generate AI art by paying with $GAN tokens. Simply mention @GanlandNFT on X with your prompt, pay with $GAN, and receive custom AI-generated artwork.

**Live on X:** [@GanlandNFT](https://x.com/GanlandNFT)

## 💰 Pricing

| Tier | Price | Description |
|------|-------|-------------|
| Standard | 500 $GAN | AI art generation (~30-60 sec) |
| Premium | 1000 $GAN | Higher quality + upscaling |
| Bulk (5) | 2000 $GAN | 5 images at 20% discount |

**Free Tier:** Featured artists on Fractal Visions get free generations.

### Cost Breakdown
- Leonardo AI: ~$0.03/image
- Operational buffer: +10%
- Artist fund: +5%
- **Total cost basis:** ~$0.035/image

Revenue above costs goes to the Fractal Visions treasury.

## 🔗 Token Info

- **$GAN Token:** `0xc2fa8cfa51B02fDeb84Bb22d3c9519EAEB498b07`
- **Chain:** Base (8453)
- **DEX:** [DexScreener](https://dexscreener.com/base/0xc2fa8cfa51B02fDeb84Bb22d3c9519EAEB498b07)

⚠️ **Liquidity Warning:** Current pool liquidity is ~$24K. Large swaps (>$500) may experience slippage.

---

## 📖 For Users

### How to Generate Art

**Option 1: Bankrbot (Easiest)**
```
1. Tweet: @GanlandNFT create a cosmic fractal eye
2. GAN replies with payment instructions
3. Tweet: @bankrbot send 500 $GAN to 0x834b9617aa6291dd6d246402b3e05d1e2efe3c55
4. Reply to GAN with your wallet address
5. Receive your art!
```

**Option 2: Ganland Wallet**
```
1. Tweet: @GanlandNFT create wallet
2. Fund your wallet with ETH (gas) + 500 $GAN
3. Tweet: @GanlandNFT [your art prompt]
4. Art is auto-generated from your wallet balance!
```

**Option 3: Direct Transfer**
```
1. Tweet: @GanlandNFT [your art prompt]
2. Send 500 $GAN to 0x834b9617aa6291dd6d246402b3e05d1e2efe3c55 on Base
3. Reply with your sending wallet address
4. Receive your art!
```

### Payment Wallet
```
0x834b9617aa6291dd6d246402b3e05d1e2efe3c55
```
[View on Basescan](https://basescan.org/address/0x834b9617aa6291dd6d246402b3e05d1e2efe3c55)

---

## 🛠️ For Developers

### Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  X Mentions     │────▶│  GAN Art Service │────▶│  Leonardo AI    │
│  (@GanlandNFT)  │     │                  │     │  (Generation)   │
└─────────────────┘     └──────────────────┘     └─────────────────┘
                               │
                               ▼
                        ┌──────────────────┐
                        │  Payment Monitor │
                        │  (Base Chain)    │
                        └──────────────────┘
                               │
                               ▼
                        ┌──────────────────┐
                        │  R2 Storage      │
                        │  (Image Archive) │
                        └──────────────────┘
```

### Project Structure

```
gan-art-service/
├── src/
│   ├── config.mjs          # Pricing, wallets, settings
│   └── payment-monitor.mjs # Blockchain payment detection
├── data/
│   └── orders.json         # Order tracking (generated)
├── package.json
└── README.md
```

### Installation

```bash
git clone https://github.com/GanlandNFT/gan-art-service.git
cd gan-art-service
npm install
```

### Configuration

Key settings in `src/config.mjs`:

```javascript
CONFIG = {
  GAN_WALLET: '0x834b9617aa6291dd6d246402b3e05d1e2efe3c55',
  GAN_TOKEN: '0xc2fa8cfa51B02fDeb84Bb22d3c9519EAEB498b07',
  CHAIN_ID: 8453,
  
  PRICING: {
    STANDARD: { amount: 500n * 10n ** 18n, display: '500 $GAN' },
    PREMIUM: { amount: 1000n * 10n ** 18n, display: '1000 $GAN' },
    BULK_5: { amount: 2000n * 10n ** 18n, display: '2000 $GAN', imageCount: 5 }
  },
  
  FREE_ALLOWLIST: ['iglivision', 'artfractalicia', 'fractal_visions']
}
```

### Payment Flow

1. **Order Created** - User mentions @GanlandNFT with prompt
2. **Instructions Sent** - Bot replies with payment options
3. **Payment Detected** - Monitor watches for $GAN transfers
4. **Art Generated** - Leonardo AI creates the image
5. **Delivery** - Bot replies with the artwork

### Related Repositories

- **[ganland-wallet](https://github.com/GanlandNFT/ganland-wallet)** - HD wallet generation for users
- **[fractal-nft-infra](https://github.com/GanlandNFT/fractal-nft-infra)** - Smart contracts

---

## 🎁 Artist Fund

5% of paid generations go to the Featured Artist Fund. Artists on the Fractal Visions marketplace free tier receive:
- Free art generations
- Share of artist fund rewards
- Exposure on @GanlandNFT timeline

**Apply:** Contact [@IGLIVISION](https://x.com/IGLIVISION) or [@artfractalicia](https://x.com/artfractalicia)

---

## 📄 License

MIT

---

*Part of the [Fractal Visions](https://fractalvisions.io) ecosystem*
