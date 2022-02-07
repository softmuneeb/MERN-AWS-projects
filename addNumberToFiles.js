import { rename, promises } from "fs";
import { copyFile } from "fs/promises";

const someThing = (searchInFolder, file) => {
  let fileNumber = Number(file.replace(".png", "")) + 3;
  if (isNaN(fileNumber)) console.log({ file });
  copyFile(
    searchInFolder + file,
    "./new/" + fileNumber + ".png",
    0,
    (e) => e && console.log(e.message)
  );
};

export const addNumberToFiles = async (searchInFolder) => {
  const files = await promises.readdir(searchInFolder);
  for (let file of files) someThing(searchInFolder, file);
};
