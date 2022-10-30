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
// what does this code do?
// this code generates metadata by reading traits.json
// metadata is according to opensea standards

const tokenIdFrom = 1;
const tokenIdTo = 1000;

const emptyImageHash = 'https://bafybeiaw3iq3be2xjfjxyowd5cchvg7jhzhzepuxlg7fs557hcgr4drwji.ipfs.nftstorage.link/morph-mint.gif';
const external_url = 'https://morphgenesis.com/';
const outputFolder = "./metadataEmpty/";
const tokenName = "Morph";
const description = 'Morph is an NFT collection of 1000 charming creatures. Clumsy, Endearing and adorable each of them has their own personality.';

let metadata = {
  image: emptyImageHash,
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
