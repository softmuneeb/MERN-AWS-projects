// get the minters of Avian Avatars Nft and get their Details from Api and save in CSV file

// config
const nftAddress = '0x350b4cdd07cc5836e30086b993d27983465ec014'; // avian avatars nft

const infuraLink =
  'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';

const nftAbi = JSON.parse(
  '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"birdToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"circulatingSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"_sendNftsTo","type":"address[]"}],"name":"gift","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isSaleActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"purchaseTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_baseURI_","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_startSale","type":"bool"}],"name":"setSaleActive","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawETH","outputs":[],"stateMutability":"nonpayable","type":"function"}]',
);

// dependencies
import axios from 'axios';
import EthDater from 'ethereum-block-by-date';
import Web3 from 'web3';

// utils
const defaultWeb3 = new Web3(infuraLink);
const days = 86400 * 1000; // 1 day
const getContractNft = ({ web3 = defaultWeb3, address = nftAddress }) =>
  new web3.eth.Contract(nftAbi, address);
const dater = new EthDater(defaultWeb3);
// work
const getContractEvents = async ({
  fromBlock,
  toBlock,
  address = nftAddress,
  eventName = 'Transfer',
}) => {
  // if there are inputs for fromBlock and toBlock then get block of last 24 hrs
  if (fromBlock === undefined || fromBlock === null) {
    fromBlock = (await dater.getDate(new Date(Date.now() - days), true)).block;
  }
  if (toBlock === undefined || toBlock === null) {
    toBlock = (await dater.getDate(new Date(Date.now()), true)).block;
  }
  // end default values

  // get events of transfer
  const config = {
    fromBlock,
    toBlock,
  };
  const selectedEvents = await getContractNft({ address }).getPastEvents(
    eventName,
    config,
  );

  return selectedEvents;
};

const driver = async () => {
  // try put this function in file, for reuse.
  try {
    const birdApi = 'https://api.birdprotocol.com/analytics/address/';
    await axios.get(`${birdApi}0xc18E78C0F67A09ee43007579018b2Db091116B4C`);
  } catch (e) {
    console.log('Turn on internet! ', 'e: ', e && e.message.substr(0, 100));
    return;
  }

  console.log('Getting events...');
  const events = await getContractEvents({
    address: nftAddress,
    eventName: 'ApprovalForAll',
    fromBlock: 0, // see from https://etherscan.com
    toBlock: 9999999999,
  });

  console.log(`events: ${events.length}`);

  console.log('Getting buyers stats...');

  console.log(`owner, operator, block, line`);

  for (let i = 0; i < events.length; i++) {
    const e = events[i];

    console.log(`'${e.returnValues.owner}', '${e.returnValues.operator}', ${e.blockNumber}, ${i + 1}`);
  }
};

driver();
