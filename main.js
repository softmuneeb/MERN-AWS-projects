import { getNftHolders } from "./multicall.js";

const holders = await getNftHolders(); // 2 sec to 5 sec delay in result

// console.log(JSON.stringify(holders, null, 4).replaceAll("\n", "").replaceAll("   ", ""));
// console.log(JSON.stringify(holders, null, 4).replaceAll('"', "").replaceAll("[", "").replaceAll("]", "").replaceAll("\n", "").replaceAll("   ", ""));
console.log(holders.length, JSON.stringify(holders, null, 4));