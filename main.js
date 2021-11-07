let csvToJson = require('convert-csv-to-json');
const fs = require('fs');
const csvtojsonV2 = require('csvtojson');
let fileInputName = 'NFT.csv';
let fileOutputName = 'myOutputFile.json';

const init = async () => {
  fs.writeFile(
    fileOutputName,
    JSON.stringify(await csvtojsonV2().fromFile(fileInputName)),
    e => e && console.log(e),
  );
};
init();
