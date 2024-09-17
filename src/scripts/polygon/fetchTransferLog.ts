import { Contract, providers } from 'ethers';
import { abi, infuraApiKey, tokenAddress } from '../../utils/constant';
import { collectAndSaveTransactions } from '../../utils';

const chain = 'polygon-mainnet';
const providerUrl = `https://${chain}.infura.io/v3/` + infuraApiKey;
const explorerUrl = 'https://polygonscan.com/tx/';
const provider = new providers.JsonRpcProvider(providerUrl);
const tokenContract = new Contract(tokenAddress, abi, provider);

const initialBlock = 58388422;
const finalBlock = 58388811;
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
