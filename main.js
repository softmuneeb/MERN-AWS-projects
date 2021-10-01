const searchInFolder = './someFolder/';
const file = 'bg1.png';

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
// https://gist.github.com/MarkoCen/0ee9437439e00e313926
(async () => {
  handleCode(async () => {
    const content = fs.readFile(searchInFolder + file, 'base64');

    const ipfs = await IPFS.create();
    let { cid } = await ipfs.add(content);
    const hash = cid + '';

    const pinata = pinataSDK(PINATA_API_KEY, PINATA_API_SECRET);
    await pinata.testAuthentication();
    await pinata.pinByHash(hash);

    // save hash to a file
    console.log('hash: ', hash);

    console.log('Done. Alhamdulliah. Thanks Allah.');
  });
})();
