// Code work: read traits.json file and add some N to all token ids
// Run like: node main.js > traits-v1.json

import { _tokens_ } from "./6traits.js";

const N = 5895;

let tokens = _tokens_.map((token) => ({
  ...token,
  tokenId: Number(token.tokenId) + N,
}));

console.log(JSON.stringify(tokens, null, 4));
