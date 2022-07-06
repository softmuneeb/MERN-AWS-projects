import fs from 'fs';
import { nftBuyBot } from './nftBot.js';
import { minutes } from './utils.js';
import { PV_KEYS } from './secret.js';

let accIdToUse = Number('' + fs.readFileSync('accIdToUse'));
let numOfAccountsToUse = 1;

const startAccId = accIdToUse,
  endAccId = accIdToUse + numOfAccountsToUse,
  waitInSecondsFrom = 0 * minutes,
  waitInSecondsTo = 0 * minutes;

nftBuyBot(startAccId, endAccId, waitInSecondsFrom, waitInSecondsTo, PV_KEYS);
