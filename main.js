import { getAddressesThatHeldXTokensForYdays } from './getHeldXTokensForYDays.js';

const init = async () => {
  /*

  getAddressesThatHeldXTokensForYdays = async (
  dateStart = new Date(Date.now() - _1_Day),
  dateEnd = new Date(Date.now()),
  erc20Address = busdAddress,
  amountToHoldDateStartToDateEnd = 50
  ) 
  
  */
  const addresses = await getAddressesThatHeldXTokensForYdays();
  console.log('addresses: ', addresses);

  // output like this:
  //
  // addresses:  [
  //   '0xd9a94b853364670C395E9e5f6DD6FDD70d72F2DB',
  //   '0xc18E78C0F67A09ee43007579018b2Db091116B4C',
  //   '0x903f0F7bBF9Ad74F50e58B5D32D2AcE3b358eA77',
  //   '0xec828b4305be12B9B3E8F584FCE8ACDCc56c86E7'
  // ]
  //
};
init();
