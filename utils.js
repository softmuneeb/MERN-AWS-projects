import HDWalletProvider from '@truffle/hdwallet-provider';
import Web3 from 'web3';

export const getWeb3 = (mnemonic, ethNodeLink) => {
  const ethereum = new HDWalletProvider(mnemonic, ethNodeLink);
  return new Web3(ethereum);
};

