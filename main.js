const Moralis = require('moralis/node');
const BigNumber = require('bignumber.js');

const fs = require('fs');

const { serverUrl, appId, masterKey } = require('./secret.js');
const { savedRoyaltySettings } = require('./royaltySettings.js');

const e = (err) => err && console.log(err.message);

const init = async (moralis, options, mint) => {
  await Moralis.start(moralis);
  const NFTTrades = await Moralis.Web3API.token.getNFTTrades(options);

  let addresses = [];
  let rewards = [];
  let royaltySettings = { ...savedRoyaltySettings };
  let table = 'Time, Seller, Reward Winner, TokenId, Mint Price ETH, Selling Price ETH, Up Sold, Royalty, Reward';

  NFTTrades.result.map((result) => {
    const sellingPrice = BigNumber(result.price);
    const tokenId = result.token_ids[0];
    const upSold = sellingPrice.dividedBy(mint.price);
    let rewardWinner; // address of winner
    let rewardRoyalty = 0; // 0 or 0.25 or 0.50 means 50%

    // its the first seller, calculate and save the first seller address and rewards % to give him now and for future
    if (royaltySettings[tokenId] === undefined || !royaltySettings[tokenId]) {
      rewardWinner = result.seller_address;

      if (upSold.isGreaterThanOrEqualTo(1.25) && upSold.isLessThan(1.5)) rewardRoyalty = 0.25; // 25%
      else if (upSold.isGreaterThan(1.5)) rewardRoyalty = 0.5; // 50%

      royaltySettings[tokenId] = { rewardRoyalty, rewardWinner }; // save royaltySettings
    } else {
      // its not the first seller, load the first seller address and rewards % to give him
      rewardWinner = royaltySettings[tokenId].rewardWinner;
      rewardRoyalty = royaltySettings[tokenId].rewardRoyalty;
    }

    if (rewardRoyalty === 0) return;

    // the person sold 25% or more
    const ownerRoyalty = sellingPrice.multipliedBy(mint.royalty).decimalPlaces(0);
    const reward = ownerRoyalty.multipliedBy(rewardRoyalty).decimalPlaces(0);

    addresses.push(rewardWinner);
    rewards.push(reward + '');

    table += `\n${result.block_timestamp}, '${result.seller_address}', '${rewardWinner}', ${tokenId}, ${Moralis.Units.FromWei(
      mint.price + '',
    )}, ${Moralis.Units.FromWei(sellingPrice + '')}, ${upSold * 100}%, ${rewardRoyalty * 100}%, ${Moralis.Units.FromWei(reward + '')} `;
  });

  fs.writeFile('table.csv', table, e);
  fs.writeFile('addresses.txt', JSON.stringify(addresses).replace('[', '').replace(']', ''), e);
  fs.writeFile('rewards.txt', JSON.stringify(rewards).replace('[', '').replace(']', ''), e);
  fs.writeFile(
    'royaltySettings.js',
    'const savedRoyaltySettings = ' + JSON.stringify(royaltySettings, null, 4) + '\nmodule.exports = { savedRoyaltySettings };',
    e,
  );
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
  (mint = { price: BigNumber(Moralis.Units.ETH('0.08')), royalty: Number('0.10') }), // 10% royalty on opensea
);
