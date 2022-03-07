import {
  bastardPenguinsAbi,
  bastardPenguinsAddress,
  defaultWeb3,
  getContractBastardPenguins,
} from './smart-contract.js';
import { Multicall } from 'ethereum-multicall';
import fs from 'fs';
import { someCalls } from './calls.js';

export const getPenguinTokensForAddress = async someAddress => {
  const multicall = new Multicall({
    multicallCustomContractAddress:
      '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
    web3Instance: defaultWeb3,
    tryAggregate: true,
  });

  // let calls1 = someCalls;

  let calls1 = [];
  for (let i = 0; i <= 50; i++) {
    calls1.push({
      methodName: 'isApprovedOrOwner',
      methodParameters: [someAddress, i],
    });
  }

  // fs.writeFile(
  //   'calls.json',
  //   JSON.stringify(calls1),
  //   e => e && console.log(e.message),
  // );

  // return;
  const contractCallContext = [
    {
      reference: 'SmartContractCall1',
      contractAddress: bastardPenguinsAddress,
      abi: bastardPenguinsAbi,
      calls: calls1,
    },
  ];

  const results = await multicall.call(contractCallContext);

  let tokenIds = [];
  results.results['SmartContractCall1'].callsReturnContext.map(
    (obj, i) => obj.success && tokenIds.push(i),
  );

  console.log('tokenIds: ', tokenIds);

  return tokenIds;
};



// const bastardPenguins = getContractBastardPenguins();
// const res = await bastardPenguins
//   .isApprovedOrOwner('0xc18e78c0f67a09ee43007579018b2db091116b4c', 1)
//   .call();
// console.log('res: ', res);
