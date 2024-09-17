import { TransactionRecord } from './types';
import * as fs from 'fs';
import { stringify } from 'csv-stringify';
import { ethers } from 'ethers';

export async function exportTransactionsToCSV(
  records: TransactionRecord[],
  filePath: string,
) {
  const csvRecords = records.map(
    ({ address, change, transactionHash, blockNumber }) => ({
      Address: address,
      Change: change.toString(),
      TransactionHash: transactionHash,
      BlockNumber: blockNumber,
    }),
  );

  stringify(
    csvRecords,
    {
      header: true,
      columns: {
        Address: 'Address',
        Change: 'Change',
        TransactionHash: 'Transaction Hash',
        BlockNumber: 'Block Number',
      },
    },
    (err, output) => {
      if (err) {
        console.error('Error while stringifying CSV:', err);
        return;
      }
      fs.writeFile(filePath, output, (err) => {
        if (err) {
          console.error('Error while writing CSV file:', err);
          return;
        }
        console.log(`Saved to ${filePath}`);
      });
    },
  );
}

export async function exportRecipientsToCSV(
  records: TransactionRecord[],
  filePath: string,
) {
  const csvRecords = records.map(({ address, change }) => ({
    Address: address,
    Balance: ethers.utils.formatUnits(change),
  }));

  stringify(
    csvRecords,
    {
      header: true,
      columns: {
        Address: 'Address',
        Balance: 'Balance',
      },
    },
    (err, output) => {
      if (err) {
        console.error('Error while stringifying CSV:', err);
        return;
      }
      fs.writeFile(filePath, output, (err) => {
        if (err) {
          console.error('Error while writing CSV file:', err);
          return;
        }
        console.log(`Saved to ${filePath}`);
      });
    },
  );
}
