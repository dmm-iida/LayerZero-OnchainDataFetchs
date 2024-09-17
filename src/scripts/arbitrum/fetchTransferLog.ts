import { Contract, providers } from 'ethers';
import { abi, tokenAddress } from '../../utils/constant';
import { collectAndSaveTransactions } from '../../utils';

const chain = 'arbitrum-mainnet';
const providerUrl = 'https://arb1.arbitrum.io/rpc';
const explorerUrl = 'https://arbiscan.io/tx/';
const provider = new providers.JsonRpcProvider(providerUrl);
const tokenContract = new Contract(tokenAddress, abi, provider);

const initialBlock = 236960509;
const finalBlock = 236965345;
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
