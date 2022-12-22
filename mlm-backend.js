// explanation / plan in readme file

const tonMnemonic = require('tonweb-mnemonic');
const TonWeb = require('tonweb');

let { TonClient, Wallet, Address } = require('ton');
// TonClient = TonClient.TonClient;

const apiKey = '85ab5bbbedd3e23b7932501fda014e2bd8d7b5d1c0a3d23ed668e46c99a6ea34';
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
  const address = await wallet.getAddress();
  // await sleep(1500); // avoid throttling by toncenter.com
  const balance = await tonweb.getBalance(address);
  console.log('balance:', TonWeb.utils.fromNano(balance));
}

async function transferFrom2(secretKey, publicKey, toAddress, amount) {
  const wallet = tonweb.wallet.create({ publicKey });
  const r = await wallet.deploy();
  console.log({ r, wallet: '' + wallet });

  const address = await wallet.getAddress();
  const nonBounceableAddress = address.toString(true, true, false);
  console.log({ nonBounceableAddress });

  const seqno = await wallet.methods.seqno().call();

  await wallet.deploy(secretKey).send(); // deploy wallet to blockchain

  const fee = await wallet.methods
    .transfer({
      secretKey: wallet.secretKey,
      toAddress,
      amount,
      seqno,
      payload: 'Hello',
      sendMode: 3,
    })
    .estimateFee();

  console.log({ fee: '' + fee });
}
async function transferFrom3() {
  // mnemonic to key pair
  const mnemonic = userMnemonic;

  const mnemonicArray = mnemonic.split(' ');
  const keyPair = await tonMnemonic.mnemonicToKeyPair(mnemonicArray);
  console.log('secret key:', Buffer.from(keyPair.secretKey).toString('hex'));

  // list available wallet versions
  const tonweb = new TonWeb(new TonWeb.HttpProvider('https://toncenter.com/api/v2/jsonRPC', { apiKey }));
  console.log('wallet versions:', Object.keys(tonweb.wallet.all).toString());

  // instance of wallet V4 r2 (from the list printed above)
  const WalletClass = tonweb.wallet.all['v4R2'];
  const wallet = new WalletClass(tonweb.provider, { publicKey: keyPair.publicKey });
  const seqno = (await wallet.methods.seqno().call()) || 0;
  console.log('seqno:', seqno);
  await sleep(1500); // avoid throttling by toncenter.com

  try {
    await wallet.methods
      .transfer({
        secretKey: keyPair.secretKey,
        toAddress: adminAddress,
        amount: TonWeb.utils.toNano('0.1'), // 0.1 TON
        seqno: seqno,
        payload: 'Hello', // optional comment
        sendMode: 3,
      })
      .send();
  } catch (error) {
    console.log(error);
  }

  // wait until confirmed
  let currentSeqno = seqno;
  while (currentSeqno == seqno) {
    console.log('waiting for transaction to confirm...');
    await sleep(1500); // avoid throttling by toncenter.com
    currentSeqno = (await wallet.methods.seqno().call()) || 0;
  }
  const address = await wallet.getAddress();
  await sleep(1500); // avoid throttling by toncenter.com
  const balance = await tonweb.getBalance(address);
  console.log('balance:', TonWeb.utils.fromNano(balance));
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
    return [balance, Number(TonWeb.utils.fromNano(balance))];
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

const [userAddress, userMnemonic] = [
  'EQDaESDKNtySUnifpWndqyLSlYBaydMWlt1zjEaaewHqjMHS',
  'stage capital border write dress lend retire coconut motor farm core piece lunar source firm box start story similar live odor hill crucial cannon',
];
const [userAddress2, userMnemonic2] = [
  'EQAsby8THtByrEum-YfD6FjTAFvausrxmbTK0Zox50l76wG2',
  'mercy buffalo rotate airport sample earth program elevator steel repair member march explain another destroy ancient embark school thank happy clean supply work second',
];
const [adminAddress, adminMnemonic] = ['EQBj6GeJxGbXyA5Uu-LzQKs3HxBn7iXcMOXQh4sVtto3awPa', ''];

const unitTest1 = async () => {
  const [bNano, b] = await getBalance(userMnemonic);
  console.log({ bNano, b });
  try {
    await transferFrom2(userMnemonic2, userAddress2, adminAddress, bNano);
  } catch (e) {
    console.log('error is:', e);
  }
};

const unitTest2 = async () => {
  // getTransactions
  const client = new TonClient({
    endpoint: 'https://toncenter.com/api/v2/jsonRPC',
    apiKey,
  });
  // Open Wallet
  const keyPair = await tonMnemonic.mnemonicToKeyPair(userMnemonic2.split(' '));
  const wallet = client.openWalletFromSecretKey({
    workchain: -1,
    secretKey: keyPair.secretKey,
    type: 'org.ton.wallets.simple.r2',
  });
  console.log(wallet);

  // const a = await wallet.findActiveBySecretKey({
  //   client,
  //   workchain: -1,
  //   secretKey: keyPair.secretKey,
  // });
  // console.log(a);
  // const wallet = client.openWalletFromAddress({ source: userAddress2 });
  // const wallet = Wallet.openByType(client, 0, keyPair.secretKey, 'org.ton.wallets.v4');
  // working
  const balance = '' + (await client.getBalance(userAddress2));
  console.log(balance);
  let seqno = 1 + (await wallet.getSeqNo());
  console.log({ seqno, a: 'EQBj6GeJxGbXyA5Uu-LzQKs3HxBn7iXcMOXQh4sVtto3awPa'.length });
  let to = Address.parseFriendly('EQBj6GeJxGbXyA5Uu-LzQKs3HxBn7iXcMOXQh4sVtto3awPa').address;
  console.log({ to });
  try {
    Address;
    // await wallet.transfer({ to });
    await wallet.transfer({ to, value: 100, seqno, secretKey: keyPair.secretKey, bounce: false });
  } catch (e) {
    console.log('error is:', e);
  }
};

const unitTest3 = async () => {
  // mnemonic to key pair
  const mnemonic = userMnemonic2;
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
  const tx = await wallet.methods.transfer({
    secretKey: keyPair.secretKey,
    toAddress: adminAddress,
    amount: TonWeb.utils.toNano('0.02'), // 0.02 TON
    seqno: seqno,
    payload: 'Hello', // optional comment
    sendMode: 3,
  });

  const fee = await tx.estimateFee();

  console.log(fee);
  // console.log({ fee });
  // console.log({ fee: '' + fee });

  // await tx.send();

  // wait until confirmed
  // let currentSeqno = seqno;
  // while (currentSeqno == seqno) {
  //   console.log('waiting for transaction to confirm...');
  //   await sleep(1500); // avoid throttling by toncenter.com
  //   currentSeqno = (await wallet.methods.seqno().call()) || 0;
  // }
  // const address = await wallet.getAddress();
  // await sleep(1500); // avoid throttling by toncenter.com
  // const balance = await tonweb.getBalance(address);
  // console.log('balance:', TonWeb.utils.fromNano(balance));
};
const unitTest4 = async () => {
  // mnemonic to key pair
  const mnemonic = userMnemonic2;
  const mnemonicArray = mnemonic.split(' ');
  const keyPair = await tonMnemonic.mnemonicToKeyPair(mnemonicArray);
  console.log('secret key:', Buffer.from(keyPair.secretKey).toString('hex'));

  // list available wallet versions
  const tonweb = new TonWeb();
  console.log('wallet versions:', Object.keys(tonweb.wallet.all).toString());

  // instance of wallet V4 r2 (from the list printed above)
  const WalletClass = tonweb.wallet.all['v4R2'];

  let wallet = tonweb.wallet.create({ publicKey: keyPair.publicKey }); // create interface to wallet smart contract (wallet v3 by default)
  // const wallet = new WalletClass(tonweb.provider, { publicKey: keyPair.publicKey });

  const deploy = wallet.deploy(keyPair.secretKey); // deploy method
  const deployFee = await deploy.estimateFee(); // get estimate fee of deploy
  console.log(deployFee);

  await sleep(1500);
  const deploySended = await deploy.send(); // deploy wallet contract to blockchain
  console.log(deploySended);
  return;

  const deployQuery = await deploy.getQuery(); // get deploy query Cell
  console.log(deployQuery);

  const seqno = 10; //(await wallet.methods.seqno().call()) || 0;
  console.log('seqno:', seqno);
  await sleep(1500); // avoid throttling by toncenter.com

  for (let i = 0; i < 50; i++) {
    try {
      const fee = await wallet.methods
        .transfer({
          secretKey: keyPair.secretKey,
          toAddress: adminAddress,
          amount: TonWeb.utils.toNano('0.02'), // 0.02 TON
          seqno: seqno,
          payload: 'Hello', // optional comment
          sendMode: 3,
        })
        // .estimateFee();
        .send();

      await sleep(500); // avoid throttling by toncenter.com
      console.log(fee);
    } catch (e) {
      console.log(e);
    }
  }

  // wait until confirmed
  // let currentSeqno = seqno;
  // while (currentSeqno == seqno) {
  //   console.log('waiting for transaction to confirm...');
  //   await sleep(1500); // avoid throttling by toncenter.com
  //   currentSeqno = (await wallet.methods.seqno().call()) || 0;
  // }
  // const address = await wallet.getAddress();
  // await sleep(1500); // avoid throttling by toncenter.com
  // const balance = await tonweb.getBalance(address);
  // console.log('balance:', TonWeb.utils.fromNano(balance));
};

// unitTest4();
// unitTest3();
// unitTest1();
// unitTest2();
// transferFrom3();
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
//
