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
    const gasPrice = await web3.eth.getGasPrice();
    const g = parseInt(Number(gasPrice) * (1 + percentageMore));
    return g;
  };
  const errorInResendErrors = (errorMsg, resendTxOnErrors) => {
    let errorFound = false;
    for (let i = 0; i < resendTxOnErrors.length; i++) {
      if (errorMsg.includes(resendTxOnErrors[i])) {
        errorFound = resendTxOnErrors[i];
        break;
      }
    }
    return errorFound;
  };

  const sc = new web3.eth.Contract(abi, address);
  const func = sc.methods[method](...parameters);
  const from = (await web3.eth.getAccounts())[accountNumber];
  let errorMsg = null;
  try {
    await func.estimateGas({ from });
  } catch (e) {
    errorMsg = (e + '').includes('object') ? e.message : (e + '').split('\n')[0];
    console.log(`estimateGasErr, ${errorMsg}, ${method}: ${parametersNames} ${parameters}, from ${from}`);
    return;
  }
  let nonce = null;
  let transactionHash = null;
  let wasError = true;
  let gasPrice = await getGasPrice(web3);
  console.log({ gasPrice });
  const retryTimes = 10;

  const options = { from, gas: '200000', maxFeePerGas: gasPrice, maxPriorityFeePerGas: '30000000000' };
  for (let i = 0; i < retryTimes; i++) {
    try {
      console.log(`${new Date()} __TAG ${parameters} before`);
      transactionHash = nonce
        ? (await func.send({ ...options, nonce })).transactionHash
        : (await func.send({ ...options })).transactionHash;
      console.log(`${new Date()} __TAG ${parameters} after`);
      console.log({
        date: '' + new Date(),
        detail: `${method}: ${parametersNames} ${parameters}, from ${from}`,
        exploreTx: `${explorer}/tx/${transactionHash}`,
      });
      wasError = false;
      break;
    } catch (e) {
      errorMsg = (e + '').includes('object') ? e.message : (e + '').split('\n')[0];
      const error = errorInResendErrors(errorMsg, resendTxOnErrors);

      if (errorMsg.includes('replacement transaction underpriced')) {
        const gasPriceOld = '' + gasPrice;
        gasPrice = (await getGasPrice(web3)) + '' + i;
        const sleepTime = Math.pow(2, i);
        console.log(
          `replacement transaction underpriced, wait ${sleepTime} s, gasPrice: ${gasPriceOld} -> ${gasPrice}, ${method}: ${parametersNames} ${parameters}, from ${from}`,
        );
        await sleep(1000 * sleepTime);
      }
      if (errorMsg.includes('transaction underpriced')) {
        const gasPriceOld = '' + gasPrice;
        gasPrice = (await getGasPrice(web3)) + '' + i;
        const sleepTime = Math.pow(2, i);
        console.log(
          `transaction underpriced, wait ${sleepTime} s, gasPrice: ${gasPriceOld} -> ${gasPrice}, ${method}: ${parametersNames} ${parameters}, from ${from}`,
        );
        await sleep(1000 * sleepTime);
      } else if (errorMsg.includes('Error: ETIMEDOUT')) {
        const sleepTime = Math.pow(2, i + 1);
        console.log(
          `ETIMEDOUT error, try after wait of seconds: ${sleepTime}, ${method}: ${parametersNames} ${parameters}, from ${from}`,
        );
        await sleep(1000 * sleepTime);
      } else if (errorMsg.includes('nonce too low')) {
        const nonceWas = '' + nonce;
        nonce = await web3.eth.getTransactionCount(from);
        nonce++;
        const sleepTime = Math.pow(2, i);
        console.log(
          `nonce too low, wait ${sleepTime} s, nonce: ${nonceWas} -> ${nonce}, ${method}: ${parametersNames} ${parameters}, from ${from}`,
        );
        await sleep(1000 * sleepTime);
      } else if (error) {
        const sleepTime = Math.pow(2, i);
        console.log(
          `${error}, try after wait of seconds: ${sleepTime}, ${method}: ${parametersNames} ${parameters}, from ${from}`,
        );
        await sleep(1000 * sleepTime);
      } else {
        console.log(
          `DO NOT RETRY TX ON THIS ERROR, ${errorMsg}, ${method}: ${parametersNames} ${parameters}, from ${from}`,
        );
        wasError = false;
        break;
      }
    }
  }

  if (wasError) {
    console.log(
      `please handle the error correctly, transaction sending error after ${retryTimes} retries, ${errorMsg}, ${method}: ${parametersNames} ${parameters}, from ${from}`,
    );
    return { error: true, errorMsg };
  }

  return { error: false, transactionHash };
};

// '[object Object]';
// const msg = e + '' === '[object Object]' ? e.message : (e + '').split('\n')[0];
// console.log('estimate error, 1', typeof e, JSON.stringify(e) === {}, e);
// console.log('2', typeof (e + ''), e + '', (e + '').includes('Error: execution reverted: already minted'));
// const msg = e + '' === '[object Object]' ? e.message : (e + '').split('\n')[0];
// console.log('estimate error, 1', typeof e, JSON.stringify(e) === {}, e);
// console.log('2', typeof (e + ''), e + '', (e + '').includes('Error: execution reverted: already minted'));
