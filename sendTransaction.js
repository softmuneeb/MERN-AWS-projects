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
    const g = parseInt(parseInt(gasPrice) * 1.1 * (1 + percentageMore));
    return g;
  };
  const errorInResendErrors = (errorMsg, resendTxOnErrors) => {
    let errorFound = false;
    for (let i = 0; i < resendTxOnErrors.length; i++) {
      if (errorMsg.includes(resendTxOnErrors[i])) {
        errorFound = true;
        break;
      }
    }
    return errorFound;
  };

  const sc = new web3.eth.Contract(abi, address);
  const func = sc.methods[method](...parameters);
  const from = (await web3.eth.getAccounts())[accountNumber];
  try {
    await func.estimateGas({ from });
  } catch (e) {
    const msg = (e + '').includes('object') ? e.message : (e + '').split('\n')[0];
    console.log(msg, `${method}: ${parametersNames} ${parameters}`);
    return;
  }
  let nonce = null;
  let transactionHash = null;
  let errorMsg = null;
  let wasError = true;
  let gasPrice = await getGasPrice(web3);
  for (let i = 0; i < 10; i++) {
    try {
      transactionHash = nonce
        ? (await func.send({ from, gas: '200000', gasPrice, nonce })).transactionHash
        : (await func.send({ from, gas: '200000', gasPrice })).transactionHash;
      console.log({
        date: '' + new Date(),
        detail: `${method}: ${parametersNames} ${parameters}`,
        exploreTx: `${explorer}/tx/${transactionHash}`,
      });
      wasError = false;
      break;
    } catch (e) {
      errorMsg = (e + '').includes('object') ? e.message : (e + '').split('\n')[0];
      console.log(errorMsg, `${method}: ${parametersNames} ${parameters}`);
      if (errorMsg.includes('replacement transaction underpriced')) {
        gasPrice = await getGasPrice(web3, 0.1 * i);
        console.log('try again with higher gas price', gasPrice);
        const sleepTime = Math.pow(2, i);
        console.log(`tx error, try after wait of seconds: ${sleepTime}, ${method}: ${parametersNames} ${parameters}`);
        await sleep(1000 * sleepTime);
      } else if (errorMsg.includes('Error: ETIMEDOUT')) {
        const sleepTime = Math.pow(2, i + 1);
        console.log(
          `tx ETIMEDOUT error, try after wait of seconds: ${sleepTime}, ${method}: ${parametersNames} ${parameters}`,
        );
        await sleep(1000 * sleepTime);
      } else if (errorMsg.includes('nonce too low')) {
        nonce = await web3.eth.getTransactionCount(from);
        nonce++;
        console.log('try again with nonce', nonce);
        const sleepTime = Math.pow(2, i);
        console.log(`tx error, try after wait of seconds: ${sleepTime}, ${method}: ${parametersNames} ${parameters}`);
        await sleep(1000 * sleepTime);
      } else if (errorInResendErrors(errorMsg, resendTxOnErrors)) {
        const sleepTime = Math.pow(2, i);
        console.log(`tx error, try after wait of seconds: ${sleepTime}, ${method}: ${parametersNames} ${parameters}`);
        await sleep(1000 * sleepTime);
      } else {
        console.log('returning due to error', errorMsg);
        break;
      }
    }
  }

  if (wasError) {
    console.log('transactionHash error after 10 tries');
    console.log(errorMsg, `${method}: ${parametersNames} ${parameters}`);
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
