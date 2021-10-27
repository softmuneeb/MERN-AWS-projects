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

const uploadIpfs = async (content, fileName) => {
  handleCode(async () => {
    // ipfs get connection
    const ipfs = await IPFS.create();

    // ipfs upload file
    const { cid } = await ipfs.add({ content });
    const hash = cid + '';

    // pinata login
    const pinata = pinataSDK(PINATA_API_KEY, PINATA_API_SECRET);
    await pinata.testAuthentication();

    // pinata pin file
    await pinata.pinByHash(hash);

    // save hash to a file
    console.log('hash: ', hash);

    console.log('Done. Alhamdulliah. Thanks Allah.');
  });
};

// Driver Code

// input path
const folderPath = './';
const fileName = 'main.js';
const path = folderPath + fileName;

// read file
const content = fs.readFileSync(path);

uploadIpfs(content, fileName);
