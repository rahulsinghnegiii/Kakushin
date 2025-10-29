

# Product Requirements Document (PRD)

## Web3 Wallet Dashboard - Kakushin Full Stack Developer Test Assignment


***

## 1. Project Overview

**Project Name:** Web3 Wallet Dashboard
**Version:** 1.0
**Assignment Duration:** 72 hours (3 days)
**Target Role:** Full Stack Developer at Kakushin
**Primary Goal:** Build a Next.js-based Web3 dashboard demonstrating wallet integration, smart contract interaction, and modern full-stack development skills[^1]

***

## 2. Technical Stack Requirements

### 2.1 Core Framework

- **Framework:** Next.js (latest version - 14.x or 15.x)
- **Language:** TypeScript (preferred) or JavaScript
- **React Version:** Latest stable
- **Node.js:** v18+ recommended


### 2.2 Blockchain \& Web3

- **Primary Library:** Ethers.js v6 (preferred) or Web3.js
- **Wallet Connectors:**
    - MetaMask SDK/Direct Integration
    - RainbowKit + Wagmi (for WalletConnect support)
- **Target Networks:** Ethereum Sepolia or Polygon Mumbai testnet


### 2.3 Optional Bonus Technologies

- **Backend-as-a-Service:** Firebase (Authentication + Firestore)
- **Headless CMS:** Strapi v4/v5
- **Deployment:** Vercel or Firebase Hosting

***

## 3. Feature Requirements

### 3.1 Wallet Connection (P0 - Critical)

**User Story:** As a user, I want to connect my crypto wallet so I can interact with Web3 features[^1]

**Functional Requirements:**

- Support MetaMask wallet connection
- Support RainbowKit/WalletConnect for multi-wallet support
- Display connection status in header
- Provide "Connect Wallet" button when disconnected
- Provide "Disconnect" button when connected
- Handle wallet not installed scenario gracefully

**Technical Specifications:**

- Use ethers.js `BrowserProvider` or Web3Provider
- Implement wallet connection state management (Context API or state library)
- Store connected wallet address in application state
- Handle account switching events
- Handle network switching events

**Acceptance Criteria:**

- ✅ User can connect MetaMask wallet
- ✅ User can connect via RainbowKit (WalletConnect)
- ✅ Connection persists on page refresh (optional but recommended)
- ✅ Clear error message if wallet not installed
- ✅ User can disconnect wallet

***

### 3.2 Wallet Details Display (P0 - Critical)

**User Story:** As a connected user, I want to view my wallet information so I can verify my connection[^1]

**Functional Requirements:**

- Display wallet address (truncated format: 0x1234...5678)
- Show connected network name (e.g., "Sepolia", "Mumbai")
- Display ETH/MATIC balance with proper formatting
- Auto-refresh balance on transaction completion

**Technical Specifications:**

- Use `provider.getBalance()` for balance retrieval
- Format balance using `ethers.formatEther()`
- Truncate address to first 6 and last 4 characters
- Detect network using `provider.getNetwork()`
- Handle balance loading states

**Acceptance Criteria:**

- ✅ Wallet address displays correctly in truncated format
- ✅ Network name shows current connected chain
- ✅ Balance displays with 4 decimal places precision
- ✅ Loading indicator while fetching balance
- ✅ Error handling for failed balance fetch

***

### 3.3 Smart Contract Interaction (P0 - Critical)

**User Story:** As a user, I want to read and update messages on the blockchain so I can interact with smart contracts[^1]

