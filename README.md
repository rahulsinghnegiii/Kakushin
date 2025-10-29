# Web3 Wallet Dashboard

A modern, full-stack Web3 application built with Next.js that demonstrates wallet connectivity, smart contract interaction, and blockchain data display. Created for the Kakushin Full Stack Developer technical assignment.

## ✨ Features

- ✅ **Wallet Connection** - Connect with MetaMask and other wallets via RainbowKit
- ✅ **Multi-Wallet Support** - WalletConnect integration for mobile wallets
- ✅ **Wallet Information Display** - View address, network, and balance
- ✅ **Smart Contract Interaction** - Read and write messages to blockchain
- ✅ **Token Holdings** - Display token balances via API
- ✅ **Responsive Design** - Mobile-first, works on all devices
- ✅ **Real-time Updates** - Auto-refresh on account/network changes
- ✅ **Transaction Tracking** - View transactions on block explorer
- ✅ **Error Handling** - Comprehensive error messages and recovery

## 🛠️ Tech Stack

- **Framework:** Next.js 16.0.1 (Pages Router)
- **Language:** TypeScript 5.x
- **Styling:** Tailwind CSS 4.x
- **Web3 Libraries:**
  - ethers.js v6.15.0
  - RainbowKit v2.2.9
  - Wagmi v2.19.1
  - Viem v2.38.5
- **Blockchain:** Ethereum Sepolia Testnet
- **Smart Contract:** Solidity ^0.8.0

## 📋 Prerequisites

Before running this project, ensure you have:

