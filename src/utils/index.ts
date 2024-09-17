import { Contract, BigNumber, utils } from 'ethers';
import { TransactionRecord, TransferEventArgs } from './types';
import { exportRecipientsToCSV, exportTransactionsToCSV } from './csv';
import * as fs from 'fs';
import * as path from 'path';

function ensureDirectoryExists(filePath: string) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  fs.mkdirSync(dirname, { recursive: true });
}

export async function collectAndSaveTransactions(
  initialBlock: number,
  finalBlock: number,
  blockStep: number,
  minimumTokens: number,
  chain: string,
  tokenContract: Contract,
  explorerUrl: string,
) {
  const changes: TransactionRecord[] = [];
  const baseDirectory = path.resolve(__dirname, '../../data', chain);

  for (
    let currentBlock = initialBlock;
    currentBlock < finalBlock;
    currentBlock += blockStep
  ) {
    const fromBlock = currentBlock;
    const toBlock = Math.min(currentBlock + blockStep, finalBlock);

    const filter = tokenContract.filters.Transfer(null, null);
    const events = await tokenContract.queryFilter(filter, fromBlock, toBlock);

    for (const event of events) {
      const args = event.args as unknown as TransferEventArgs;
      const from = args.from;
      const to = args.to;
      const value = BigNumber.from(args.value);
      const transactionHash = explorerUrl + event.transactionHash;
      const blockNumber = event.blockNumber;

      changes.push({
        address: from,
        change: BigNumber.from(0).sub(value),
        transactionHash,
        blockNumber,
      });
      changes.push({
        address: to,
        change: value,
        transactionHash,
        blockNumber,
      });
    }
  }

  const transferCsvPath = path.resolve(baseDirectory, 'transfer_txs.csv');
  ensureDirectoryExists(transferCsvPath);
  await exportTransactionsToCSV(changes, transferCsvPath);

  const filteredChanges = changes.filter(({ change }) =>
    change.gte(utils.parseUnits(minimumTokens.toString(), 18)),
  );

  const recipientsCsvPath = path.resolve(baseDirectory, 'recipients.csv');
  ensureDirectoryExists(recipientsCsvPath);
  await exportRecipientsToCSV(filteredChanges, recipientsCsvPath);
}
