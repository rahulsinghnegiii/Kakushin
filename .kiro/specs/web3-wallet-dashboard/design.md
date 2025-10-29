# Design Document

## Overview

The Web3 Wallet Dashboard is built using Next.js 14+ with TypeScript, leveraging the Pages Router for simplicity and rapid development within the 72-hour constraint. The architecture follows a component-based approach with clear separation between presentation, business logic, and blockchain interaction layers. The application uses ethers.js v6 for blockchain interactions, RainbowKit + Wagmi for wallet connectivity, and React hooks for state management.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser Layer                         │
│  ┌────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │  MetaMask  │  │ WalletConnect│  │  User Interface  │   │
│  └────────────┘  └──────────────┘  └──────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Next.js Application                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              React Components Layer                   │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐            │  │
│  │  │  Wallet  │ │ Contract │ │  Tokens  │            │  │
│  │  │Components│ │Components│ │Components│            │  │
│  │  └──────────┘ └──────────┘ └──────────┘            │  │
│  └──────────────────────────────────────────────────────┘  │
│                            │                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           Web3 Integration Layer                      │  │
│  │  ┌──────────────┐  ┌──────────────┐                 │  │
│  │  │ RainbowKit + │  │  Ethers.js   │                 │  │
│  │  │    Wagmi     │  │   Provider   │                 │  │
│  │  └──────────────┘  └──────────────┘                 │  │
│  └──────────────────────────────────────────────────────┘  │
│                            │                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              API Routes Layer                         │  │
│  │           /api/tokens (Mock Data)                     │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   Blockchain Layer                           │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Sepolia/Mumbai Testnet                               │  │
│  │  ┌──────────────────┐  ┌──────────────────┐         │  │
│  │  │  MessageBoard    │  │   RPC Provider   │         │  │
│  │  │    Contract      │  │  (Infura/Alchemy)│         │  │
│  │  └──────────────────┘  └──────────────────┘         │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

**Frontend Framework:**
- Next.js 14.x (Pages Router)
- React 18.x
- TypeScript 5.x

**Web3 Libraries:**
- ethers.js v6.x (blockchain interactions)
- RainbowKit v2.x (wallet UI)
- Wagmi v2.x (React hooks for Ethereum)
- Viem (required by Wagmi)

**Styling:**
- Tailwind CSS 3.x (utility-first CSS)
- CSS Modules (component-specific styles as fallback)

**Development Tools:**
- TypeScript ESLint
- Prettier (code formatting)

### Network Configuration

**Target Networks:**
- Primary: Sepolia Testnet (Chain ID: 11155111)
- Alternative: Mumbai Testnet (Chain ID: 80001)

**RPC Providers:**
- Infura (recommended for reliability)
- Alchemy (alternative)
- Public RPC endpoints (fallback)

## Components and Interfaces

### Component Hierarchy

```
pages/
├── _app.tsx (RainbowKit + Wagmi providers)
├── index.tsx (Main dashboard page)
└── api/
    └── tokens.ts (Mock token API)

components/
├── layout/
│   ├── Header.tsx (App header with connect button)
│   └── Footer.tsx (Simple footer with links)
├── wallet/
│   ├── ConnectButton.tsx (Wallet connection UI)
│   └── WalletInfo.tsx (Display address, network, balance)
├── contract/
│   └── MessageBoard.tsx (Read/write contract messages)
└── tokens/
    └── TokenList.tsx (Display token holdings)

lib/
├── web3.ts (Web3 utility functions)
├── constants.ts (Contract addresses, chain configs)
└── types.ts (Shared TypeScript types)

contracts/
├── MessageBoard.sol (Solidity contract)
└── MessageBoard.json (Contract ABI)
```

### Core Components

#### 1. _app.tsx (Provider Setup)

**Purpose:** Configure RainbowKit and Wagmi providers for the entire application

**Key Responsibilities:**
- Initialize Wagmi config with supported chains
- Configure RainbowKit with WalletConnect Project ID
- Wrap application with necessary providers
- Import RainbowKit styles

