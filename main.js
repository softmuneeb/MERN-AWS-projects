import BigNumber from 'bignumber.js';

const init = async () => {
  const num = Number(100000000000000000000);
  console.log(
    '21 Decimals is limit of Number datatype in JS:  ',
    num.toString(),
  );

  const bigNum = BigNumber(100000000000000000000);
  console.log('bigNum: ', bigNum.toString());

  // new BigNumber();
};

init();
