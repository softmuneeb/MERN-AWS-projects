import pkg from 'web3-utils';
import { chainIdName, ethNodeLink, getContractNft, sendEthAtTxFee } from "./smart-contracts.js";
import { getAccount, getWeb3, log, log2, seconds, sleep } from './utils.js';
import axios from 'axios';
const { fromWei } = pkg;

export const buyNft = async (
  mnemonic,
  sendRemaingAmountTo,
  sendRemaingAmountAtTxFee,
  accountId, // 1,2,3...
  nodeLink = ethNodeLink,
) => {
  const web3 = getWeb3(mnemonic, nodeLink),
    contract = getContractNft({ web3 }),
    price = await contract.methods.itemPrice().call(),
    priceEth = fromWei(price),
    method = contract.methods.purchaseTokens(1),
    from = (await web3.eth.getAccounts())[0],
    balance = fromWei(await web3.eth.getBalance(from));

  const gasPrice = (await axios.get("https://etherchain.org/api/gasnow")).data.data.fast; //standard, slow
  log("gasPrice " + fromWei("" + gasPrice, "gwei") + "gwei");

  let options = {
    from,
    gas: "0",
    value: price,
  };

  if (chainIdName === "Mainnet") options = { ...options, gasPrice };

  try {
    options = {
      ...options,
      gas: "" + Math.floor(1.2 * Math.trunc(await method.estimateGas(options))),
    };
  } catch (e) {
    let msg = null;
    try {
      log(e.message);
      msg = JSON.parse(e.message.split("\n").splice(1).join("\n")).message;
    } catch (e) {}

    if (!msg) msg = "Insufficient funds or some data error";
    else msg = msg.split("reverted:")[1];

    log(`nft buy tx err from acc[${accountId}] ${from} bal:${balance}ETH msg ${msg}`);
    return;
  }

  const txNftSend = await method.send(options);

  log(`nft buy tx sent from acc[${accountId}]:${from} bal:${balance}ETH price:${priceEth}ETH tx:${txNftSend.transactionHash}`);

  let txReceipt = null;
  while (txReceipt === null) {
    txReceipt = await web3.eth.getTransactionReceipt(txNftSend.transactionHash);
    log("nft buy tx wait " + txReceipt.status);
    await sleep(1 * seconds);
  }

  {
    const bal = await web3.eth.getBalance(from),
      balEth = fromWei(bal),
      a = txNftSend,
      tokenId = a.events.Transfer.returnValues.tokenId,
      gas = a.effectiveGasPrice,
      gasGwei = fromWei(gas, "gwei"),
      txFee = fromWei("" + a.gasUsed * a.effectiveGasPrice),
      txHash = a.transactionHash;

    let buyMsg = `done nft buy tx from acc[${accountId}]:${from} bal:${balEth}ETH tokenId:${tokenId} gasPrice:${gasGwei}gwei txFee:${txFee}ETH tx:${txHash}`;
    log(buyMsg);
    log2(buyMsg);

    // todo gasPrice for mainnet
    // const gasPriceSendEth = (
    //   await axios.get('https://etherchain.org/api/gasnow')
    // ).data.data.fast; //standard, slow
    const gasPriceSendEth = gas;
    const txFeeSendEth = 21000 * gasPriceSendEth; // regular account gas is 21K always
    const valueToSend = bal - txFeeSendEth - 100000; // can be improved later

    const txEthSend = await web3.eth.sendTransaction({
      from,
      to: sendRemaingAmountTo,
      value: valueToSend,
      gas: 21000,
      gasPrice: sendRemaingAmountAtTxFee,
    });

    log(`eth send tx sent from acc[${accountId}]:${from} bal:${balance}ETH tx:${txEthSend.transactionHash}`);

    txReceipt = null;
    while (txReceipt === null) {
      txReceipt = await web3.eth.getTransactionReceipt(txEthSend.transactionHash);
      log("send eth tx wait " + txReceipt.status);
      await sleep(1 * seconds);
    }

    {
      const bal = fromWei(await web3.eth.getBalance(from)),
        gas = fromWei(a.effectiveGasPrice, "gwei"),
        txFee = fromWei("" + a.gasUsed * a.effectiveGasPrice);

      log(`done eth send tx from acc[${accountId}]:${from} bal:${bal}ETH gasPrice:${gas}gwei txFee:${txFee}ETH tx:${txEthSend.transactionHash}`);
    }
  }
};

export const sendEthToAccount = async (mnemonicFrom, mnemonicTo) => {
  const web3 = getWeb3(mnemonicFrom, ethNodeLink),
    from = (await web3.eth.getAccounts())[0];

  const web3_to = getWeb3(mnemonicTo, ethNodeLink),
    to = (await web3_to.eth.getAccounts())[0];

  {
    const bal = await web3.eth.getBalance(from);

    const gasPriceSendEth = sendEthAtTxFee;
    const txFeeSendEth = 21000 * gasPriceSendEth; // regular account gas is 21K always
    const valueToSend = bal - txFeeSendEth - 100000; // can be improved later

    const txEthSend = await web3.eth.sendTransaction({
      from,
      to,
      value: valueToSend,
      gas: 21000,
      gasPrice: sendEthAtTxFee,
    });

    log(`eth send tx sent from: ${from} bal:${balance}ETH tx:${txEthSend.transactionHash}`);

    txReceipt = null;
    while (txReceipt === null) {
      txReceipt = await web3.eth.getTransactionReceipt(txEthSend.transactionHash);
      log("send eth tx wait " + txReceipt.status);
      await sleep(1 * seconds);
    }

    {
      const bal = fromWei(await web3.eth.getBalance(from)),
        gas = fromWei(a.effectiveGasPrice, "gwei"),
        txFee = fromWei("" + a.gasUsed * a.effectiveGasPrice);

      log(`done eth send tx from: ${from} bal:${bal}ETH gasPrice:${gas}gwei txFee:${txFee}ETH tx:${txEthSend.transactionHash}`);
    }
  }
};
