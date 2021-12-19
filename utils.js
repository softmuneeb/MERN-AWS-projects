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
  // later improve: Sun Dec 19 2021 08:03:30 GMT+0500 (Pakistan Standard Time) done tx from: 0xc18E78C0F67A09ee43007579018b2Db091116B4C
  let date = ('' + new Date() + '').split('GMT')[0];
  text = date + text;
  console.log(text);
  appendFile('out.txt', text + '\n', e => e && console.log(e.message));
};
