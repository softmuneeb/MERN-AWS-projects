import { Multicall } from "ethereum-multicall";
import { defaultWeb3, getContractNft, multicallCustomContractAddress, nftAbi, nftAddress, stakingAbi, stakingAddress } from "./smart-contract.js";

export const getTokenIdsInStaking = async () => {
  const multicall = new Multicall({
    multicallCustomContractAddress,
    web3Instance: defaultWeb3,
    tryAggregate: true,
  });

  let calls1 = [];

  let nftStakedTotal = await getContractNft().methods.balanceOf(stakingAddress).call();
  let pillow = 350;
  for (let i = 0 + pillow; i < 50 + pillow; i++) {
    calls1.push({
      methodName: 'tokenOfOwnerByIndex',
      methodParameters: [stakingAddress, i],
    });
  }

  const contractCallContext = [
    {
      reference: 'Call1',
      contractAddress: nftAddress,
      abi: nftAbi,
      calls: calls1,
    },
  ];

  const results = await multicall.call(contractCallContext);

  // console.log(JSON.stringify(results));

  let holders = [];
  results.results['Call1'].callsReturnContext.map((obj, i) => obj.success && holders.push(obj.returnValues[0]));

  // console.log(JSON.stringify(results.results['Call1'].callsReturnContext, null, 4));

  return holders;
};

export const getTokenIdsInStakingOfThisAddress = async () => {
  const tokenIdsInStaking = await getTokenIdsInStaking();
  
  const multicall = new Multicall({
    multicallCustomContractAddress,
    web3Instance: defaultWeb3,
    tryAggregate: true,
  });

  let calls1 = [];

  // let nftStakedTotal = await getContractNft().methods.balanceOf(stakingAddress).call();
  let nftOwnerWallet = '0x2B7574F25c68bc274CC4857658b63F12fcBdf29A';
  for (let i = 0; i < 50; i++) {
    calls1.push({
      methodName: 'nftOwnerOf',
      methodParameters: [nftOwnerWallet, Number(tokenIdsInStaking[i].hex)],
    });
  }

  const contractCallContext = [
    {
      reference: 'Call1',
      contractAddress: stakingAddress,
      abi: stakingAbi,
      calls: calls1,
    },
  ];

  const results = await multicall.call(contractCallContext);

  // console.log(JSON.stringify(results));

  let zero = '0x0000000000000000000000000000000000000000';

  let holders = [];
  results.results['Call1'].callsReturnContext.map((obj, i) => obj.success && obj.returnValues[0] !== zero && holders.push(obj.returnValues[0]));

  console.log(holders);

  return holders;
};
