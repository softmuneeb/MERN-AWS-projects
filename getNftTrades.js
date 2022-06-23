// get the nft trades
import Web3 from 'web3';
const nftAddress = '0xf97cbb4b1f883f616fdb418e599b69e9d1a698de'; //dsop
const osAddress = '0x7Be8076f4EA4A4AD08075C2508e481d6C946D12b';
const blockchain_url = 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';
const nftAbi = JSON.parse(
  '[{ "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "Transfer", "type": "event" }]',
);

const web3 = new Web3(blockchain_url);
const config = {
  fromBlock: 0,
  toBlock: 1450000000,
};
const contract = new web3.eth.Contract(nftAbi, nftAddress);
const selectedEvents = await contract.getPastEvents('Transfer', config);
console.log(JSON.stringify(selectedEvents));
