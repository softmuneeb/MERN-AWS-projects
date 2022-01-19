// read traits.json file and add some N to all token ids

import fs from "fs";

const N = 8200;

const init = async () => {
  let tokens = JSON.parse(fs.readFileSync("traits.json", "utf8"));
  // console.log({ json: json[0].Background });

  tokens = tokens.map((token) => ({
    ...token,
    tokenId: Number(token.tokenId) + N,
  }));
  console.log(JSON.stringify(tokens, null, 4));
  // node main.js > traits-v1.json
};

init();
