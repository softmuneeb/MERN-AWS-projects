// import HTMLtoDOCX from "html-to-docx";
/*
1. simple program run and sale done. get gas price.
2. 5 transactions with different accounts. each transaction 5 sec diff. each accounts transfers remain eth, to next account.
3. random differnce in time. 1 sec to 20 sec. log sec wait. random between 5 min to 60 min.
4. maintain data in files. tokenId bought by which account.
5. send the code to chris. startServer(delay="10min",startFromAccNumber="0",)

*/

import { buyNft } from './utils.js';
import dotenv from 'dotenv';
import { ethNodeLink } from './smart-contracts.js';
dotenv.config();
const MNEMONIC = process.env.MNEMONIC;

const init = async () => {
  console.log('Assalamo Alaikum');
  if (!MNEMONIC) {
    console.log('Please provide MNEMONIC & INFURA_TOKEN in .env');
    return;
  }

  await buyNft(MNEMONIC, ethNodeLink);
};

init();
