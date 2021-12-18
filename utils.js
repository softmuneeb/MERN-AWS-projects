import { getContractNft } from './smart-contracts.js';
import HDWalletProvider from '@truffle/hdwallet-provider';
import Web3 from 'web3';

export const getWeb3 = (mnemonic, ethNodeLink) => {
  const ethereum = new HDWalletProvider(mnemonic, ethNodeLink);
  return new Web3(ethereum);
};

export const buyNft = async (mnemonic, ethNodeLink) => {
  const web3 = getWeb3(mnemonic, ethNodeLink);
  console.log('web3 ', await web3.eth.getAccounts());
  return;

  const contract = getContractNft({ web3 });
  const price = await contract.methods.itemPrice().call();

  const method = contract.methods.createMarketSale(nftContract, itemId);

  let options = {
    from: account,
    gas: '0',
    value: price
  };

  try {
    options = {
      ...options,
      gas: '' + Math.trunc(await method.estimateGas(options))
    };
  } catch (e) {
    let msg = JSON.parse(e.message.split('\n').splice(1).join('\n')).message;

    if (!msg) msg = 'Insufficient funds or some data error';
    else msg = msg.split('reverted:')[1];

    console.log(msg);
    return;
  }

  try {
    await method
      .send(options)
      .on('confirmation', i => i === 0 && console.log('done'));
  } catch (e) {
    console.log(e.message);
  }
};
