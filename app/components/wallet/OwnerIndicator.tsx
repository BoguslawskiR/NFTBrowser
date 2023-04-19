import { useState } from "react";
import { Address, useAccount, useContractRead } from "wagmi";
import { parseFixed } from '@ethersproject/bignumber';
import { Text } from "@chakra-ui/react";

interface Props {
  assetAddress?: Address;
  tokenId?: string;
}

export default function OwnerIndicator({ assetAddress, tokenId }: Props) {
  const { isConnected, address } = useAccount();
  const [isOwner, setIsOwner] = useState(false);

  useContractRead({
    address: assetAddress,
    abi: [
      {
        "inputs":
          [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
        "name": "ownerOf",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ],
    functionName: "ownerOf",
    args: [parseFixed(tokenId ?? '0', 18)],
    enabled: !!assetAddress && !!tokenId,
    onSuccess(data) {
      if (data) {
        setIsOwner(data === address);
      }
    },
  });

  if (!isConnected) return <Text>Please connect wallet</Text>;
  if (isOwner) return <Text>You are an owner of asset!</Text>
  if (!isOwner) return <Text>This asset not belongs to connected wallet</Text>
  return null;
};