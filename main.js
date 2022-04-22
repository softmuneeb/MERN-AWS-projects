import { getNftHolders } from "./multicall.js";

const holders = await getNftHolders("0x29f9ef8286dcc4f9a94340278db01f12c3483988"); // 2 sec to 5 sec delay in result

// console.log(JSON.stringify(holders, null, 4).replaceAll('"', "").replaceAll("[", "").replaceAll("]", "").replaceAll("\n", "").replaceAll("   ", ""));
console.log(JSON.stringify(holders, null, 4));