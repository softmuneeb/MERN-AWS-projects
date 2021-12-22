// import HTMLtoDOCX from "html-to-docx";
/*
1. simple program run and sale done. get gas price.
2. 5 transactions with different accounts. each transaction 5 sec diff. each accounts transfers remain eth, to next account.
3. random differnce in time. 1 sec to 20 sec. log sec wait. random between 5 min to 60 min.
4. maintain logs data in files. tokenId bought by which account.
5. send the code to chris. startServer(delay="10min",startFromAccNumber="0",)

how to handle try catch in all app, handle so many rejections
*/

import { buyNft } from './apis.js';
import { PV_KEYS } from './secret.js';
import { chainIdName } from './smart-contracts.js';
import { log, seconds } from './utils.js';

const init = async () => {
  log('\n\n\n\nAssalamo Alaikum. server on ' + chainIdName + ' ' + new Date());

  for (let accId = 0; accId < 20; accId++) {
    setTimeout(() => {
      buyNft(PV_KEYS[accId], PV_KEYS[accId + 1], accId);
    }, accId * 120 * seconds);
  }
  // setTimeout(() => {
  //   buyNft(PV_KEYS[0], PV_KEYS[0 + 1], 0);
  // }, 0 * 10 * 1000);

  // setTimeout(() => {
  //   buyNft(PV_KEYS[1], PV_KEYS[1 + 1], 1);
  // }, 1 * 10 * 1000);

  // setTimeout(() => {
  //   buyNft(PV_KEYS[2], PV_KEYS[2 + 1], 2);
  // }, 2 * 10 * 1000);
};

init();
