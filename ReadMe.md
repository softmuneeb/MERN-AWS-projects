what this code do?
main.js, sends eth from eth-mainnet to polygon-mainnet

what are inputs?

what are outputs?

links:
https://docs.polygon.technology/docs/develop/ethereum-polygon/matic-js/get-started

store room:

// const mainWeb3 = new Web3('https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161');
// const maticWeb3 = new Web3('https://polygon-rpc.com/');
const mainWeb3 = new Web3('https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161');
const maticWeb3 = new Web3('https://matic-mumbai.chainstacklabs.com');//https://rpc-mumbai.matic.today
const rootChainManagerContract = new mainWeb3.eth.Contract(rootChainManagerABI, rootChainManagerAddress);
const childTokenContract = new maticWeb3(childTokenABI, childTokenAddress);

await rootChainManagerContract.methods.depositEtherFor(userAddress).send({ from: userAddress, value: amount });