- **Node.js** 18.x or higher
- **npm** or **yarn** package manager
- **MetaMask** browser extension installed
- **Sepolia Testnet ETH** (get from [Sepolia Faucet](https://sepoliafaucet.com/))
- **WalletConnect Project ID** (get from [WalletConnect Cloud](https://cloud.walletconnect.com/))

## 🚀 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rahulsinghnegiii/Kakushin.git
   cd Kakushin
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

   Update `.env.local` with your values:
   ```env
   # Contract Configuration
   NEXT_PUBLIC_CONTRACT_ADDRESS=0xba37f222740668bec3a08e6ab84da115419403f1

   # Network Configuration
   NEXT_PUBLIC_CHAIN_ID=11155111
   NEXT_PUBLIC_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY

   # WalletConnect Configuration
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=YOUR_PROJECT_ID
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `NEXT_PUBLIC_CONTRACT_ADDRESS` | Deployed MessageBoard contract address | Yes | `0xba37f222740668bec3a08e6ab84da115419403f1` |
| `NEXT_PUBLIC_CHAIN_ID` | Target blockchain network ID | Yes | `11155111` (Sepolia) |
| `NEXT_PUBLIC_RPC_URL` | RPC endpoint for blockchain connection | Yes | `https://sepolia.infura.io/v3/YOUR_KEY` |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | WalletConnect project identifier | Yes | Get from [WalletConnect Cloud](https://cloud.walletconnect.com/) |

### Getting API Keys

**Alchemy RPC URL:**
1. Sign up at [Alchemy](https://www.alchemy.com/)
2. Create a new app for Sepolia network
3. Copy the HTTPS URL

**WalletConnect Project ID:**
1. Sign up at [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Create a new project
3. Copy the Project ID

## 📝 Smart Contract Details

**Contract Name:** MessageBoard  
**Network:** Sepolia Testnet (Chain ID: 11155111)  
**Contract Address:** `0xba37f222740668bec3a08e6ab84da115419403f1`  
**Etherscan:** [View on Sepolia Etherscan](https://sepolia.etherscan.io/address/0xba37f222740668bec3a08e6ab84da115419403f1)

### Contract Functions

- `message()` - Read the current message (view function)
- `getMessage()` - Alternative read function (view function)
- `setMessage(string _msg)` - Update the message (payable function)

### Deploying Your Own Contract

See [contracts/DEPLOYMENT.md](contracts/DEPLOYMENT.md) for detailed deployment instructions using Remix IDE.

## 📁 Project Structure

```
├── components/
│   ├── contract/
│   │   └── MessageBoard.tsx    # Smart contract interaction
│   ├── layout/
│   │   ├── Header.tsx          # App header with wallet button
│   │   └── Footer.tsx          # App footer
│   ├── tokens/
│   │   └── TokenList.tsx       # Token holdings display
│   └── wallet/
│       └── WalletInfo.tsx      # Wallet information card
├── contracts/
│   ├── MessageBoard.sol        # Solidity smart contract
│   ├── MessageBoard.json       # Contract ABI
│   └── DEPLOYMENT.md           # Deployment guide
├── lib/
│   ├── constants.ts            # App constants and config
│   ├── types.ts                # TypeScript type definitions
│   └── web3.ts                 # Web3 utility functions
├── pages/
│   ├── api/
│   │   └── tokens.ts           # Token API endpoint
│   ├── _app.tsx                # App wrapper with providers
│   └── index.tsx               # Main dashboard page
├── public/                     # Static assets
├── styles/
│   └── globals.css             # Global styles
├── .env.example                # Environment variables template
├── .env.local                  # Your environment variables (not in git)
├── next.config.ts              # Next.js configuration
├── package.json                # Dependencies
├── tailwind.config.js          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## 🎯 Usage Guide

### 1. Connect Your Wallet

- Click "Connect Wallet" in the header
- Select MetaMask or another wallet
- Approve the connection request
- Ensure you're on Sepolia testnet

### 2. View Wallet Information

- See your wallet address (truncated format)
- View your current network
- Check your ETH balance
- Click refresh icon to update balance

### 3. Interact with Smart Contract

- Read the current message from the blockchain
- Enter a new message in the text area
- Click "Update Message"
- Approve the transaction in MetaMask
- Wait for confirmation (10-30 seconds)
- View transaction on Etherscan

### 4. View Token Holdings

- Scroll to "Token Holdings" section
- See mock token balances (CAT and MOON)
- Click refresh to reload data

## 🎨 Design Decisions

### Why Pages Router?

- Simpler setup for rapid development
- Better compatibility with Web3 libraries
- Clearer API routes structure
- Extensive documentation and examples

### Why RainbowKit?

- Professional wallet connection UI out of the box
- Multi-wallet support included
- Handles edge cases automatically
- Saves significant development time

### Why Ethers.js v6?

- Lighter weight than Web3.js
- Better TypeScript support
- Cleaner API design
- More active development

### Why Tailwind CSS?

- Faster development with utility classes
- Consistent design system
- Smaller bundle size
- Easy responsive design

## 🧪 Testing

### Manual Testing Checklist

- [x] Wallet connection with MetaMask
- [x] Wallet disconnection
- [x] Account switching detection
- [x] Network switching detection
- [x] Balance display and refresh
- [x] Contract message reading
- [x] Contract message writing
- [x] Transaction approval
- [x] Transaction rejection handling
- [x] Transaction success feedback
- [x] Etherscan link functionality
- [x] Token API endpoint
- [x] Token list display
- [x] Responsive design (mobile/tablet/desktop)
- [x] Error handling and messages

### Running Tests

```bash
# Build the project
npm run build

# Run linting
npm run lint

# Start production server
npm start
```

## 🚢 Deployment

### Deploy to Vercel

1. **Push to GitHub:**
   ```bash
   git push origin main
   ```

2. **Import to Vercel:**
   - Go to [Vercel](https://vercel.com/)
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables
   - Deploy

3. **Add Environment Variables in Vercel:**
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.local`
   - Redeploy if needed

### Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🔍 Troubleshooting

### "Please install MetaMask" error
- Install MetaMask browser extension
- Refresh the page

### "Wrong network" error
- Open MetaMask
- Switch to Sepolia testnet
- Refresh the page

### "Insufficient funds" error
- Get Sepolia ETH from [faucet](https://sepoliafaucet.com/)
- Wait for transaction confirmation

### Contract not loading
- Check `NEXT_PUBLIC_CONTRACT_ADDRESS` in `.env.local`
- Verify contract is deployed on Sepolia
- Check Etherscan for contract status

### Transaction failing
- Ensure you have enough Sepolia ETH for gas
- Check you're on the correct network
- Try increasing gas limit in MetaMask

## 🔮 Future Enhancements

- [ ] Real ERC-20 token integration
- [ ] Transaction history display
- [ ] ENS name resolution
- [ ] Dark mode toggle
- [ ] Multi-chain support (Polygon, Arbitrum)
- [ ] Token price display
- [ ] NFT gallery
- [ ] Gas price optimization
- [ ] Automated testing suite
- [ ] Contract verification automation

## 📄 License

MIT License - see LICENSE file for details

## 👤 Contact

**Developer:** Rahul Singh  
**GitHub:** [@rahulsinghnegiii](https://github.com/rahulsinghnegiii)  
**Repository:** [Kakushin](https://github.com/rahulsinghnegiii/Kakushin)

## 🙏 Acknowledgments

- Built for Kakushin Full Stack Developer technical assignment
- RainbowKit for wallet connection UI
- Wagmi for React hooks
- Ethers.js for blockchain interaction
- Next.js team for the amazing framework
- Tailwind CSS for styling utilities

---

**Note:** This is a demonstration project for educational purposes. Always audit smart contracts before using them in production with real funds.
