import { Box, Button } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { useAccount, useConnect, useDisconnect, useEnsName } from "wagmi";


export default function Layout({ children }: PropsWithChildren<{}>) {
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  
  return <Box height="100vh" pt={["72px", "72px", 0]}>
    <Box pos="fixed" top={0} left={0} width="100%" display="flex" p={4} justifyContent="flex-end">
      {isConnected && <Button onClick={() => disconnect()}>
        Disconnect
      </Button>}
      {!isConnected && <Button onClick={() => connect({ connector: connectors[0] })}>
        Connect Wallet
      </Button>}
    </Box>
    {children}
  </Box>
}