import { Contract, providers } from 'ethers';
import { abi, infuraApiKey, tokenAddress } from '../../utils/constant';
import { collectAndSaveTransactions } from '../../utils';

const chain = 'mainnet';
const providerUrl = `https://${chain}.infura.io/v3/` + infuraApiKey;
const explorerUrl = 'https://etherscan.io/tx/';
const provider = new providers.JsonRpcProvider(providerUrl);
const tokenContract = new Contract(tokenAddress, abi, provider);

const initialBlock = 20019360;
const finalBlock = 20020360;
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
