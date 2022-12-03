// why are you writing code here? explain from step 1 to end.

// Import the ethers.js library
const ethers = require('ethers');

// Define the QuickNode provider URL
const providerUrl = 'https://mainnet.quicknode.com';

// Create a new instance of the ethers.js library using the QuickNode provider
const provider = new ethers.providers.JsonRpcProvider(providerUrl);

// Get the contract ABI for the Uniswap pair
const UniswapPair = require('../abis/UniswapPair.json');

// Get the list of Uniswap pair addresses from the command line arguments
const pairAddresses = process.argv.slice(2);

// Create event filters for the 'AddedLiquidity', 'RemovedLiquidity', 'ContractPublished', and 'Renounced' events
const addedLiquidityFilter = uniswapPair.filters.AddedLiquidity();
const removedLiquidityFilter = uniswapPair.filters.RemovedLiquidity();
const contractPublishedFilter = uniswapPair.filters.ContractPublished();
const renouncedFilter = uniswapPair.filters.Renounced();

// Set up event listeners for the 'AddedLiquidity', 'RemovedLiquidity', 'ContractPublished', and 'Renounced' events
pairAddresses.forEach(address => {
  const uniswapPair = new ethers.Contract(address, UniswapPair.abi, provider);
  uniswapPair.on(addedLiquidityFilter, (provider, amount) => {
    console.log(`${provider} has added ${amount} of liquidity to the Uniswap pair at address ${address}.`);
  });
  uniswapPair.on(removedLiquidityFilter, (provider, amount) => {
    console.log(`${provider} has removed ${amount} of liquidity from the Uniswap pair at address ${address}.`);
  });
  uniswapPair.on(contractPublishedFilter, (provider) => {
    console.log(`The contract at address ${address} has been published by ${provider}.`);
  });
  uniswapPair.on(renouncedFilter, (provider) => {
    console.log(`The contract at address ${address} has been renounced by ${provider}.`);
  });
});
