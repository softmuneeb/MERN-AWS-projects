// what does this code do?
// this code generates metadata by reading traits.json
// metadata is according to opensea standards

// make folder metadataGenerated and provide file traits.json


// some settings for the code
const imagesFolderHash = "QmaCdeGScsSekFoNHCoWWremBtW5KCCoRXmqveNsfJmWri";
const tokenName = "Avian Avatar";
const external_url = "https://eth.bird.money/";
const imgExt = ".png";
const inputFileName = "./traits.json";
const outputFolder = "./metadataGenerated/";

// dependencies
import { readFileSync, writeFile } from "fs";

// utils
const tokenIdStr = "tokenId";
const fileContent = readFileSync(inputFileName);
const jsonTraits = JSON.parse(fileContent);
jsonTraits.map((tokenMetadata) => {
  let attributes = [];
  const tokenId = tokenMetadata[tokenIdStr];
  const traits = Object.keys(tokenMetadata);
  traits.map((trait) => {
    if (trait !== tokenIdStr && trait !== "ok" && trait !== "rarity" && tokenMetadata[trait] !== "empty") {
      attributes.push({ trait_type: trait, value: tokenMetadata[trait] });
    }
  });

  const metadata = {
    name: `${tokenName} #${tokenId}`,
    image: `ipfs://${imagesFolderHash}/${tokenId}${imgExt}`,
    external_url,
    attributes,
  };

  // save data in file
  const outputFile = outputFolder + tokenId;
  writeFile(outputFile, JSON.stringify(metadata, null, 4), (e) => {
    e && console.log(e);
  });
});

console.log("Done, Thanks to Allah.");

// demo
// {
//   "description": "Friendly OpenSea Creature that enjoys long swims in the ocean.",
//   "external_url": "https://openseacreatures.io/3",
//   "image": "https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png",
//   "name": "Dave Starbelly",
//   "attributes": [ ... ],
// }

// {
//   "image": "ipfs://QmQWEJcvfEZnQuGzHTRgZuF2bFcRc341Sjs7Aa99dKDexm/480.png",
//   "attributes": [
//     { "trait_type": "Background", "value": "Space" },
//     { "trait_type": "Skin", "value": "Purple Blue" },
//     { "trait_type": "Eyes", "value": "Angry" },
//     { "trait_type": "Mouth", "value": "Bastard" },
//     { "trait_type": "Outfit", "value": "Astronaut" },
//     { "trait_type": "Accessories", "value": "Gold Hoop" }
//   ]
// }
