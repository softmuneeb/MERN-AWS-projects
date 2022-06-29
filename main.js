// what this code do? 

// plan, steps to do

// code
const web3 = require('web3');

const getLastFromBlockToBlock = async (BLOCKCHAIN_URL, ABI, ADDRESS) => {
  const Web3 = new web3(BLOCKCHAIN_URL);
  const contract = new Web3.eth.Contract(JSON.parse(ABI), ADDRESS);

  const res = await contract.methods.getFromToBlock().call();
  const [lastFromBlock, lastToBlock] = [res[0] + '', res[1] + ''];

  console.log({ lastToBlock });
  return { lastFromBlock: Number(lastFromBlock), lastToBlock: Number(lastToBlock) };
};

const POLYGON_URL = 'https://matic-mumbai.chainstacklabs.com';
const ETH_DROP_ADDRESS = '0x204607E6b4497AA96E838BCFb4c180f2Bc7a191f';
const ETH_DROP_ABI =
  '[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"contractIERC20","name":"_token","type":"address"},{"internalType":"address[]","name":"_to","type":"address[]"},{"internalType":"uint256[]","name":"_values","type":"uint256[]"},{"internalType":"uint256","name":"_fromBlock","type":"uint256"},{"internalType":"uint256","name":"_toBlock","type":"uint256"}],"name":"airdropERC20","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getFromToBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]';

getLastFromBlockToBlock(POLYGON_URL, ETH_DROP_ABI, ETH_DROP_ADDRESS);