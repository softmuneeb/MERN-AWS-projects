import w from "web3-utils";
import { chainIdName, ethNodeLink, getContractNft } from "./smart-contracts.js";
import { getAccount, getWeb3, log, log2, random, seconds, sleep } from "./utils.js";
import axios from "axios";

const fromWei = (a) => w.fromWei("" + a);
const toWei = (a) => w.toWei("" + a);

export const buyNft = async (
  mnemonic,
  nextMnemonic,
  accountId, // 1,2,3...
  nodeLink = ethNodeLink,
) => {
  const web3 = getWeb3(mnemonic, nodeLink),
    contract = getContractNft({ web3 }),
    quantity = random(3, 6),
    price = quantity * (await contract.methods.itemPrice().call()),
    priceEth = fromWei(price),
    method = contract.methods.purchaseTokens(quantity),
    from = (await web3.eth.getAccounts())[0],
    balance = fromWei(await web3.eth.getBalance(from));

  const gasPrice = (await axios.get('https://etherchain.org/api/gasnow')).data.data.rapid; //rapid, fast, standard, slow
  log('gasPrice ' + fromWei(gasPrice, 'gwei') + 'gwei');

  let options = {
    from,
    gas: '0',
    value: price,
  };

  if (chainIdName === 'Mainnet') options = { ...options, gasPrice };

  try {
    options = {
      ...options,
      gas: '' + Math.floor(1.2 * Math.trunc(await method.estimateGas(options))),
    };
  } catch (e) {
    let msg = null;
    try {
      log2(e.message);
      msg = JSON.parse(e.message.split('\n').splice(1).join('\n')).message;
    } catch (e) {}

    if (!msg) msg = 'Insufficient funds or some data error';
    else msg = msg.split('reverted:')[1];

    log(`nft buy tx err from acc[${accountId}] ${from} bal:${balance}ETH msg ${msg}`);
    return;
  }

  let txNftSend;
  try {
    txNftSend = await method.send(options);
  } catch (e) {
    e && console.log(e.message);
    return;
  }

  log(`nft buy tx sent from acc[${accountId}]:${from} bal:${balance}ETH price:${priceEth}ETH tx:${txNftSend.transactionHash}`);

  let txReceipt = null;
  while (txReceipt === null) {
    txReceipt = await web3.eth.getTransactionReceipt(txNftSend.transactionHash);
    log('nft buy tx wait ' + txReceipt.status);
    await sleep(1 * seconds);
  }

  {
    const bal = await web3.eth.getBalance(from),
      balEth = fromWei(bal),
      a = txNftSend;

    let tokenId,
      toTokenId = null;

    try {
      tokenId = a.events.Transfer.returnValues.tokenId;
    } catch (e) {
      tokenId = a.events.Transfer[0].returnValues.tokenId;
      toTokenId = Number(tokenId) + a.events.Transfer.length - 1;
    }

    const gasPriceInNftBuy = a.effectiveGasPrice,
      gasGwei = fromWei(gasPriceInNftBuy, 'gwei'),
      txFee = fromWei('' + a.gasUsed * a.effectiveGasPrice),
      txHash = a.transactionHash;

    let buyMsg;

    if (toTokenId)
      buyMsg = `done nft buy tx from acc[${accountId}]:${from} bal:${balEth}ETH tokenId:${tokenId} to ${toTokenId} gasPrice:${gasGwei}gwei txFee:${txFee}ETH tx: ${txHash}`;
    else buyMsg = `done nft buy tx from acc[${accountId}]:${from} bal:${balEth}ETH tokenId:${tokenId} gasPrice:${gasGwei}gwei txFee:${txFee}ETH tx: ${txHash}`;

    log(buyMsg);
    log2(buyMsg);

    let gasPriceSendEth = chainIdName === 'Mainnet' ? (await axios.get('https://etherchain.org/api/gasnow')).data.data.rapid : gasPriceInNftBuy;
    const txFeeSendEth = 21000 * gasPriceSendEth; // regular account gas is 21K always
    const valueToSend = bal - txFeeSendEth - 10000; // can be improved later

    const txEthSend = await web3.eth.sendTransaction({
      from,
      to: await getAccount(nextMnemonic),
      value: valueToSend,
      gas: 21000,
      gasPrice: gasPriceInNftBuy,
    });

    log(`eth send tx sent from acc[${accountId}]:${from} bal:${balance}ETH tx:${txEthSend.transactionHash}`);

    txReceipt = null;
    while (txReceipt === null) {
      txReceipt = await web3.eth.getTransactionReceipt(txEthSend.transactionHash);
      log('send eth tx wait ' + txReceipt.status);
      await sleep(1 * seconds);
    }

    {
      const bal = fromWei(await web3.eth.getBalance(from)),
        gas = fromWei(a.effectiveGasPrice, 'gwei'),
        txFee = fromWei('' + a.gasUsed * a.effectiveGasPrice);

      log(`done eth send tx from acc[${accountId}]:${from} bal:${bal}ETH gasPrice:${gas}gwei txFee:${txFee}ETH tx:${txEthSend.transactionHash}`);
    }
  }
};
