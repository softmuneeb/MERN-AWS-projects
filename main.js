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
//    10    |     1       |     1.25    |     25%    |    0.05       | 0x2312312312893u12398u1
//    10    |     1       |     1.5     |     50%    |    0.075       | 0x2312312312893u12398u1
//    21    |     1       |     2.0     |     200%   |    0.100       | 0x874398574393230928321

// lion 1 eth, sold 2 eth for life rewards go to seller 1 on token id 1
// lion 1 eth, sold 1 eth for life no rewards on token id 2

// What is the input of the following code?
// What is the output of the following code?

// smaller steps:
// 1. step 1, get selling price

const Moralis = require('moralis/node');
const BigNumber = require('bignumber.js');

const fs = require('fs');

const { serverUrl, appId, masterKey } = require('./secret.js');

const e = (err) => err && console.log(err.message);

const init = async (moralis, options, mint) => {
  await Moralis.start(moralis);

  let table = '';
  let addresses = [];
  let rewards = [];

  const NFTTrades = await Moralis.Web3API.token.getNFTTrades(options);

  table += 'Time, Seller, TokenId, Mint Price ETH, Selling Price ETH, Up Sold, Royalty, Reward';
  NFTTrades.result.map((result) => {
    const sellingPrice = BigNumber(result.price);
    const upSold = sellingPrice.dividedBy(mint.price);
    let rewardRoyalty = 0;

    if (upSold.isGreaterThanOrEqualTo(1.25) && upSold.isLessThan(1.5)) rewardRoyalty = 0.25; // 25%
    else if (upSold.isGreaterThan(1.5)) rewardRoyalty = 0.5; // 50%

    if (rewardRoyalty !== 0) {
      // the person sold 25% or more
      const ownerRoyalty = sellingPrice.multipliedBy(mint.royalty).decimalPlaces(0);
      const reward = ownerRoyalty.multipliedBy(rewardRoyalty).decimalPlaces(0);

      addresses.push(result.seller_address);
      rewards.push(reward + '');

      table += `\n${result.block_timestamp}, '${result.seller_address}', ${result.token_ids[0]}, ${Moralis.Units.FromWei(
        mint.price + '',
      )}, ${Moralis.Units.FromWei(sellingPrice + '')}, ${upSold * 100}%, ${rewardRoyalty * 100}%, ${Moralis.Units.FromWei(reward + '')} `;
    }
  });

  fs.writeFile('table.csv', table, e);
  fs.writeFile('addresses.txt', JSON.stringify(addresses).replace('[','').replace(']',''), e);
  fs.writeFile('rewards.txt', JSON.stringify(rewards).replace('[', '').replace(']', ''), e);
};

init(
  (moralis = { serverUrl, appId, masterKey }),
  (options = {
    marketplace: 'opensea',
    address: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D', // BoredApes NFT Address
    from_date: '23 May 2021 00:00:00 GMT',
    to_date: '24 May 2021 00:00:00 GMT',
    chain: 'eth',
  }),
  (mint = { price: BigNumber(Moralis.Units.ETH('0.08')), royalty: 0.1 }), // 10% royalty on opensea
);
