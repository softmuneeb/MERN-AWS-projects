// explanation / plan in readme file

const { readBook, writeBook } = require('./db');
const { getBalance, mnemonicGenerate } = require('./mlm-backend');

const TelegramBot = require('node-telegram-bot-api');
const token = '5824890097:AAFlY-9XwGl0-sM0mooKNaWISWHFsIR_T2o'; // TODO: add in env
const bot = new TelegramBot(token, { polling: true });

const onMessage = async (msg) => {
  const chatId = msg.chat.id;
  // const chatId = '1672843321';

  let user = await readBook({ chatId });
  console.log({ user });

  if (user.publicKey === '0') {
    // new user
    const [publicKey, mnemonic] = await mnemonicGenerate();
    const [, balance] = await getBalance(mnemonic);
    user = { chatId, publicKey, mnemonic, balance };
    await writeBook({ chatId }, user); // TODO: can we skip await here? any problem?
  }

  // return;

  if (msg.text === '/start') {
    let balance = user.balance;
    // update balance in db
    if (user.publicKey !== '0') {
      [, balance] = await getBalance(user.mnemonic);
      await writeBook({ chatId }, { balance });
    }

    bot.sendMessage(chatId, 'Your wallet ' + user.publicKey + '\n' + balance + ' TON');
  } else if (msg.text.includes('/start') && (await existingUser(msg))) {
    bot.sendMessage(chatId, 'You are invited');
  } else {
    bot.sendMessage(chatId, 'hi, type /start');
  }
};

// onMessage();
bot.on('message', onMessage);

const existingUser = async (msg) => {
  // const u = msg.text.split(' ')[1];

  // TODO: get from db
  // return u === 0 ? false : u;

  return true;
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
