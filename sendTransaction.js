export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const sendTransaction = async ({
  abi,
  web3,
  accountNumber,
  method,
  address,
  parameters,
  parametersNames,
  explorer,
  resendTxOnErrors,
}) => {
  const getGasPrice = async (web3, percentageMore = 0) => {
    // making gas 35 GWEI fixed on testnet, reference https://community.infura.io/t/polygon-mumbai-testnet-error-transaction-underpriced/4781
    const chainId = await web3.eth.getChainId();
    if (chainId === 80001) {
      return '30000000000'; // 30 gwei, gwei = 9 zeros
    }
    const gasPrice = '' + parseInt(parseInt(await web3.eth.getGasPrice()) * 1.5 * (1 + percentageMore));
    return gasPrice;
  };

  const sc = new web3.eth.Contract(abi, address);
  const func = sc.methods[method](...parameters);
  const from = (await web3.eth.getAccounts())[accountNumber];
  try {
    await func.estimateGas({ from });
  } catch (e) {
    const msg = e + '' === '[Object object]' ? e.message : (e + '').split('\n')[0];
    // console.log('estimate error, 1', typeof e, JSON.stringify(e) === {}, e);
    // console.log('2', typeof (e + ''), e + '', (e + '').includes('Error: execution reverted: already minted'));
    console.log(msg, ',', method, ': ', ...parametersNames, ...parameters);
    return;
  }
  let nonce = 0;
  let wasError = false;
  let gasPrice = await getGasPrice(web3);
  for (let i = 0; i < 10; i++) {
    try {
      const { transactionHash } = await func.send({ from, gas: '200000', gasPrice });
      console.log({
        date: '' + new Date(),
        detail: `${method}: ${parametersNames} ${parameters}`,
        exploreTx: `${explorer}/tx/${transactionHash}`,
      });
      wasError = false;
      break;
    } catch (e) {
      console.log('estimate error, 1', typeof e, JSON.stringify(e) === {}, e);
      console.log('2', typeof (e + ''), e + '', (e + '').includes('Error: execution reverted: already minted'));
      if (e && e.message && e.message.includes('replacement transaction underpriced')) {
        const gasWas = gasPrice;
        gasPrice = await getGasPrice(web3, 0.1 * i);
        console.log({ gasPrice, gasWas });
        continue;
      } else if (e && e.message && e.message.includes('nonce too low')) {
        nonce = await web3.getTransactionCount();
        nonce++;
        continue;
      }
      // errorNotInResendErrors()
      else if (!(e + '').includes(resendTxOnErrors[0])) {
        console.log('returning from error', e + '');
        break;
      }
      if (!(e + '').includes(resendTxOnErrors[1])) {
        console.log('returning from error', e + '');
        break;
      }
      // '[object Object]';
      const sleepTime = Math.pow(2, i) / 2;
      console.log(`tx error so trying again after sleep of seconds: ${sleepTime}`);
      console.log('1', { count }, e);
      console.log('2', e + '');
      await sleep(1000 * sleepTime);
      wasError = true;
    }
  }

  if (wasError) {
    console.log('transactionHash error after 10 tries');
    console.log('1', { count }, e);
    console.log('2', e + '');
    console.log('3', method, ': ', ...parametersNames, ...parameters);
  }

  return wasError;
};
