import { copyFile, promises, writeFile } from "fs";

// code converts file name to metadata i.e makes { trait_type: "Color 2", value: "Copper" } from "basic_1_Caribbean Green_Copper_Deep Sea_Honey Flower_Endeavour_Husk_193321_i_0_(15_2p0_2p0_0p5_4_0p15_0p0_128_2_5_2_10L-(_2)_111415"
// also this code adds ipfs image link to metadata

// how to run it
// open this folder in vs code
// make 3 folders written below on l
// in terminal: node genMetadata.js


// plan
// step 1, get file names, traits file variable with all clothes info merged
// get all 10k imgs folder
// for every img take out traits
// save in file
// QmSLjHCZVF6fHT8PiEFW96X7nV8MMfMbMLJU5wFZt3P3QY


const startTokenId = 1;
const imgExtension = ".png";
const imagesFolder = "./imagesForMetadata/";
const imgNumberedFolder = "./imagesNumbered/";
const ipfsImagesFolder = "ipfs://QmSLjHCZVF6fHT8PiEFW96X7nV8MMfMbMLJU5wFZt3P3QY/";

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
  writeFile("metadataFromImgFileNames/" + i, JSON.stringify({ image: ipfsImagesFolder + i, attributes }, null, 4), (e) => e && console.log(e));
  copyFile(imagesFolder + file, imgNumberedFolder + i + imgExtension, (e) => e && console.log(e));
};

const files = await promises.readdir(imagesFolder);

files.map((file, i) => genMetadata(file, i + startTokenId));
