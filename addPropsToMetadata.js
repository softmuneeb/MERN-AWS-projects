import { promises, readFileSync, writeFile } from "fs";
const searchInFolder = "./output/";
const imagesFolderHash = "QmQULsDNgMK4E3ybstEk93JwshrAfPS22N5s1Rd7eWsBfb";
const tokenName = "Snow Doodle";
const description = "Snow Doodle";
const external_url = "https://snowdoodle.com";

const init = async () => {
  try {
    const files = await promises.readdir(searchInFolder);

    for (const file of files) {
      const filePath = searchInFolder + file;
      try {
        const content = readFileSync(filePath);
        let metadata = JSON.parse(content);

        metadata.name = `${tokenName} #${file}`;
        metadata.image = `ipfs://${imagesFolderHash}/Snow%20Doodle%20%23${file}.png`;
        metadata.description = description;
        metadata.external_url = external_url;

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