**Smart Contract Specification:**

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MessageBoard {
    string public message = "Hello Blockchain";

    function setMessage(string memory _msg) public {
        message = _msg;
    }
}
```

**Functional Requirements:**

**Read Operation:**

- Display current message from contract
- Refresh button to fetch latest message
- Auto-refresh after write transactions

**Write Operation:**

- Input field for new message
- Submit button to trigger transaction
- Transaction confirmation flow
- Success/failure feedback

**Technical Specifications:**

- Deploy contract to Sepolia/Mumbai testnet
- Store contract address and ABI in project
- Use `contract.message()` for read operations
- Use `contract.setMessage()` with signer for writes
- Implement transaction waiting/confirmation
- Handle gas estimation
- Parse transaction errors

**Acceptance Criteria:**

- ✅ Current message displays on component mount
- ✅ User can input new message text
- ✅ Transaction triggers on submit with proper wallet prompt
- ✅ Loading state shows during transaction processing
- ✅ Success message displays after confirmation
- ✅ Error messages for rejected/failed transactions
- ✅ Message refreshes automatically after successful write
- ✅ Gas estimation works correctly

***

### 3.4 Mock Token/NFT Display (P0 - Critical)

**User Story:** As a user, I want to view my token holdings so I can see my portfolio

**API Endpoint Specification:**

```typescript
// /pages/api/tokens.ts
// GET /api/tokens
// Response:
[
  { "name": "Crypto Cat", "symbol": "CAT", "balance": 5 },
  { "name": "Moon Token", "symbol": "MOON", "balance": 12 }
]
```

**Functional Requirements:**

- Create Next.js API route at `/pages/api/tokens.ts`
- Return hardcoded mock token data
- Display tokens in table or card layout
- Show token name, symbol, and balance

**Technical Specifications:**

- Implement GET endpoint handler
- Return JSON response with proper headers
- Fetch data client-side using fetch/axios
- Handle loading and error states

**Acceptance Criteria:**

- ✅ API route returns correct JSON structure
- ✅ Frontend successfully fetches token data
- ✅ Tokens display in clean table/card format
- ✅ Shows name, symbol, balance for each token
- ✅ Responsive layout on mobile

***

### 3.5 Firebase Integration (P1 - Bonus)

**User Story:** As a user, I want to log in with Google so my wallet can be saved across sessions

**Functional Requirements:**

- Google Sign-In button
- Save connected wallet address to Firestore
- Link wallet address to Google account
- Display saved wallet history

**Technical Specifications:**

- Set up Firebase project with Authentication enabled
- Enable Google auth provider
- Create Firestore collection: `users/{userId}/wallets`
- Store wallet address with timestamp on connection
- Query user's saved wallets

**Acceptance Criteria:**

- ✅ Google Sign-In works correctly
- ✅ Wallet address saves to Firestore on connection
- ✅ User can view previously connected wallets
- ✅ Proper error handling for auth failures

***

### 3.6 Strapi CMS Integration (P1 - Bonus)

**User Story:** As a user, I want to see platform announcements so I stay informed

**Functional Requirements:**

- Fetch "Announcement of the day" from Strapi
- Display announcement prominently in dashboard
- Update content dynamically from CMS

**Technical Specifications:**

- Set up local Strapi instance
- Create "Announcement" content type with title and message
- Fetch via Strapi REST API
- Display in dashboard header or dedicated section

**Acceptance Criteria:**

- ✅ Strapi instance running and accessible
- ✅ Announcement content type created
- ✅ Frontend successfully fetches announcement
- ✅ Announcement displays with proper styling

***

## 4. UI/UX Requirements

### 4.1 Layout Structure

**Header:**

- App name/logo (left)
- Connect Wallet / Disconnect button (right)
- Network indicator
- Wallet address display (when connected)

**Main Content:**

- Wallet Details Card (address, network, balance)
- Smart Contract Interaction Section (message display + input form)
- Token/NFT List Section (table or grid)
- Announcement Section (if Strapi implemented)

**Footer:**

- GitHub repository link
- Your name/contact


### 4.2 Design Guidelines

- Clean and minimal aesthetic
- Responsive design (mobile, tablet, desktop)
- Loading states for all async operations
- Clear error messages with actionable guidance
- Consistent spacing and typography
- Professional color scheme (avoid neon/flashy colors)


### 4.3 User Feedback

- Loading spinners during blockchain operations
- Success notifications (green checkmark)
- Error alerts (red with icon)
- Transaction pending states
- Disabled buttons during processing

***

## 5. Technical Requirements

### 5.1 Code Organization

```
/pages
  /api
    tokens.ts
  _app.tsx
  index.tsx
/components
  /wallet
    ConnectButton.tsx
    WalletInfo.tsx
  /contract
    MessageBoard.tsx
  /tokens
    TokenList.tsx
/lib or /utils
  web3.ts
  firebase.ts (if implemented)
/contracts
  MessageBoard.sol
  MessageBoard.json (ABI)
/styles
  globals.css
.env.local
README.md
```


### 5.2 Environment Variables

```
# Required
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/...
NEXT_PUBLIC_CHAIN_ID=11155111

# RainbowKit
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=...

# Optional - Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...

