const fs = require('fs');
const searchInFolder = './someFolder/';

const init = async () => {
  try {
    const files = await fs.promises.readdir(searchInFolder);
    for (let file of files) {
      console.log('file: ', file);
      try {
        const content = fs.readFileSync(searchInFolder + file, 'utf8');
        // const fixedContent = fixedContent;//content.split(find).join(replace);
        file = Number(file) + 479;
        fs.writeFile(searchInFolder + file, content, () => {});
      } catch (e) {
        console.error('whoops ', e.message);
      }
    }
  } catch (e) {
    console.error("We've thrown! Whoops!", e.message);
  }
};

init();
