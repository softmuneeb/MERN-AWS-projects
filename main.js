import BigNumber from 'bignumber.js';
import pkg from 'web3-utils';
const { toWei } = pkg;

const init = async () => {
  const _someBusdCoins = toWei('1000');
  // get 5000 Coins Sum

  const num_someBusdCoins = Number(_someBusdCoins) / 10;
  console.log(
    'num_someBusdCoins: ',
    num_someBusdCoins + num_someBusdCoins + num_someBusdCoins,
  );

  const bigNum_someBusdCoins = BigNumber(_someBusdCoins) / 10;
  console.log(
    'bigNum_someBusdCoins: ',
    bigNum_someBusdCoins + bigNum_someBusdCoins + bigNum_someBusdCoins,
  );

  // new BigNumber();
};

init();
