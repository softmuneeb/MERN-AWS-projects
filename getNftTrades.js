// get the nft trades
import Web3 from 'web3';
const nftAddress = '0xed5af388653567af2f388e6224dc7c4b3241c544';
const osAddress = '0x7Be8076f4EA4A4AD08075C2508e481d6C946D12b';
const blockchain_url = 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';
const osAbi = JSON.parse(
  '[{"anonymous":false,"inputs":[{"indexed":false,"name":"buyHash","type":"bytes32"},{"indexed":false,"name":"sellHash","type":"bytes32"},{"indexed":true,"name":"maker","type":"address"},{"indexed":true,"name":"taker","type":"address"},{"indexed":false,"name":"price","type":"uint256"},{"indexed":true,"name":"metadata","type":"bytes32"}],"name":"OrdersMatched","type":"event"}]',
);

const web3 = new Web3(blockchain_url);
const config = {
  fromBlock: 14000000,
  toBlock: 14000001,
  //   filter: {},
};
const contract = new web3.eth.Contract(osAbi, osAddress);
const selectedEvents = await contract.getPastEvents('OrdersMatched', config);
console.log(JSON.stringify(selectedEvents));
