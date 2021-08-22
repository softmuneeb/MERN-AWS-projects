import {
  busdAddress,
  defaultWeb3,
  getContractBusd,
  getContractPresaleFactory,
} from './smart-contracts.js';
import pkg from 'web3-utils';
const { fromWei } = pkg;
import EthDater from 'ethereum-block-by-date';

const _1_Day = 86400 * 1000;
const getAddressesThatHeldXTokensForYdays = async (
  dateStart = new Date(Date.now() - 30 * _1_Day),
  dateEnd = new Date(Date.now()),
  erc20Address = busdAddress,
  amountToHoldDateStartToDateEnd = 50,
) => {
  // get block number on specific date
  const dater = new EthDater(defaultWeb3);
  let fromBlock = await dater.getDate(dateStart, true);
  let toBlock = await dater.getDate(dateEnd, true);

  // get events of transfer
  const config = {
    fromBlock: fromBlock.block,
    toBlock: toBlock.block,
  };
  const allEvents = await getContractBusd(
    defaultWeb3,
    erc20Address,
  ).getPastEvents('Transfer', config);

  // addresses-that-held-100-tokens = (received - sent >= 100)
  let someData = {};
  allEvents.map(event => {
    const to = event.returnValues.to;
    const value = Number(fromWei(event.returnValues.value));
    someData[to] = someData[to] ? someData[to] + value : value;
  });

  const filteredData = Object.keys(someData).filter(
    addr => someData[addr] > amountToHoldDateStartToDateEnd,
  );

  return filteredData;
};

const init = async () => {
  const addresses = await getAddressesThatHeldXTokensForYdays();
  console.log('addresses: ', addresses);
};
init();

/*







  // const goodAddresses = await getDataAddressesThatHeldXTokensForYdays(dateFrom, dateTo, erc20TokenAddress, amountToHoldOfThisErc20);
  //
  // get

  // let s = 'koko';
  // let m = 'abab';
  // let someData = {};
  // someData[s] = 1;
  // someData[m] = 2;
  // console.log('someData: ', someData);
  // events.returnValues.from
  // events.returnValues.to
  // events.returnValues.value






      config = {
          fromBlock: startFrom,
          toBlock,
        };
      }

      const allEvents = await erc20Contract.getPastEvents('Transfer', config);

      // console.log(startBlock, '****startBlock IN SYNC FOR ERC20');
      allEvents.length > 0 &&
        console.log(
          `*Handle  transactions for deposit  of total events`,
          allEvents.length,
          ' -> SYMBOL :',
          token.symbol,
        );

      let blockNoForTxToInsert = startBlock;

      if (allEvents.length === 0) {
        blockNoForTxToInsert = startBlock + 1000;
      }
      for (const pastTransferEvent of allEvents) {
        const blockInfo = await this.web3.eth.getBlock(
          pastTransferEvent.blockNumber,
        );

        const from = pastTransferEvent.returnValues.from;
        const to = pastTransferEvent.returnValues.to;
        const value = this.web3.utils.fromWei(
          pastTransferEvent.returnValues.value,
        );
        blockNoForTxToInsert = pastTransferEvent.blockNumber;

        console.log(
          'OWNER SHIP TRANSFER FROM : ',
          from,
          ' -> to -> ',
          to,
          ' of token ID : ',
          value,
          ' FOR SYMBOL : ',
          token.symbol,
        );

        console.log(
          'this.lastUpdatedTxHash === pastTransferEvent.transactionHash: ',
          this.lastUpdatedTxHash === pastTransferEvent.transactionHash,
        );
        console.log('this.lastUpdatedTxHash: ', this.lastUpdatedTxHash);
        console.log(
          'pastTransferEvent.transactionHash: ',
          pastTransferEvent.transactionHash,
        );
        if (this.lastUpdatedTxHash === pastTransferEvent.transactionHash)
          return;

        this.lastUpdatedTxHash = pastTransferEvent.transactionHash;

        const updateResult = await this.UserTransactionsModel.create({
          // orderId: "" ,
          txhash: pastTransferEvent.transactionHash,
          from: from.toLowerCase(),
          to: to.toLowerCase(), // we will use this "to" value to return transactions
          value,
          symbol: token.symbol,
          network: token.network,
          blockNumber: pastTransferEvent.blockNumber,
          blockHash: pastTransferEvent.blockHash,
          event: pastTransferEvent.event,
          transactionId: pastTransferEvent.transactionIndex,
          transactionIndex: pastTransferEvent.transactionIndex,
          removed: pastTransferEvent.removed,
          created_at: new Date(Number(blockInfo.timestamp) * 1000),
          updated_at: new Date(),
          contractAddress: pastTransferEvent.address,
        });
        console.log(updateResult);
      } // end of for loop





*/

export const getPresalesNotApprovedAddresses = async (
  index = 0,
  amountToFetch = 10,
) =>
  await getContractPresaleFactory()
    .methods.getPresales(index, amountToFetch, false)
    .call();
