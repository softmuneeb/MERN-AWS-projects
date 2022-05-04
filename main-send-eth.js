import { sendEthToAccountsBatch } from "./nftBot.js";
import web3 from 'web3';

const startAccId = 94, endAccId = 100;

sendEthToAccountsBatch(startAccId, endAccId, web3.utils.toWei("0.001", "ether"));
