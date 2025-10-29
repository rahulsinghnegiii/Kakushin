/**
 * Web3 utility functions for the Wallet Dashboard
 */

/**
 * Format wallet address to truncated form
 * @param address - Full Ethereum address
 * @returns Truncated address (0x1234...5678)
 * @example
 * formatAddress('0x1234567890abcdef1234567890abcdef12345678')
 * // Returns: '0x1234...5678'
 */
export const formatAddress = (address: string): string => {
  if (!address || address.length < 10) {
    return address;
  }
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

/**
 * Format balance from Wei to Ether with decimals
 * @param balance - Balance in Wei (bigint)
 * @param decimals - Number of decimal places (default: 4)
 * @returns Formatted balance string
 * @example
 * formatBalance(1000000000000000000n, 4)
 * // Returns: '1.0000'
 */
export const formatBalance = (balance: bigint, decimals: number = 4): string => {
  // Convert Wei to Ether (divide by 10^18)
  const etherValue = Number(balance) / 1e18;
  return etherValue.toFixed(decimals);
};

/**
 * Get human-readable network name from chain ID
 * @param chainId - Numeric chain ID
 * @returns Network name (e.g., "Sepolia Testnet")
 * @example
 * getNetworkName(11155111)
 * // Returns: 'Sepolia Testnet'
 */
export const getNetworkName = (chainId: number): string => {
  const networkNames: Record<number, string> = {
    1: 'Ethereum Mainnet',
    11155111: 'Sepolia Testnet',
    80001: 'Mumbai Testnet',
    137: 'Polygon Mainnet',
    5: 'Goerli Testnet',
  };

  return networkNames[chainId] || `Unknown Network (${chainId})`;
};

/**
 * Get Etherscan URL for transaction
 * @param txHash - Transaction hash
 * @param chainId - Chain ID
 * @returns Etherscan URL
 * @example
 * getExplorerUrl('0xabc...', 11155111)
 * // Returns: 'https://sepolia.etherscan.io/tx/0xabc...'
 */
export const getExplorerUrl = (txHash: string, chainId: number): string => {
  const explorerUrls: Record<number, string> = {
    1: 'https://etherscan.io',
    11155111: 'https://sepolia.etherscan.io',
    80001: 'https://mumbai.polygonscan.com',
    137: 'https://polygonscan.com',
    5: 'https://goerli.etherscan.io',
  };

  const baseUrl = explorerUrls[chainId] || 'https://etherscan.io';
  return `${baseUrl}/tx/${txHash}`;
};

/**
 * Validate Ethereum address format
 * @param address - Address to validate
 * @returns Boolean indicating validity
 * @example
 * isValidAddress('0x1234567890abcdef1234567890abcdef12345678')
 * // Returns: true
 */
export const isValidAddress = (address: string): boolean => {
  // Check if address is a string and matches Ethereum address format
  if (typeof address !== 'string') {
    return false;
  }
  
  // Ethereum addresses are 42 characters long (0x + 40 hex characters)
  const ethereumAddressRegex = /^0x[a-fA-F0-9]{40}$/;
  return ethereumAddressRegex.test(address);
};
