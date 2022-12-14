// explanation / plan in readme file

const { readBook, writeBook } = require('./db');
const { getBalance, mnemonicGenerate, transferFrom } = require('./mlm-backend');

const TelegramBot = require('node-telegram-bot-api');
const token = '5824890097:AAFlY-9XwGl0-sM0mooKNaWISWHFsIR_T2o'; // TODO: add in env
const bot = new TelegramBot(token, { polling: true });

// Admin Wallet
const [adminAddress, adminMnemonic] = [
  'EQAUBDH8lrpWuO88cxudGbwO2KCcTJrwBcAfwVcyXlfEOo-x',
  'camp hard goose quiz crew van inner tent leopard make student around hero nation garbage task swim series enlist rude skull mass grace wheel',
]; // would come from env file

const level0 = 0.0005; // < 5 TON ZERO
const level1 = 0.0006; // 5 TON   BABY
const level2 = 0.0007; // 25 TON  START
const level3 = 0.0008; // 50 TON  WALK
const level4 = 0.0009; // 200 TON RUN
const level5 = 0.001; // 500 TON FLY
const percent = 1 / 100;

const onMessage = async (msg) => {
  console.log({ message: msg.text });

  const chatId = msg.chat.id;
  const userName = msg.chat.username;
  let user = await readBook({ userName });
  console.log({ user });
  if (newUser(user)) {
    console.log('Congrats new user!');
    const [publicKey, mnemonic] = await mnemonicGenerate();
    user = { chatId, userName, publicKey, mnemonic };
    await writeBook({ userName }, user); // TODO: can we skip await here? any problem?
  }

  // show deposit instructions
  if (msg.text === '/start') {
    // send deposited money to ADMIN WALLET
    // add % to people balances 15 levels up
    // TODO: if someone comes direct in bot, make sheikhu his default parent. for code to work proper.
    // check balance increased? we can transfer funds later to admin wallet
    // if yes the give rewards
    // show user stats

    const [balanceNano, balance] = await getBalance(user.mnemonic);

    // await writeBook({ userName }, { depositedFunds: balance });
    // transferFrom(user.mnemonic, adminAddress, balanceNano);

    let userParent = await readBook({ userName: user.parent });
    let admin = await readBook({ userName: 'ADMIN' });
    let pool = await readBook({ userName: 'POOL' });

    // 1 to 3
    if (user.child.length <= 3) {
      // await writeBook({ userName }, { balance: 0 });
      await writeBook({ userName: user.parent }, { balance: userParent.balance + balance * 10 * percent });
      await writeBook({ userName: 'ADMIN' }, { balance: admin.balance + balance * 5 * percent });
      await writeBook({ userName: 'POOL' }, { balance: pool.balance + balance * 5 * percent });
    }

    // 4 to 6
    else if (user.child.length <= 6) {
      await writeBook({ userName: user.parent }, { balance: userParent.balance + balance * 15 * percent });
      await writeBook({ userName: 'ADMIN' }, { balance: admin.balance + balance * 2.5 * percent });
      await writeBook({ userName: 'POOL' }, { balance: pool.balance + balance * 2.5 * percent });
    }
    // 7 or more child
    else {
      await writeBook({ userName: user.parent }, { balance: userParent.balance + userParent.balance * 20 * percent });
    }

    // on each level check their plan deposited amounts...
    // level 1 done above, now we go level 2 to 15 levels up
    for (let i = 2; i <= 15; i++) {
      userParent = await readBook({ userName: userParent.parent });
      console.log({ i, userParent: userParent.userName });
    }
    //
    // recycle pool distribution
    // await writeBook({ userName: user.parent }, {balance: getBalance(userParent.mnemonic)+ balance * userParent.plan * percent}); // userParent.plan for START is 2%, WALK 3%, RUN 4%, FLY 5%

    userParent = await readBook({ userName: user.parent });
    admin = await readBook({ userName: 'ADMIN' });
    pool = await readBook({ userName: 'POOL' });
    console.log({
      userBalance: balance,
      userParentBalance: userParent.balance,
      adminBalance: admin.balance,
      poolBalance: pool.balance,
    });

    // show user info
    bot.sendMessage(
      chatId,
      'Hi ' +
        user.userName +
        '\n' +
        user.balance +
        ' TON in Your wallet:\n' +
        user.publicKey +
        (user.parent !== '0' && '\nYou are invited by: ' + user.parent) +
        (user.child !== '0' && '\nYou invited: ' + user.child) +
        '\nYour invite link: https://t.me/sheikhu_bot?start=' +
        user.userName,
    );
  }

  // users who came from
  else if (msg.text.includes('/start')) {
    const referrer = msg.text.split(' ')[1];

    if (referrer === undefined) {
      bot.sendMessage(chatId, 'You are invited none.');
    } else {
      // TODO: refresh DB to avoid chain recursion
      // TODO: child: [...user.child, userName]
      // create referrals chain
      await writeBook({ userName }, { parent: referrer });
      await writeBook({ userName: referrer }, { child: [userName] });

      // add balance to all people above the chain
      bot.sendMessage(chatId, 'You are invited by ' + referrer);
    }
  }
  // users who want to upgrade
  else if (msg.text === '/upgrade') {
    bot.sendMessage(chatId, 'Under development');
  } else {
    bot.sendMessage(chatId, 'hi, type /start');
  }
};

// onMessage();
bot.on('message', onMessage);

const newUser = (user) => {
  return user.publicKey === '0';
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
