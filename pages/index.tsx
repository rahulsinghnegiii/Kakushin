import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to Your Web3 Dashboard
            </h2>
            <p className="text-lg text-gray-600">
              Connect your wallet to view your information, interact with smart contracts, and manage your tokens
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Wallet Info Section - Placeholder */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Wallet Information
              </h3>
              <p className="text-gray-500">
                Connect your wallet to view your account details
              </p>
            </div>

            {/* Contract Interaction Section - Placeholder */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                MessageBoard Contract
              </h3>
              <p className="text-gray-500">
                Connect your wallet to interact with the smart contract
              </p>
            </div>
          </div>

          {/* Token Holdings Section - Placeholder */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Token Holdings
            </h3>
            <p className="text-gray-500">
              Your token balances will appear here
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
