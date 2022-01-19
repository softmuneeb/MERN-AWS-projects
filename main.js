import fs from "fs";

const init = async () => {
  let json = fs.readFileSync("traits.json");
  console.log({ json });
};

init();
