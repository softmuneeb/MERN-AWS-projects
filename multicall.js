// nodeUrl: 'https://rinkeby.infura.io/v3/3da1c863472e43d989856450d4e6889d',
// multicallCustomContractAddress: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696'

import { Multicall } from 'ethereum-multicall';
import {
  defaultWeb3,
  getContractPresaleFactory,
  presaleFactoryAbi,
  presaleFactoryAddress,
} from './smart-contracts.js';

export const getPresaleDetails = async presaleAddressesAndTokenAddresses => {
  const multicall = new Multicall({
    multicallCustomContractAddress:
      '0xA8F8BECb830d963e5CA01352b2ecFbA96f04E918',
    web3Instance: defaultWeb3,
    tryAggregate: true,
  });

  const presaleAddresses = presaleAddressesAndTokenAddresses[0];
  console.log('presaleAddresses: ', presaleAddresses);
  const tokenAddresses = presaleAddressesAndTokenAddresses[1];
  console.log('tokenAddresses: ', tokenAddresses);

  if (presaleAddresses.length === 0) return [];
  console.log(
    'presaleAddressesAndTokenAddresses: ',
    presaleAddressesAndTokenAddresses,
  );

  const calls1 = presaleAddresses.map(addr => ({
    methodName: 'getPresaleDetails',
    methodParameters: [addr],
  }));

  const calls2 = tokenAddresses.map(addr => ({
    methodName: 'getTokenName',
    methodParameters: [addr],
  }));

  const calls3 = tokenAddresses.map(addr => ({
    methodName: 'getTokenSymbol',
    methodParameters: [addr],
  }));

  const calls4 = presaleAddresses.map(addr => ({
    methodName: 'getPresaleMediaLinks',
    methodParameters: [addr],
  }));

  const contractCallContext = [
    {
      reference: 'PresaleFactoryCall1',
      contractAddress: presaleFactoryAddress,
      abi: presaleFactoryAbi,
      calls: calls1,
    },
    {
      reference: 'PresaleFactoryCall2',
      contractAddress: presaleFactoryAddress,
      abi: presaleFactoryAbi,
      calls: calls2,
    },
    {
      reference: 'PresaleFactoryCall3',
      contractAddress: presaleFactoryAddress,
      abi: presaleFactoryAbi,
      calls: calls3,
    },
    {
      reference: 'PresaleFactoryCall4',
      contractAddress: presaleFactoryAddress,
      abi: presaleFactoryAbi,
      calls: calls4,
    },
  ];

  const results = await multicall.call(contractCallContext); // can log it in json file to see output structure

  const presales = results.results[
    'PresaleFactoryCall1'
  ].callsReturnContext.map((obj, i) => {
    const [
      [tokenX, lpTokenX, tokenXLocker, lpTokenXLocker],

      [
        tokenXSupply,
        tokenXBalance,
        tokenXLockerBalance,
        tokenXUnlockAtTime,
        lpTokenXBalance,
        lpTokenXLockerBalance,
        lpTokenXUnlockAtTime,
        tokenXSold,
        rate,
        amountTokenXToBuyTokenX,
        presaleClosedAt,
        tier,
      ],

      [
        presaleIsRejected,
        presaleIsApproved,
        presaleAppliedForClosing,
        tokenXUnlockRequestMade,
        tokenXUnlockRequestAccepted,
        lpTokenXUnlockRequestMade,
        lpTokenXUnlockRequestAccepted,
      ],
    ] = obj.returnValues;

    return {
      presaleAddress: presaleAddresses[i],
      tokenXName:
        results.results['PresaleFactoryCall2'].callsReturnContext[i]
          .returnValues[0],
      tokenXSymbol:
        results.results['PresaleFactoryCall3'].callsReturnContext[i]
          .returnValues[0],
      tokenXSupply,
      tokenX,
      lpTokenX,
      tokenXLocker,
      lpTokenXLocker,
      tokenXBalance,
      lpTokenXBalance,
      tokenXLockerBalance,
      tokenXUnlockAtTime,
      lpTokenXLockerBalance,
      lpTokenXUnlockAtTime,
      tokenXSold,
      rate,
      amountTokenXToBuyTokenX,
      presaleClosedAt,
      tier,
      presaleIsRejected,
      presaleIsApproved,
      presaleAppliedForClosing,
      tokenXUnlockRequestMade,
      tokenXUnlockRequestAccepted,
      lpTokenXUnlockRequestMade,
      lpTokenXUnlockRequestAccepted,
      presaleMediaLinks:
        results.results['PresaleFactoryCall4'].callsReturnContext[i]
          .returnValues[0],
    };
  });

  return presales;
};

export const getPresalesNotApprovedAddresses = async (
  index = 0,
  amountToFetch = 10,
) =>
  await getContractPresaleFactory()
    .methods.getPresales(index, amountToFetch, false)
    .call();

export const getPresalesApprovedAddresses = async (
  index = 0,
  amountToFetch = 10,
) =>
  await getContractPresaleFactory()
    .methods.getPresales(index, amountToFetch, true)
    .call();

export const getPresalesApproved = async () =>
  await getPresaleDetails(await getPresalesApprovedAddresses());

export const getPresalesNotApproved = async () =>
  await getPresaleDetails(await getPresalesNotApprovedAddresses());
