import { Contract, providers } from 'ethers';
import { abi, infuraApiKey, tokenAddress } from '../../utilities/constant';
import { collectAndSaveTransactions } from '../../services';

const chain = 'mainnet';
const providerUrl = `https://${chain}.infura.io/v3/` + infuraApiKey;
const explorerUrl = 'https://etherscan.io/tx/';
const provider = new providers.JsonRpcProvider(providerUrl);
const tokenContract = new Contract(tokenAddress, abi, provider);

const initialBlock = 20126956;
const finalBlock = 20136598;
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
