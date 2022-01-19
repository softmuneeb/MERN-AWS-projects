import fs from "fs";

const init = async () => {
  let json = fs.readFileSync("traits.json", 'utf8');
  console.log({ json: json[0].Background });
};

init();
