/*

Interface

const getNftTrades = (fromBlock, toBlock) => {
  // ignore 0 value trades

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

// const os_seaport = ;
// const os_wyvern = ;

const getEventsWithCombinedTokenIdsInSingleSale = async (web3, events) => {
  let txs = {};
  let counter = 0;

  for (let i = 0; i < events.length; i++) {
    console.log({ i: i + '/' + events.length });
    counter++;

    const event = events[i];

    const { transactionHash } = event;
    const { from, to, tokenId } = event.returnValues;

    const { value } = await web3.eth.getTransaction(event.transactionHash);

    if (value === '0') continue; // ignore normal transfer events
    // if (to !== '') continue; // ignore normal transfer events

    const tokenIds = txs[transactionHash] ? [tokenId, ...txs[transactionHash].tokenIds] : [tokenId];

    const valueEther = web3.utils.fromWei(value);

    txs[transactionHash] = { counter, from, value, valueEther, tokenIds, transactionHash };
  }

  const combinedTokenIdEvents = Object.keys(txs).map((tx) => txs[tx]);

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

  const events = await getTransferEvents(web3, NFT_ABI, NFT_ADDRESS, fromBlock, toBlock);
  console.log({ events: events.length });

  const eventsWithoutMints = getEventsWithoutMint(events);
  console.log({ eventsWithoutMints: eventsWithoutMints.length });

  const eventsWithCombinedTokenIdsInSingleSale = await getEventsWithCombinedTokenIdsInSingleSale(web3, eventsWithoutMints);
  console.log({ eventsWithCombinedTokenIdsInSingleSale: eventsWithCombinedTokenIdsInSingleSale.length });

  return eventsWithCombinedTokenIdsInSingleSale;

  // plan
  // get transfer events
  // for every event
  //  get tx hash and find its price (value) in ETH paid in that transaction
  // send that list back to earth
};
