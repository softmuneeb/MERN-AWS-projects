// code converts metadata i.e { clothes: 2 } -> { shirt: blue, pant: green}, i.e id to actual clothes

// plan
// step 1, get file names, traits file variable with all clothes info merged
// get all 10k imgs folder
// for every img take out traits
// save in file
// QmSLjHCZVF6fHT8PiEFW96X7nV8MMfMbMLJU5wFZt3P3QY

import { copyFile, promises, writeFile } from "fs";

const startTokenId = 1;
const imgExtension = ".png";
const ipfsImgFolder = "./imagesForMetadata/";
const imgNumberedFolder = "./imagesNumbered/";
const imagesFolder = "ipfs://QmSLjHCZVF6fHT8PiEFW96X7nV8MMfMbMLJU5wFZt3P3QY/";

const genMetadata = (file, i) => {
  let f = file.split("_");

  let attributes = [];
  attributes.push({ trait_type: "Basic", value: f[1] });
  attributes.push({ trait_type: "Color 1", value: f[2] });
  attributes.push({ trait_type: "Color 2", value: f[3] });
  attributes.push({ trait_type: "Color 3", value: f[4] });
  attributes.push({ trait_type: "Color 4", value: f[5] });
  attributes.push({ trait_type: "Color 5", value: f[6] });
  attributes.push({ trait_type: "Color 6", value: f[7] });
  writeFile("metadataFromImgFileNames/" + i, JSON.stringify({ image: imagesFolder + i, attributes }, null, 4), (e) => e && console.log(e));
  copyFile(ipfsImgFolder + file, imgNumberedFolder + i + imgExtension, (e) => e && console.log(e));
};

const files = await promises.readdir(ipfsImgFolder);

files.map((file, i) => genMetadata(file, i + startTokenId));
