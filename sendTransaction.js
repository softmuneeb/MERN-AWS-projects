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
  let logs = `Logs of, ${method}: ${parametersNames} ${parameters}, from ${from}\n`;
  try {
    await func.estimateGas({ from });
  } catch (e) {
    errorMsg = (e + '').includes('object') ? e.message : (e + '').split('\n')[0];
    logs += `estimateGasErr, ${errorMsg}, ${method}: ${parametersNames} ${parameters}, from ${from}\n`;

    const error = errorInResendErrors(errorMsg, resendTxOnErrors);
    if (!error) return { error: true, errorMsg };
  }
  let nonce = null;
  let transactionHash = null;
  let wasError = true;
  let gasPrice = '40000000000';
  const retryTimes = 10;

  for (let i = 0; i < retryTimes; i++) {
    const options = { from, gas: '200000', maxFeePerGas: gasPrice, maxPriorityFeePerGas: '30000000000' };
    try {
      transactionHash = nonce
        ? (await func.send({ ...options, nonce })).transactionHash
        : (await func.send({ ...options })).transactionHash;
      logs += `date: ${
        '' + new Date()
      }, detail: ${method}: ${parametersNames} ${parameters}, from ${from}, exploreTx: ${explorer}/tx/${transactionHash}\n`;
      wasError = false;
      break;
    } catch (e) {
      // TODO: run and see logs
      // benifit was that all logs at one place
      // nuqsan same error repeats
      const errorMsgCurrent = (e + '').includes('object') ? e.message : (e + '').split('\n')[0];
      errorMsg += errorMsgCurrent;
      const error = errorInResendErrors(errorMsgCurrent, resendTxOnErrors);

      if (errorMsgCurrent.includes('replacement transaction underpriced')) {
        const gasPriceOld = '' + gasPrice;
        gasPrice = (await getGasPrice(web3)) + '' + i;
        const sleepTime = Math.pow(2, i);
        logs += `replacement transaction underpriced, wait ${sleepTime} s, gasPrice: ${gasPriceOld} -> ${gasPrice}, ${method}: ${parametersNames} ${parameters}, from ${from}\n`;
        await sleep(1000 * sleepTime);
      }
      if (errorMsgCurrent.includes('transaction underpriced')) {
        const gasPriceOld = '' + gasPrice;
        gasPrice = (await getGasPrice(web3)) + '' + i;
        const sleepTime = Math.pow(2, i);
        logs += `transaction underpriced, wait ${sleepTime} s, gasPrice: ${gasPriceOld} -> ${gasPrice}, ${method}: ${parametersNames} ${parameters}, from ${from}`;
        await sleep(1000 * sleepTime);
      } else if (errorMsgCurrent.includes('Error: ETIMEDOUT')) {
        const sleepTime = Math.pow(2, i + 1);
        logs += `ETIMEDOUT error, try after wait of seconds: ${sleepTime}, ${method}: ${parametersNames} ${parameters}, from ${from}`;
        await sleep(1000 * sleepTime);
      } else if (errorMsgCurrent.includes('nonce too low')) {
        const nonceWas = '' + nonce;
        nonce = await web3.eth.getTransactionCount(from);
        nonce++;
        const sleepTime = Math.pow(2, i);
        logs += `nonce too low, wait ${sleepTime} s, nonce: ${nonceWas} -> ${nonce}, ${method}: ${parametersNames} ${parameters}, from ${from}`;
        await sleep(1000 * sleepTime);
      } else if (error) {
        const sleepTime = Math.pow(2, i);
        logs += `${error}, try after wait of seconds: ${sleepTime}, ${method}: ${parametersNames} ${parameters}, from ${from}`;
        errorMsg = error;
        await sleep(1000 * sleepTime);
      } else {
        logs += `DO NOT RETRY TX ON THIS ERROR, ${errorMsgCurrent}, ${method}: ${parametersNames} ${parameters}, from ${from}`;
        break;
      }
    }
  }

  if (wasError) {
    logs += `please handle the error correctly, transaction sending error after ${retryTimes} retries, ${errorMsg}, ${method}: ${parametersNames} ${parameters}, from ${from}`;
    return { error: true, errorMsg, logs };
  }

  return { error: false, transactionHash, logs };
};

// '[object Object]';
// const msg = e + '' === '[object Object]' ? e.message : (e + '').split('\n')[0];
// // console.log('estimate error, 1', typeof e, JSON.stringify(e) === {}, e);
// // console.log('2', typeof (e + ''), e + '', (e + '').includes('Error: execution reverted: already minted'));
// const msg = e + '' === '[object Object]' ? e.message : (e + '').split('\n')[0];
// // console.log('estimate error, 1', typeof e, JSON.stringify(e) === {}, e);
// // console.log('2', typeof (e + ''), e + '', (e + '').includes('Error: execution reverted: already minted'));
