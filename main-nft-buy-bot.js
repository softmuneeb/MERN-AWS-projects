import { runNftBuyBot } from './nftBot.js';
import { minutes } from './utils.js';
import { PV_KEYS } from './secret.js';

const startAccId = 1,
  endAccId = 2,
  waitInSecondsFrom = 0 * minutes,
  waitInSecondsTo = 0 * minutes;

runNftBuyBot(startAccId, endAccId, waitInSecondsFrom, waitInSecondsTo, PV_KEYS);

// import { nftBuyBot } from './nftBot.js';
// import { PV_KEYS } from './secret2.js';
// const startAccId = 72,
//   endAccId = 74,
//   waitInSecondsFrom = 1,
//   waitInSecondsTo = 2;

// nftBuyBot(startAccId, endAccId, waitInSecondsFrom, waitInSecondsTo, PV_KEYS);
