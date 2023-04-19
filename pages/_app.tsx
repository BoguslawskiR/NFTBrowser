import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider } from '@chakra-ui/react'
import { configureChains, createClient, goerli, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

const client = new QueryClient();

const { provider, webSocketProvider } = configureChains(
  [goerli],
  [publicProvider()],
);

const connector = new MetaMaskConnector();

const wagmiClient = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
  connectors: [connector]
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return <QueryClientProvider client={client}>
    <WagmiConfig client={wagmiClient}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </WagmiConfig>
  </QueryClientProvider>
}