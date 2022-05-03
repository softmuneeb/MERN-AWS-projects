contact +923014440289 https://bit.ly/cvblockchain | Full Stack Blockchain Developer | Solidity, JS, React

node main-send-eth.js
node main-nft-buy-bot.js

code structure:
1. smart-contracts.js, if you want to change networks, you can only change this file, file to get smart contracts and config for all networks like mainnet & rinkeby.
2. apis.js, all the business logic is here. like calling functions from any smart-contract
3. utils.js, any utility functions are defined here that are needed in apis.js
4. main.js, uses apis.js to do the business
5. secret.js and .env, contains passwords etc.