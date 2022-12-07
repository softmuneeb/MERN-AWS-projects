// explanation / plan in readme file

const { readBook, writeBook } = require('./db');
const { getBalance, mnemonicGenerate } = require('./mlm-backend');

const TelegramBot = require('node-telegram-bot-api');
const token = '5824890097:AAFlY-9XwGl0-sM0mooKNaWISWHFsIR_T2o'; // TODO: add in env
const bot = new TelegramBot(token, { polling: true });

const onMessage = async (msg) => {
  console.log({ message: msg.text });

  const chatId = msg.chat.id;
  let user = await readBook({ chatId });

  if (newUser(user)) {
    const [publicKey, mnemonic] = await mnemonicGenerate();
    const [, balance] = await getBalance(mnemonic);
    user = { chatId, publicKey, mnemonic, balance };
    await writeBook({ chatId }, user); // TODO: can we skip await here? any problem?
  }

  // show deposit instructions
  if (msg.text === '/start') {
    let balance = user.balance;
    if (!newUser(user)) {
      // update balance in db
      [, balance] = await getBalance(user.mnemonic);
      await writeBook({ chatId }, { balance });
    }

    bot.sendMessage(chatId, '/start\nYour wallet /' + user.publicKey + '\n' + balance + ' TON');
  }

  // users who came from
  else if (msg.text.includes('/start')) {
    const referrer = msg.text.split(' ')[1];

    if (referrer === undefined) {
      bot.sendMessage(chatId, 'You are invited none.');
    } else {
      await writeBook({ chatId }, { parent: referrer });
      bot.sendMessage(chatId, 'You are invited by ' + referrer);
    }
  } else {
    bot.sendMessage(chatId, 'hi, type /start');
  }
};

// onMessage();
bot.on('message', onMessage);

const newUser = async (user) => {
  return user.publicKey === '0';

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
