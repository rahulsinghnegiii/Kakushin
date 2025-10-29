import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WalletInfo from '@/components/wallet/WalletInfo';
import MessageBoard from '@/components/contract/MessageBoard';
import TokenList from '@/components/tokens/TokenList';

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
            {/* Wallet Info Section */}
            <WalletInfo />

            {/* Contract Interaction Section */}
            <MessageBoard />
          </div>

          {/* Token Holdings Section */}
          <TokenList />
        </div>
      </main>

      <Footer />
    </div>
  );
}
