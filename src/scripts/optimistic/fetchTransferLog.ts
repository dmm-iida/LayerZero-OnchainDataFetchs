import { Contract, providers } from 'ethers';
import { abi, tokenAddress } from '../../utils/constant';
import { collectAndSaveTransactions } from '../../utils';

const chain = 'optimism-mainnet';
const providerUrl = 'https://mainnet.optimism.io';
const explorerUrl = 'https://optimistic.etherscan.io/tx/';
const provider = new providers.JsonRpcProvider(providerUrl);
const tokenContract = new Contract(tokenAddress, abi, provider);

const initialBlock = 125454039;
const finalBlock = 125478575;
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
