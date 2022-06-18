// get the minters of Avian Avatars Nft and get their Details from Api and save in CSV file

// config
const nftAddress = '0x18613D38367ddE6522D36f3546b9777880d88cA3'; // "0xF97Cbb4B1f883F616fdB418E599B69E9d1a698de"; // uac nft

const web3ProviderLink = 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';

const nftAbi = JSON.parse(
  '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"birdToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"circulatingSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"_sendNftsTo","type":"address[]"}],"name":"gift","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isSaleActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"purchaseTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_baseURI_","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_startSale","type":"bool"}],"name":"setSaleActive","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawETH","outputs":[],"stateMutability":"nonpayable","type":"function"}]',
);

// dependencies
import axios from 'axios';
import EthDater from 'ethereum-block-by-date';
import Web3 from 'web3';
import fs from 'fs';

// utils
const defaultWeb3 = new Web3(web3ProviderLink);
const days = 86400 * 1000; // 1 day
const getContractNft = ({ web3 = defaultWeb3, address = nftAddress }) => new web3.eth.Contract(nftAbi, address);
const dater = new EthDater(defaultWeb3);
const err = (e) => e && console.log(e.message);
// work
const getContractEvents = async ({ fromBlock, toBlock, address = nftAddress, eventName = 'Transfer' }) => {
  // if there are inputs for fromBlock and toBlock then get block of last 24 hrs
  if (fromBlock === undefined || fromBlock === null) {
    fromBlock = (await dater.getDate(new Date(Date.now() - days), true)).block;
  }
  if (toBlock === undefined || toBlock === null) {
    toBlock = (await dater.getDate(new Date(Date.now()), true)).block;
  }

  // get events of transfer
  const config = {
    fromBlock,
    toBlock,
    filter: { from: '0x0000000000000000000000000000000000000000' },
  };
  const selectedEvents = await getContractNft({ address }).getPastEvents(eventName, config);
  return selectedEvents;
};

const getAnalytics = async (addr) => {
  try {
    const birdApi = 'https://api.birdprotocol.com/analytics/address/';
    const { eth_balance, nbr_transaction_count, nbr_account_age_days, bird_rating } = (await axios.get(`${birdApi}${addr}`)).data;
    // console.log({ addr, balance: eth_balance, noOfTx: nbr_transaction_count, age: nbr_account_age_days, birdRating: bird_rating });
    return { balance: eth_balance, noOfTx: nbr_transaction_count, age: nbr_account_age_days, birdRating: bird_rating };
  } catch (e) {
    fs.appendFile('errors.txt', "\n"+addr, err);
    // e && console.log(e.message);
    return await getAnalytics(addr);
  }
};

const driver = async () => {
  console.log('Start');

  // try put this function in file, for reuse.
  try {
    const birdApi = 'https://api.birdprotocol.com/analytics/address/';
    await axios.get(`${birdApi}0xc18E78C0F67A09ee43007579018b2Db091116B4C`);
  } catch (e) {
    console.log('Turn on internet! ', 'e: ', e && e.message.substr(0, 100));
    return;
  }

  const events = await getContractEvents({
    address: nftAddress,
    eventName: 'Transfer',
    fromBlock: 14896401, // see from https://etherscan.com
    toBlock: 14976781,
  });

  let users = {};
  let table = '';

  for (let i = 0; i < events.length; i++) {
    const e = events[i];
    const to = Web3.utils.toChecksumAddress(e.returnValues.to);

    users[to] = !users[to] || users[to] === undefined ? 1 : users[to] + 1;

    // console.log(
    //   `tokenId#${e.returnValues.tokenId}    ${e.returnValues.to} Block#${
    //     e.blockNumber
    //   } Line#${i + 1}`,
    // );
  }

  table += 'Address, Age, No Of Tx, Balance, Minted, Bird Rating';
  console.log('Address, Age, No Of Tx, Balance, Minted, Bird Rating');

  const userObjs = Object.keys(users);
  const userObjsLen = userObjs.length;

  console.log(`Mint events: ${events.length}`);
  console.log('Total users: ' + userObjsLen);

  for (let i = 6813; i < userObjsLen; i++) {
    const addr = userObjs[i];
    const a = await getAnalytics(addr);
    table += '\n' + addr + ',' + a.age + ',' + a.noOfTx + ',' + a.balance + ',' + users[addr] + ',' + a.birdRating;
    console.log(i + '/' + userObjsLen + ',' + addr + ',' + a.age + ',' + a.noOfTx + ',' + a.balance + ',' + users[addr] + ',' + a.birdRating);
  }

  fs.writeFile('minters.csv', table, err);
  console.log('Stop');
};

driver();
