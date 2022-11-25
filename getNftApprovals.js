// get the events of any sc smart contract

import Web3 from 'web3';
const scAddress = '0xab024c1e12c778c03a487b30bab0dddd540ffb16';
const infuraLink = 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';
const scAbi = JSON.parse(
  '[ { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "PurchasedClaimSpot", "type": "event" }, { "inputs": [], "name": "claimSpotMintActiveTime", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "claimSpotsBoughtBy", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "claimSpotsSold", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "claimSpotsToSell", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "costPerClaim", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "maxMintClaimSpotAmount", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_mintAmount", "type": "uint256" } ], "name": "purchaseClaimSpot", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_claimSpotMintActiveTime", "type": "uint256" } ], "name": "setClaimSpotMintActiveTime", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_claimSpotsToSell", "type": "uint256" } ], "name": "setClaimSpotsToSell", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_costPerClaim", "type": "uint256" } ], "name": "setCostPerClaim", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_maxMintClaimSpotAmount", "type": "uint256" } ], "name": "setMaxMintClaimSpotAmount", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" } ]',
);
const web3 = new Web3(infuraLink);

const events = await new web3.eth.Contract(scAbi, scAddress).getPastEvents('PurchasedClaimSpot', {
  fromBlock: 0,
  toBlock: 9999999999,
});

for (let i = 0; i < events.length; i++) {
  const e = events[i];
  const element = e.returnValues;
  console.log({ element });
}
