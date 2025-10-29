import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACT_ADDRESS } from '@/lib/constants';
import { getExplorerUrl } from '@/lib/web3';
import contractABI from '@/contracts/MessageBoard.json';

export default function MessageBoard() {
  const { address, isConnected, chain } = useAccount();
  const [newMessage, setNewMessage] = useState('');
  const [txHash, setTxHash] = useState<string | null>(null);

  // Read current message from contract
  const { data: currentMessage, isLoading: isReading, error: readError, refetch } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: contractABI.abi,
    functionName: 'message',
  });

  // Write new message to contract
  const { writeContract, data: writeData, error: writeError, isPending: isWriting } = useWriteContract();

  // Wait for transaction confirmation
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: writeData,
  });

  // Update txHash when write transaction is submitted
  useEffect(() => {
    if (writeData) {
      setTxHash(writeData);
    }
  }, [writeData]);

  // Refresh message after successful transaction
  useEffect(() => {
    if (isConfirmed) {
      refetch();
      setNewMessage('');
    }
  }, [isConfirmed, refetch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !CONTRACT_ADDRESS) return;

    try {
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: contractABI.abi,
        functionName: 'setMessage',
        args: [newMessage],
      });
    } catch (error) {
      console.error('Error writing to contract:', error);
    }
  };

  const handleRefresh = () => {
    refetch();
  };

  if (!CONTRACT_ADDRESS) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          MessageBoard Contract
        </h3>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg
              className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <div>
              <h4 className="font-semibold text-yellow-900 mb-1">Contract Not Configured</h4>
              <p className="text-sm text-yellow-800">
                Please deploy the MessageBoard contract and update the <code className="bg-yellow-100 px-1 rounded">NEXT_PUBLIC_CONTRACT_ADDRESS</code> in your <code className="bg-yellow-100 px-1 rounded">.env.local</code> file.
              </p>
              <p className="text-sm text-yellow-800 mt-2">
                See <code className="bg-yellow-100 px-1 rounded">contracts/DEPLOYMENT.md</code> for deployment instructions.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          MessageBoard Contract
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="text-gray-600">
            Please connect your wallet to interact with the smart contract
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">
          MessageBoard Contract
        </h3>
        <button
          onClick={handleRefresh}
          disabled={isReading}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
          title="Refresh message"
        >
          <svg
            className={`w-5 h-5 ${isReading ? 'animate-spin' : ''}`}
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

      {/* Current Message Display */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Current Message
        </label>
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          {isReading ? (
            <div className="flex items-center gap-2">
              <div className="w-full h-6 bg-gray-200 animate-pulse rounded"></div>
            </div>
          ) : readError ? (
            <p className="text-red-600 text-sm">
              Failed to read message. Please check your network connection and contract address.
            </p>
          ) : (
            <p className="text-gray-900 text-lg break-words">
              {currentMessage as string || 'No message set'}
            </p>
          )}
        </div>
      </div>

      {/* Update Message Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="newMessage" className="block text-sm font-medium text-gray-700 mb-2">
            New Message
          </label>
          <textarea
            id="newMessage"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Enter your message..."
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            disabled={isWriting || isConfirming}
          />
        </div>

        <button
          type="submit"
          disabled={!newMessage.trim() || isWriting || isConfirming}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isWriting || isConfirming ? (
            <>
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {isWriting ? 'Waiting for approval...' : 'Transaction pending...'}
            </>
          ) : (
            'Update Message'
          )}
        </button>
      </form>

      {/* Transaction Status */}
      {writeError && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <div>
              <h4 className="font-semibold text-red-900 mb-1">Transaction Failed</h4>
              <p className="text-sm text-red-800">
                {writeError.message.includes('rejected') 
                  ? 'Transaction rejected by user'
                  : writeError.message.includes('insufficient')
                  ? 'Insufficient funds for gas'
                  : 'Transaction failed. Please try again.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {isConfirmed && txHash && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div className="flex-1">
              <h4 className="font-semibold text-green-900 mb-1">Message Updated Successfully!</h4>
              <p className="text-sm text-green-800 mb-2">
                Your message has been written to the blockchain.
              </p>
              {chain && (
                <a
                  href={getExplorerUrl(txHash, chain.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-green-700 hover:text-green-900 underline flex items-center gap-1"
                >
                  View on Block Explorer
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Contract Info */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Contract: <code className="bg-gray-100 px-1 rounded font-mono">{CONTRACT_ADDRESS}</code>
        </p>
      </div>
    </div>
  );
}
