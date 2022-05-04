/*
1. simple program run and sale done. get gas price.
2. 5 transactions with different accounts. each transaction 5 sec diff. each accounts transfers remain eth, to next account.
3. random differnce in time. 1 sec to 20 sec. log sec wait. random between 5 min to 60 min.
4. maintain logs data in files. tokenId bought by which account.
5. send the code to chris. startServer(delay="10min",startFromAccNumber="0",)

how to handle try catch in all app, handle so many rejections
*/


import { buyNft, sendEthToAccount } from './apis.js';
import { PV_KEYS, SOURCE_PV_KEY } from "./secret.js";
import { chainIdName, ethNodeLink, sendRemaingAmountAtTxFee, sendRemaingAmountTo } from "./smart-contracts.js";
import { getAccount, getWeb3, log, random, seconds, sleep } from "./utils.js";
import pkg from "web3-utils";
const { fromWei } = pkg;
export const runNftBuyBot = async (start, end, waitInSecondsFrom, waitInSecondsTo, PV_KEYS) => {
  log("Assalamo Alaikum. server on " + chainIdName + " " + new Date(), 4);

  for (let accId = start; accId < end; accId++) {
    await buyNft(PV_KEYS[accId], accId);

    const wait = random(waitInSecondsFrom, waitInSecondsTo);
    log(`wait ${wait} seconds`, 1);
    await sleep(wait * seconds);
  }

  log("loop end");
};

export const sendEthToAccountsBatch = async (start, end, valueToSend) => {
  log("Assalamo Alaikum. sendEthToAccounts" + chainIdName + " " + new Date(), 4);
  console.log(`from: ${await getAccount(SOURCE_PV_KEY)}`);

  for (let accId = start; accId < end; accId++) {
    await sendEthToAccount(SOURCE_PV_KEY, PV_KEYS[accId], valueToSend);
  }

  log("loop end sendEthToAccounts", 1);
};

export const seeBalances = async (start, end) => {
  for (let accId = start; accId < end; accId++) {
    const web3 = getWeb3(PV_KEYS[accId], ethNodeLink),
      from = (await web3.eth.getAccounts())[0],
      balanceEth = fromWei(await web3.eth.getBalance(from));

    console.log({ from }, { balanceEth });
  }
};
// init();
