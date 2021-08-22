import EthDater from 'ethereum-block-by-date';
import pkg from 'web3-utils';
import {
  busdAddress,
  defaultWeb3,
  getContractBusd,
} from './smart-contracts.js';
const { fromWei } = pkg;

const _1_Day = 86400 * 1000;

// open etherscan and test it on some token

export const getAddressesThatHeldXTokensForYdays = async (
  dateStart = new Date(Date.now() - _1_Day),
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
  let balances = {};
  allEvents.map(event => {
    const to = event.returnValues.to;
    const from = event.returnValues.from;
    const value = Number(fromWei(event.returnValues.value));
    balances[to] = balances[to] ? balances[to] + value : value;
    balances[from] = balances[from] ? balances[from] - value : -1 * value;
  });

  // console.log('someData: ', someData);

  const filteredBalances = Object.keys(balances).filter(
    addr => balances[addr] >= amountToHoldDateStartToDateEnd,
  );

  return filteredBalances;
};
