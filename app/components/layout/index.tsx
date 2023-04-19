import { Box, Button } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { mainnet, useAccount, useConnect, useDisconnect, useNetwork, useSwitchNetwork } from "wagmi";


export default function Layout({ children }: PropsWithChildren<{}>) {
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();
  const { switchNetwork, chains } = useSwitchNetwork();

  return <Box height="100vh" pt={["72px", "72px", 0]}>
    <Box pos="fixed" top={0} left={0} width="100%" display="flex" p={4} justifyContent="flex-end">
      {isConnected && <Box display="flex" gap={2}>
        <Button onClick={() => disconnect()}>
          Disconnect
        </Button>
        {chain?.id !== mainnet.id && <Button onClick={() => { switchNetwork?.(mainnet.id) }}>Switch Network</Button>}
      </Box>}
      {!isConnected && <Button onClick={() => connect({ connector: connectors[0], chainId: mainnet.id })}>
        Connect Wallet
      </Button>}
    </Box>
    {children}
  </Box>
}