const { POSClient, use } = require('@maticnetwork/maticjs');
const { Web3ClientPlugin } = require('@maticnetwork/maticjs-web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');

const init = async () => {
  use(Web3ClientPlugin);

  const posClient = new POSClient();
  await posClient.init({
    network: 'testnet',
    version: 'mumbai',
    parent: {
      provider: new HDWalletProvider(PV_KEY, BLOCKCHAIN_URL_FROM),
      defaultConfig: {
        from: PUB_KEY,
      },
    },
    child: {
      provider: new HDWalletProvider(PV_KEY, BLOCKCHAIN_URL_TO),
      defaultConfig: {
        from: PUB_KEY,
      },
    },
  });

  const result = await posClient.depositEther('100000000000000', PUB_KEY);

  const txHash = await result.getTransactionHash();
  console.log({ txHash });

  const txReceipt = await result.getReceipt();
  console.log({ txReceipt });
};

init();
