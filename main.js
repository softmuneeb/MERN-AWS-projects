// const truncNum = n => Number((Math.trunc(n * 10 * 8) / 10) * 8);
const web3 = require('web3');

const isString = s => {
  return typeof s === 'string' || s instanceof String;
};

const toBaseUnit = (value, decimals, BN) => {
  if (!isString(value)) {
    throw new Error('Pass strings to prevent floating point precision issues.');
  }
  const ten = new BN(10);
  const base = ten.pow(new BN(decimals));

  // Is it negative?
  let negative = value.substring(0, 1) === '-';
  if (negative) {
    value = value.substring(1);
  }

  if (value === '.') {
    throw new Error(
      `Invalid value ${value} cannot be converted to` +
        ` base unit with ${decimals} decimals.`
    );
  }

  // Split it into a whole and fractional part
  let comps = value.split('.');
  if (comps.length > 2) {
    throw new Error('Too many decimal points');
  }

  let whole = comps[0],
    fraction = comps[1];

  if (!whole) {
    whole = '0';
  }
  if (!fraction) {
    fraction = '0';
  }
  if (fraction.length > decimals) {
    throw new Error('Too many decimal places');
  }

  while (fraction.length < decimals) {
    fraction += '0';
  }

  whole = new BN(whole);
  fraction = new BN(fraction);
  let wei = whole.mul(base).add(fraction);

  if (negative) {
    wei = wei.neg();
  }

  return new BN(wei.toString(10), 10);
};

export const toWei = n => {
  const decimals = 9;
  return '' + toBaseUnit('' + n, decimals, web3.utils.BN);
};

const init = async () => {
  let sum1 = 2263853415.1296406;
  let sum2 = 1232332.6666565;

  console.log('sum1: ', toWei(sum1));
  console.log('sum2: ', toWei(sum2));
};

init();
