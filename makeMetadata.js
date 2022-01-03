/*
get rows of csv as objs
for each obj make a new file

open all files, use script in img-gen, img-gen new, bird branch
add image
add name
add description
*/
import csvtojson from "csvtojson";
import fs from "fs";

const getMetadataFromObj = (obj) => {
  let attributes = [];

  // get each trait
  const traits = Object.keys(obj);
  traits.map((trait) => {
    if (
      trait !== "tokenId" &&
      trait !== "tokenIdBurned" &&
      obj[trait] !== undefined &&
      obj[trait] !== null
    ) {
      attributes.push({ trait_type: trait, value: obj[trait] });
    }
  });

  // remove spaces and comma at end of attributes
  const metadata = {
    attributes,
  };

  return JSON.stringify(metadata, null, 4);
};

// Snow Doodle #10.png ===>>> 10
const see = (f) => f.replace("Snow Doodle #", "").replace(".png", "");

const init = async () => {
  let rows = await csvtojson().fromFile("SnowiesMetadata.csv");
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    let { Background, Body, Head, Hair, Face, Neck } = row;
    let obj = { Background, Body, Head, Hair, Face, Neck };
    let metadata = getMetadataFromObj(obj);
    let fileNum = see(row["File Name"]);
    if (isNaN(fileNum)) console.log("error");
    fs.writeFile(`output/${fileNum}`, metadata, (e) => e && console.log(e));
  }
};

init();

/*
{
  'File Name': 'Snow Doodle #1.png',
  Background: 'Orange 1',
  Body: 'Skinny Green 1',
  Head: 'Snowman',
  Hair: 'Grease 3',
  Face: 'Saddie 1',
  Neck: 'Warm Orange 1'
}
{
    "attributes": [
        {
            "trait_type": "Background",
            "value": "Orange 1"
        },
        {
            "trait_type": "Body",
            "value": "Skinny Green 1"
        },
        {
            "trait_type": "Head",
            "value": "Snowman"
        },
        {
            "trait_type": "Hair",
            "value": "Grease 3"
        },
        {
            "trait_type": "Face",
            "value": "Saddie 1"
        },
        {
            "trait_type": "Neck",
            "value": "Warm Orange 1"
        }
    ]
}
*/
