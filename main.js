// ============== Driver Code

import { uploadIpfsFile, uploadIpfsText } from './uploadIpfs.js';
import fs from 'fs';

const init = async () => {
  // input path
  const folderPath = './someFolder/';
  const fileName = 'bg2.png';
  const path = folderPath + fileName;

  // read file content
  const content = fs.readFileSync(path);

  // upload
  const hash = await uploadIpfsFile(content);
  // const hash = await uploadIpfsText('Done. Alhamdulliah. Thanks Allah.');
  console.log('hash: ', hash);
  console.log('Done. Alhamdulliah. Thanks Allah.');
};

init();
