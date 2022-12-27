// Mint 6000 NFT per hour, Minting NFT Stress Test.

// Now I have some expereince, I should start mentoring programming
// and life overall. Communicate about Quran for who fears Allah.

// CONFIG

// let tokenId = 1000000;
// const explorer = 'https://polygonscan.com';
// const networkLink = 'https://polygon-rpc.com';
// const nftAddress = '0x731d55cd90762c02535ff410427dd280a1b74397';
// const factoryAddress = '0x4F08873580939bA69794DA22169057847AC2B87c';

let tokenId = 1000000;
const explorer = 'https://mumbai.polygonscan.com';
const networkLink = 'https://matic-mumbai.chainstacklabs.com';
const nftAddress = '0x74a845ADC5A0487887Ccc6437cCA2Ee2E5Ee8a8B';
const factoryAddress = '0x731d55cd90762c02535ff410427dd280a1b74397';

// COMMON CONFIG
const from = '0xa286ae2E1A0e199Bd89731efDb2d6162e23825b9'; // minterAddress

const userAddress = '0xA827c2964536668D9d2ce10962392c328af4c131';
const factoryAbi = JSON.parse(
  '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"authorizer","type":"address"},{"indexed":true,"internalType":"bytes32","name":"nonce","type":"bytes32"}],"name":"AuthorizationCanceled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"authorizer","type":"address"},{"indexed":true,"internalType":"bytes32","name":"nonce","type":"bytes32"}],"name":"AuthorizationUsed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"erc721Address","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Minted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_by","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"_requested","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_actual","type":"uint256"}],"name":"RoleUpdated","type":"event"},{"inputs":[],"name":"CANCEL_AUTHORIZATION_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DOMAIN_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"FEATURE_MINTING_WITH_AUTH","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINT_WITH_AUTHORIZATION_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ROLE_ACCESS_MANAGER","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ROLE_FACTORY_MINTER","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_authorizer","type":"address"},{"internalType":"bytes32","name":"_nonce","type":"bytes32"}],"name":"authorizationState","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_authorizer","type":"address"},{"internalType":"bytes32","name":"_nonce","type":"bytes32"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"cancelAuthorization","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_nonce","type":"bytes32"}],"name":"cancelAuthorization","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"uint256","name":"target","type":"uint256"},{"internalType":"uint256","name":"desired","type":"uint256"}],"name":"evaluateBy","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"features","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"required","type":"uint256"}],"name":"isFeatureEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"uint256","name":"required","type":"uint256"}],"name":"isOperatorInRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"required","type":"uint256"}],"name":"isSenderInRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_mintableErc721","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_mintableErc721","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_validAfter","type":"uint256"},{"internalType":"uint256","name":"_validBefore","type":"uint256"},{"internalType":"bytes32","name":"_nonce","type":"bytes32"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"mintWithAuthorization","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_mask","type":"uint256"}],"name":"updateFeatures","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"uint256","name":"role","type":"uint256"}],"name":"updateRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRoles","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]',
);

// CODE
import Web3 from 'web3';
import dotenv from 'dotenv';
dotenv.config();
const MINTER_PRIVATE_KEY = process.env.MINTER_PRIVATE_KEY;
console.log({ MINTER_PRIVATE_KEY });
const web3 = new Web3(networkLink);
const sc = new web3.eth.Contract(factoryAbi, factoryAddress);

// READ BLOCKCHAIN
const gasPrice = await web3.eth.getGasPrice();
console.log({ gasPrice: web3.utils.fromWei(gasPrice, 'gwei') + ' GWEI' });

// WRITE BLOCKCHAIN
// TODO: ++ -- if success
const mint = sc.methods.mint(nftAddress, userAddress, tokenId++);
try {
  const estimatedGas = await mint.estimateGas({ from });
  console.log({ estimatedGas });
} catch (e) {
  console.log(e + '');
  console.log(
    `${e} (${explorer}).sc(${factoryAddress}).methods.mint(nftAddress ${nftAddress}, userAddress ${userAddress}, tokenId ${tokenId--})`,
  );
}
try {
  const { transactionHash } = await mint.send({ from, gas: '200000', gasPrice });
  console.log({ networkLink, transactionHash });
} catch (e) {
  console.log(e + '');
}
