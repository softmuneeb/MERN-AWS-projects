import * as IPFS from 'ipfs-core';
import pinataSDK from '@pinata/sdk';
import { PINATA_API_KEY, PINATA_API_SECRET } from './secret.js';

(async () => {
  const pinata = pinataSDK(PINATA_API_KEY, PINATA_API_SECRET);
  const ipfs = await IPFS.create();
  const { cid } = await ipfs.add('Hello world');
  console.info(cid);

  try {
    const res = await pinata.testAuthentication();
    console.log('res: ', res);
  } catch (e) {
    console.log('e: ', e.message);
  }
})();
