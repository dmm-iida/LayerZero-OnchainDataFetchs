import { TransactionRecord } from '../types';
import * as fs from 'fs';
import { stringify } from 'csv-stringify';
import { utils } from 'ethers';

export async function exportTransactionsToCSV(
  records: TransactionRecord[],
  filePath: string,
) {
  const csvRecords = records.map(
    ({ address, change, totalBalance, transactionHash, blockNumber }) => ({
      Address: address,
      Change: utils.formatUnits(change, 18),
      TotalBalance: totalBalance ? utils.formatUnits(totalBalance, 18) : '0', // format BigNumbers
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
        TotalBalance: 'Total Balance',
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
    Balance: utils.formatUnits(change),
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
