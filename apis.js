import { ethNodeLink, getContractNft } from './smart-contracts.js';
import { getAccount, getWeb3, log } from './utils.js';
import pkg from 'web3-utils';
const { fromWei } = pkg;

export const buyNft = async (
  mnemonic,
  nextMnemonic,
  accountId, // 1,2,3...
  nodeLink = ethNodeLink
) => {
  const web3 = getWeb3(mnemonic, nodeLink);

  const contract = getContractNft({ web3 });
  const price = await contract.methods.itemPrice().call();

  const method = contract.methods.purchaseTokens(1);
  const from = (await web3.eth.getAccounts())[0];
  const balance = fromWei(await web3.eth.getBalance(from));

  // todo gasPrice for mainnet
  let options = {
    from,
    gas: '0',
    value: price
    // gasPrice...
  };

  try {
    options = {
      ...options,
      gas: '' + Math.trunc(await method.estimateGas(options))
    };
  } catch (e) {
    let msg = null;
    try {
      msg = JSON.parse(e.message.split('\n').splice(1).join('\n')).message;
    } catch (e) {
      e && log(e.message);
    }

    if (!msg) msg = 'Insufficient funds or some data error';
    else msg = msg.split('reverted:')[1];

    log(
      `estimate gas buyNft tx err, from acc[${accountId}] ${from} bal:${balance}ETH msg ${msg}`
    );
    return;
  }

  try {
    await method
      .send(options)
      .once('transactionHash', tx =>
        log(
          `nft buy tx from acc[${accountId}]:${from} bal:${balance}ETH price:${fromWei(
            price
          )}ETH tx:${tx}`
        )
      )
      .on('confirmation', async (i, a) => {
        if (i === 0) {
          const bal = await web3.eth.getBalance(from),
            tokenId = a.events.Transfer.returnValues.tokenId,
            gas = a.effectiveGasPrice,
            txFee = fromWei('' + a.cumulativeGasUsed * a.effectiveGasPrice);

          log(
            `done tx from acc[${accountId}]:${from} bal:${fromWei(
              bal
            )}ETH tokenId:${tokenId} gas:${fromWei(
              gas,
              'gwei'
            )}gwei txFee:${txFee}ETH tx:${a.transactionHash}`
          );

          // todo gasPrice for mainnet
          try {
            const gasValue = 21000 * gas; // regular account gas is 21K always
            const valueToSend = bal - gasValue - 1000000;
            log(
              'gas * price + value = ' + fromWei('' + (valueToSend + gasValue))
            );

            await web3.eth
              .sendTransaction({
                from,
                to: await getAccount(nextMnemonic),
                value: valueToSend
              })
              .on('confirmation', async (i, a) => {
                if (i === 0) {
                  const bal = fromWei(await web3.eth.getBalance(from)),
                    gas = fromWei(a.effectiveGasPrice, 'gwei'),
                    txFee = fromWei(
                      '' + a.cumulativeGasUsed * a.effectiveGasPrice
                    );

                  log(
                    `done tx from acc[${accountId}]:${from} bal:${bal}ETH gas:${gas}gwei txFee:${txFee}ETH tx:${a.transactionHash}`
                  );
                }
              });
          } catch (e) {
            e && log('send eth error: ' + e.message);
          }
        }
      });
  } catch (e) {
    log(e.message);
  }
};
