const HTMLtoDOCX = require("html-to-docx");

/*
get rows of csv as objs
for each obj make a new file

open all files, use script in img-gen, img-gen new, bird branch
add image
add name
add description
*/
import csvtojson from 'csvtojson';

const init = async () => {
  let finderObjs = await csvtojson().fromFile(fileInput1);
};

init();
