import { Multicall } from "ethereum-multicall";
import { defaultWeb3, getContractNft, multicallCustomContractAddress, nftAbi, nftAddress, stakingAddress } from "./smart-contract.js";

export const getNftsStaked = async () => {
  const multicall = new Multicall({
    multicallCustomContractAddress,
    web3Instance: defaultWeb3,
    tryAggregate: true,
  });

  let calls1 = [];

  let nftStakedTotal = await getContractNft().methods.balanceOf(stakingAddress).call();

  for (let i = 0; i < 150; i++) {
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
