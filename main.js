import BigNumber from 'bignumber.js';
import pkg from 'web3-utils';

const { toWei, fromWei } = pkg;

const init = async () => {
  const _someBusdCoins = toWei('4000');
  // get 5000 Coins Sum

  const num_someBusdCoins = Number(_someBusdCoins) / 10;
  console.log(
    'num_someBusdCoins: ',
    num_someBusdCoins + num_someBusdCoins + num_someBusdCoins
  );

  const bigNum_someBusdCoins = BigNumber(_someBusdCoins) / 10;
  const sum =
    bigNum_someBusdCoins + bigNum_someBusdCoins + bigNum_someBusdCoins;
  console.log('bigNum_someBusdCoins: ', new BigNumber('4e+21') / 10 ** 18);

  // new BigNumber();
};

init();
