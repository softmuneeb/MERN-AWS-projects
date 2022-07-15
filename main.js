import { getNftTrades } from './getNftTrades.js';
import { ETH_URL_MAINNET, NFT_ABI, NFT_ADDRESS } from './secret.js';

const trades = await getNftTrades(ETH_URL_MAINNET, NFT_ABI, NFT_ADDRESS, 14748168, 15148168);
// console.log(trades);                    //15148168-400000=14748168    15000000  15000000
