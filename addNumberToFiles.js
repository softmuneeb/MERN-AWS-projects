import { rename, promises } from "fs";

const someThing = (searchInFolder, file) => {
  let fileNumber = Number(file.replace(".png", "")) + 0;
  if (isNaN(fileNumber)) console.log({ file });
  rename(
    searchInFolder + file,
    searchInFolder + fileNumber + ".png",
    (e) => e && console.log(e.message),
  );
};

export const addNumberToFiles = async (searchInFolder) => {
  const files = await promises.readdir(searchInFolder);
  for (let file of files) someThing(searchInFolder, file);
};
