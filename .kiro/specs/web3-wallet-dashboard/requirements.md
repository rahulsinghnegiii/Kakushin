# Requirements Document

## Introduction

The Web3 Wallet Dashboard is a Next.js-based application designed to demonstrate full-stack Web3 development capabilities for the Kakushin Full Stack Developer technical assignment. The system enables users to connect their cryptocurrency wallets, view wallet information, interact with smart contracts on Ethereum testnets, and display token holdings through a clean, responsive interface. This 72-hour assignment showcases wallet integration, blockchain interaction, API development, and modern React/TypeScript practices.

## Glossary

- **Dashboard**: The main web application interface where users interact with Web3 features
- **Wallet**: A cryptocurrency wallet (MetaMask) that manages user's blockchain accounts and private keys
- **Provider**: An ethers.js object that connects to the Ethereum blockchain network
- **Signer**: An ethers.js object that can sign transactions using the connected wallet
- **Smart Contract**: Self-executing code deployed on the blockchain (MessageBoard contract)
- **Testnet**: A test blockchain network (Sepolia or Mumbai) used for development without real funds
- **RainbowKit**: A React library providing wallet connection UI and multi-wallet support
- **Wagmi**: A React hooks library for Ethereum interactions
- **Transaction**: A blockchain operation that modifies state and requires gas fees
- **Gas**: The fee required to execute blockchain transactions
- **ABI**: Application Binary Interface - the interface definition for interacting with smart contracts
- **RPC**: Remote Procedure Call endpoint for communicating with blockchain nodes

## Requirements

### Requirement 1: Wallet Connection

**User Story:** As a user, I want to connect my MetaMask wallet to the Dashboard so that I can interact with Web3 features

#### Acceptance Criteria

1. WHEN the user clicks the "Connect Wallet" button, THE Dashboard SHALL display the MetaMask connection prompt
2. WHEN the user approves the connection in MetaMask, THE Dashboard SHALL store the wallet address in application state
3. IF MetaMask is not installed in the browser, THEN THE Dashboard SHALL display an error message "Please install MetaMask"
4. WHEN the user is connected, THE Dashboard SHALL display a "Disconnect" button in place of "Connect Wallet"
5. WHEN the user clicks "Disconnect", THE Dashboard SHALL clear the wallet connection state

### Requirement 2: Multi-Wallet Support

**User Story:** As a user, I want to connect using different wallet providers so that I have flexibility in wallet choice

#### Acceptance Criteria

1. WHERE RainbowKit is integrated, THE Dashboard SHALL display multiple wallet connection options
2. WHEN the user selects a wallet from RainbowKit, THE Dashboard SHALL initiate connection with the selected provider
3. THE Dashboard SHALL support WalletConnect protocol through RainbowKit integration
4. WHEN connection fails, THE Dashboard SHALL display the specific error message from the wallet provider

### Requirement 3: Wallet Information Display

**User Story:** As a connected user, I want to view my wallet details so that I can verify my connection and account status

#### Acceptance Criteria

1. WHEN the wallet is connected, THE Dashboard SHALL display the wallet address in truncated format (0x1234...5678)
2. WHEN the wallet is connected, THE Dashboard SHALL fetch and display the ETH or MATIC balance
3. THE Dashboard SHALL format the balance to four decimal places
4. WHEN the wallet is connected, THE Dashboard SHALL display the connected network name (e.g., "Sepolia Testnet")
5. WHILE fetching the balance, THE Dashboard SHALL display a loading indicator
6. IF balance fetching fails, THEN THE Dashboard SHALL display an error message "Failed to fetch balance"

### Requirement 4: Account and Network Change Detection

**User Story:** As a user, I want the Dashboard to update automatically when I switch accounts or networks in my wallet so that displayed information stays accurate

#### Acceptance Criteria

1. WHEN the user switches accounts in MetaMask, THE Dashboard SHALL update the displayed wallet address within two seconds
2. WHEN the user switches accounts in MetaMask, THE Dashboard SHALL fetch and display the new account's balance
3. WHEN the user switches networks in MetaMask, THE Dashboard SHALL update the displayed network name within two seconds
4. WHEN the user switches to an unsupported network, THE Dashboard SHALL display a warning message "Please switch to Sepolia or Mumbai testnet"

### Requirement 5: Smart Contract Message Reading

**User Story:** As a connected user, I want to read the current message from the MessageBoard contract so that I can see the stored blockchain data

#### Acceptance Criteria

1. WHEN the contract interaction component mounts, THE Dashboard SHALL fetch the current message from the MessageBoard contract
2. THE Dashboard SHALL display the fetched message in a readable text format
3. WHILE fetching the message, THE Dashboard SHALL display a loading indicator
4. IF the message fetch fails, THEN THE Dashboard SHALL display an error message "Failed to read contract message"
5. WHEN the user clicks a "Refresh" button, THE Dashboard SHALL fetch and display the latest message from the contract

### Requirement 6: Smart Contract Message Writing

**User Story:** As a connected user, I want to update the message on the MessageBoard contract so that I can write data to the blockchain

#### Acceptance Criteria

