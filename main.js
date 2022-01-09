const fs = require('fs');
const dir = "./snowies 30/";
const err = (e) => e && console.log(e.message);

const init = async () => {
  const files = await fs.promises.readdir(dir);
  console.log("files ", files[0]);
  for (const file of files) {
    fs.rename(dir + file, dir + file.replace("Snowies Limited #", ""), err);
    // break;
  }
};

init();
