// explanation / plan in readme file

const TelegramBot = require('node-telegram-bot-api');
const token = '5824890097:AAFlY-9XwGl0-sM0mooKNaWISWHFsIR_T2o';
const bot = new TelegramBot(token, {polling: true});
// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"
  bot.sendMessage(chatId, resp + " kya kar rai ho?");
});
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Received your message');
});