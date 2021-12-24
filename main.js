import { nftBuyBot } from './nftBot.js';
import { minutes } from './utils.js';

const startAccId = 1,
  endAccId = 3,
  waitInSecondsFrom = 15 * minutes,
  waitInSecondsTo = 30 * minutes;

nftBuyBot(startAccId, endAccId, waitInSecondsFrom, waitInSecondsTo);
