# GAN Art Service 🎨

Pay-per-generation AI art service using **$GAN** token on Base.

## How It Works

### For Users

1. **Tag @GanlandNFT** on X with your art prompt:
   ```
   @GanlandNFT generate a cyberpunk cat with neon lights
   ```

2. **GAN replies** with payment instructions:
   ```
   🎨 Art generation request received!
   
   💰 Price: 500 $GAN
   📬 Send to: 0xF393...57C6
   🔗 Order ID: abc123
   
   Reply with your tx hash or wallet address after payment!
   ```

3. **Send $GAN tokens** to the wallet from any address

4. **Reply with your wallet address** so GAN can match the payment:
   ```
   @GanlandNFT paid from 0xYourWallet...
   ```

5. **GAN confirms & generates** your art, posting it as a reply!

### Free Tier
These accounts get free generations:
- @iglivision
- @artfractalicia  
- @fractal_visions

## Pricing

| Tier | Price | Notes |
|------|-------|-------|
| Standard | 500 $GAN | ~$0.50 value |
| Allowlist | FREE | Core team |

*Prices may adjust based on token value and API costs*

## Technical Details

### Token Info
- **$GAN**: `0xc2fa8cfa51B02fDeb84Bb22d3c9519EAEB498b07`
- **Chain**: Base (8453)
- **Payment Wallet**: `0xF393AA12E547880b76c5b7Ff8151F539011257C6`

### Architecture

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│  X Mention  │ ──▶  │  GAN Agent   │ ──▶  │  Leonardo   │
│  @GanlandNFT│      │  (Clawdbot)  │      │  API        │
└─────────────┘      └──────────────┘      └─────────────┘
                            │
                            ▼
                     ┌──────────────┐
                     │  Payment     │
                     │  Monitor     │
                     │  (viem)      │
                     └──────────────┘
                            │
                            ▼
                     ┌──────────────┐
                     │  $GAN Token  │
                     │  on Base     │
                     └──────────────┘
```

### Order Flow

1. User mentions @GanlandNFT with prompt
2. GAN creates pending order, replies with payment info
3. User sends $GAN to wallet
4. Payment monitor detects transfer
5. User replies with wallet address to link payment
6. GAN matches payment → generates art → posts reply

### Files

```
gan-art-service/
├── src/
│   ├── config.mjs         # Configuration & constants
│   ├── payment-monitor.mjs # Watch for $GAN transfers
│   └── index.mjs          # Main service
├── data/
│   └── orders.json        # Order tracking
└── README.md
```

## Commands

```bash
# Watch for payments
node src/payment-monitor.mjs watch

# Check $GAN balance
node src/payment-monitor.mjs balance

# View orders
node src/payment-monitor.mjs orders
```

## Future Enhancements

- [ ] Auto-detect wallet from ENS
- [ ] Support ETH/USDC payments
- [ ] Bulk generation discounts
- [ ] Style presets
- [ ] Integration with Virtuals ACP

---

Built by **GAN** 🤖 for the Fractal Visions ecosystem.
