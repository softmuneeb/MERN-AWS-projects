import { getContractNft } from './smart-contracts.js';
import { getWeb3, log } from './utils.js';

export const buyNft = async (mnemonic, ethNodeLink) => {
  const web3 = getWeb3(mnemonic, ethNodeLink);

  const contract = getContractNft({ web3 });
  const price = await contract.methods.itemPrice().call();

  const method = contract.methods.purchaseTokens(1);
  const from = (await web3.eth.getAccounts())[0];

  let options = {
    from,
    gas: '0',
    value: price
    // gasPrice...
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

    log(msg);
    return;
  }

  try {
    await method
      .send(options)
      .once('transactionHash', tx => log('from: ' + from + ' tx: ' + tx))
      .on('confirmation', i => i === 0 && log('done tx from: ' + from));
  } catch (e) {
    log(e.message);
  }
};
