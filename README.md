# GAN Art Service

<img width="100" alt="GAN Logo" src="https://raw.githubusercontent.com/GanlandNFT/ganland-brand-kit/main/logos/gan-logo-primary.jpg" align="right">

Pay-per-generation AI art service powered by $GAN token on Base.

## 🎨 Overview

GAN Art Service lets anyone generate AI art by paying with $GAN tokens. Simply mention @GanlandNFT on X with your prompt, pay with $GAN, and receive custom AI-generated artwork.

**Live on X:** [@GanlandNFT](https://x.com/GanlandNFT)

## 💰 Dynamic Pricing

Pricing adjusts automatically based on the current $GAN token price to maintain consistent USD value.

**Current Fee:** ~500,000 $GAN per generation (at current prices)

### Sliding Scale
| $GAN Price (USD) | Fee ($GAN) | ~USD Value |
|------------------|------------|------------|
| < $0.0000005 | 500,000 | ~$0.12 |
| $0.0000005 - $0.000001 | 250,000 | ~$0.12 |
| $0.000001 - $0.000002 | 125,000 | ~$0.12 |
| $0.000002 - $0.000005 | 50,000 | ~$0.12 |
| $0.000005 - $0.00001 | 25,000 | ~$0.12 |
| $0.00001 - $0.0001 | 2,500 | ~$0.12 |
| > $0.0001 | 100 (min) | Variable |

As $GAN price increases, fewer tokens are needed per generation!

### Cost Breakdown
- Leonardo API: ~$0.05-$0.13/image
- Profit margin: $0.10 flat + 10% additional
- **Target:** ~$0.12-$0.15 USD per generation

### Revenue Allocation
| Category | Share |
|----------|-------|
| API Costs | ~$0.10 |
| Flat Profit | $0.10 |
| Founders (5%) | Operational overhead |
| Artist Fund (5%) | Featured artist rewards |

## 🔗 Token Info

- **$GAN Token:** `0xc2fa8cfa51B02fDeb84Bb22d3c9519EAEB498b07`
- **Chain:** Base (8453)
- **DEX:** [DexScreener](https://dexscreener.com/base/0xc2fa8cfa51B02fDeb84Bb22d3c9519EAEB498b07)

---

## 📖 For Users

### How to Generate Art

**Option 1: Ganland Wallet (Recommended)**
```
1. Tweet: @GanlandNFT create wallet
2. Fund your wallet with ETH (gas) + $GAN
3. Tweet: @GanlandNFT [your art prompt]
4. Art is auto-generated from your wallet balance!
```

**Option 2: Direct Transfer**
```
1. Tweet: @GanlandNFT [your art prompt]
2. GAN replies with current fee & payment address
3. Send $GAN to the payment wallet on Base
4. Reply with your sending wallet address
5. Receive your art!
```

### Payment Wallet
```
0xc4EF7d096541338FBE007E146De4a7Cd99cb9e40
```
[View on Basescan](https://basescan.org/address/0xc4EF7d096541338FBE007E146De4a7Cd99cb9e40)

> **ENS:** `ganland.eth` → points to this wallet

---

## 🎁 Featured Artists (Free Tier)

Featured artists on Fractal Visions receive **free generations** and a share of the Artist Fund.

### Current Featured Artists
| Handle | Name | Role |
|--------|------|------|
| @IGLIVISION | IGLI | Co-founder |
| @artfractalicia | Fractalicia | Co-founder |
| @fractal_visions | Fractal Visions | Brand |
| @GanlandNFT | GAN | AI Agent |

### Benefits
- ✅ Unlimited free art generations
- ✅ Share of 5% Artist Fund rewards
- ✅ Exposure on @GanlandNFT timeline
- ✅ Priority support

### Apply to Join
Contact [@IGLIVISION](https://x.com/IGLIVISION) or [@artfractalicia](https://x.com/artfractalicia)

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
                        │  DexScreener API │
                        │  (Price Oracle)  │
                        └──────────────────┘
                               │
                               ▼
                        ┌──────────────────┐
                        │  Payment Monitor │
                        │  (Base Chain)    │
                        └──────────────────┘
```

### Project Structure

```
gan-art-service/
├── src/
│   ├── config.mjs          # Pricing, wallets, featured artists
│   └── payment-monitor.mjs # Blockchain payment detection
├── data/
│   └── orders.json         # Order tracking (generated)
├── package.json
└── README.md
```

### Key Functions

```javascript
import { fetchGanPrice, calculateGanFee, isFreeUser } from './src/config.mjs';

// Get current price
const price = await fetchGanPrice(); // e.g., 0.0000002328

// Calculate fee based on price
const fee = calculateGanFee(price); // e.g., 500000

// Check if user is free tier
const isFree = isFreeUser('iglivision'); // true
```

### Related Repositories

- **[ganland-wallet](https://github.com/GanlandNFT/ganland-wallet)** - HD wallet generation
- **[fractal-nft-infra](https://github.com/GanlandNFT/fractal-nft-infra)** - Smart contracts

---

## 📄 License

MIT

---

*Part of the [Fractal Visions](https://fractalvisions.io) ecosystem*
