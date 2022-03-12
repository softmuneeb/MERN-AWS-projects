// code converts metadata i.e { clothes: 2 } -> { shirt: blue, pant: green}, i.e id to actual clothes

// plan
// step 1, get file names, traits file variable with all clothes info merged
// get all 10k imgs folder
// for every img take out traits
// save in file

import { promises, writeFile } from "fs";

const genMetadata = (file, i) => {
  file = file.split("_");

  let attributes = [];
  attributes.push({ trait_type: "Basic", value: file[1] });
  attributes.push({ trait_type: "Color 1", value: file[2] });
  attributes.push({ trait_type: "Color 2", value: file[3] });
  attributes.push({ trait_type: "Color 3", value: file[4] });
  attributes.push({ trait_type: "Color 4", value: file[5] });
  attributes.push({ trait_type: "Color 5", value: file[6] });
  attributes.push({ trait_type: "Color 6", value: file[7] });
  writeFile("metadataFromImgFileNames/" + i, JSON.stringify({ attributes }, null, 4), (e) => e && console.log(e));
};

const files = await promises.readdir("./imagesForMetadata");

files.map((file, i) => genMetadata(file, i));
