// explanation / plan in readme file

const tonMnemonic = require('tonweb-mnemonic');
const TonWeb = require('tonweb');

const apiKey = 'ec70b7fdf198bda11333873b6484724d73f2b08ed1d8c6e6f1663808feb0e3c1';
const tonweb = new TonWeb(new TonWeb.HttpProvider('https://toncenter.com/api/v2/jsonRPC', { apiKey }));

async function publicKey(mnemonic) {
  const mnemonicArray = mnemonic.split(' ');
  const keyPair = await tonMnemonic.mnemonicToKeyPair(mnemonicArray);

  // console.log('secret key:', Buffer.from(keyPair.secretKey).toString('hex'));
  // console.log('public key:', Buffer.from(keyPair.publicKey).toString('hex'));

  // console.log('wallet versions:', Object.keys(tonweb.wallet.all).toString());

  const WalletClass = tonweb.wallet.all['v3R2'];
  const wallet = new WalletClass(tonweb.provider, { publicKey: keyPair.publicKey });
  const seqno = (await wallet.methods.seqno().call()) || 0;
  // console.log('seqno:', seqno);

  const address = (await wallet.getAddress()).toString(true, true, true);
  // console.log({ address });

  return address;
  // ['simpleR1', 'simpleR2', 'simpleR3', 'v2R1', 'v2R2', 'v3R1', 'v3R2', 'v4R1', 'v4R2'].map(async (v) => {
  //   const WalletClass = tonweb.wallet.all[v];
  //   const wallet = new WalletClass(tonweb.provider, { publicKey: keyPair.publicKey });
  //   const seqno = (await wallet.methods.seqno().call()) || 0;
  //   console.log('seqno:', seqno);

  //   const address = (await wallet.getAddress()).toString(true, true, true);

  //   console.log({ v, address });
  // });
}

async function transferFrom(mnemonic, toAddress, amount) {
  const keyPair = await tonMnemonic.mnemonicToKeyPair(mnemonic.split(' '));

  // const tonweb = new TonWeb(new TonWeb.HttpProvider('https://toncenter.com/api/v2/jsonRPC'));
  const WalletClass = tonweb.wallet.all['v3R2'];
  const wallet = new WalletClass(tonweb.provider, { publicKey: keyPair.publicKey });
  console.log('wallet versions:', Object.keys(tonweb.wallet.all).toString());
  const seqno = (await wallet.methods.seqno().call()) || 0;
  // await sleep(1500); // TODO: api key check... avoid throttling by toncenter.com

  const fee = await wallet.methods
    .transfer({
      secretKey: keyPair.secretKey,
      toAddress,
      amount, // TonWeb.utils.toNano('0.0006'), // 0.0006 TON
      seqno: seqno,
      payload: 'MLM Bot', // optional comment
      sendMode: 3,
    })
    // .estimateFee()
    .send();

  console.log({ fee });
  // // wait until confirmed // note down things in db ...
  let currentSeqno = seqno;
  while (currentSeqno == seqno) {
    console.log('waiting for transaction to confirm...');
    await sleep(1500); // avoid throttling by toncenter.com
    currentSeqno = (await wallet.methods.seqno().call()) || 0;
  }
  // const address = await wallet.getAddress();
  // await sleep(1500); // avoid throttling by toncenter.com
  // const balance = await tonweb.getBalance(address);
  // console.log('balance:', TonWeb.utils.fromNano(balance));
}

async function getBalance(m) {
  const mnemonicArray = m.split(' ');
  const keyPair = await tonMnemonic.mnemonicToKeyPair(mnemonicArray);
  // console.log('public key:', Buffer.from(keyPair.publicKey).toString('hex'));

  // list available wallet versions
  // const tonweb = new TonWeb(new TonWeb.HttpProvider('https://toncenter.com/api/v2/jsonRPC'));
  // console.log('wallet versions:', Object.keys(tonweb.wallet.all).toString());

  // ['simpleR1', simpleR2, simpleR3, v2R1, v2R2, v3R1, v3R2, v4R1, v4R2];
  // instance of wallet V4 r2 (from the list printed above)
  const WalletClass = tonweb.wallet.all['v3R2'];

  const wallet = new WalletClass(tonweb.provider, { publicKey: keyPair.publicKey });
  const address = await wallet.getAddress();
  // console.log('address:', address.toString(true, true, true));
  // const seqno = (await wallet.methods.seqno().call()) || 0;
  // console.log('seqno:', seqno);
  let balance;
  try {
    balance = await tonweb.getBalance(address);
    return [balance, TonWeb.utils.fromNano(balance)];
  } catch (error) {
    console.log('error: ' + error);
    return [null, null];
  }
}

