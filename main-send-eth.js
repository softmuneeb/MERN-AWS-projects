import { sendEthToAccountsBatch } from "./nftBot.js";
import web3 from 'web3';

const startAccId = 0, endAccId = 2;

sendEthToAccountsBatch(startAccId, endAccId, web3.utils.toWei("0.0001", "ether"));
