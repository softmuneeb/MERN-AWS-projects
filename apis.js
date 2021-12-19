import { ethNodeLink, getContractNft } from './smart-contracts.js';
import { getWeb3, log } from './utils.js';
import pkg from 'web3-utils';
const { fromWei } = pkg;

export const buyNft = async (mnemonic, nodeLink = ethNodeLink) => {
  const web3 = getWeb3(mnemonic, nodeLink);

  const contract = getContractNft({ web3 });
  const price = await contract.methods.itemPrice().call();

  const method = contract.methods.purchaseTokens(1);
  const from = (await web3.eth.getAccounts())[0];
  const balance = fromWei(await web3.eth.getBalance(from));

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

    log(`from ${from} msg ${msg}`);
    return;
  }

  try {
    await method
      .send(options)
      .once('transactionHash', tx =>
        log(
          `tx from:${from} bal:${balance}ETH price:${fromWei(
            price
          )}ETH tx:${tx}`
        )
      )
      .on(
        'confirmation',
        async (i, a) =>
          i === 0 &&
          log(
            `done tx from:${from} bal:${fromWei(
              await web3.eth.getBalance(from)
            )}ETH tokenId:${
              a.events.Transfer.returnValues.tokenId
            } gas:${fromWei(a.effectiveGasPrice, 'gwei')}gwei txFee:${fromWei(
              '' + a.cumulativeGasUsed * a.effectiveGasPrice
            )}ETH tx:${a.transactionHash}`
          )
      );
  } catch (e) {
    log(e.message);
  }
};
