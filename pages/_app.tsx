import '@/styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';

import type { AppProps } from 'next/app';
import { WagmiProvider } from 'wagmi';
import { sepolia, polygonMumbai } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { WALLETCONNECT_PROJECT_ID } from '@/lib/constants';

// Configure chains
const chains = [sepolia, polygonMumbai] as const;

// Create Wagmi config
const config = getDefaultConfig({
  appName: 'Web3 Wallet Dashboard',
  projectId: WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  chains,
  ssr: true,
});

// Create React Query client
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
