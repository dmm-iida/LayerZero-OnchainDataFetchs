import { Contract, providers } from 'ethers';
import { abi, tokenAddress } from '../../utilities/constant';
import { collectAndSaveTransactions } from '../../services';

const chain = 'base-mainnet';
const providerUrl = 'https://base.api.onfinality.io/public';
const explorerUrl = 'https://basescan.org/tx/';
const provider = new providers.JsonRpcProvider(providerUrl);
const tokenContract = new Contract(tokenAddress, abi, provider);

const initialBlock = 17853165;
const finalBlock = 17853166;
const blockStep = 1000;

async function main() {
  try {
    await collectAndSaveTransactions(
      initialBlock,
      finalBlock,
      blockStep,
      250,
      chain,
      tokenContract,
      explorerUrl,
    );
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
