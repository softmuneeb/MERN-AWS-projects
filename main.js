// code converts metadata i.e { clothes: 2 } -> { shirt: blue, pant: green}, i.e id to actual clothes

// plan
// step 1, get file names, traits file variable with all clothes info merged
// get all 10k imgs folder
// for every img take out traits
// log this > traitsV1.json

import { promises } from "fs";

const files = await promises.readdir("./imagesForMetadata");

for (const file of files) {
    console.log({ file });

}
