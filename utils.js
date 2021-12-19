import HDWalletProvider from '@truffle/hdwallet-provider';
import Web3 from 'web3';
import { appendFile } from 'fs';
export const getWeb3 = (mnemonic, ethNodeLink) => {
  const ethereum = new HDWalletProvider(mnemonic, ethNodeLink);
  return new Web3(ethereum);
};

// option 1
// export const log = text => {
//   console.log(text);
// };

// option 2
export const log = text => {
  text = time() + text;
  console.log(text);
  appendFile('out.txt', text + '\n', e => e && console.log(e.message));
};

export const time = () => ('' + new Date() + '').split('GMT')[0];
