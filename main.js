// explanation / plan in readme file

const { readBook, writeBook } = require('./db');
const { getBalance, mnemonicGenerate, transferFrom, publicKey } = require('./mlm-backend');

const TelegramBot = require('node-telegram-bot-api');
const token = '5824890097:AAFlY-9XwGl0-sM0mooKNaWISWHFsIR_T2o'; // TODO: add in env
const bot = new TelegramBot(token, { polling: true });

const defaultReferrer = 'crypto_millio';
// Admin Wallet
const [adminUserName, adminAddress, adminMnemonic] = [
  'ADMIN',
  'EQAUBDH8lrpWuO88cxudGbwO2KCcTJrwBcAfwVcyXlfEOo-x',
  'camp hard goose quiz crew van inner tent leopard make student around hero nation garbage task swim series enlist rude skull mass grace wheel',
]; // would come from env file

const level0 = 0.0005; // < 5 TON ZERO --- NO LEVEL -- he can not get referral link
const level1 = 0.0006; // 5 TON   BABY --- all money goto ADMIN -- he will get referral link -- can upgrade
const level2 = 0.0007; // 25 TON  START --- withdraw starts here
const level3 = 0.0008; // 50 TON  WALK
const level4 = 0.0009; // 200 TON RUN
const level5 = 0.001; // 500 TON FLY
const percent = 1 / 100;

const onMessage = async (msg) => {
  console.log({ message: msg.text });

  const chatId = msg.chat.id;
  const userName = msg.chat.username;
  let pub;
  let user = await readBook({ userName });

  // show deposit instructions
  // users who came from referral link
  if (msg.text.includes('/start')) {
    // old user: if balance updated then update rewards up in the chain and also update balance deposited
    // new user: ------> with refer
    //         |-------> without refer
    //
    //
    // show stats saved in db to telegram user

    if (existsUser(user)) {
      // give reward if balance updated
      const [balanceNano, balance] = await getBalance(user.mnemonic);
      // await writeBook({ userName }, { depositedFunds: balance });
      // check balance change
      let userParent = await readBook({ userName: user.parent });
      let admin = await readBook({ userName: adminUserName });
      let pool = await readBook({ userName: 'POOL' });

      // 1 to 3
      if (user.child.length <= 3) {
        // await writeBook({ userName }, { balance: 0 });
        await writeBook({ userName: user.parent }, { balance: userParent.balance + balance * 10 * percent });
        await writeBook({ userName: adminUserName }, { balance: admin.balance + balance * 5 * percent });
        await writeBook({ userName: 'POOL' }, { balance: pool.balance + balance * 5 * percent });
      }

      // 4 to 6
      else if (user.child.length <= 6) {
        await writeBook({ userName: user.parent }, { balance: userParent.balance + balance * 15 * percent });
        await writeBook({ userName: adminUserName }, { balance: admin.balance + balance * 2.5 * percent });
        await writeBook({ userName: 'POOL' }, { balance: pool.balance + balance * 2.5 * percent });
      }
      // 7 or more child
      else {
        await writeBook({ userName: user.parent }, { balance: userParent.balance + userParent.balance * 20 * percent });
      }

      // on each level check their plan deposited amounts...
      // level 1 done above, now we go level 2 to 15 levels up
      console.log('parents start:');
      for (let i = 2; i <= 15; i++) {
        if (userParent.userName === '0') break;

        userParent = await readBook({ userName: userParent.parent });
        console.log({ i, userParent: userParent.userName });
      }
      console.log('parents end:');
    } else {
      console.log('Congrats new user!');

      // Create and Save Wallet
      const [publicKey, mnemonic] = await mnemonicGenerate();
      pub = publicKey;
      await writeBook({ userName }, { userName, chatId, publicKey, mnemonic }); // TODO: can we skip await here? any problem?

      let referrer = msg.text.split(' ')[1];
      if (referrer === undefined) {
        referrer = defaultReferrer;
      }

      // referrer must exist in system
      const referrerObj = await readBook({ userName: referrer });
      if (!existsUser(referrerObj)) {
        bot.sendMessage(chatId, 'Invalid link OR Your sponsor does not exist in MLM System');
        return;
      }
      
      await writeBook({ userName }, { parent: referrer });

      await writeBook({ userName: referrer }, { child: [...referrerObj.child, userName] });

      bot.sendMessage(chatId, userName + ' is invited by ' + referrer);
    }

    let parent = '';
    let child = '';
    let showPublicKey = '';

    if (user.parent !== '0') {
      parent = 'You are invited by: ' + user.parent + '\n';
    }
    if (user.child.length > 0) {
      child = 'You invited: ' + user.child + '\n';
    }

    if (user.publicKey === '0') showPublicKey = pub;
    else showPublicKey = user.publicKey;

    console.log({ c: user.child });

    // show user info
    bot.sendMessage(
      chatId,
      'Hi ' +
        user.userName +
        '\n' +
        user.balance +
        ' TON in Your wallet:\n' +
        showPublicKey +
        '\n' +
        parent +
        child +
        'Your invite link: https://t.me/sheikhu_bot?start=' +
        user.userName,
    );
  }
  // users who want to upgrade
  else if (msg.text === '/upgrade') {
    bot.sendMessage(chatId, 'Under development');
  }
  // users who want to withdraw
  else if (msg.text === '/withdraw') {
    bot.sendMessage(chatId, 'Under development');
  }
  // bot does not understand message
  else {
    bot.sendMessage(chatId, 'hi, type /start');
  }
};

// onMessage();
bot.on('message', onMessage);

const existsUser = (user) => {
  return user.publicKey !== '0';
};

//d depositedFunds
const plan = (d) => {
  let p; // plan
  if (d <= level0) p = 0;
  else if (d <= level1) p = 1;
  else if (d <= level2) p = 2;
  else if (d <= level3) p = 3;
  else if (d <= level4) p = 4;
  else if (d <= level5) p = 5;
  return p;
};

const seedDB = async () => {
  if (!existsUser(await readBook({ userName: defaultReferrer }))) {
    console.log('db used first time');
    const [publicKey, mnemonic] = await mnemonicGenerate();
    await writeBook({ userName: defaultReferrer }, { userName: defaultReferrer, chatId: 'tbd', publicKey, mnemonic });
  } else {
    console.log('db used second or more times');
  }
};

seedDB();

// let botBalance = '';
// setInterval(async () => {
//   const [, balance] = await getBalance(m);

//   if (botBalance !== balance) {
//     botBalance !== '' && bot.sendMessage(chatId, `Payment received`);

//     console.log({ balance, botBalance });
//     botBalance = balance;
//   }
// }, 5000);

// TonWeb.utils.fromNano
// TonWeb.utils.toNano
