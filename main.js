const fs = require('fs');
const dir = "./images";
const err = (e) => e && console.log(e.message);

const init = async () => {
  const files = await fs.promises.readdir(dir);
  console.log("files ", files[0]);

  for (const file of files) {
    console.log(file);
  }
};

init();
