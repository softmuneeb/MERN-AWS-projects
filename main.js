const fs = require('fs');

const init = async () => {
  try {
    const files = await fs.promises.readdir('.');
    for (const file of files) {
      fs.rename(file, file.replace('.json', ''), function (err) {
        if (err) console.log('ERROR: ' + err.message + err);
      });
    }
  } catch (e) {
    console.error("We've thrown! Whoops!", e.message);
  }
};

init();