**Dependencies:**
- @rainbow-me/rainbowkit
- wagmi
- viem/chains

#### 2. Header Component

**Purpose:** Display app branding and wallet connection button

**Props:** None (uses Wagmi hooks for wallet state)

**State:** None (stateless, relies on context)

**Key Features:**
- App logo/title on the left
- ConnectButton on the right
- Responsive layout (stacks on mobile)

#### 3. ConnectButton Component

**Purpose:** Handle wallet connection/disconnection UI

**Implementation:** Use RainbowKit's built-in ConnectButton component with custom styling

**Features:**
- Shows "Connect Wallet" when disconnected
- Shows truncated address when connected
- Dropdown with account info and disconnect option
- Handles wallet not installed scenario

#### 4. WalletInfo Component

**Purpose:** Display detailed wallet information after connection

**Props:**
```typescript
interface WalletInfoProps {
  // No props - uses Wagmi hooks internally
}
```

**State:**
```typescript
const [balance, setBalance] = useState<string>('0');
const [isLoading, setIsLoading] = useState<boolean>(false);
const [error, setError] = useState<string | null>(null);
```

**Hooks Used:**
- `useAccount()` - Get connected address
- `useNetwork()` - Get current network
- `useBalance()` - Get ETH/MATIC balance

**Key Features:**
- Auto-fetch balance on mount and account change
- Display address in truncated format
- Show network name with color indicator
- Refresh button to manually update balance
- Loading skeleton during fetch
- Error message display

#### 5. MessageBoard Component

**Purpose:** Interact with the MessageBoard smart contract

**Props:**
```typescript
interface MessageBoardProps {
  contractAddress: string;
  contractABI: any[];
}
```

**State:**
```typescript
const [currentMessage, setCurrentMessage] = useState<string>('');
const [newMessage, setNewMessage] = useState<string>('');
const [isReading, setIsReading] = useState<boolean>(false);
const [isWriting, setIsWriting] = useState<boolean>(false);
const [txHash, setTxHash] = useState<string | null>(null);
const [error, setError] = useState<string | null>(null);
```

**Key Methods:**
```typescript
// Read current message from contract
const readMessage = async (): Promise<void>

// Write new message to contract
const writeMessage = async (message: string): Promise<void>

// Wait for transaction confirmation
const waitForTransaction = async (txHash: string): Promise<void>
```

**Key Features:**
- Read message on component mount
- Input field with character limit (optional)
- Submit button (disabled when not connected or during tx)
- Transaction status display (pending/success/error)
- Etherscan link after successful transaction
- Auto-refresh message after write
- Comprehensive error handling

#### 6. TokenList Component

**Purpose:** Fetch and display mock token holdings

**Props:** None

**State:**
```typescript
interface Token {
  name: string;
  symbol: string;
  balance: number;
}

const [tokens, setTokens] = useState<Token[]>([]);
const [isLoading, setIsLoading] = useState<boolean>(false);
const [error, setError] = useState<string | null>(null);
```

**Key Methods:**
```typescript
// Fetch tokens from API
const fetchTokens = async (): Promise<void>
```

**Key Features:**
- Fetch from `/api/tokens` on mount
- Display in responsive grid/table
- Show token icon placeholder
- Loading skeleton
- Error state with retry button

### Utility Functions (lib/web3.ts)

```typescript
/**
 * Format wallet address to truncated form
 * @param address - Full Ethereum address
 * @returns Truncated address (0x1234...5678)
 */
export const formatAddress = (address: string): string

/**
 * Format balance from Wei to Ether with decimals
 * @param balance - Balance in Wei (bigint)
 * @param decimals - Number of decimal places (default: 4)
 * @returns Formatted balance string
 */
export const formatBalance = (balance: bigint, decimals?: number): string

/**
 * Get human-readable network name from chain ID
 * @param chainId - Numeric chain ID
 * @returns Network name (e.g., "Sepolia Testnet")
 */
export const getNetworkName = (chainId: number): string

/**
 * Get Etherscan URL for transaction
 * @param txHash - Transaction hash
 * @param chainId - Chain ID
 * @returns Etherscan URL
 */
export const getExplorerUrl = (txHash: string, chainId: number): string

/**
 * Validate Ethereum address format
 * @param address - Address to validate
 * @returns Boolean indicating validity
 */
export const isValidAddress = (address: string): boolean
```

