// ============== Driver Code

import { uploadIpfs } from './uploadIpfs.js';
import fs from 'fs';

const init = async () => {
  // input path
  const folderPath = './';
  const fileName = 'main.js';
  const path = folderPath + fileName;

  // read file content
  const content = fs.readFileSync(path);

  // upload
  await uploadIpfs(content, fileName);
};

init();
