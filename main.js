const inputFolderPath = './images/';
// const outputFolderPath = './imagesHashes/';

// const inputFolderPath = './imagesFolder/';
// const outputFolderPath = './imagesHashes/';

import fs from 'fs';
import * as IPFS from 'ipfs-core';
import pinataSDK from '@pinata/sdk';
import { PINATA_API_KEY, PINATA_API_SECRET } from './secret.js';
import { handleCode } from './helper.js';

(async () => {
  handleCode(async () => {
    // the hash which we get after upload file to ipfs
    let hash = '';
    let hashes = '';

    // ipfs get connection
    const ipfs = await IPFS.create();

    // pinata login
    const pinata = pinataSDK(PINATA_API_KEY, PINATA_API_SECRET);
    await pinata.testAuthentication();

    // read all files in a folder
    const files = await fs.promises.readdir(inputFolderPath);

    // for each file
    for (const fileName of files) {
      console.log('fileName: ', fileName);
      const fileContent = fs.readFileSync(inputFolderPath + fileName);

      // upload to ipfs
      const { cid } = await ipfs.add({ file: fileName, content: fileContent });
      hash = cid + '';

      // pin to pinata
      await pinata.pinByHash(hash);
      console.log('pinned hash: ', hash);

      // add hash to hashes to save in a file
      hashes += hash + '\n';
    }

    // save hash to a file
    fs.writeFile('outputHash' + Date.now() + '.txt', hashes, () => {});

    console.log('Done. Alhamdulliah. Thanks Allah.');
  });
})();

// todo
// see file names in form of 1,2,3...
// upload all in 1 folder make easy for metadata set, it cause any problem?
//
// works with both, file and path
// let { cid } = await ipfs.add({ path, content });
// https://gateway.pinata.cloud/ipfs/QmSgbhyTcKBt3VawRTV2cUZRAkCNeoRXNoPUfTHcqRvkwj
// https://gateway.pinata.cloud/ipfs/QmSqJAHsYCe188u8YF16528sR5dso2aYmRp6FL2ug8VarJ/someFolder/bg1.png
//
// https://gist.github.com/MarkoCen/0ee9437439e00e313926
