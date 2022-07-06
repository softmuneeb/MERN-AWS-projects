/*
1. simple program run and sale done. get gas price.
2. 5 transactions with different accounts. each transaction 5 sec diff. each accounts transfers remain eth, to next account.
3. random differnce in time. 1 sec to 20 sec. log sec wait. random between 5 min to 60 min.
4. maintain logs data in files. tokenId bought by which account.
5. send the code to chris. startServer(delay="10min",startFromAccNumber="0",)

how to handle try catch in all app, handle so many rejections
*/

import fs from 'fs';
import { buyNft } from './apis.js';
import { chainIdName } from './smart-contracts.js';
import { log, random, seconds, sleep } from './utils.js';

export const nftBuyBot = async (
  start,
  end,
  waitInSecondsFrom,
  waitInSecondsTo,
  PV_KEYS
) => {
  log('Assalamo Alaikum. server on ' + chainIdName + ' ' + new Date(), 4);
  console.log('start');
  
  for (let accId = start; accId < end; accId++) {
    await buyNft(PV_KEYS[accId], PV_KEYS[accId + 1], accId);
    
    fs.writeFileSync('accIdToUse', '' + (accId + 1));

    const wait = random(waitInSecondsFrom, waitInSecondsTo);
    log(`wait ${wait} seconds`, 1);
    await sleep(wait * seconds);
  }
  
  console.log('stop');
  log('loop end');
};

// init();
