# Web3 Wallet Dashboard

A full-stack Web3 application demonstrating wallet connectivity, smart contract interaction, and blockchain data display using Next.js and modern Web3 libraries.

## Features

- **Wallet Connection** - MetaMask and multi-wallet support via RainbowKit
- **Wallet Information** - Display address, network, and balance with real-time updates
- **Smart Contract Interaction** - Read and write messages to blockchain
- **Token Display** - View token holdings via REST API
- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **Transaction Tracking** - Monitor transaction status with block explorer links

## Tech Stack

- Next.js 16 (Pages Router)
- TypeScript
- Tailwind CSS
- ethers.js v6
- RainbowKit v2
- Wagmi v2
- Solidity ^0.8.0

## Prerequisites

- Node.js 18+
- MetaMask browser extension
- Sepolia testnet ETH ([Get from faucet](https://sepoliafaucet.com/))

## Installation

```bash
# Clone repository
git clone https://github.com/rahulsinghnegiii/Kakushin.git
cd Kakushin

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your values

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Create a `.env.local` file with the following:

```env
NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=your_rpc_url
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
```

### Getting API Keys

- **RPC URL**: Sign up at [Alchemy](https://www.alchemy.com/) or [Infura](https://infura.io/)
- **WalletConnect ID**: Get from [WalletConnect Cloud](https://cloud.walletconnect.com/)

## Smart Contract

**Network:** Sepolia Testnet  
**Contract Address:** `0xba37f222740668bec3a08e6ab84da115419403f1`  
**View on Etherscan:** [Link](https://sepolia.etherscan.io/address/0xba37f222740668bec3a08e6ab84da115419403f1)

### Deploy Your Own

See [contracts/DEPLOYMENT.md](contracts/DEPLOYMENT.md) for instructions on deploying the MessageBoard contract using Remix IDE.

## Project Structure

```
├── components/
│   ├── contract/        # Smart contract interaction
│   ├── layout/          # Header and footer
│   ├── tokens/          # Token display
│   └── wallet/          # Wallet information
├── contracts/           # Solidity contracts and ABI
├── lib/                 # Utilities and types
├── pages/
│   ├── api/            # API routes
│   ├── _app.tsx        # App configuration
│   └── index.tsx       # Main page
└── styles/             # Global styles
```

## Usage

1. **Connect Wallet** - Click "Connect Wallet" and select MetaMask
2. **View Info** - See your address, network, and balance
3. **Interact with Contract** - Read and write messages to the blockchain
4. **View Tokens** - Check token holdings in the dashboard

## Development

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Deployment

### Vercel

1. Push code to GitHub
2. Import repository in [Vercel](https://vercel.com/)
3. Add environment variables
4. Deploy

### Environment Variables in Vercel

Add all variables from `.env.local` in Project Settings → Environment Variables

## Troubleshooting

**"Please install MetaMask"**  
Install the MetaMask browser extension and refresh

**"Wrong network"**  
Switch to Sepolia testnet in MetaMask

**"Insufficient funds"**  
Get Sepolia ETH from a [faucet](https://sepoliafaucet.com/)

**Contract not loading**  
Verify `NEXT_PUBLIC_CONTRACT_ADDRESS` is set correctly in `.env.local`

## License

MIT

## Contact

**GitHub:** [@rahulsinghnegiii](https://github.com/rahulsinghnegiii)  
**Repository:** [Kakushin](https://github.com/rahulsinghnegiii/Kakushin)
