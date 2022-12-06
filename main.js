// explanation / plan in readme file

const TelegramBot = require('node-telegram-bot-api');
const { getBalance } = require('./mlm-backend');
const token = '5824890097:AAFlY-9XwGl0-sM0mooKNaWISWHFsIR_T2o';
const bot = new TelegramBot(token, { polling: true });

// const PaymentTracker = require('ton-payment-tracker');

// const tracker = new PaymentTracker({ toncenterApiKey: '4f96a149e04e0821d20f9e99ee716e20ff52db7238f38663226b1c0f303003e0' });

// tracker.currentTrackingStateOf(address).then((trackingState) => {
//   tracker.startPaymentTracking(address, trackingState, (paymentsUpdate) => {
//     console.log('New payments:', paymentsUpdate);

//     const chatId = '1672843321';
//     console.log({ chatId });
//     bot.sendMessage(chatId, `Thanks! We received your payment!`);
//   });
// });

// Matches "/echo [whatever]"
// bot.onText(/\/echo (.+)/, (msg, match) => {
//   const chatId = msg.chat.id;
//   const resp = match[1]; // the captured "whatever"
//   bot.sendMessage(
//     chatId,
//     resp +
//     `Please send 0.25 TON to this address.
//     EQAsby8THtByrEum-YfD6FjTAFvausrxmbTK0Zox50l76wG2`,
//   );
// });
bot.on('message', (msg) => {
  // const chatId = msg.chat.id;
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
    console.log({ balance, botBalance });
    botBalance = balance;

    const chatId = '1672843321';
    bot.sendMessage(chatId, `Payment received`);
  }
}, 5000);
