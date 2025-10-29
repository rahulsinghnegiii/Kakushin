/**
 * Application constants and configuration
 */

import { NetworkConfig } from './types';

/**
 * Supported chain IDs
 */
export const SUPPORTED_CHAIN_IDS = {
  SEPOLIA: 11155111,
  MUMBAI: 80001,
} as const;

/**
 * Network configurations with RPC URLs and explorer URLs
 */
export const NETWORK_CONFIGS: Record<number, NetworkConfig> = {
  [SUPPORTED_CHAIN_IDS.SEPOLIA]: {
    chainId: SUPPORTED_CHAIN_IDS.SEPOLIA,
    name: 'Sepolia Testnet',
    rpcUrl: 'https://sepolia.infura.io/v3/',
    explorerUrl: 'https://sepolia.etherscan.io',
    nativeCurrency: {
      name: 'Sepolia Ether',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  [SUPPORTED_CHAIN_IDS.MUMBAI]: {
    chainId: SUPPORTED_CHAIN_IDS.MUMBAI,
    name: 'Mumbai Testnet',
    rpcUrl: 'https://rpc-mumbai.maticvigil.com',
    explorerUrl: 'https://mumbai.polygonscan.com',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
  },
};

/**
 * Validate and retrieve environment variable
 * @param key - Environment variable key
 * @param required - Whether the variable is required
 * @returns Environment variable value or undefined
 */
const getEnvVar = (key: string, required: boolean = true): string | undefined => {
  const value = process.env[key];
  
  if (required && !value) {
    throw new Error(
      `Missing required environment variable: ${key}. ` +
      `Please check your .env.local file and ensure ${key} is set.`
    );
  }
  
  return value;
};

/**
 * Contract address from environment variable
 * Note: This may be undefined during initial setup before contract deployment
 */
export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '';

/**
 * RPC URL from environment variable
 */
export const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || '';

/**
 * WalletConnect Project ID from environment variable
 */
export const WALLETCONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '';

/**
 * Chain ID from environment variable (defaults to Sepolia)
 */
export const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID 
  ? parseInt(process.env.NEXT_PUBLIC_CHAIN_ID, 10)
  : SUPPORTED_CHAIN_IDS.SEPOLIA;

/**
 * Validate required environment variables
 * Call this function during app initialization to ensure all required vars are set
 */
export const validateEnvVars = (): void => {
  const errors: string[] = [];

  if (!WALLETCONNECT_PROJECT_ID) {
    errors.push('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is required for wallet connection');
  }

  // Contract address is optional during initial setup
  // RPC URL is optional as we can use public endpoints

  if (errors.length > 0) {
    console.warn('Environment variable warnings:', errors.join(', '));
  }
};
