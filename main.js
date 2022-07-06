import fs from 'fs';
import { nftBuyBot } from './nftBot.js';
import { minutes } from './utils.js';
import { PV_KEYS } from './secret.js';
import { PV_KEYS2 } from './secret2.js';

let numOfAccountsToUse = 1;

let accIdToUse = Number('' + fs.readFileSync('accIdToUse'));

nftBuyBot(PV_KEYS, accIdToUse, numOfAccountsToUse, 0 * minutes, 0 * minutes);
nftBuyBot(PV_KEYS2, accIdToUse, numOfAccountsToUse, 0 * minutes, 0 * minutes);
