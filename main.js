import { getNftTokensForAddress } from "./multicall.js";
import { getContractNft } from "./smart-contract.js";

let log = [];
log.push(Date());
// log.push(Date());
// tru with bp comic
const res1 = await getNftTokensForAddress("0x29f9ef8286dcc4f9a94340278db01f12c3483988"); // 2 sec to 5 sec delay in result
log.push(Date());
const res = await getContractNft().methods.walletOfOwner("0x29f9ef8286dcc4f9a94340278db01f12c3483988").call(); // 1 to 2 sec delay
// log.push("res: ", res);
log.push(Date());
console.log(log);
