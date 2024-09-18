require('dotenv').config();
export const abi = [
  'event Transfer(address indexed from, address indexed to, uint256 value)',
];
export const tokenAddress = process.env.TOKEN_ADDRESS || '';

export const infuraApiKey = process.env.INFURA_API_KEY || '';
