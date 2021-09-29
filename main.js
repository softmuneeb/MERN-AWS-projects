const fs = require('fs');
const find = 'trait-type';
const replace = 'trait_type';
const searchInFolder = './someFolder/';

const init = async () => {
  try {
    const files = await fs.promises.readdir(searchInFolder);
    for (const file of files) {
      console.log('file: ', file);
      try {
        const content = fs.readFileSync(searchInFolder + file, 'utf8');
        const fixedContent = content.split(find).join(replace);
        fs.writeFile(searchInFolder + file, fixedContent, () => {});
      } catch (e) {
        console.error('whoops ', e.message);
      }
    }
  } catch (e) {
    console.error("We've thrown! Whoops!", e.message);
  }
};

init();
