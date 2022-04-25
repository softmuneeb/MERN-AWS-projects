import { nftBuyBot } from './nftBot.js';
import { minutes } from './utils.js';
import { PV_KEYS } from './secret.js';

const startAccId = 0,
  endAccId = 4,
  waitInSecondsFrom = 0.2 * minutes,
  waitInSecondsTo = 0.4 * minutes;

nftBuyBot(startAccId, endAccId, waitInSecondsFrom, waitInSecondsTo, PV_KEYS);

// import { nftBuyBot } from './nftBot.js';
// import { PV_KEYS } from './secret2.js';
// const startAccId = 72,
//   endAccId = 74,
//   waitInSecondsFrom = 1,
//   waitInSecondsTo = 2;

// nftBuyBot(startAccId, endAccId, waitInSecondsFrom, waitInSecondsTo, PV_KEYS);
