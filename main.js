// explanation / plan in readme file

const TelegramBot = require('node-telegram-bot-api');
const { getBalance } = require('./mlm-backend');
const token = '5824890097:AAFlY-9XwGl0-sM0mooKNaWISWHFsIR_T2o';
const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
  // const chatId = msg.chat.id;

  console.log({ msg: JSON.stringify(msg) });
  const chatId = '1672843321';
  bot.sendMessage(
    chatId,
    `Please send 0.25 TON to this address to invest in MLM
    EQAsby8THtByrEum-YfD6FjTAFvausrxmbTK0Zox50l76wG2`,
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
