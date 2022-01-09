import { promises, readFileSync, writeFile } from "fs";
const searchInFolder = "./scriptsOutputs/metadatasRearranged/";
const tokenName = "Snow Doodle";
const imagesFolderHash = "QmazfNQJ6Cnx6SvWgKEN4ZwgQKncGCmsHRBY1uzJfSZEFH";

const init = async () => {
  try {
    const files = await promises.readdir(searchInFolder);

    for (const file of files) {
      const filePath = searchInFolder + file;
      console.log("file: ", file);
      try {
        const content = readFileSync(filePath);
        let metadata = JSON.parse(content);
        metadata.name = `${tokenName} #${file}`;
        metadata.image = `ipfs://${imagesFolderHash}/${file}.png`;
        writeFile(filePath, JSON.stringify(metadata, null, 4), () => {});
      } catch (e) {
        console.error("whoops ", e.message);
      }
    }
  } catch (e) {
    console.error("We've thrown! Whoops!", e.message);
  }
};

init();
