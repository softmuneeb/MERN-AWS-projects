import { getPresales } from './multicall.js';

const init = async () => {
  const presales = await getPresales();
  console.log('presales: ', presales);
};

init();
