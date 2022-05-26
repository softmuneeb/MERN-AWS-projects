// what this code do?
// this code helps is giving royalties to nft holders if they sell nft at a good price
// drawbacks, a person sells to himself, solution, use bird api account rating etc, age, balance, no of tx

// plan
// get nft trades on a collection
// token id | mint at eth | sell at eth |    % sold  | reward to give
//    10    |     1       |     1.5     |     50%    | 100% |
//    51    |     1       |     1.1     |     10%    | 100% |
//    17    |     1       |     1.5     |     50%    | 100% |
//    21    |     1       |     2.1     |     210%   |
//    70    |     1       |     1.9     |     90%    |
//

// What is the input of the following code?
// What is the output of the following code?

const Moralis = require('moralis/node');
const { serverUrl, appId, masterKey } = require('./secret2.js');

const init = async () => {
  await Moralis.start({ serverUrl, appId, masterKey });

  const options = { address: '0x350b4cdd07cc5836e30086b993d27983465ec014', limit: '3', chain: 'eth' };
  const NFTTrades = await Moralis.Web3API.token.getNFTTrades(options);

  console.log(JSON.stringify(NFTTrades));
};

init();