async function mnemonicGenerate() {
  tonMnemonic.wordlists.EN;
  // -> array of all words

  const mnemonic = await tonMnemonic.generateMnemonic();
  // -> ["vintage", "nice", "initial", ... ]  24 words by default

  await tonMnemonic.validateMnemonic(mnemonic);
  // -> true

  await tonMnemonic.isPasswordNeeded(mnemonic);
  // -> false

  await tonMnemonic.mnemonicToSeed(mnemonic);
  // -> Uint8Array(32) [183, 90, 187, 181, .. ]

  const keyPair = await tonMnemonic.mnemonicToKeyPair(mnemonic);
  // -> {publicKey: Uint8Array(32), secretKey: Uint8Array(64)}

  toHexString(keyPair.publicKey);
  // -> "8c8dfc9f9f58badd76151775ff0699bb2498939f669eaef2de16f95a52888c65"

  toHexString(keyPair.secretKey);
  // -> "b75abbb599feed077c8e11cc8cadecfce4945a7869a56d3d38b59cce057a3e0f8c8dfc9f9f58badd76151775ff0699bb2498939f669eaef2de16f95a52888c65"

  const m = mnemonic.join(' ');
  return [await publicKey(m), m];
}

function toHexString(byteArray) {
  return Array.prototype.map
    .call(byteArray, function (byte) {
      return ('0' + (byte & 0xff).toString(16)).slice(-2);
    })
    .join('');
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const unitTest = async () => {
  // publicKey();
  // transferTxTon();
  const [userAddress, userMnemonic] = [
    'EQDaESDKNtySUnifpWndqyLSlYBaydMWlt1zjEaaewHqjMHS',
    'stage capital border write dress lend retire coconut motor farm core piece lunar source firm box start story similar live odor hill crucial cannon',
  ];
  const [bNano, b] = await getBalance(userMnemonic);
  await getBalance(userMnemonic);
  await getBalance(userMnemonic);
  await getBalance(userMnemonic);
  // await getBalance(userMnemonic);

  console.log({ bNano, b });
  // const [adminAddress, adminMnemonic] = [
  //   'EQAUBDH8lrpWuO88cxudGbwO2KCcTJrwBcAfwVcyXlfEOo-x',
  //   'camp hard goose quiz crew van inner tent leopard make student around hero nation garbage task swim series enlist rude skull mass grace wheel',
  // ];

  // try {
  //   await transferFrom(userMnemonic, adminAddress, bNano);
  // } catch (e) {
  //   console.log('error is:', e);
  // }
};

// unitTest();

/*
output:

public key: 49f50bb94c5fb463534a9d0df0d8e39bcb93109589daf65197e9151c3777402f
wallet versions: simpleR1,simpleR2,simpleR3,v2R1,v2R2,v3R1,v3R2,v4R1,v4R2
address: EQAC824gsw8OZLoMV6_nr4nkxaEQFlbzoiHHOWIYY81eM5rQ
seqno: 8
balance: 0.000099975

14 dec 2022
public key: 93b00b63b2b4e32cff00ed0321a4eef3decf2065e87bb57bf8fa8789b4294b48
wallet versions: simpleR1,simpleR2,simpleR3,v2R1,v2R2,v3R1,v3R2,v4R1,v4R2
address: EQDaESDKNtySUnifpWndqyLSlYBaydMWlt1zjEaaewHqjMHS
seqno: 0
{ bNano: '100496150', b: '0.10049615' }
*/

module.exports = {
  getBalance,
  mnemonicGenerate,
  publicKey,
  transferFrom,
};
