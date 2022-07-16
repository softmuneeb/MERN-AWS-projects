/*

Interface

const getNftTrades = (fromBlock, toBlock) => {
  // ignore 0 value trades
  // Assume trades of OpenSea only, not of Gem.xyz

  return [
    {
      value: '1000000',
      from: '0xae2765784425F7ad12de01A064080E578E3da8AA',
      tokenIds: ['825', '1', '2', 3],
    },
    {
      value: '20000000',
      from: '0xae2765784425F7ad12de01A064080E578E3da8AA',
      tokenIds: ['9'],
    }
  ];
};

*/

import Web3 from 'web3';

const os_seaport = '0x00000000006c3852cbEf3e08E8dF289169EdE581';
const os_wyvern = '0x7f268357a8c2552623316e2562d90e642bb538e5';

const getEventsWithCombinedTokenIdsInSingleSale = (events) => {
  let txs = {};

  for (let i = 0; i < events.length; i++) {
    const event = events[i];

    const { transactionHash } = event;
    const { from, tokenId } = event.returnValues;

    const tokenIds = txs[transactionHash] ? [tokenId, ...txs[transactionHash].tokenIds] : [tokenId];

    txs[transactionHash] = { from, tokenIds, transactionHash };
  }

  const combinedTokenIdEvents = Object.keys(txs).map((tx) => txs[tx]);

  return combinedTokenIdEvents;
};

const getEventsWithSellingPrice = async (web3, events) => {
  let combinedTokenIdEvents = [];

  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    console.log({ i: i + 1 + '/' + events.length });

    const tx = await web3.eth.getTransaction(event.transactionHash);
    const { value, to } = tx;
    if (value === '0') continue;
    if (!(to === os_seaport || to === os_wyvern)) continue;

    combinedTokenIdEvents.push({ ...event, to, value, valueEther: web3.utils.fromWei(value) });
  }

  return combinedTokenIdEvents;
};

const getEventsWithoutMint = (events) => events.filter((event) => event.returnValues.from !== '0x0000000000000000000000000000000000000000');

const getTransferEvents = async (web3, NFT_ABI, NFT_ADDRESS, fromBlock, toBlock) => {
  console.log({ fromBlock, toBlock });
  try {
    const events = await new web3.eth.Contract(NFT_ABI, NFT_ADDRESS).getPastEvents('Transfer', {
      fromBlock,
      toBlock,
    });

    console.log({ events: events.length });
    return events;
  } catch (error) {
    error && console.log('err', error.message);

    const mid = Math.floor(fromBlock + (toBlock - fromBlock) / 2);

    console.log({ mid });
    const events1 = await getTransferEvents(web3, NFT_ABI, NFT_ADDRESS, fromBlock, mid);
    const events2 = await getTransferEvents(web3, NFT_ABI, NFT_ADDRESS, mid + 1, toBlock);

    return [...events1, ...events2];
  }
};

export const getNftTrades = async (BLOCKCHAIN_URL, NFT_ABI, NFT_ADDRESS, fromBlock, toBlock) => {
  const web3 = new Web3(BLOCKCHAIN_URL);

  const eventsAll = await getTransferEvents(web3, NFT_ABI, NFT_ADDRESS, fromBlock, toBlock);
  console.log({ eventsAll: eventsAll.length });

  const eventsWithoutMints = getEventsWithoutMint(eventsAll);
  console.log({ eventsWithoutMints: eventsWithoutMints.length });

  const eventsWithCombinedTokenIdsInSingleSale = getEventsWithCombinedTokenIdsInSingleSale(eventsWithoutMints);
  console.log({ eventsWithCombinedTokenIdsInSingleSale: eventsWithCombinedTokenIdsInSingleSale.length });

  const eventsWithSellingPrice = await getEventsWithSellingPrice(web3, eventsWithCombinedTokenIdsInSingleSale);
  console.log({ eventsWithSellingPrice: eventsWithSellingPrice.length });

  return eventsWithSellingPrice;

  // plan
  // get transfer events
  // for every event
  //  get tx hash and find its price (value) in ETH paid in that transaction
  // send that list back to earth
};
