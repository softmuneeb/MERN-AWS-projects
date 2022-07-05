import HDWalletProvider from '@truffle/hdwallet-provider';
import Web3 from 'web3';
import { appendFile } from 'fs';
import { chainIdName, ethNodeLink } from './smart-contracts.js';

// npx ganache-cli -a 1000 -m "the mnemonic is here" > secret.txt

export const getAccount = async (mnemonic) => {
  const ethereum = new HDWalletProvider({
    privateKeys: [mnemonic],
    providerOrUrl: nodeLink,
    pollingInterval: 86400 * 20 * 1000, // sync every 20 days
  });
  const web3 = new Web3(ethereum);
  const account = (await web3.eth.getAccounts())[0];
  log(`send eth to ${account}`);
  return account;
};

export const getWeb3 = (mnemonic, nodeLink = ethNodeLink) => {
  const ethereum = new HDWalletProvider({
    privateKeys: [mnemonic],
    providerOrUrl: nodeLink,
    pollingInterval: 86400 * 20 * 1000, // sync every 20 days
  });
  return new Web3(ethereum);
};

// option 1
// export const log = text => {
//   console.log(text);
// };

// option 2
export const log = (text, newLinesBefore = 0) => {
  text = time() + text;
  for (let i = 0; i < newLinesBefore; i++) text = '\n' + text;
  // console.log(text);
  appendFile(chainIdName === 'Mainnet' ? 'outMain.txt' : 'out.txt', text + '\n', (e) => e && console.log(e.message));
};
export const log2 = (text, newLinesBefore = 0) => {
  text = time() + text;
  for (let i = 0; i < newLinesBefore; i++) text = '\n' + text;
  console.log(text);
  appendFile(chainIdName === 'Mainnet' ? 'outMainBought.txt' : 'outBought.txt', text + '\n', (e) => e && console.log(e.message));
};

export const time = () => ('' + new Date() + '').split('GMT')[0];
export const seconds = 1000;
export const minutes = 60;
export const days = 86400;

export function isSuccessfulTransaction(receipt) {
  if (receipt.status == '0x1' || receipt.status == 1) {
    return true;
  } else {
    return false;
  }
}

export const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
