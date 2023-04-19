import { useState } from "react";
import { Address, erc721ABI, useAccount, useContractRead } from "wagmi";
import { Text } from "@chakra-ui/react";
import { BigNumber } from "ethers";

interface Props {
  assetAddress?: Address;
  tokenId?: string;
}

export default function OwnerIndicator({ assetAddress, tokenId }: Props) {
  const { isConnected, address } = useAccount();
  const [isOwner, setIsOwner] = useState(false);

  useContractRead({
    address: assetAddress,
    abi: erc721ABI,
    functionName: "ownerOf",
    args: [BigNumber.from(tokenId ?? '0')],
    enabled: !!assetAddress && !!tokenId,
    onSuccess(data) {
      if (data) {
        console.log(data);
        setIsOwner(data === address);
      }
    },
  });

  if (!isConnected) return <Text>Please connect wallet</Text>;
  if (isOwner) return <Text>You are an owner of asset!</Text>
  if (!isOwner) return <Text>This asset not belongs to connected wallet</Text>
  return null;
};