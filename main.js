// import HTMLtoDOCX from "html-to-docx";
/*
1. simple program run and sale done. get gas price.
2. 5 transactions with different accounts. each transaction 5 sec diff. each accounts transfers remain eth, to next account.
3. random differnce in time. 1 sec to 20 sec. log sec wait. random between 5 min to 60 min.
4. maintain logs data in files. tokenId bought by which account.
5. send the code to chris. startServer(delay="10min",startFromAccNumber="0",)

how to handle try catch in all app, handle so many rejections
*/

import dotenv from 'dotenv';
import { buyNft } from './apis.js';
import { PV_KEYS } from './secret.js';
import { chainIdName } from './smart-contracts.js';
import { log } from './utils.js';
dotenv.config();

const init = async () => {
  log('Assalamo Alaikum. starting server on ' + chainIdName + ' ' + new Date());

  await buyNft(PV_KEYS[2], PV_KEYS[3]);
};

init();
