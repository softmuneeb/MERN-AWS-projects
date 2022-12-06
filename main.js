// explanation / plan in readme file

const TelegramBot = require('node-telegram-bot-api');
const { getBalance, mnemonicGenerate } = require('./mlm-backend');
const token = '5824890097:AAFlY-9XwGl0-sM0mooKNaWISWHFsIR_T2o';
const bot = new TelegramBot(token, { polling: true });

// const [a, m] = [
//   'EQAUBDH8lrpWuO88cxudGbwO2KCcTJrwBcAfwVcyXlfEOo-x',
//   'camp hard goose quiz crew van inner tent leopard make student around hero nation garbage task swim series enlist rude skull mass grace wheel',
// ];

bot.on('message', async (msg) => {
  // const chatId = msg.chat.id;

  console.log({ msg: JSON.stringify(msg) });
  const chatId = '1672843321';
  const [a, m] = await mnemonicGenerate();

  bot.sendMessage(
    chatId,
    `Please send 0.25 TON to this address to invest in MLM
    ${a}`,
  );
});

let botBalance = '';
setInterval(async () => {
  const [, balance] = await getBalance();

  if (botBalance !== balance) {
    const chatId = '1672843321';
    botBalance !== '' && bot.sendMessage(chatId, `Payment received`);

    console.log({ balance, botBalance });
    botBalance = balance;
  }
}, 5000);
