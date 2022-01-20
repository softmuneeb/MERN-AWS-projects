import { promises, readFileSync, writeFile } from "fs";
const searchInFolder = "./metadataGenerated/";
const imagesFolderHash = "QmNdEdcdZWrT6Ltg2yMHsKiHAR3PF1H3ze9bxqUCVvUGW7";
const tokenName = "Cheeky Cougar";
// const description = "Unique doodle collectibles on Avax";
const external_url = "https://www.cheekycougarclub.com/";

const init = async () => {
  const files = await promises.readdir(searchInFolder);

  for (const file of files) {
    // console.log("file ", file);
    if (file === ".DS_Store") continue;

    const filePath = searchInFolder + file;
    const content = readFileSync(filePath);

    let metadata;
    try {
       metadata = JSON.parse(content);
      
    } catch (err) {
      console.log({ filePath });;
    }

    metadata.name = `${tokenName} #${file}`;
    metadata.image = `ipfs://${imagesFolderHash}/${file}.jpg`;
    // metadata.description = description;
    metadata.external_url = external_url;
    // console.log({ metadata });
    // metadata.attributes = [
    //   ...metadata.attributes,
    //   {
    //     trait_type: "Merged",
    //     value: "SZN1",
    //   },
    // ];

    writeFile(
      "./metadataGenerated1/" + file,
      JSON.stringify(metadata, null, 4),
      (e) => e && console.log(e.message),
    );
    // return;
  }
};

init();
