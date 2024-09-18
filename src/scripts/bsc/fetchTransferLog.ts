import { Contract, providers } from 'ethers';
import { abi, tokenAddress } from '../../utilities/constant';
import { collectAndSaveTransactions } from '../../services';

const chain = 'bsc-mainnet';
const providerUrl = `https://bsc-mainnet.nodereal.io/v1/64a9df0874fb4a93b9d0a3849de012d3`;
const explorerUrl = 'https://bscscan.com/tx/';
const provider = new providers.JsonRpcProvider(providerUrl);
const tokenContract = new Contract(tokenAddress, abi, provider);

const initialBlock = 39775749;
const finalBlock = 39776034;
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
