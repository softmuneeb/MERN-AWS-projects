// explanation / plan in readme file

const { readBook, writeBook } = require('./db');
const { getBalance, mnemonicGenerate } = require('./mlm-backend');

const TelegramBot = require('node-telegram-bot-api');
const token = '5824890097:AAFlY-9XwGl0-sM0mooKNaWISWHFsIR_T2o'; // TODO: add in env
const bot = new TelegramBot(token, { polling: true });

const onMessage = async (msg) => {
  console.log({ message: msg.text });

  const chatId = msg.chat.id;
  const userName = msg.chat.username;
  let user = await readBook({ userName });

  if (newUser(user)) {
    console.log('Congrats new user!');
    const [publicKey, mnemonic] = await mnemonicGenerate();
    const [, balance] = await getBalance(mnemonic);
    user = { chatId, userName, publicKey, mnemonic, balance };
    await writeBook({ userName }, user); // TODO: can we skip await here? any problem?
  }

  // show deposit instructions
  if (msg.text === '/start') {
    let balance = user.balance;

    // update balance in db
    if (!newUser(user)) {
      [, balance] = await getBalance(user.mnemonic);
      await writeBook({ userName }, { balance });
    }

    bot.sendMessage(
      chatId,
      'Hi ' +
        user.userName +
        '\n' +
        balance +
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
      await writeBook({ userName }, { parent: referrer });
      await writeBook({ userName: referrer }, { child: [userName] });

      bot.sendMessage(chatId, 'You are invited by ' + referrer);
    }
  } else {
    bot.sendMessage(chatId, 'hi, type /start');
  }
};

// onMessage();
bot.on('message', onMessage);

const newUser = (user) => {
  return user.publicKey === '0';
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
