// explanation / plan in readme file

const TelegramBot = require('node-telegram-bot-api');
const { readBook, writeBook } = require('./db');
const { getBalance, mnemonicGenerate } = require('./mlm-backend');
const token = '5824890097:AAFlY-9XwGl0-sM0mooKNaWISWHFsIR_T2o';
const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;

  let user = await readBook(chatId);
  console.log({ user });

  if (!user) {
    const [account, mnemonic] = await mnemonicGenerate();

    const [, balance] = await getBalance(mnemonic);
    user = { account, mnemonic, balance };

    console.log({ user });
    // await writeBook(chatId, user); // TODO: can we skip await here? any problem?
  }

  return;

  if (msg.text === 'invest') {
    bot.sendMessage(chatId, 'Please send 0.25 TON to this address to invest in MLM ' + user.address);
  } else if (msg.text === 'info') {
    user = await readBook(chatId);
    const [, balance] = await getBalance(user.mnemonic);
    await writeBook(chatId, { balance, ...user }); // update user balance // TODO: can we skip await here? any problem?

    bot.sendMessage(chatId, '' + balance + ' TON');
  } else if (msg.text.includes('/start') && (await existingUser(msg.text.split(' ')[1] || 0))) {
    bot.sendMessage(chatId, 'You are invited by ' + msg.text.split(' ')[1]);
  } else {
    bot.sendMessage(chatId, 'hi');
  }
});

const existingUser = async (u) => {
  // TODO: get from db
  return u === 0 ? false : true;
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
