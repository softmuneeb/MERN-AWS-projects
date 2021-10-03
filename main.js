const inputFolderPath = './images/';

import { handleCode } from './helper.js';
import { create, globSource } from 'ipfs';

(async () => {
  handleCode(async () => {
    const ipfs = await create();

    for await (const file of ipfs.addAll(globSource(inputFolderPath, '**/*'))) {
      console.log(file);
    }

    console.log('Done. Alhamdulliah. Thanks Allah.');
  });
})();
