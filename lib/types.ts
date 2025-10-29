/**
 * Type definitions for the Web3 Wallet Dashboard
 */

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
