// nodeUrl: 'https://rinkeby.infura.io/v3/3da1c863472e43d989856450d4e6889d',
// multicallCustomContractAddress: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696'

import { Multicall } from 'ethereum-multicall';
import Web3 from 'web3';
import {
  busdAddress,
  getContractPresaleFactory,
  presaleAbi,
  presaleAddress,
  presaleFactoryAbi,
  presaleFactoryAddress
} from './smart-contracts.js';

const web3 = new Web3(
  'https://rinkeby.infura.io/v3/3da1c863472e43d989856450d4e6889d'
);

const getPresaleDetails = async presaleAddresses => {
  const multicall = new Multicall({ web3Instance: web3, tryAggregate: true });

  if (presaleAddresses.length === 0) return [];

  const calls = presaleAddresses.map(addr => ({
    reference: 'fooCall1',
    methodName: 'getPresaleDetails',
    methodParameters: [addr]
  }));

  const contractCallContext = [
    {
      reference: 'testContract',
      contractAddress: presaleFactoryAddress,
      abi: presaleFactoryAbi,
      calls
    }
  ];

  const results = await multicall.call(contractCallContext);

  const presales = results.results.testContract.callsReturnContext.map(obj => {
    const [
      [tokenX, lpTokenX, tokenXLocker, lpTokenXLocker],

      [
        tokenXBalance,
        lpTokenXBalance,
        tokenXLockerBalance,
        lpTokenXLockerBalance,
        tokenXSold,
        rate,
        amountTokenXToBuyTokenX,
        presaleClosedAt,
        tier
      ],

      [presaleIsRejected, presaleIsApproved, presaleAppliedForClosing]
    ] = obj.returnValues;

    return {
      tokenX,
      lpTokenX,
      tokenXLocker,
      lpTokenXLocker,
      tokenXBalance,
      lpTokenXBalance,
      tokenXLockerBalance,
      lpTokenXLockerBalance,
      tokenXSold,
      rate,
      amountTokenXToBuyTokenX,
      presaleClosedAt,
      tier,
      presaleIsRejected,
      presaleIsApproved,
      presaleAppliedForClosing
    };
  });
  // console.log('presales: ', presales);

  return presales;
};

const getPresalesNotApproved = async () =>
  await getContractPresaleFactory().methods.getPresales(0, 10, false).call();

const demoMulticall = async () => {
  const presaleAddresses = [
    '0x31b694f0973E16f5db8D725AbF375663d6f3Fc30',
    '0x133cB13a3317406b059AC40CB3AD4c967559e4eD'
  ];
  await getPresaleDetails(presaleAddresses);
};

const init = async () => {
  const presaleAddresses = await getPresalesNotApproved();
  console.log('presaleAddresses: ', presaleAddresses);
  const result = await getPresaleDetails(presaleAddresses);
  console.log('result: ', result);
};

init();
