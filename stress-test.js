// Mint 6000 NFT per hour, Minting NFT Stress Test.
// Now I have some experience, I should start mentoring programming, and life overall. Communicate about Quran for who fears Allah.
// CONFIG MAINNET
const tokenIdsStart = 1005924 + 100;
const tokenIdsStop = 1005924 + 100 + 250;
const explorer = 'https://polygonscan.com';
const networkLinks = [
  'https://polygon-rpc.com',
  'https://polygon-mainnet.g.alchemy.com/v2/bLCZUf_rd7Y1TyyTWzRVtKP5rF9QCorl',
];
const nftAddress = '0x74a845adc5a0487887ccc6437cca2ee2e5ee8a8b';
const factoryAddress = '0x4F08873580939bA69794DA22169057847AC2B87c';

// CONFIG TESTNET
// const tokenIdsStart = 1000955;
// const tokenIdsStop = 1000955 + 1; // 100 nfts, delay 0.5 sec between each mint
// const explorer = 'https://mumbai.polygonscan.com';
// const networkLinks = [
//   'https://matic-mumbai.chainstacklabs.com',
//   'https://polygon-mumbai.g.alchemy.com/v2/7Z8zNuwkBgQBi2m-0EmPF483gGtaY1iE',
// ];
// const nftAddress = '0xBE0d479710274735Ebd361E90e56E0604a879700';
// const factoryAddress = '0x731d55cd90762c02535ff410427dd280a1b74397';

// COMMON CONFIG
const delayInMs = 100;
const userAddress = '0xA827c2964536668D9d2ce10962392c328af4c131';
const factoryAbi = JSON.parse(
  '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"authorizer","type":"address"},{"indexed":true,"internalType":"bytes32","name":"nonce","type":"bytes32"}],"name":"AuthorizationCanceled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"authorizer","type":"address"},{"indexed":true,"internalType":"bytes32","name":"nonce","type":"bytes32"}],"name":"AuthorizationUsed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"erc721Address","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Minted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_by","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"_requested","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_actual","type":"uint256"}],"name":"RoleUpdated","type":"event"},{"inputs":[],"name":"CANCEL_AUTHORIZATION_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DOMAIN_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"FEATURE_MINTING_WITH_AUTH","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINT_WITH_AUTHORIZATION_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ROLE_ACCESS_MANAGER","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ROLE_FACTORY_MINTER","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_authorizer","type":"address"},{"internalType":"bytes32","name":"_nonce","type":"bytes32"}],"name":"authorizationState","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_authorizer","type":"address"},{"internalType":"bytes32","name":"_nonce","type":"bytes32"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"cancelAuthorization","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_nonce","type":"bytes32"}],"name":"cancelAuthorization","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"uint256","name":"target","type":"uint256"},{"internalType":"uint256","name":"desired","type":"uint256"}],"name":"evaluateBy","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"features","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"required","type":"uint256"}],"name":"isFeatureEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"uint256","name":"required","type":"uint256"}],"name":"isOperatorInRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"required","type":"uint256"}],"name":"isSenderInRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_mintableErc721","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_mintableErc721","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_validAfter","type":"uint256"},{"internalType":"uint256","name":"_validBefore","type":"uint256"},{"internalType":"bytes32","name":"_nonce","type":"bytes32"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"mintWithAuthorization","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_mask","type":"uint256"}],"name":"updateFeatures","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"uint256","name":"role","type":"uint256"}],"name":"updateRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRoles","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]',
);

// CODE
import Web3 from 'web3';
import wallet from '@truffle/hdwallet-provider';
import { sendTransaction, sleep } from './sendTransaction.js';
import dotenv from 'dotenv';
dotenv.config();
const SERVICE_WALLETS_MNEMONIC = process.env.SERVICE_WALLETS_MNEMONIC;
const SERVICE_WALLETS_OFFSET = Number(process.env.SERVICE_WALLETS_OFFSET);
const SERVICE_WALLETS_LENGTH = Number(process.env.SERVICE_WALLETS_LENGTH);
let count = 0; // nonce

const mint = async (tokenId, count) => {
  // const networkLinkNumber = tokenId % networkLinks.length;
  const networkLinkNumber = 0;
  const ethereum = new wallet({
    mnemonic: SERVICE_WALLETS_MNEMONIC,
    providerOrUrl: networkLinks[networkLinkNumber],
    pollingInterval: 86400 * 20 * 1000, // sync every 20 days
  });
  const accountNumber = SERVICE_WALLETS_OFFSET + (tokenId % SERVICE_WALLETS_LENGTH);
  const web3 = new Web3(ethereum);

  await sendTransaction({
    web3,
    abi: factoryAbi,
    accountNumber,
    address: factoryAddress,
    method: 'mint',
    explorer,
    parameters: [nftAddress, userAddress, tokenId],
    parametersNames: ['nftAddress', 'userAddress', 'tokenId'],
    resendTxOnErrors: ['Internal error', 'INTERNAL_ERROR: queued sub-pool is full', 'Too Many Requests'],
  });
};

console.log(`Start ${new Date()}`);
for (let tokenId = tokenIdsStart; tokenId < tokenIdsStop; tokenId++) {
  mint(tokenId, ++count);
  await sleep(delayInMs);

  if (tokenId % 100 === 0) {
    console.log('Waiting 10 seconds... Cool Down...');
    await sleep(10000); // every 100 wait 10 seconds cool down
  }
}
// console.log(`Stop ${new Date()}`);

/*
.send({
    from: '0x1234567890123456789012345678901234567891',
    gas: 1500000,
    gasPrice: '30000000000000'
}, function(error, transactionHash){ ... })
.on('error', function(error){ ... })
.on('transactionHash', function(transactionHash){ ... })
.on('receipt', function(receipt){
   console.log(receipt.contractAddress) // contains the new contract address
})
.on('confirmation', function(confirmationNumber, receipt){ ... })
.then(function(newContractInstance){
    console.log(newContractInstance.options.address) // instance with the new contract address
});
*/
