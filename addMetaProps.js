import { promises, readFileSync, writeFile } from "fs";
const searchInFolder = "./snowies metadata 10,030/";
const imagesFolderHash = "QmazfNQJ6Cnx6SvWgKEN4ZwgQKncGCmsHRBY1uzJfSZEFH";
const tokenName = "Snow Doodle";
const description = "Unique doodle collectibles on Avax";
const external_url = "https://snowiesclub.com/";

const init = async () => {
  const files = await promises.readdir(searchInFolder);

  for (const file of files) {
    const filePath = searchInFolder + file;
    const content = readFileSync(filePath);
    let metadata = JSON.parse(content);

    metadata.name = `${tokenName} #${file}`;
    metadata.image = `ipfs://${imagesFolderHash}/${file}.png`;
    metadata.description = description;
    metadata.external_url = external_url;

    writeFile(
      filePath,
      JSON.stringify(metadata, null, 4),
      (e) => e && console.log(e.message),
    );
  }
};

init();
