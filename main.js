import { getNftTrades } from './getNftTrades.js';
import { ETH_URL_MAINNET, NFT_ABI, NFT_ADDRESS } from './secret.js';

// await getNftTrades(ETH_URL_MAINNET, NFT_ABI, NFT_ADDRESS, 14748168, 15148168);
// await getNftTrades(ETH_URL_MAINNET, NFT_ABI, NFT_ADDRESS, 14748168, 14748168 + 100);
await getNftTrades(ETH_URL_MAINNET, NFT_ABI, NFT_ADDRESS, 13975838, 13975838 + 16000);
// console.log(trades);                    //15148168-400000=14748168    15000000  15000000
