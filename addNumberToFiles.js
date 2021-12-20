const fs = require('fs');
const searchInFolder = './someFolder/';

const init = async () => {
  try {
    const files = await fs.promises.readdir(searchInFolder);
    for (let file of files) {
      console.log('file: ', file);
      try {
        try {
          let filen = (Number(file.replace('.png', '')) + 479) % 9999;
          fs.copyFile(
            searchInFolder + file,
            searchInFolder + 'new/' + filen + '.png',
            e => e && console.log(e.message)
          );
        } catch (error) {}
      } catch (e) {
        console.error('whoops ', e.message);
      }
    }
  } catch (e) {
    console.error("We've thrown! Whoops!", e.message);
  }
};

init();
