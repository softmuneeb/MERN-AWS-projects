// this code generates metadata
// metadata is according to opensea standards
import { writeFile } from "fs/promises";

// some settings for the code
// const tokenIdFrom = 1;
// const tokenIdTo = 3000;

// const tokenIdFrom = 3001;
// const tokenIdTo = 6000;

// const tokenIdFrom = 6001;
// const tokenIdTo = 9000;

const tokenIdFrom = 1;
const tokenIdTo = 5304;

const emptyImageHash = "QmQTCYRHHGdyj3wtGeRsMo9uNA3tWF1ShL4fXGqmLG5dVy";
const external_url = "https://dsopnft.com/";
const outputFolder = "./metadataEmpty/";
const tokenName = "DSOP";
const description =
  "Decentraland $eries Of Poker is a private collection of 5,304 NFTs-digital collectibles. D$oP owners have access to an amazing list of utility and benefits.";

let metadata = {
  image: `ipfs://${emptyImageHash}`,
  external_url,
  description,
};

for (let tokenId = tokenIdFrom; tokenId <= tokenIdTo; tokenId++) {
  metadata = { ...metadata, name: `${tokenName} #` + tokenId };
  writeFile(outputFolder + tokenId, JSON.stringify(metadata, null, 4), (e) => e && console.log(e));
}

console.log("Done, Thanks to Allah.");

// demo
// {
//   "description": "Friendly OpenSea Creature that enjoys long swims in the ocean.",
//   "external_url": "https://openseacreatures.io/3",
//   "image": "https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png",
//   "name": "Dave Starbelly",
//   "attributes": [ ... ],
// }
