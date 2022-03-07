import { getPenguinTokensForAddress } from "./multicall.js";

console.log(Date());
await getPenguinTokensForAddress("0xc18e78c0f67a09ee43007579018b2db091116b4c"); // 2 sec to 5 sec delay in result
console.log(Date());
