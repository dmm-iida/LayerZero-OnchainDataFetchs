import { BigNumber } from 'ethers';

export interface TransactionRecord {
  address: string;
  change: BigNumber;
  totalBalance: BigNumber;
  transactionHash: string;
  blockNumber: number;
}

export interface TransferEventArgs {
  from: string;
  to: string;
  value: string;
}
