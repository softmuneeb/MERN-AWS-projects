// what this code do?
// this code helps is giving royalties to nft holders if they sell nft at a good price
// input nft trades
// output report, plus verify result total reward received to owner == reward calculated from nft trades

// SoftBlock.Live: I buy 1 eth nft and sell at 2 eth then, (If royalties are 10%)
// 0.1 ETH Goes to me
// 0.1 ETH Goes to owner

// drawbacks, a person sells to himself, solution, use bird api account rating etc, age, balance, no of tx

// plan
// get nft trades on a collection
// let royalty = 10% so 2 ETH item gives 0.2 ETH, 0.1 ETH goes to seller and 0.1 to owner
// token id | mint at eth | sell at eth |    % sold  | reward to give | address
//    10    |     1       |     1.5     |     50%    |    0.075       | 0x2312312312893u12398u1
//    21    |     1       |     2.0     |     200%   |    0.100       | 0x874398574393230928321

// What is the input of the following code?
// What is the output of the following code?

// smaller steps:
// 1. step 1, get selling price

const Moralis = require('moralis/node');
const { serverUrl, appId, masterKey } = require('./secret2.js');

const init = async (moralis, options) => {
  await Moralis.start(moralis);

  const NFTTrades = await Moralis.Web3API.token.getNFTTrades(options);

  NFTTrades.result.map((result) => {
    console.log(result.seller_address);
    console.log(result.token_ids);
    console.log(Moralis.Units.FromWei(result.price), 'ETH');
    console.log();
  });
};

init(
  { serverUrl, appId, masterKey },
  {
    marketplace: "opensea",
    address: '0x350b4cdd07cc5836e30086b993d27983465ec014',
    from_date: '22 May 2022 00:00:00 GMT',
    to_date: '24 May 2022 00:00:00 GMT',
    chain: 'eth',
  },
);

/*
options:

from_block
to_block
from_date: '26 May 2021 00:00:00 GMT',
to_date: '26 May 2021 00:00:00 GMT'
limit: '3'
*/
