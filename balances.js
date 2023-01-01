import Web3 from 'web3';
import wallet from '@truffle/hdwallet-provider';
import dotenv from 'dotenv';
dotenv.config();
const SERVICE_WALLETS_MNEMONIC = process.env.SERVICE_WALLETS_MNEMONIC;
const networkLinks = [
  'https://polygon-rpc.com',
  'https://polygon-mainnet.g.alchemy.com/v2/bLCZUf_rd7Y1TyyTWzRVtKP5rF9QCorl',
];
export const balances = async () => {
  const ethereum = new wallet({
    numberOfAddresses: 100,
    mnemonic: SERVICE_WALLETS_MNEMONIC,
    providerOrUrl: networkLinks[0],
    pollingInterval: 86400 * 20 * 1000, // this lines saves extra calls to infura or rpc end point
  });
  const web3 = new Web3(ethereum);
  for (let i = 0; i < 100; i++) {
    const user = ethereum.getAddress(i);
    const balance = await web3.eth.getBalance(user);
    console.log(`${user} -> ${Web3.utils.fromWei(balance)} MATIC`);
  }
  ethereum.engine.stop();
};