# Optional - Strapi
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```


### 5.3 Error Handling Requirements[^1]

Must handle:

- ❌ Wallet not installed
- ❌ User rejected connection
- ❌ Wrong network connected
- ❌ Insufficient gas fees
- ❌ Transaction reverted
- ❌ Network request timeout
- ❌ API endpoint failures


### 5.4 Loading States

Implement for:

- Wallet connection
- Balance fetching
- Contract message reading
- Transaction submission
- Transaction confirmation
- API calls

***

## 6. Testing Requirements

### 6.1 Manual Testing Checklist

- [ ] Wallet connection works with MetaMask
- [ ] Wallet connection works via RainbowKit
- [ ] Wrong network warning displays correctly
- [ ] Balance fetches and displays accurately
- [ ] Message reads from contract correctly
- [ ] Message write transaction completes successfully
- [ ] Transaction rejection handled gracefully
- [ ] API endpoint returns correct data
- [ ] Token list displays properly
- [ ] Responsive design works on mobile
- [ ] All loading states display correctly
- [ ] Error messages are clear and helpful


### 6.2 Smart Contract Testing

- [ ] Contract deploys successfully to testnet
- [ ] Can read initial message "Hello Blockchain"
- [ ] Can write new message and verify change
- [ ] Transaction hash returns correctly
- [ ] Events emit properly (if implemented)

***

## 7. Documentation Requirements

### 7.1 README.md Structure

```markdown
# Web3 Wallet Dashboard

## Overview
[Brief project description]

## Features
- Wallet connection (MetaMask & RainbowKit)
- Smart contract interaction
- Token display
- [Bonus features if implemented]

## Tech Stack
- Next.js [version]
- Ethers.js [version]
- RainbowKit [version]
- [Other libraries]

## Prerequisites
- Node.js v18+
- MetaMask browser extension
- Testnet ETH (Sepolia faucet)

## Installation
1. Clone repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local`
4. Fill in environment variables
5. Run development server: `npm run dev`

## Smart Contract
- Contract Address: 0x...
- Network: Sepolia
- [Link to contract on Etherscan]

## Usage
1. Open application in browser
2. Click "Connect Wallet"
3. Approve connection in MetaMask
4. View wallet details
5. Read/write contract messages
6. View token holdings

## Deployment
[Vercel deployment URL]

## Design Decisions
[Explain major technical choices]

## Known Limitations
[Any scope reductions or known issues]

## Future Improvements
[Features you'd add with more time]
```


***

## 8. Implementation Checklist

### Phase 1: Setup \& Foundation (Hours 1-4)

- [ ] Initialize Next.js project with TypeScript
- [ ] Install required dependencies (ethers, RainbowKit, wagmi)
- [ ] Set up project folder structure
- [ ] Configure environment variables
- [ ] Create basic layout with header/footer
- [ ] Set up global styles


### Phase 2: Wallet Integration (Hours 5-10)

- [ ] Implement MetaMask connection logic
- [ ] Integrate RainbowKit provider
- [ ] Create ConnectButton component
- [ ] Build WalletInfo display component
- [ ] Fetch and display wallet balance
- [ ] Handle network detection
- [ ] Add disconnect functionality
- [ ] Implement error handling for wallet states


### Phase 3: Smart Contract (Hours 11-16)

- [ ] Write and compile MessageBoard.sol
- [ ] Deploy contract to Sepolia testnet
- [ ] Save contract address and ABI
- [ ] Create contract interaction component
- [ ] Implement read message functionality
- [ ] Implement write message functionality
- [ ] Add transaction waiting/confirmation logic
- [ ] Display transaction status feedback
- [ ] Handle gas estimation
- [ ] Add error handling for contract calls


### Phase 4: API \& Token Display (Hours 17-20)

- [ ] Create `/api/tokens.ts` endpoint
- [ ] Implement mock data response
- [ ] Build TokenList component
- [ ] Fetch data from API
- [ ] Display tokens in table/card layout
- [ ] Style token display responsively
- [ ] Add loading state


### Phase 5: Polish \& Testing (Hours 21-26)

- [ ] Test all wallet connection flows
- [ ] Test contract interactions thoroughly
- [ ] Test on mobile devices
- [ ] Improve error messages
- [ ] Add loading indicators everywhere
- [ ] Optimize responsive design
- [ ] Review code quality
- [ ] Add comments to complex logic


### Phase 6: Bonus Features (Hours 27-30) [Optional]

- [ ] Set up Firebase project
- [ ] Implement Google Sign-In
- [ ] Save wallet to Firestore
- [ ] OR Set up Strapi locally
- [ ] Create announcement content type
- [ ] Fetch and display announcement


### Phase 7: Documentation \& Deployment (Hours 31-36)

- [ ] Write comprehensive README
- [ ] Add code comments
- [ ] Create `.env.example` file
- [ ] Test fresh installation process
- [ ] Deploy to Vercel
- [ ] Test deployed version
- [ ] Update README with live URL
- [ ] Final testing and review

***

## 9. Submission Requirements

### 9.1 Deliverables

