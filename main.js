import * as IPFS from 'ipfs-core';
import pinataSDK from '@pinata/sdk';
import { PINATA_API_KEY, PINATA_API_SECRET } from './secret.js';

const handleCode = async func => {
  try {
    const res = await func();
    console.log('res: ', res);
  } catch (e) {
    console.log('e: ', e.message);
  }
};

(async () => {
  const pinata = pinataSDK(PINATA_API_KEY, PINATA_API_SECRET);
  //   const ipfs = await IPFS.create();
  //   const { cid } = await ipfs.add('Hello world');
  //   console.info(cid);

  handleCode(async () => await pinata.testAuthentication());
})();
