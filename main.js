import { nftBuyBot } from './nftBot.js';
import { minutes } from './utils.js';
import { PV_KEYS } from './secret2.js';

// const startAccId = 1,
//   endAccId = 3,
//   waitInSecondsFrom = 1 * minutes,
//   waitInSecondsTo = 2 * minutes;

const startAccId = 62,
  endAccId = 64,
  waitInSecondsFrom = 1,
  waitInSecondsTo = 2;

nftBuyBot(startAccId, endAccId, waitInSecondsFrom, waitInSecondsTo, PV_KEYS);