1. **GitHub Repository**
    - Public repository
    - Clean commit history
    - Well-organized code structure
    - Complete `.env.example` file
    - Comprehensive README.md
2. **Live Demo**
    - Deployed to Vercel or Firebase Hosting
    - Accessible public URL
    - Fully functional on production
3. **Documentation**
    - Setup instructions
    - Architecture decisions
    - Known limitations
    - Future improvements

### 9.2 Submission Email

```
Subject: Web3 Wallet Dashboard Assignment - [Your Name]

Hi Ali,

I've completed the Web3 Wallet Dashboard assignment. Here are the deliverables:

GitHub Repository: [URL]
Live Demo: [URL]

Key Features Implemented:
✅ MetaMask & RainbowKit wallet integration
✅ Wallet details display (address, network, balance)
✅ Smart contract read/write operations
✅ Mock token API and display
[✅ Firebase Google Auth integration] [if implemented]
[✅ Strapi CMS announcement] [if implemented]

Tech Stack:
- Next.js [version]
- TypeScript
- Ethers.js [version]
- RainbowKit [version]

Contract Details:
- Network: Sepolia
- Address: 0x...
- Etherscan: [link]

Please let me know if you need any clarifications or have questions about my implementation.

Best regards,
[Your Name]
```


***

## 10. Evaluation Criteria[^1]

### 10.1 Code Quality (30%)

- Clean, readable code with consistent style
- Proper component structure and separation of concerns
- Meaningful variable/function names
- Appropriate use of TypeScript types
- Code comments for complex logic


### 10.2 Functionality (40%)

- All core requirements implemented
- Wallet connection works reliably
- Smart contract interaction functions correctly
- API endpoint returns proper data
- No critical bugs in main flows


### 10.3 Error Handling (15%)

- Comprehensive error catching
- User-friendly error messages
- Graceful degradation
- Proper loading states
- Network/wallet error handling


### 10.4 UI/UX (10%)

- Clean, professional design
- Responsive on all devices
- Intuitive user flow
- Proper feedback for user actions
- Accessibility considerations


### 10.5 Documentation (5%)

- Clear README with setup instructions
- Environment variables documented
- Architecture decisions explained
- Code comments where needed

***

## 11. Success Metrics

### Minimum Viable Submission

- ✅ All core requirements (3.1 - 3.4) implemented
- ✅ Deploys and runs without errors
- ✅ README with setup instructions
- ✅ Submitted within 72 hours


### Strong Submission

- ✅ All above +
- ✅ Exceptional error handling
- ✅ Polished UI/UX
- ✅ TypeScript throughout
- ✅ At least one bonus feature


### Outstanding Submission

- ✅ All above +
- ✅ Both bonus features implemented
- ✅ Additional creative features
- ✅ Production-ready code quality
- ✅ Comprehensive documentation

***

## 12. Time Management Guide

**Day 1 (8-10 hours):**

- Setup, wallet integration, basic UI
- Goal: Can connect wallet and see balance

**Day 2 (8-10 hours):**

- Deploy contract, implement interactions, API endpoint
- Goal: Can read/write contract and see tokens

**Day 3 (6-8 hours):**

- Polish, testing, bonus features (if time), documentation, deployment
- Goal: Production-ready submission

**Buffer:** 2-4 hours for unexpected issues

***

## 13. Common Pitfalls to Avoid[^1]

- ❌ Not testing with actual wallet transactions
- ❌ Ignoring error states
- ❌ Poor mobile responsiveness
- ❌ Missing loading indicators
- ❌ Incomplete README
- ❌ Hardcoded sensitive values (use .env)
- ❌ Not testing fresh installation
- ❌ Submitting late
- ❌ Over-engineering beyond requirements
- ❌ Skipping testnet contract deployment

***

## 14. Resources \& References

### Documentation

- Next.js: https://nextjs.org/docs
- Ethers.js: https://docs.ethers.org/v6/
- RainbowKit: https://rainbowkit.com/docs
- Wagmi: https://wagmi.sh/
- Solidity: https://docs.soliditylang.org/


### Tools

- Sepolia Faucet: https://sepoliafaucet.com/
- Mumbai Faucet: https://faucet.polygon.technology/
- Remix IDE: https://remix.ethereum.org/
- Vercel: https://vercel.com/

***

This PRD provides a complete roadmap for successfully completing the Kakushin assignment. Follow the checklist systematically, manage your time effectively, and focus on delivering clean, functional code with excellent error handling. Good luck with your submission!
<span style="display:none">[^2][^3][^4][^5][^6][^7]</span>

<div align="center">⁂</div>

