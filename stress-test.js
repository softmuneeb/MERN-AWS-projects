// Mint 6000 NFT per hour, Minting NFT Stress Test.

// Now I have some expereince, I should start mentoring programming
// and life overall. Communicate about Quran for who fears Allah.

import dotenv from 'dotenv';
dotenv.config();

// CONFIG MAINNET
const tokenIdsStart = 1000901;
const tokenIdsStop = 1000901 + 100; // 100 nfts, delay 0.5 sec between each mint
const key = process.env.TREASURY_KEY_MAIN;
const from = process.env.TREASURY_WALLET_MAIN;
const explorer = 'https://polygonscan.com';
const networkLink = 'https://polygon-rpc.com';
const nftAddress = '0x74a845adc5a0487887ccc6437cca2ee2e5ee8a8b';
const factoryAddress = '0x4F08873580939bA69794DA22169057847AC2B87c';

// CONFIG TESTNET
// TODO: Check max stress
// const tokenIdsStart = 1000555;
// const tokenIdsStop = 1000555 + 100; // 100 nfts, delay 0.5 sec between each mint
// const key = process.env.TREASURY_KEY_TEST;
// const from = process.env.TREASURY_WALLET_TEST;
// const explorer = 'https://mumbai.polygonscan.com';
// const networkLink = 'https://matic-mumbai.chainstacklabs.com';
// const nftAddress = '0xBE0d479710274735Ebd361E90e56E0604a879700';
// const factoryAddress = '0x731d55cd90762c02535ff410427dd280a1b74397';

// COMMON CONFIG
const delayInMints = 500; // ms TODO: 250 means 500 because some time is took by blockchain
const userAddress = '0xA827c2964536668D9d2ce10962392c328af4c131';
const factoryAbi = JSON.parse(
  '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"authorizer","type":"address"},{"indexed":true,"internalType":"bytes32","name":"nonce","type":"bytes32"}],"name":"AuthorizationCanceled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"authorizer","type":"address"},{"indexed":true,"internalType":"bytes32","name":"nonce","type":"bytes32"}],"name":"AuthorizationUsed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"erc721Address","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Minted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_by","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"_requested","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_actual","type":"uint256"}],"name":"RoleUpdated","type":"event"},{"inputs":[],"name":"CANCEL_AUTHORIZATION_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DOMAIN_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"FEATURE_MINTING_WITH_AUTH","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINT_WITH_AUTHORIZATION_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ROLE_ACCESS_MANAGER","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ROLE_FACTORY_MINTER","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_authorizer","type":"address"},{"internalType":"bytes32","name":"_nonce","type":"bytes32"}],"name":"authorizationState","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_authorizer","type":"address"},{"internalType":"bytes32","name":"_nonce","type":"bytes32"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"cancelAuthorization","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_nonce","type":"bytes32"}],"name":"cancelAuthorization","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"uint256","name":"target","type":"uint256"},{"internalType":"uint256","name":"desired","type":"uint256"}],"name":"evaluateBy","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"features","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"required","type":"uint256"}],"name":"isFeatureEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"uint256","name":"required","type":"uint256"}],"name":"isOperatorInRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"required","type":"uint256"}],"name":"isSenderInRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_mintableErc721","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_mintableErc721","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_validAfter","type":"uint256"},{"internalType":"uint256","name":"_validBefore","type":"uint256"},{"internalType":"bytes32","name":"_nonce","type":"bytes32"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"mintWithAuthorization","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_mask","type":"uint256"}],"name":"updateFeatures","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"uint256","name":"role","type":"uint256"}],"name":"updateRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRoles","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]',
);

// CODE
import Web3 from 'web3';

import wallet from '@truffle/hdwallet-provider';

const ethereum = new wallet({
  privateKeys: [key],
  providerOrUrl: networkLink,
  pollingInterval: 86400 * 20 * 1000, // sync every 20 days
});

const web3 = new Web3(ethereum);
const sc = new web3.eth.Contract(factoryAbi, factoryAddress);
let imPure = 0;

const mint = async (tokenId, imPure) => {
  // READ BLOCKCHAIN
  const gasPrice = await getGasPrice(web3);
  const mint = sc.methods.mint(nftAddress, userAddress, tokenId);
  try {
    await mint.estimateGas({ from });
  } catch (e) {
    console.log('estimate error');
    console.log('1', { count: imPure }, e);
    console.log('2', e + '');
    console.log(
      '3',
      `(${explorer}).sc(${factoryAddress}).methods.mint(nftAddress ${nftAddress}, userAddress ${userAddress}, tokenId ${tokenId}) from: ${from}`,
    );
    return;
  }

  let wasError;
  // WRITE BLOCKCHAIN
  for (let i = 0; i < 10; i++) {
    try {
      const { transactionHash } = await mint.send({ from, gas: '200000', gasPrice });
      console.log({ count: imPure, tokenId, explore: `${explorer}/tx/${transactionHash}` });
      wasError = false;
      break;
    } catch (e) {
      if (e && e.message === 'insufficient funds for gas * price + value') {
        console.log({ tokenId, err: e.message });
        wasError = false;
        return;
      }
      const sleepTime = Math.pow(2, i);
      console.log(`tx error so trying again after sleep of seconds: ${sleepTime}`);
      console.log('1', { count: imPure }, e);
      console.log('2', e + '');
      await sleep(1000 * sleepTime);
      wasError = true;
    }
  }

  if (wasError) {
    console.log('transactionHash error after 10 tries');
    console.log('1', { count: imPure }, e);
    console.log('2', e + '');
    console.log(
      '3',
      `(${explorer}).sc(${factoryAddress}).methods.mint(nftAddress ${nftAddress}, userAddress ${userAddress}, tokenId ${tokenId}) from: ${from}`,
    );
  }
};

export const getGasPrice = async (web3) => {
  // making gas 35 GWEI fixed on testnet, reference https://community.infura.io/t/polygon-mumbai-testnet-error-transaction-underpriced/4781
  const chainId = await web3.eth.getChainId();
  if (chainId === 80001) {
    return '30000000000'; // 30 gwei, gwei = 9 zeros
  }
  const gasPrice = '' + Math.floor(parseInt(await web3.eth.getGasPrice()) * 1.5);
  return gasPrice;
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

console.log(`Start ${new Date()}`);
for (let tokenId = tokenIdsStart; tokenId < tokenIdsStop; tokenId++) {
  mint(tokenId, ++imPure);
  await sleep(delayInMints);
}
console.log(`Stop ${new Date()}`);
