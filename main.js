// nodeUrl: 'https://rinkeby.infura.io/v3/3da1c863472e43d989856450d4e6889d',
// multicallCustomContractAddress: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696'

import { Multicall } from 'ethereum-multicall';
import Web3 from 'web3';
import { busdAbi, busdAddress } from './smart-contracts.js';

const init = async () => {
  const web3 = new Web3(
    'https://rinkeby.infura.io/v3/3da1c863472e43d989856450d4e6889d'
  );

  const multicall = new Multicall({ web3Instance: web3, tryAggregate: true });

  const contractCallContext = [
    {
      reference: 'testContract',
      contractAddress: busdAddress,
      abi: busdAbi,
      calls: [
        {
          reference: 'fooCall1',
          methodName: 'balanceOf',
          methodParameters: [busdAddress]
        },
        {
          reference: 'fooCall2',
          methodName: 'balanceOf',
          methodParameters: [busdAddress]
        }
      ]
    }
  ];

  const results = await multicall.call(contractCallContext);

  console.log(results.results.testContract.callsReturnContext);
};

// getPresaleDetails(addresses);

init();
