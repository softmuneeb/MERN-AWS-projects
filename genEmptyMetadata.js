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
const tokenIdTo = 4999;

const emptyImageHash = "QmdkL5BvuRUBdYWKQSCEvNVNFr78f3ZnCRLkVNdRMG7brr";
const external_url = "http://boredsone.com/";
const outputFolder = "./metadataEmpty/";
const tokenName = "Boredsone";
const description =
  "A long-lost spot in the metaverse has been founded by the Boredsone Engineers and a lot of work had gone into making it a magical and incredible place.";

// // some settings for the code
// const imagesFolderHash = "QmNs9B4csb5SMPgfGfKH3EUW7S9ggQpnWsc9BNTP9pVgp4";
// const tokenName = "Golden Ticket";
// const external_url = "https://metadegensociety.io/";
// const imgExt = ".png";
// const inputFileName = "./traits.json";
// const outputFolder = "./output/";

// const tokenIdFrom = 1;
// const tokenIdTo = 1000;
// // Hash of the metadataEmpthy folder = ipfs://QmfKgWoKSDDU1qnLwGuRQq3wfW3fPrue4wEWGNgXfFkZHw/
// const emptyImageHash = "QmNs9B4csb5SMPgfGfKH3EUW7S9ggQpnWsc9BNTP9pVgp4";
// const external_url = "https://metadegensociety.io/";
// const outputFolder = "./metadataEmpty/";
// const tokenName = "Golden Ticket";
// const description = "The golden ticket will allow you to mint a meta degen nft for free"
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
