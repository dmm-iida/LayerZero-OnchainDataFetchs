import { ethers } from 'ethers';

// types.ts
export interface TransactionRecord {
  address: string;
  change: ethers.BigNumber;
  transactionHash: string;
  blockNumber: number; // ブロック番号を追加
}

export interface TransferEventArgs {
  from: string;
  to: string;
  value: string;
}
