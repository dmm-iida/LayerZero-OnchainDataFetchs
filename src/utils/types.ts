import { BigNumber } from 'ethers';

// types.ts
export interface TransactionRecord {
  address: string;
  change: BigNumber;
  transactionHash: string;
  blockNumber: number;
}

export interface TransferEventArgs {
  from: string;
  to: string;
  value: string;
}