## Data Models

### TypeScript Interfaces

```typescript
// lib/types.ts

/**
 * Wallet connection state
 */
export interface WalletState {
  address: string | null;
  isConnected: boolean;
  chainId: number | null;
  balance: string;
}

/**
 * Smart contract configuration
 */
export interface ContractConfig {
  address: string;
  abi: any[];
  chainId: number;
}

/**
 * Token data structure
 */
export interface Token {
  name: string;
  symbol: string;
  balance: number;
  icon?: string; // Optional icon URL
}

/**
 * Transaction status
 */
export enum TransactionStatus {
  IDLE = 'idle',
  PENDING = 'pending',
  SUCCESS = 'success',
  ERROR = 'error',
}

/**
 * Transaction state
 */
export interface TransactionState {
  status: TransactionStatus;
  hash: string | null;
  error: string | null;
}

/**
 * Network configuration
 */
export interface NetworkConfig {
  chainId: number;
  name: string;
  rpcUrl: string;
  explorerUrl: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}
```

### Smart Contract ABI Structure

```typescript
// contracts/MessageBoard.json
{
  "contractAddress": "0x...", // Filled after deployment
  "abi": [
    {
      "inputs": [],
      "name": "message",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_msg",
          "type": "string"
        }
      ],
      "name": "setMessage",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
}
```

## Error Handling

### Error Categories and Handling Strategy

#### 1. Wallet Connection Errors

**Scenarios:**
- Wallet not installed
- User rejected connection
- Network not supported
- Account locked

**Handling:**
```typescript
try {
  // Connection attempt
} catch (error: any) {
  if (error.code === 4001) {
    setError('Connection rejected by user');
  } else if (error.code === -32002) {
    setError('Connection request already pending');
  } else if (!window.ethereum) {
    setError('Please install MetaMask');
  } else {
    setError('Failed to connect wallet');
  }
}
```

#### 2. Transaction Errors

**Scenarios:**
- User rejected transaction
- Insufficient gas
- Transaction reverted
- Network timeout

**Handling:**
```typescript
try {
  const tx = await contract.setMessage(newMessage);
  await tx.wait();
} catch (error: any) {
  if (error.code === 'ACTION_REJECTED') {
    setError('Transaction rejected by user');
  } else if (error.code === 'INSUFFICIENT_FUNDS') {
    setError('Insufficient funds for gas');
  } else if (error.code === 'UNPREDICTABLE_GAS_LIMIT') {
    setError('Transaction would fail - check contract state');
  } else if (error.code === 'NETWORK_ERROR') {
    setError('Network error - please try again');
  } else {
    setError(error.message || 'Transaction failed');
  }
  console.error('Transaction error:', error);
}
```

#### 3. API Errors

**Scenarios:**
- Network request failed
- Invalid response format
- Server error

**Handling:**
```typescript
try {
  const response = await fetch('/api/tokens');
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const data = await response.json();
  setTokens(data);
} catch (error) {
  setError('Failed to load tokens - please refresh');
  console.error('API error:', error);
}
```

#### 4. Contract Read Errors

**Scenarios:**
- Contract not deployed
- Invalid contract address
- RPC provider error

**Handling:**
```typescript
try {
  const message = await contract.message();
  setCurrentMessage(message);
} catch (error: any) {
  if (error.code === 'CALL_EXCEPTION') {
    setError('Contract not found - check network');
  } else {
    setError('Failed to read contract');
  }
  console.error('Contract read error:', error);
}
```

### Error Display Strategy

