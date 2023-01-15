// explanation / plan in readme file

const tonMnemonic = require('tonweb-mnemonic');
const TonWeb = require('tonweb');

const apiKey = '85ab5bbbedd3e23b7932501fda014e2bd8d7b5d1c0a3d23ed668e46c99a6ea34';
const tonweb = new TonWeb(new TonWeb.HttpProvider('https://toncenter.com/api/v2/jsonRPC', { apiKey }));

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function isValidAddress(address) {
  return TonWeb.utils.Address.isValid(address);
}

async function publicKey(mnemonic) {
  const mnemonicArray = mnemonic.split(' ');
  const keyPair = await tonMnemonic.mnemonicToKeyPair(mnemonicArray);
  const WalletClass = tonweb.wallet.all['v3R2'];
  const wallet = new WalletClass(tonweb.provider, { publicKey: keyPair.publicKey });
  const seqno = (await wallet.methods.seqno().call()) || 0;
  const address = (await wallet.getAddress()).toString(true, true, true);
  return address;
}

async function getBalance(address) {
  try {
    let balance = await tonweb.getBalance(address);
    return [balance, Number(TonWeb.utils.fromNano(balance))];
  } catch (error) {
    console.log('error: ' + error);
    return [null, null];
  }
}
async function getTransactions(address) {
  try {
    let tx = await tonweb.getTransactions(address);
    return tx;
  } catch (error) {
    console.log('error: ' + error);
    return null;
  }
}

async function mnemonicGenerate() {
  const toHexString = (byteArray) => {
    return Array.prototype.map
      .call(byteArray, function (byte) {
        return ('0' + (byte & 0xff).toString(16)).slice(-2);
      })
      .join('');
  };

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

async function transferFrom(mnemonic, toAddress, amount, errorFunc, MIN_TX_AMOUNT) {
  amount -= 0.06
  if (amount < MIN_TX_AMOUNT) return;

  const keyPair = await tonMnemonic.mnemonicToKeyPair(mnemonic.split(' '));
  const WalletClass = tonweb.wallet.all['v3R2'];
  const wallet = new WalletClass(tonweb.provider, { publicKey: keyPair.publicKey });
  // console.log('wallet versions:', Object.keys(tonweb.wallet.all).toString());
  const seqno = (await wallet.methods.seqno().call()) || 0;
  console.log({ seqno });

  try {
    const fee = await wallet.methods
      .transfer({
        secretKey: keyPair.secretKey,
        toAddress: await new TonWeb.utils.Address(toAddress).toString(true, true, false),
        amount: TonWeb.utils.toNano('' + amount.toFixed(7)), // 7 decimal places only
        seqno: seqno,
        sendMode: 3,
        // payload: 'MLM Bot', // optional comment // may it saves gas
      })
      // .estimateFee();
      .send();
    console.log({ fee });
  } catch (e) {
    errorFunc && errorFunc(e);
    console.log(e);
  }

  // let currentSeqno = seqno;
  // while (currentSeqno == seqno) {
  //   console.log('waiting for transaction to confirm...');
  //   await sleep(1500); // avoid throttling by toncenter.com
  //   currentSeqno = (await wallet.methods.seqno().call()) || 0;
  // }
  // const address = await wallet.getAddress();
  // const balance = await tonweb.getBalance(address);
  // console.log('balance:', TonWeb.utils.fromNano(balance));
}

const [userAddress2, userMnemonic2] = [
  'EQAsby8THtByrEum-YfD6FjTAFvausrxmbTK0Zox50l76wG2',
  //
  'mercy buffalo rotate airport sample earth program elevator steel repair member march explain another destroy ancient embark school thank happy clean supply work second',
];

const [adminAddress] = [
  'EQBj6GeJxGbXyA5Uu-LzQKs3HxBn7iXcMOXQh4sVtto3awPa',
  //
  '',
];

const unitTest1 = async () => {
  const [bNano, b] = await getBalance(userMnemonic2);
  console.log({ bNano, b });

  await transferFrom(
    'great topic chat dry message fragile dinner morning vibrant cream hungry eight borrow north lounge pool involve firm harbor voice upper win mansion anger',
    'EQBj6GeJxGbXyA5Uu-LzQKs3HxBn7iXcMOXQh4sVtto3awPa',
    0.02,
    transferError,
  );
};

const transferError = (e) => {
  try {
    console.log(`1, ${JSON.stringify(e)}`);
  } catch (error) {
    console.log(`2, ${e}`);
  }
};

const unitTest2 = async () => {
  let tx = await getTransactions(adminAddress);
  console.log(JSON.stringify(tx));
};
const unitTest3 = async () => {
  console.log('aoa');
  console.log(22 / 7);
  let n = 22 / 7;
  console.log('' + TonWeb.utils.toNano('' + n.toFixed(7)));
  // Number(TonWeb.utils.fromNano(22 / 7));
};

// unitTest1();
// unitTest2();
// unitTest3();

module.exports = {
  publicKey,
  getBalance,
  transferFrom,
  isValidAddress,
  mnemonicGenerate,
};
