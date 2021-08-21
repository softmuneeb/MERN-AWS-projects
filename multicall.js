// nodeUrl: 'https://rinkeby.infura.io/v3/3da1c863472e43d989856450d4e6889d',
// multicallCustomContractAddress: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696'

import { Multicall } from 'ethereum-multicall';
import {
  defaultWeb3,
  getContractPresaleFactory,
  presaleFactoryAbi,
  presaleFactoryAddress
} from './smart-contracts.js';

const getPresaleDetails = async presaleAddresses => {
  const multicall = new Multicall({
    multicallCustomContractAddress:
      '0xA8F8BECb830d963e5CA01352b2ecFbA96f04E918',
    web3Instance: defaultWeb3,
    tryAggregate: true
  });

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

  const presales = results.results.testContract.callsReturnContext.map(
    (obj, i) => {
      const [
        [tokenX, lpTokenX, tokenXLocker, lpTokenXLocker],

        [
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
          tier
        ],

        [
          presaleIsRejected,
          presaleIsApproved,
          presaleAppliedForClosing,
          tokenXUnlockRequestMade,
          tokenXUnlockRequestAccepted,
          lpTokenXUnlockRequestMade,
          lpTokenXUnlockRequestAccepted
        ]
      ] = obj.returnValues;

      return {
        presaleAddress: presaleAddresses[i],
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
        lpTokenXUnlockRequestAccepted
      };
    }
  );
  return presales;
};

export const getPresalesNotApprovedAddresses = async (
  index = 0,
  amountToFetch = 10
) =>
  await getContractPresaleFactory()
    .methods.getPresales(index, amountToFetch, false)
    .call();

export const getPresalesApprovedAddresses = async (
  index = 0,
  amountToFetch = 10
) =>
  await getContractPresaleFactory()
    .methods.getPresales(index, amountToFetch, true)
    .call();

export const getPresalesApproved = async () =>
  await getPresaleDetails(await getPresalesApprovedAddresses());

export const getPresalesNotApproved = async () =>
  await getPresaleDetails(await getPresalesNotApprovedAddresses());
