import HDWalletProvider from '@truffle/hdwallet-provider';
import Web3 from 'web3';
import { appendFile } from 'fs';
import { ethNodeLink } from './smart-contracts.js';

export const getAccount = async mnemonic => {
  const ethereum = new HDWalletProvider(mnemonic, ethNodeLink);
  const web3 = new Web3(ethereum);
  const account = (await web3.eth.getAccounts())[0];
  log(`send eth to ${account}`);
  return account;
};

export const getWeb3 = (mnemonic, nodeLink = ethNodeLink) => {
  const ethereum = new HDWalletProvider(mnemonic, nodeLink);
  return new Web3(ethereum);
};

// option 1
// export const log = text => {
//   console.log(text);
// };

// option 2
export const log = text => {
  text = time() + text;
  // console.log(text);
  appendFile('out.txt', text + '\n', e => e && console.log(e.message));
};

export const time = () => ('' + new Date() + '').split('GMT')[0];
