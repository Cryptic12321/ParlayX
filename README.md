# ParlayX 🏆

A modern crypto sports betting platform built with React, TypeScript, and Solana.

## Features

- 🎮 **Multi-Sport Betting** - NBA, NFL, MLB, NHL, Soccer, Tennis, and MMA
- 💰 **Crypto Payments** - Bet with SOL and USDC on the Solana blockchain
- 🔄 **Real-Time Odds** - Live odds from multiple sportsbooks via The Odds API
- 💼 **Wallet Integration** - Connect with Phantom, Solflare, and other Solana wallets
- 📱 **Responsive Design** - Beautiful, modern UI that works on all devices
- ⚡ **Live Updates** - Real-time game updates and automatic data refresh

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- A Solana wallet (Phantom, Solflare, etc.)
- The Odds API key (optional - see API_SETUP.md)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Set up The Odds API for real-time sports data:
   - Create a `.env` file in the root directory
   - Add your API key: `VITE_ODDS_API_KEY=your_api_key_here`
   - See [API_SETUP.md](./API_SETUP.md) for detailed instructions

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
parlayx/
├── src/
│   ├── components/        # React components
│   ├── contexts/          # React contexts (Wallet)
│   ├── services/          # API services
│   ├── App.tsx           # Main app component
│   └── main.tsx          # Entry point
├── API_SETUP.md          # API configuration guide
└── package.json          # Dependencies
```

## Technologies

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Solana Web3.js** - Blockchain integration
- **The Odds API** - Sports data
- **Axios** - HTTP client

## Wallet Setup

ParlayX supports all major Solana wallets:
- Phantom
- Solflare
- And more via Wallet Adapter

Connect your wallet to:
- View your SOL/USDC balance
- Deposit funds
- Place bets with crypto
- Withdraw winnings

## Betting Flow

1. **Connect Wallet** - Link your Solana wallet
2. **Deposit** - Add SOL or USDC to your account
3. **Browse Games** - Filter by sport or view all
4. **Add to Bet Slip** - Click odds to add bets
5. **Set Stake** - Enter your bet amount
6. **Place Bet** - Confirm and submit your bet

## Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## License

MIT

---

Built with ❤️ for the Solana ecosystem

