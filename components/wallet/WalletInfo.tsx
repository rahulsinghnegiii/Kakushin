import { useState, useEffect } from 'react';
import { useAccount, useBalance, useChainId } from 'wagmi';
import { formatAddress, formatBalance, getNetworkName } from '@/lib/web3';

export default function WalletInfo() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { data: balanceData, isLoading: isBalanceLoading, error: balanceError, refetch } = useBalance({
    address: address,
  });

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  if (!isConnected || !address) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Wallet Information
        </h3>
        <div className="text-center py-8">
          <svg
            className="w-16 h-16 mx-auto text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
          <p className="text-gray-600">
            Please connect your wallet to view account information
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">
          Wallet Information
        </h3>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing || isBalanceLoading}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Refresh balance"
        >
          <svg
            className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div>

      <div className="space-y-4">
        {/* Wallet Address */}
        <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500 mb-1">Address</p>
            <p className="text-lg font-mono text-gray-900">
              {formatAddress(address)}
            </p>
            <p className="text-xs text-gray-400 mt-1 font-mono break-all">
              {address}
            </p>
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(address)}
            className="ml-2 p-2 text-gray-600 hover:bg-gray-200 rounded transition-colors"
            title="Copy address"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </button>
        </div>

        {/* Network */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium text-gray-500 mb-1">Network</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <p className="text-lg font-semibold text-gray-900">
              {getNetworkName(chainId)}
            </p>
          </div>
        </div>

        {/* Balance */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium text-gray-500 mb-1">Balance</p>
          {isBalanceLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-24 h-8 bg-gray-200 animate-pulse rounded"></div>
            </div>
          ) : balanceError ? (
            <div className="text-red-600 text-sm">
              Failed to fetch balance
            </div>
          ) : balanceData ? (
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-gray-900">
                {formatBalance(balanceData.value)}
              </p>
              <p className="text-lg text-gray-600">
                {balanceData.symbol}
              </p>
            </div>
          ) : (
            <p className="text-gray-600">--</p>
          )}
        </div>
      </div>
    </div>
  );
}
