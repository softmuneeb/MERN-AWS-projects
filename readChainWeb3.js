// detect events
import Web3 from 'web3';

const networkLink = 'https://cloudflare-eth.com/';
const tx = '0x95c408177e7fb5ac3081bcadf5107d7079469f5976bfb0cfa5f5698a2f6b4c74';

// const networkLink = 'https://bsc-dataseed1.binance.org/';
// const tx = '0x5493449e41fb023f157a586c5da41b1a2f5e2f39f304be4abca13bba66159046';

const web3 = new Web3(networkLink);

const txData = await web3.eth.getTransactionReceipt(tx); // TODO: test wrong tx data?
console.log(JSON.stringify(txData));

const depositedAmount = parseInt(
  Web3.utils.fromWei(txData.logs[0].data, 'nano'),
);
console.log(depositedAmount);
