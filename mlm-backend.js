const tonMnemonic = require('tonweb-mnemonic');
const TonWeb = require('tonweb');

async function transferTxTon() {
  // mnemonic to key pair
  const mnemonic =
    'mercy buffalo rotate airport sample earth program elevator steel repair member march explain another destroy ancient embark school thank happy clean supply work second';
  const mnemonicArray = mnemonic.split(' ');
  const keyPair = await tonMnemonic.mnemonicToKeyPair(mnemonicArray);
  console.log('secret key:', Buffer.from(keyPair.secretKey).toString('hex'));

  // list available wallet versions
  const tonweb = new TonWeb(new TonWeb.HttpProvider('https://toncenter.com/api/v2/jsonRPC'));
  console.log('wallet versions:', Object.keys(tonweb.wallet.all).toString());

  // instance of wallet V4 r2 (from the list printed above)
  const WalletClass = tonweb.wallet.all['v4R2'];
  const wallet = new WalletClass(tonweb.provider, { publicKey: keyPair.publicKey });
  const seqno = (await wallet.methods.seqno().call()) || 0;
  console.log('seqno:', seqno);
  await sleep(1500); // avoid throttling by toncenter.com

  const fee = await wallet.methods
    .transfer({
      secretKey: keyPair.secretKey,
      toAddress: 'EQDrjaLahLkMB-hMCmkzOyBuHJ139ZUYmPHu6RRBKnbdLIYI',
      amount: TonWeb.utils.toNano('0.000001'), // 0.02 TON
      seqno: seqno,
      payload: 'Hello', // optional comment
      sendMode: 3,
    })
    .estimateFee();
  // .send();
  console.log({ fee });
  //   // wait until confirmed
  //   let currentSeqno = seqno;
  //   while (currentSeqno == seqno) {
  //     console.log('waiting for transaction to confirm...');
  //     await sleep(1500); // avoid throttling by toncenter.com
  //     currentSeqno = (await wallet.methods.seqno().call()) || 0;
  //   }
  const address = await wallet.getAddress();
  await sleep(1500); // avoid throttling by toncenter.com
  const balance = await tonweb.getBalance(address);
  console.log('balance:', TonWeb.utils.fromNano(balance));
}

async function getBalance() {
  // mnemonic to key pair
  const mnemonic =
    'rail sound peasant garment bounce trigger true abuse arctic gravity ribbon ocean absurd okay blue remove neck cash reflect sleep hen portion gossip arrow';
  const mnemonicArray = mnemonic.split(' ');
  const keyPair = await tonMnemonic.mnemonicToKeyPair(mnemonicArray);
  console.log('public key:', Buffer.from(keyPair.publicKey).toString('hex'));

  // list available wallet versions
  const tonweb = new TonWeb(new TonWeb.HttpProvider('https://toncenter.com/api/v2/jsonRPC'));
  console.log('wallet versions:', Object.keys(tonweb.wallet.all).toString());

  // ['simpleR1', simpleR2, simpleR3, v2R1, v2R2, v3R1, v3R2, v4R1, v4R2];
  // instance of wallet V4 r2 (from the list printed above)
  const WalletClass = tonweb.wallet.all['v4R2'];

  const wallet = new WalletClass(tonweb.provider, { publicKey: keyPair.publicKey });
  const address = await wallet.getAddress();
  console.log('address:', address.toString(true, true, true));
  const seqno = await wallet.methods.seqno().call();
  console.log('seqno:', seqno);
  await sleep(1500); // avoid throttling by toncenter.com
  const balance = await tonweb.getBalance(address);
  console.log('balance:', TonWeb.utils.fromNano(balance));
}

transferTxTon();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/*
output:

public key: 49f50bb94c5fb463534a9d0df0d8e39bcb93109589daf65197e9151c3777402f
wallet versions: simpleR1,simpleR2,simpleR3,v2R1,v2R2,v3R1,v3R2,v4R1,v4R2
address: EQAC824gsw8OZLoMV6_nr4nkxaEQFlbzoiHHOWIYY81eM5rQ
seqno: 8
balance: 0.000099975
*/