**Visual Design:**
- Red background with error icon
- Clear, user-friendly message
- Action button when applicable (e.g., "Retry", "Switch Network")
- Auto-dismiss after 5 seconds for non-critical errors
- Persistent display for critical errors requiring user action

**Error Message Guidelines:**
- Avoid technical jargon
- Provide actionable guidance
- Include "why" when helpful
- Example: "Transaction rejected by user" (clear) vs "Error code 4001" (unclear)

## Testing Strategy

### Manual Testing Checklist

Given the 72-hour constraint, focus on comprehensive manual testing rather than automated tests.

#### Wallet Connection Tests

- [ ] Connect with MetaMask installed
- [ ] Attempt connection without MetaMask (error message)
- [ ] Connect via RainbowKit with WalletConnect
- [ ] Disconnect wallet
- [ ] Switch accounts in MetaMask (UI updates)
- [ ] Switch networks in MetaMask (UI updates)
- [ ] Refresh page while connected (persistence check)

#### Wallet Info Tests

- [ ] Balance displays correctly
- [ ] Address truncates properly
- [ ] Network name shows correctly
- [ ] Refresh button updates balance
- [ ] Loading state displays during fetch
- [ ] Error state displays on fetch failure

#### Contract Interaction Tests

- [ ] Read message on component mount
- [ ] Display current message correctly
- [ ] Enter new message and submit
- [ ] Approve transaction in MetaMask
- [ ] Transaction pending state displays
- [ ] Transaction success message displays
- [ ] Etherscan link works correctly
- [ ] Message auto-refreshes after write
- [ ] Reject transaction (error handling)
- [ ] Insufficient gas scenario (error handling)
- [ ] Wrong network scenario (error handling)

#### Token Display Tests

- [ ] Tokens load on page mount
- [ ] Both tokens display correctly
- [ ] Loading state shows briefly
- [ ] Error state with retry button
- [ ] Responsive layout on mobile
- [ ] Responsive layout on tablet
- [ ] Responsive layout on desktop

#### Responsive Design Tests

- [ ] Test on mobile (< 768px)
- [ ] Test on tablet (768px - 1024px)
- [ ] Test on desktop (> 1024px)
- [ ] All buttons accessible on touch
- [ ] Text readable at all sizes
- [ ] No horizontal scroll on mobile

### Browser Testing

**Target Browsers:**
- Chrome/Brave (primary - MetaMask support)
- Firefox (secondary)
- Edge (secondary)

**Note:** Safari has limited Web3 support; not a priority for this assignment.

### Network Testing

**Test Scenarios:**
- Deploy contract to Sepolia
- Test all features on Sepolia
- Verify Etherscan links work
- Test with slow network (throttling)
- Test with network disconnection

## Design Decisions and Rationale

### 1. Pages Router vs App Router

**Decision:** Use Pages Router

**Rationale:**
- Simpler setup for 72-hour constraint
- More mature ecosystem for Web3 libraries
- Clearer separation of API routes
- Extensive documentation and examples
- RainbowKit has better Pages Router support

### 2. RainbowKit vs Custom Wallet Connection

**Decision:** Use RainbowKit

**Rationale:**
- Saves 4-6 hours of development time
- Professional UI out of the box
- Multi-wallet support included
- Handles edge cases automatically
- Meets assignment bonus requirement (WalletConnect)

### 3. Ethers.js v6 vs Web3.js

**Decision:** Use Ethers.js v6

**Rationale:**
- Lighter weight and faster
- Better TypeScript support
- Cleaner API design
- More active development
- Better documentation
- Assignment PRD recommends it

### 4. Tailwind CSS vs CSS Modules

**Decision:** Use Tailwind CSS

**Rationale:**
- Faster development (utility-first)
- Consistent design system
- Smaller bundle size
- Responsive design utilities
- Easy to customize
- Industry standard

### 5. State Management: Context API vs Zustand

**Decision:** Use Wagmi hooks (no additional state management)

**Rationale:**
- Wagmi provides all necessary wallet state
- Avoids over-engineering
- Reduces dependencies
- Simpler codebase
- Sufficient for assignment scope

