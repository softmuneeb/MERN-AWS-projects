import { getContractPresaleFactory } from './smart-contracts.js';

// just for testing
const getPresalesNotApprovedAddresses = async (index = 0, amountToFetch = 10) =>
  await getContractPresaleFactory()
    .methods.getPresales(index, amountToFetch, false)
    .call();

const init = async () => {
  // console.log(Number(-0) === 0);
  console.log(await getPresalesNotApprovedAddresses());
};
init();
