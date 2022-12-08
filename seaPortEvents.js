// detect events

// user inputs
const token0 = ""
const token1 = ""

// web3 setup
import Web3 from 'web3';
const infuraLink = 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';
const web3 = new Web3(infuraLink);

// FACTORY contract settings
const factoryAddress = '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f';
const factoryAbi = JSON.parse(
  '[{"inputs":[{"internalType":"address","name":"_feeToSetter","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token0","type":"address"},{"indexed":true,"internalType":"address","name":"token1","type":"address"},{"indexed":false,"internalType":"address","name":"pair","type":"address"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"}],"name":"PairCreated","type":"event"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"allPairs","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"allPairsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"}],"name":"createPair","outputs":[{"internalType":"address","name":"pair","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"feeTo","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"feeToSetter","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"getPair","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_feeTo","type":"address"}],"name":"setFeeTo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_feeToSetter","type":"address"}],"name":"setFeeToSetter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]',
);
const factory = new web3.eth.Contract(factoryAbi, factoryAddress);

// PAIR contract settings
const pairAddress = await factory.methods.getPair(token0, token1).call();
console.log({ pairAddress });
const pairAbi = JSON.parse(
''
);
const pair = new web3.eth.Contract(pairAbi, pairAddress);

// get pair contract events
const previousEventsPair = await pair.getPastEvents('Mint', {
  fromBlock: 15873322,
  toBlock: 15873422,
});
console.log('previousEventsPair', JSON.stringify(previousEventsPair, null, 4));

// get factory contract events
// const previousEvents = await factory.getPastEvents('PairCreated', {
//   fromBlock: 15873322,
//   toBlock: 15873422,
// });
// console.log('previousEvents', JSON.stringify(previousEvents, null, 4));