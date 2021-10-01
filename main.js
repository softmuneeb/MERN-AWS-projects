import * as IPFS from 'ipfs-core';
import pinataSDK from '@pinata/sdk';
import { PINATA_API_KEY, PINATA_API_SECRET } from './secret.js';

const handleCode = async func => {
  try {
    await func();
  } catch (e) {
    console.log('e: ', e);
  }
};

(async () => {
  const ipfs = await IPFS.create();
  const { cid } = await ipfs.add('Hello world');
  console.log('\n\n\n');
  console.log(cid);

  // handleCode(async () => {
  //   const pinata = pinataSDK(PINATA_API_KEY, PINATA_API_SECRET);
  //   await pinata.testAuthentication();
  //   await pinata.pinByHash('QmNRCQWfgze6AbBCaT1rkrkV5tJ2aP4oTNPb5JZcXYywve');
  // });
})();
