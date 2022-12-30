65,000 transactions per second in polygon??
TODO: nonce issue not come, ..., solution https://betterprogramming.pub/sending-web3-transactions-in-node-js-nonce-hell-f3ba82edbf3d

// TODO: publish a+b npm, then this method on npm, send many web3 ethereum based chain tx in short time with no errors
// TODO: Check max stress
  
  // standards, erc721, exploreToken: `${explorer}/token/${address}/?a=${tokenId}`, tell about your standards to get more customized experince, more benifits, ...
TODO: remo console logs, return tx has on mint, ..., how values are getting in erc20 transfer? see in ui code.
TODO: createAccessList() save gas in sending tx, optimized...
TODO:
// Create transaction
const deploy = async () => {
   console.log(
      `Attempting to make transaction from ${addressFrom} to ${addressTo}`
   );

   const createTransaction = await web3.eth.accounts.signTransaction(
      {
         from: addressFrom,
         to: addressTo,
         value: web3.utils.toWei('100', 'ether'),
         gas: '21000',
      },
      privKey
   );
Since the transaction message has been created and signed (you can console.log(createTransaction) to see the v-r-s values), we can now deploy it using the web3.eth.sendSignedTransaction(signedTx) by providing the rawTransaction from the createTransaction object.

from web3 code :")   I also write todos like this...
// TODO: This interface does exist to provide backwards-compatibility and can get removed on a minor release
export interface Block extends BlockTransactionBase {
    transactions: Transaction[] | string[];
}
// TODO: study
export interface TransactionConfig {
    from?: string | number;
    to?: string;
    value?: number | string | BN;
    gas?: number | string;
    gasPrice?: number | string | BN;
    maxPriorityFeePerGas?: number | string | BN;
    maxFeePerGas?: number | string | BN;
    data?: string;
    nonce?: number;
    chainId?: number;
    common?: Common;
    chain?: string;
    hardfork?: string;
}

meet 

   * @file index.d.ts
 * @author Josh Stevens <joshstevens19@hotmail.co.uk>
 * @author Prince Sinha <sinhaprince013@gmail.com>
 * @date 2018