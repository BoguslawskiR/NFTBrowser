import { Address } from "wagmi"

type Token = {
  id: number;
  collectionAddress: Address;
  tokenId: string;
  name: string;
  description: string | null;
  imageURI: string;
}

export type TokenResponse = {
  success: boolean;
  message: string | null;
  data: Token;
};