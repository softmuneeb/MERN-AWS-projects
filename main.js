import { getNftTokensForAddress } from "./multicall.js";
import { getContractNft } from "./smart-contract.js";

console.log(Date());
// tru with bp comic
// await getNftTokensForAddress("0xc18e78c0f67a09ee43007579018b2db091116b4c"); // 2 sec to 5 sec delay in result
const res = await getContractNft().methods.walletOfOwner("0x29f9ef8286dcc4f9a94340278db01f12c3483988").call();
console.log("res: ", res);

console.log(Date());