1. THE Dashboard SHALL provide an input field for entering a new message
2. WHEN the user enters a message and clicks "Update Message", THE Dashboard SHALL initiate a transaction to update the contract
3. WHEN the transaction is initiated, THE Dashboard SHALL display the MetaMask transaction approval prompt
4. WHILE the transaction is pending, THE Dashboard SHALL display a loading state with text "Transaction pending..."
5. WHEN the transaction is confirmed, THE Dashboard SHALL display a success message "Message updated successfully"
6. WHEN the transaction is confirmed, THE Dashboard SHALL display a link to view the transaction on Etherscan
7. WHEN the transaction is confirmed, THE Dashboard SHALL automatically refresh the displayed message
8. IF the user rejects the transaction, THEN THE Dashboard SHALL display an error message "Transaction rejected by user"
9. IF the transaction fails due to insufficient gas, THEN THE Dashboard SHALL display an error message "Insufficient funds for gas"
10. IF the user is on the wrong network, THEN THE Dashboard SHALL display an error message "Please switch to [correct network]"

### Requirement 7: Token Holdings API

**User Story:** As a developer, I want a Next.js API endpoint that returns token data so that the frontend can display user token holdings

#### Acceptance Criteria

1. THE Dashboard SHALL provide an API endpoint at `/api/tokens`
2. WHEN a GET request is sent to `/api/tokens`, THE Dashboard SHALL return a JSON array of token objects
3. THE Dashboard SHALL return exactly two tokens: Crypto Cat (CAT) with balance 5, and Moon Token (MOON) with balance 12
4. IF a non-GET request is sent to `/api/tokens`, THEN THE Dashboard SHALL return HTTP status 405 with error message "Method not allowed"
5. THE Dashboard SHALL return HTTP status 200 for successful GET requests

### Requirement 8: Token Display

**User Story:** As a user, I want to view my token holdings so that I can see what tokens I own

#### Acceptance Criteria

1. WHEN the Dashboard loads, THE Dashboard SHALL fetch token data from `/api/tokens`
2. THE Dashboard SHALL display each token's name, symbol, and balance
3. WHILE fetching token data, THE Dashboard SHALL display a loading indicator
4. IF the API request fails, THEN THE Dashboard SHALL display an error message "Failed to load tokens"
5. THE Dashboard SHALL display tokens in a responsive layout (table on desktop, cards on mobile)

### Requirement 9: Responsive Design

**User Story:** As a user on any device, I want the Dashboard to display properly so that I can use it on mobile, tablet, or desktop

#### Acceptance Criteria

1. THE Dashboard SHALL display a mobile-optimized layout on screens smaller than 768 pixels wide
2. THE Dashboard SHALL display a tablet-optimized layout on screens between 768 and 1024 pixels wide
3. THE Dashboard SHALL display a desktop-optimized layout on screens wider than 1024 pixels
4. THE Dashboard SHALL ensure all interactive elements are accessible on touch devices
5. THE Dashboard SHALL maintain readable text sizes across all screen sizes

### Requirement 10: Error Handling and User Feedback

**User Story:** As a user, I want clear feedback on all operations so that I understand what is happening and can resolve issues

#### Acceptance Criteria

1. WHEN any async operation is in progress, THE Dashboard SHALL display a loading indicator
2. WHEN any operation succeeds, THE Dashboard SHALL display a success message for at least two seconds
3. WHEN any operation fails, THE Dashboard SHALL display a user-friendly error message explaining the issue
4. THE Dashboard SHALL display error messages in red with an error icon
5. THE Dashboard SHALL display success messages in green with a success icon
6. WHEN a transaction is pending on the blockchain, THE Dashboard SHALL disable the submit button to prevent duplicate submissions

### Requirement 11: Environment Configuration

**User Story:** As a developer, I want to configure the Dashboard through environment variables so that I can deploy to different environments without code changes

#### Acceptance Criteria

1. THE Dashboard SHALL read the contract address from environment variable `NEXT_PUBLIC_CONTRACT_ADDRESS`
2. THE Dashboard SHALL read the RPC URL from environment variable `NEXT_PUBLIC_RPC_URL`
3. THE Dashboard SHALL read the WalletConnect Project ID from environment variable `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
4. THE Dashboard SHALL read the chain ID from environment variable `NEXT_PUBLIC_CHAIN_ID`
5. IF any required environment variable is missing, THEN THE Dashboard SHALL throw a configuration error at build time

### Requirement 12: Smart Contract Deployment

**User Story:** As a developer, I want to deploy the MessageBoard contract to a testnet so that the Dashboard can interact with it

#### Acceptance Criteria

1. THE MessageBoard contract SHALL be written in Solidity version 0.8.0 or higher
2. THE MessageBoard contract SHALL store a public string variable named `message` with initial value "Hello Blockchain"
3. THE MessageBoard contract SHALL provide a public function `setMessage` that accepts a string parameter
4. WHEN `setMessage` is called, THE MessageBoard contract SHALL update the stored message
5. THE MessageBoard contract SHALL be deployed to either Sepolia or Mumbai testnet
6. THE Dashboard SHALL store the deployed contract's ABI in a JSON file
