const { promises, readFileSync, writeFile } = require('fs');
const searchInFolder = './someFolder/';

const init = async () => {
  try {
    const files = await promises.readdir(searchInFolder);

    for (const file of files) {
      if (isNaN(file)) continue;
      const filePath = searchInFolder + file;
      console.log('file: ', file);
      try {
        const content = readFileSync(filePath);
        let metadata = JSON.parse(content);
        delete metadata.sardineTokenIdUsed;
        delete metadata.tokenId;
        delete metadata.tokenIdBurned;
        writeFile(filePath, JSON.stringify(metadata, null, 4), () => {});
      } catch (e) {
        e && console.error('whoops ', e.message);
      }
    }
  } catch (e) {
    e && console.error("We've thrown! Whoops!", e.message);
  }
};

init();
