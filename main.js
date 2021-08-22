import { getAddressesThatHeldXTokensForYdays } from './getHeldXTokensForYDays.js';

const init = async () => {
  const addresses = await getAddressesThatHeldXTokensForYdays();
  console.log('addresses: ', addresses);
};
init();
