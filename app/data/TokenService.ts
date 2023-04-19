import { TokenResponse } from "../types/token";
import axios from './api';

const SERVICE_KEY = 'TOKEN';

export const TokenServiceKeys = {
  getTokenById: (address?: string, tokenId?: string) => [SERVICE_KEY, 'token', address, tokenId],
};

export const TokenService = {
  getTokenById: async (address?: string, tokenId?: string) => {
    const response = await axios.get<TokenResponse>(`/v1/tokens?collection=${address}&tokenId=${tokenId}`)
    return response.data;
  },
};