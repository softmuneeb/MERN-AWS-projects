// explanation / plan in readme file

const TelegramBot = require('node-telegram-bot-api');
const { getBalance, mnemonicGenerate } = require('./mlm-backend');
const token = '5824890097:AAFlY-9XwGl0-sM0mooKNaWISWHFsIR_T2o';
const bot = new TelegramBot(token, { polling: true });

// wallet created
// Store user name also
const chatId = '1672843321'; // would come from db
const [a, m] = [
  'EQAUBDH8lrpWuO88cxudGbwO2KCcTJrwBcAfwVcyXlfEOo-x',
  'camp hard goose quiz crew van inner tent leopard make student around hero nation garbage task swim series enlist rude skull mass grace wheel',
]; // would come from db

bot.on('message', async (msg) => {
  // const chatId = msg.chat.id;

  console.log(JSON.stringify(msg, null, 2));

  // const [a, m] = await mnemonicGenerate();
  if (msg.text === 'invest') {
    bot.sendMessage(chatId, 'Please send 0.25 TON to this address to invest in MLM ' + a);
  } else if (msg.text === 'balance') {
    const [, balance] = await getBalance(m);
    bot.sendMessage(chatId, '' + balance + ' TON');
  } else if (msg.text.includes('/start') && (await existingUser(msg.text.split(' ')[1]))) {
    bot.sendMessage(chatId, 'You are invited by ' + msg.text.split(' ')[1]);
  } else {
    bot.sendMessage(chatId, 'hi');
  }
});

const existingUser = async () => {
  // TODO: get from db
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
