// import * as IPFS from 'ipfs-core';
import pinataSDK from '@pinata/sdk';
import { PINATA_API_KEY, PINATA_API_SECRET } from './secret2.js';

const handleCode = async func => {
  try {
    await func();
  } catch (e) {
    // console.log('e: ', e.message.substring(0, 100));
    console.log('e: ', e.message);
  }
};

export const uploadIpfsText = async text => {
  // ipfs get connection
  // const ipfs = await IPFS.create();

  // // ipfs upload file
  // const { cid } = await ipfs.add(text);
  // const hash = cid + '';
  // console.log('hashO: ', hash);

  // pinata login
  const pinata = pinataSDK(PINATA_API_KEY, PINATA_API_SECRET);
  await pinata.testAuthentication();
  const a = await pinata.pinList({ pageLimit: 400 });

  a.rows.map((r, i) => {
    // console.log(r.date_pinned, r.size, r.ipfs_pin_hash, i);
    console.log(r.ipfs_pin_hash);
  });

  // pinata pin file
  // await pinata.pinByHash(hash);

  // return hash;
};
