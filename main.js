// what this code do?
// helps to find nft token ids deposited in staking contract

// What is the input of the following code?
// staking contract address, user address, nft address, chain: eth, avax

// What is the output of the following code?
// token ids that are given by user and staking contract

const Moralis = require('moralis/node');
const { serverUrl, appId, masterKey } = require('./secret.js');

const init = async () => {
  await Moralis.start({ serverUrl, appId, masterKey });

  const options = { address: '0x350b4cdd07cc5836e30086b993d27983465ec014', limit: '3', chain: 'eth' };
  const NFTTrades = await Moralis.Web3API.token.getNFTTrades(options);

  console.log(JSON.stringify(NFTTrades));
};

init();
