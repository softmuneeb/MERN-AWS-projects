// what this code do?
// get nft trades from opensea using

const Moralis = require('moralis/node');
const { serverUrl, appId, masterKey } = require('./secret.js');

const init = async () => {
  await Moralis.start({ serverUrl, appId, masterKey });
  const options = { address: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D', limit: '1', chain: 'eth' };
  const NFTTrades = await Moralis.Web3API.token.getNFTTrades(options);
  console.log('Just to refresh moralis server, daily, ' + JSON.stringify(NFTTrades, null, 4));
};

init();
