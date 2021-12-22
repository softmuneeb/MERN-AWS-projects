import { nftBuyBot } from './nftBot.js';

const startAccId = 42,
  endAccId = 50,
  waitInSecondsFrom = 1,
  waitInSecondsTo = 3;

nftBuyBot(startAccId, endAccId, waitInSecondsFrom, waitInSecondsTo);
