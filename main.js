import Web3 from 'web3';

const init = async () => {
  const web3 = new Web3(
    'https://rinkeby.infura.io/v3/3da1c863472e43d989856450d4e6889d'
  );

  const res = await web3.eth.getBalance(
    '0x960b236A07cf122663c4303350609A66A7B288C0'
  );
  console.log('res: ', res);
};

init();
