// explanation / plan in readme file

// TODO: it should come from env
const [defaultReferrer, defaultReferrerChatId, defaultReferrerAddress, defaultReferrerMnemonic] = [
  'crypto_millio',
  '1672843321',
  'EQAUBDH8lrpWuO88cxudGbwO2KCcTJrwBcAfwVcyXlfEOo-x',
  'camp hard goose quiz crew van inner tent leopard make student around hero nation garbage task swim series enlist rude skull mass grace wheel',
];
const [adminUserName, adminAddress, adminMnemonic] = [
  'ADMIN',
  'EQAUBDH8lrpWuO88cxudGbwO2KCcTJrwBcAfwVcyXlfEOo-x',
  'camp hard goose quiz crew van inner tent leopard make student around hero nation garbage task swim series enlist rude skull mass grace wheel',
];

const level0 = 0.0005; // < 5 TON ZERO --- NO LEVEL -- he can not get referral link
const level1 = 0.0006; // 5 TON   BABY --- all money goto ADMIN -- he will get referral link -- can upgrade
const level2 = 0.0007; // 25 TON  START --- withdraw starts here
const level3 = 0.0008; // 50 TON  WALK
const level4 = 0.0009; // 200 TON RUN
const level5 = 0.001; // 500 TON FLY
const percent = 1 / 100;

const { readBook, writeBook } = require('./db');
const { getBalance, mnemonicGenerate } = require('./mlm-backend');

const TelegramBot = require('node-telegram-bot-api');
const token = '5824890097:AAFlY-9XwGl0-sM0mooKNaWISWHFsIR_T2o'; // TODO: add in env
const bot = new TelegramBot(token, { polling: true });

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

    if (oldUser(user)) {
      const [, depositedFunds] = await getBalance(user.mnemonic);
      // depositedFunds updated // TODO: correct the logic balance + nonce OR tx + last updated
      if (depositedFunds !== user.depositedFunds) {
        await giveRewards(user, depositedFunds);
      }
    }
    // New User
    else {
      // Create and Save Wallet
      const [publicKey, mnemonic] = await mnemonicGenerate();
      pub = publicKey;
      await writeBook({ userName }, { userName, chatId, publicKey, mnemonic }); // TODO: can we skip await here? any problem?

      // get referrer
      let referrer = msg.text.split(' ')[1];
      if (referrer === undefined) {
        referrer = defaultReferrer;
      }

      // referrer must exist in system
      const referrerObj = await readBook({ userName: referrer });
      if (!oldUser(referrerObj)) {
        bot.sendMessage(chatId, 'Invalid link OR Your sponsor does not exist in MLM System');
        return;
      }

      // make referrer chain
      await writeBook({ userName }, { parent: referrer });
      await writeBook({ userName: referrer }, { child: [...referrerObj.child, userName] });

      // TODO: call the /start for the referrer here! :) // test and move it to readme
      bot.sendMessage(chatId, userName + ' is invited by ' + referrer);
      bot.sendMessage(referrerObj.chatId, 'You invited ' + userName);
    }

    // show stats saved in db to telegram user
    let parent = user.parent ? 'You are invited by: ' + user.parent + '\n' : '';
    let child = user.child.length > 0 ? 'You invited: ' + user.child + '\n' : '';
    let publicKey = user.publicKey ? user.publicKey : pub;

    // show user info
    bot.sendMessage(
      chatId,
      `${user.userName} has ${user.balance} TON
Your plan ${user.depositedFunds}
Deposit more TON to reach next level
${parent + child}
Invite link: https://t.me/sheikhu_bot?start=${user.userName}
TON deposit address:`,
    );
    // send msg after 100 ms, just to confirm it reaches after 1st message
    setTimeout(() => bot.sendMessage(chatId, '' + publicKey), 100);
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

// namaz pending and you are working = no barkat in this work
const giveRewards = async (user, depositedFunds) => {
  if (!user.parent) {
    console.log('no user parent, no reward');
    return;
  }

  await writeBook({ userName: user.userName }, { depositedFunds });
  // check balance change
  let userParent = await readBook({ userName: user.parent });
  let admin = await readBook({ userName: adminUserName });
  let pool = await readBook({ userName: 'POOL' });

  // 1 to 3
  if (user.child.length <= 3) {
    // await writeBook({ userName }, { balance: 0 });
    await writeBook({ userName: user.parent }, { balance: userParent.balance + depositedFunds * 10 * percent });
    await writeBook({ userName: adminUserName }, { balance: admin.balance + depositedFunds * 5 * percent });
    await writeBook({ userName: 'POOL' }, { balance: pool.balance + depositedFunds * 5 * percent });
  }

  // 4 to 6
  else if (user.child.length <= 6) {
    await writeBook({ userName: user.parent }, { balance: userParent.balance + depositedFunds * 15 * percent });
    await writeBook({ userName: adminUserName }, { balance: admin.balance + depositedFunds * 2.5 * percent });
    await writeBook({ userName: 'POOL' }, { balance: pool.balance + depositedFunds * 2.5 * percent });
  }
  // 7 or more child
  else {
    await writeBook({ userName: user.parent }, { balance: userParent.balance + userParent.balance * 20 * percent });
  }

  // on each level check their plan deposited amounts...
  // level 1 done above, now we go level 2 to 15 levels up
  console.log('parents start:');
  console.log({ i: 1, userParent: userParent.userName });
  for (let level = 2; level <= 15; level++) {
    if (!userParent.parent) {
      break;
    }
    // TODO: can not understand code? whatsapp me +923348438939
    userParent = await readBook({ userName: userParent.parent });
    planLevelsAllowed = getPlanLevel(userParent.depositedFunds);
    // give reward on level 6, 9, 12, 15
    if (level < planLevelsAllowed) {
      await writeBook({ userName: userParent.userName }, { balance: userParent.balance + depositedFunds * 5 * percent });
    }
    console.log({ i: level, userParent: userParent.userName });
  }
  console.log('parents end:');
};
// onMessage();
bot.on('message', onMessage);

const oldUser = (user) => {
  return user.publicKey !== null;
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

//d depositedFunds
const getPlanLevel = (d) => {
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
  if (!oldUser(await readBook({ userName: defaultReferrer }))) {
    console.log('db used first time');

    await writeBook(
      { userName: defaultReferrer },
      {
        chatId: defaultReferrerChatId,
        userName: defaultReferrer,
        publicKey: defaultReferrerAddress,
        mnemonic: defaultReferrerMnemonic,
      },
    );
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
