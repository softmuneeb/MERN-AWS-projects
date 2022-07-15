import { getNftTrades } from './getNftTrades.js';
import { ETH_URL_MAINNET, NFT_ABI, NFT_ADDRESS } from './secret.js';

const trades = await getNftTrades(ETH_URL_MAINNET, NFT_ABI, NFT_ADDRESS, 14919508, 14919671);
console.log(trades);
