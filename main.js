const folderPath = './someFolder/';
const fileName = 'bg1.png';

import fs from 'fs';
import * as IPFS from 'ipfs-core';
import pinataSDK from '@pinata/sdk';
import { PINATA_API_KEY, PINATA_API_SECRET } from './secret.js';

const handleCode = async func => {
  try {
    await func();
  } catch (e) {
    console.log('e: ', e.message.substring(0, 100));
  }
};
(async () => {
  handleCode(async () => {
    const path = folderPath + fileName;
    const content = fs.readFileSync(path);

    const ipfs = await IPFS.create();
    let { cid } = await ipfs.add({ file: fileName, content });
    const hash = cid + '';

    const pinata = pinataSDK(PINATA_API_KEY, PINATA_API_SECRET);
    await pinata.testAuthentication();
    await pinata.pinByHash(hash);

    // save hash to a file
    console.log('hash: ', hash);

    console.log('Done. Alhamdulliah. Thanks Allah.');
  });
})();

// works with both, file and path
// let { cid } = await ipfs.add({ path, content });
// https://gateway.pinata.cloud/ipfs/QmSgbhyTcKBt3VawRTV2cUZRAkCNeoRXNoPUfTHcqRvkwj
// https://gateway.pinata.cloud/ipfs/QmSqJAHsYCe188u8YF16528sR5dso2aYmRp6FL2ug8VarJ/someFolder/bg1.png
//
// https://gist.github.com/MarkoCen/0ee9437439e00e313926
