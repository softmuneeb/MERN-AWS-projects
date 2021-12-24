import { nftBuyBot } from './nftBot.js';
import { minutes } from './utils.js';
import { PV_KEYS } from './secret.js';

const startAccId = 5,
  endAccId = 7,
  waitInSecondsFrom = 1 * minutes,
  waitInSecondsTo = 2 * minutes;

nftBuyBot(startAccId, endAccId, waitInSecondsFrom, waitInSecondsTo, PV_KEYS);

// import { nftBuyBot } from './nftBot.js';
// import { PV_KEYS } from './secret2.js';
// const startAccId = 72,
//   endAccId = 74,
//   waitInSecondsFrom = 1,
//   waitInSecondsTo = 2;

// nftBuyBot(startAccId, endAccId, waitInSecondsFrom, waitInSecondsTo, PV_KEYS);
