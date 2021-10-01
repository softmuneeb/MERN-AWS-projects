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
    const ipfs = await IPFS.create();
    let { cid } = await ipfs.add('Alhamdulliah');
    const hash = cid + '';

    const pinata = pinataSDK(PINATA_API_KEY, PINATA_API_SECRET);
    await pinata.testAuthentication();
    await pinata.pinByHash(hash);

    // save hash to a file
    console.log('hash: ', hash);

    console.log('Done. Alhamdulliah. Thanks Allah.');
  });
})();
