import pkg from 'web3-utils';
import { ethNodeLink, getContractNft } from './smart-contracts.js';
import { days, getAccount, getWeb3, log, seconds, sleep } from './utils.js';
const { fromWei } = pkg;

export const buyNft = async (
  mnemonic,
  nextMnemonic,
  accountId, // 1,2,3...
  nodeLink = ethNodeLink
) => {
  const web3 = getWeb3(mnemonic, nodeLink),
    contract = getContractNft({ web3 }),
    price = await contract.methods.itemPrice().call(),
    priceEth = fromWei(price),
    method = contract.methods.purchaseTokens(1),
    from = (await web3.eth.getAccounts())[0],
    balance = fromWei(await web3.eth.getBalance(from));

  // estimateGas
  // todo gasPrice for mainnet
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
    let msg = null;
    try {
      msg = JSON.parse(e.message.split('\n').splice(1).join('\n')).message;
    } catch (e) {}

    if (!msg) msg = 'Insufficient funds or some data error';
    else msg = msg.split('reverted:')[1];

    log(
      `nft buy tx err from acc[${accountId}] ${from} bal:${balance}ETH msg ${msg}`
    );
    return;
  }

  const txNftSend = await method.send(options);

  log(
    `nft buy tx sent from acc[${accountId}]:${from} bal:${balance}ETH price:${priceEth}ETH tx:${txNftSend.transactionHash}`
  );

  let txReceipt = null;
  while (txReceipt === null) {
    txReceipt = await web3.eth.getTransactionReceipt(txNftSend.transactionHash);
    log('nft buy tx wait ' + txReceipt.status);
    await sleep(1 * seconds);
  }

  {
    const bal = await web3.eth.getBalance(from),
      balEth = fromWei(bal),
      a = txNftSend,
      tokenId = a.events.Transfer.returnValues.tokenId,
      gas = a.effectiveGasPrice,
      gasEth = fromWei(gas, 'gwei'),
      txFee = fromWei('' + a.cumulativeGasUsed * a.effectiveGasPrice),
      txHash = a.transactionHash;

    log(
      `done nft buy tx from acc[${accountId}]:${from} bal:${balEth}ETH tokenId:${tokenId} gas:${gasEth}gwei txFee:${txFee}ETH tx:${txHash}`
    );

    // todo gasPrice for mainnet
    const gasValue = 21000 * gas; // regular account gas is 21K always
    const valueToSend = bal - gasValue - 1000000; // can be improved later

    const tx = await web3.eth.sendTransaction({
      from,
      to: await getAccount(nextMnemonic),
      value: valueToSend
    });

    log(
      `eth send tx sent from acc[${accountId}]:${from} bal:${balance}ETH tx:${tx.transactionHash}`
    );

    txReceipt = null;
    while (txReceipt === null) {
      txReceipt = await web3.eth.getTransactionReceipt(tx.transactionHash);
      log('send eth tx wait ' + txReceipt.status);
      await sleep(1 * seconds);
    }

    {
      const bal = fromWei(await web3.eth.getBalance(from)),
        gas = fromWei(a.effectiveGasPrice, 'gwei'),
        txFee = fromWei('' + a.cumulativeGasUsed * a.effectiveGasPrice);

      log(
        `done eth send tx from acc[${accountId}]:${from} bal:${bal}ETH gas:${gas}gwei txFee:${txFee}ETH tx:${a.transactionHash}`
      );
    }
  }
};