### 6. Contract Deployment: Remix vs Hardhat

**Decision:** Use Remix IDE

**Rationale:**
- Faster deployment (no local setup)
- Visual interface for beginners
- Built-in compiler and debugger
- Easy ABI export
- No additional dependencies
- Saves 1-2 hours vs Hardhat setup

### 7. RPC Provider: Infura vs Alchemy vs Public

**Decision:** Recommend Infura (with Alchemy as alternative)

**Rationale:**
- Free tier sufficient for assignment
- Reliable uptime
- Easy signup process
- Good documentation
- Widely used in production

## Performance Considerations

### Optimization Strategies

1. **Lazy Loading:**
   - Load contract ABI only when needed
   - Defer non-critical components

2. **Caching:**
   - Cache wallet balance for 30 seconds
   - Cache contract message for 10 seconds
   - Use SWR pattern for API calls (optional)

3. **Debouncing:**
   - Debounce balance refresh button (1 second)
   - Debounce message input validation

4. **Bundle Size:**
   - Tree-shake unused ethers.js modules
   - Use dynamic imports for heavy components
   - Optimize Tailwind CSS (purge unused classes)

### Performance Targets

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Wallet connection: < 2s
- Balance fetch: < 1s
- Contract read: < 2s
- Contract write: 10-30s (blockchain dependent)

## Security Considerations

### Best Practices

1. **Never expose private keys:**
   - All signing happens in user's wallet
   - No private key handling in application

2. **Environment variables:**
   - Use `NEXT_PUBLIC_` prefix for client-side vars
   - Never commit `.env.local` to git
   - Provide `.env.example` template

3. **Input validation:**
   - Validate message length before submission
   - Sanitize user inputs
   - Validate addresses before contract calls

4. **RPC security:**
   - Use HTTPS endpoints only
   - Rotate API keys if exposed
   - Rate limit API calls

5. **Contract interaction:**
   - Verify contract address before calls
   - Check network before transactions
   - Display transaction details before signing

## Deployment Strategy

### Vercel Deployment

**Steps:**
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy with automatic builds

**Environment Variables (Vercel):**
- `NEXT_PUBLIC_CONTRACT_ADDRESS`
- `NEXT_PUBLIC_RPC_URL`
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
- `NEXT_PUBLIC_CHAIN_ID`

**Build Configuration:**
- Framework: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

### Pre-Deployment Checklist

- [ ] All features tested locally
- [ ] No console errors in browser
- [ ] TypeScript compiles without errors
- [ ] Environment variables documented
- [ ] `.env.example` file created
- [ ] `.gitignore` includes `.env.local`
- [ ] README.md complete
- [ ] Contract deployed and verified
- [ ] Test build locally: `npm run build && npm start`

## Future Enhancements

Features to consider if time permits or for post-assignment improvements:

1. **Transaction History:**
   - Display past transactions
   - Filter by type (send/receive/contract)

2. **Real Token Integration:**
   - Fetch actual ERC-20 tokens
   - Display token prices
   - Show USD values

3. **ENS Support:**
   - Resolve ENS names
   - Display ENS instead of address

4. **Dark Mode:**
   - Toggle between light/dark themes
   - Persist preference

5. **Notifications:**
   - Toast notifications for transactions
   - Browser notifications for confirmations

6. **Advanced Error Recovery:**
   - Automatic retry with exponential backoff
   - Network switching prompts

7. **Analytics:**
   - Track user interactions
   - Monitor error rates

8. **Accessibility:**
   - ARIA labels
   - Keyboard navigation
   - Screen reader support

## Conclusion

This design provides a comprehensive blueprint for building the Web3 Wallet Dashboard within the 72-hour constraint. The architecture prioritizes simplicity, reliability, and user experience while meeting all assignment requirements. By leveraging established libraries (RainbowKit, Wagmi, ethers.js) and following best practices, the implementation will demonstrate professional full-stack Web3 development capabilities suitable for the Kakushin Full Stack Developer role.
