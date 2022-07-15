import { getNftTrades } from './getNftTrades.js';
import { ETH_URL_MAINNET, NFT_ABI, NFT_ADDRESS } from './secret.js';

const trades = await getNftTrades(ETH_URL_MAINNET, NFT_ABI, NFT_ADDRESS, 15148168-10000, 15148168);
console.log(trades);
