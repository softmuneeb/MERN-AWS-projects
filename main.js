const fs = require('fs');

const init = async () => {
  try {
    const files = await fs.promises.readdir('.');
    for (const file of files) {
      console.log('file: ', file);
    }
  } catch (e) {
    console.error("We've thrown! Whoops!", e.message);
  }
};

init();
