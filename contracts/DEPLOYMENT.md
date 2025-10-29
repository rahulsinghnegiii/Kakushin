# Smart Contract Deployment Guide

## Prerequisites
- MetaMask wallet installed
- Testnet ETH (Sepolia) or MATIC (Mumbai)
- Access to Remix IDE (https://remix.ethereum.org/)

## Getting Testnet Funds

### Sepolia Testnet (Recommended)
1. Visit: https://sepoliafaucet.com/
2. Or: https://www.alchemy.com/faucets/ethereum-sepolia
3. Enter your wallet address
4. Receive free Sepolia ETH

### Mumbai Testnet (Alternative)
1. Visit: https://mumbaifaucet.com/
2. Or: https://faucet.polygon.technology/
3. Enter your wallet address
4. Receive free Mumbai MATIC

## Deployment Steps

### 1. Open Remix IDE
- Go to https://remix.ethereum.org/
- Create a new file called `MessageBoard.sol`

### 2. Copy Contract Code
- Copy the entire content from `contracts/MessageBoard.sol`
- Paste it into the Remix editor

### 3. Compile Contract
- Click on the "Solidity Compiler" tab (left sidebar)
- Select compiler version: `0.8.0` or higher
- Click "Compile MessageBoard.sol"
- Ensure there are no errors

### 4. Connect MetaMask
- Click on the "Deploy & Run Transactions" tab
- In "Environment" dropdown, select "Injected Provider - MetaMask"
- MetaMask will prompt you to connect - approve it
- Ensure you're on the correct network (Sepolia or Mumbai)

### 5. Deploy Contract
- Ensure "MessageBoard" is selected in the "Contract" dropdown
- Click the orange "Deploy" button
- MetaMask will open asking you to confirm the transaction
- Confirm the transaction and wait for deployment (10-30 seconds)

### 6. Copy Contract Address
- After deployment, you'll see the contract under "Deployed Contracts"
- Click the copy icon next to the contract address
- Save this address - you'll need it for the `.env.local` file

### 7. Verify Contract (Optional but Recommended)
- Go to the appropriate block explorer:
  - Sepolia: https://sepolia.etherscan.io/
  - Mumbai: https://mumbai.polygonscan.com/
- Search for your contract address
- Click "Contract" tab
- Click "Verify and Publish"
- Follow the verification steps

### 8. Update Environment Variables
- Open `.env.local` in your project root
- Update `NEXT_PUBLIC_CONTRACT_ADDRESS` with your deployed contract address
- Example: `NEXT_PUBLIC_CONTRACT_ADDRESS=0x1234567890abcdef1234567890abcdef12345678`

### 9. Update Contract JSON (Optional)
- Open `contracts/MessageBoard.json`
- Update the `contractAddress` field with your deployed address
- The ABI is already included

## Testing the Contract in Remix

Before using it in the app, test it in Remix:

1. **Read the message:**
   - Expand your deployed contract
   - Click the blue "message" button
   - You should see "Hello Blockchain"

2. **Update the message:**
   - Enter a new message in the "setMessage" input field
   - Click the orange "setMessage" button
   - Confirm the transaction in MetaMask
   - Wait for confirmation
   - Click "message" again to verify the update

## Troubleshooting

### "Insufficient funds" error
- You need testnet ETH/MATIC for gas fees
- Visit the faucets listed above

### "Wrong network" error
- Check MetaMask is connected to Sepolia or Mumbai
- Switch networks in MetaMask if needed

### Contract not deploying
- Ensure you have enough gas
- Try increasing gas limit in MetaMask
- Check network isn't congested

### Can't find deployed contract
- Check the "Deployed Contracts" section in Remix
- Look for recent transactions in MetaMask
- Check block explorer with your wallet address

## Next Steps

After deployment:
1. Update `.env.local` with contract address
2. Restart your Next.js dev server: `npm run dev`
3. Connect your wallet in the app
4. Test reading and writing messages

## Contract Details

- **Solidity Version:** ^0.8.0
- **License:** MIT
- **Functions:**
  - `message()` - Read current message (view)
  - `getMessage()` - Read current message (view)
  - `setMessage(string)` - Update message (payable)
- **Events:**
  - `MessageUpdated(address, string)` - Emitted on message update
