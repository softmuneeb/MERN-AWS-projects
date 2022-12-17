// explanation / plan in readme file

// TODO: it should come from env
// ===============This section if for crypto millio
const keyboard = [
  ['💎 Wallet', 'Upgrade'],
  ['Reward 7 Pool Members'],
  ['Reward Super Star Pool Members'],
  ['Withdraw'],
  ['HELP'],
];

const adminKeyBoard = [
  ['Reward 7 Pool Members'],
  ['Reward Super Star Pool Members'],
]
// ===============Till Here =====

const admins = ['crypto_millio', 'ADMIN'];

const [defaultReferrer, defaultReferrerChatId, defaultReferrerAddress, defaultReferrerMnemonic] = [
  'crypto_millio',
  '5729797630',
  'EQAUBDH8lrpWuO88cxudGbwO2KCcTJrwBcAfwVcyXlfEOo-x',
  'camp hard goose quiz crew van inner tent leopard make student around hero nation garbage task swim series enlist rude skull mass grace wheel',
];
const [adminUserName, adminAddress, adminMnemonic] = [
  'ADMIN',
  'EQAUBDH8lrpWuO88cxudGbwO2KCcTJrwBcAfwVcyXlfEOo-x',
  'camp hard goose quiz crew van inner tent leopard make student around hero nation garbage task swim series enlist rude skull mass grace wheel',
];

const _7SponsorPool = '7_SPONSOR_POOL';
// moved some functions in an object because they depend on each other
const p = {
  level0: 1 * 0.0005, // < 5 TON ZERO --- NO LEVEL -- he can not get referral link
  level1: 2 * 0.0005, // 5 TON   BABY --- all money goto ADMIN -- he will get referral link -- can upgrade
  level2: 3 * 0.0005, // 25 TON  START --- withdraw starts here
  level3: 4 * 0.0005, // 50 TON  WALK
  level4: 5 * 0.0005, // 200 TON RUN
  level5: 6 * 0.0005, // 500 TON FLY

  // d depositedFunds
  getPlanNumber: ({ depositedFunds: d }) => {
    let ans; // plan
    if (d >= p.level5) ans = 5;
    else if (d >= p.level4) ans = 4;
    else if (d >= p.level3) ans = 3;
    else if (d >= p.level2) ans = 2;
    else if (d >= p.level1) ans = 1;
    else ans = 0;
    return ans;
  },

  // d depositedFunds
  getRewardLevelsUnlocked: ({ depositedFunds: d }) => {
    let ans; // plan
    if (d >= p.level5) ans = 15;
    else if (d >= p.level4) ans = 12;
    else if (d >= p.level3) ans = 9;
    else if (d >= p.level2) ans = 6;
    else if (d >= p.level1) ans = 0;
    else ans = 0;
    return ans;
  },

  getWithdrawRecyclePercentage: ({ depositedFunds: d }) => {
    let ans; // plan
    if (d >= p.level5) ans = [70, 30];
    else if (d >= p.level4) ans = [60, 40];
    else if (d >= p.level3) ans = [50, 50];
    else if (d >= p.level2) ans = [40, 60];
    else if (d >= p.level1) ans = [0, 0];
    else ans = [0, 0];
    return ans;
  },

  // d depositedFunds
  getRecycleRewardLevelPercentage: ({ depositedFunds: d }) => {
    let ans; // plan
    if (d >= p.level5) ans = 5;
    else if (d >= p.level4) ans = 4;
    else if (d >= p.level3) ans = 3;
    else if (d >= p.level2) ans = 2;
    else if (d >= p.level1) ans = 0;
    else ans = 0;
    return ans;
  },

  plan: ({ depositedFunds: d }) => {
    const plans = ['NONE', 'BABY', 'START', 'WALK', 'RUN', 'FLY'];
    return plans[p.getPlanNumber(d)];
  },
};

const IN_POOL = 1;
const NOT_IN_POOL = 0;
const REMOVED_FROM_POOL = 2;

const { readBook, writeBook, readBookMany } = require('./db');
const { getBalance, mnemonicGenerate } = require('./mlm-backend');

const TelegramBot = require('node-telegram-bot-api');
const token = '5824890097:AAFlY-9XwGl0-sM0mooKNaWISWHFsIR_T2o'; // TODO: add in env
const bot = new TelegramBot(token, { polling: true });

// setup express app so we can visit link after vercel api hosting
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.set('json spaces', 2);
app.get('/', (r, res) => res.json({ message: 'hi ' + Date() }));
const listener = app.listen(process.env.PORT || 8080, () =>
  console.log('Listening on port ' + listener.address().port),
);

// on telegram message
const onMessage = async (msg) => {
  console.log({ message: msg.text });

  const chatId = msg.chat.id;
  const userName = msg.chat.username;
  let publicKey, mnemonic, depositedFunds;
  let user = await readBook({ userName });

  // show deposit instructions
  // users who came from referral link
  if (msg.text.includes('/start') || msg.text.includes('Wallet')) {
    // old user: if balance updated then update rewards up in the chain and also update balance deposited
    // new user: ------> with refer
    //         |-------> without refer
    //
    //
    // show stats saved in db to telegram user

    if (existsUser(user)) {
      [, depositedFunds] = await getBalance(user.mnemonic);
      // depositedFunds updated // TODO: correct the logic balance + nonce OR tx + last updated
      if (Number(depositedFunds) !== user.depositedFunds) {
        console.log('giveRewards');
        await giveRewardsNormal(user, depositedFunds);
      }
    }
    // New User
    else {
      // get referrer
      let referrer = msg.text.split(' ')[1];
      // if referrer undefined then make defaultReferrer his referrer
      if (referrer === undefined) {
        referrer = defaultReferrer;
      }
      // if referrer not exist then make defaultReferrer his referrer
      let referrerObj = await readBook({ userName: referrer });
      if (!existsUser(referrerObj)) {
        referrerObj = await readBook({ userName: defaultReferrer });
      }

      // create and save wallet
      [publicKey, mnemonic] = await mnemonicGenerate();
      await writeBook({ userName }, { userName, chatId, publicKey, mnemonic }); // TODO: can we skip await here? any problem?

      // make referrer chain
      await writeBook({ userName }, { parent: referrerObj.userName });
      await writeBook({ userName: referrerObj.userName }, { child: [...referrerObj.child, userName] });

      bot.sendMessage(chatId, userName + ' is invited by ' + referrerObj.userName);
      bot.sendMessage(referrerObj.chatId, 'You invited ' + userName);
      //
    }

    // show stats saved in db to telegram user
    let parent = user.parent ? 'You are invited by: ' + user.parent + '\n' : '';
    let child = user.child.length > 0 ? 'You invited: ' + user.child + '\n' : '';
    publicKey = user.publicKey ? user.publicKey : publicKey;

    // show user info
    bot.sendMessage(
      chatId,
      `${user.userName} has earned ${user.balance} TON
Deposited Funds ${depositedFunds} TON
Your plan ${p.plan(user)}
${parent}
${child}
Invite link: https://t.me/sheikhu_bot?start=${user.userName}
TON deposit address:`,
    );
    // send msg after 100 ms, just to confirm it reaches after 1st message
    setTimeout(
      () =>
        bot.sendMessage(chatId, '' + publicKey, {
          reply_markup: {
            keyboard,
          },
        }),
      100,
    );
  }
  // users who want to upgrade
  else if (msg.text.includes('Upgrade')) {
    // give rewards as 70 30

    if (!existsUser(user)) {
      bot.sendMessage(chatId, 'Invalid user');
      return;
    }
    if (user.balance === 0) {
      bot.sendMessage(chatId, 'Low balance to upgrade');
      return;
    }

    // dis...
    // TODO: user.balance -> user.referralEarnings, user.sevenStartPoolEarnings, user.recycleEarnings,
    await giveRewardsRecycle(user, user.balance * 0.3); // 30%
    await giveRewardsNormal(user, user.balance * 0.7); // 70%
    await writeBook({ userName }, { balance: 0 });

    bot.sendMessage(chatId, 'Upgraded your package is ' + plan(user.depositedFunds + user.balance * 0.7));
  }
  // users who want to withdraw
  else if (msg.text.includes('Withdraw')) {
    // get referrer
    let withdrawWallet = msg.text.split(' ')[1];
    // if referrer undefined then make defaultReferrer his referrer
    if (withdrawWallet === undefined) {
      bot.sendMessage(chatId, 'Please send valid TON deposit address');
      return;
    }
    // TODO: if address is invalid tell users

    const percent = 1 / 100;
    const [withdraw, recycle] = p.getWithdrawRecyclePercentage(user.depositedFunds);

    // TODO: add in DB that TON left from system
    // TODO: test it saparately also... 0.05 TON tx fee, 0.2 TON -> 0.1 TON (after tx fee cut)
    await transferFrom(adminWalletMnemonic, withdrawWallet, user.balance * withdraw * percent);
    await giveRewardsRecycle(user, user.balance * recycle * percent); // 30%

    bot.sendMessage(chatId, `Successfully sent ${user.balance * withdraw * percent} TON to your wallet`);
  }
  // users who want to withdraw
  else if (msg.text.includes('Reward 7 Pool Members')) {
    /// TODO: only admin can access this function
    const userName = msg.chat.username;

    if (!admins.includes(userName)) {
      bot.sendMessage(chatId, `Only admins can access this function`);
      return;
    }

    const usersOf7Pool = await readBookMany({ isIn7SponsorPool: IN_POOL });
    const pool = await readBook({ userName: _7SponsorPool });
    const rewardPerUser = pool.balance / usersOf7Pool.length;

    let backToPoolTotal = 0;
    //// TODO: if users go to 1000, or Millions then any problem in loop?...
    // optimize database read writes...

    if (rewardPerUser === 0) {
      bot.sendMessage(chatId, `Not enough funds in 7 Members in Pool`);
      return;
    }

    for (let i = 0; i < usersOf7Pool.length; i++) {
      const user = usersOf7Pool[i];
      const reward = user.earnings7SponsorPool + rewardPerUser;
      const maxReward = 2 * user.depositedFunds;
      if (reward >= maxReward) {
        const backToPool = reward - maxReward;
        backToPoolTotal += backToPool;
        // TODO: note down the user.depositedFunds, date time of this event
        await writeBook(
          { userName: user.parent },
          {
            earnings7SponsorPool: maxReward,
            isIn7SponsorPool: REMOVED_FROM_POOL,
          },
        );
      } else {
        await writeBook({ userName: user.userName }, { earnings7SponsorPool: user.earnings7SponsorPool + reward });
      }
    }

    await writeBook({ userName: _7SponsorPool }, { balance: backToPoolTotal });

    bot.sendMessage(chatId, `Successfully sent TON to pool members remaining is ${backToPoolTotal} TON`);
  }
  // users who want to withdraw
  else if (msg.text.includes('Reward Super Star Pool Members')) {
    /// TODO: only admin can access this function
    const userName = msg.chat.username;

    if (!admins.includes(userName)) {
      bot.sendMessage(chatId, `Only admins can access this function`);
      return;
    }

    bot.sendMessage(chatId, `Successfully sent TON to pool members`);
  }
  // bot does not understand message
  else {
    bot.sendMessage(chatId, 'hi https://www.youtube.com/watch?v=covxjhXsCi8', {
      reply_markup: {
        keyboard,
      },
    });
  }
};

// namaz pending and you are working = no barkat in this work
const giveRewardsNormal = async (user, depositedFunds) => {
  if (!user.parent) {
    console.log('no user parent, no reward');
    return;
  }

  await writeBook({ userName: user.userName }, { depositedFunds: user.depositedFunds + depositedFunds });

  // check balance change
  let userParent = await readBook({ userName: user.parent });
  let admin = await readBook({ userName: adminUserName });
  let pool = await readBook({ userName: _7SponsorPool });

  let remaining = 100; // percent
  const percent = depositedFunds / 100;

  // NONE OR BABY PLAN
  if (p.getPlanNumber(user.depositedFunds) <= 1) {
    // give all balance to admin
    remaining -= 100; // percent
    await writeBook({ userName: adminUserName }, { balance: admin.balance + 100 * percent });
    return; //  <---------------------<
  }

  // 1 to 3
  else if (userParent.child.length <= 3) {
    await writeBook({ userName: user.parent }, { balance: userParent.balance + 10 * percent });
    await writeBook({ userName: adminUserName }, { balance: admin.balance + 5 * percent });
    await writeBook({ userName: 'POOL' }, { balance: pool.balance + 5 * percent });
  }

  // 4 to 6
  else if (userParent.child.length <= 6) {
    await writeBook({ userName: user.parent }, { balance: userParent.balance + 15 * percent });
    await writeBook({ userName: adminUserName }, { balance: admin.balance + 2.5 * percent });
    await writeBook({ userName: 'POOL' }, { balance: pool.balance + 2.5 * percent });
  }
  // 7 or more child
  else {
    await writeBook({ userName: user.parent }, { balance: userParent.balance + 20 * percent });

    // add person to isIn7SponsorPool
    if (user.isIn7SponsorPool === NOT_IN_POOL) {
      await writeBook({ userName: user.parent }, { isIn7SponsorPool: IN_POOL });
    }
  }
  remaining -= 20; // percent, 20% distributed on LEVEL 1

  // give reward till level 6, 9, 12, 15
  for (let level = 2; level <= 15 && userParent.parent; level++) {
    userParent = await readBook({ userName: userParent.parent });
    if (level <= p.getRewardLevelsUnlocked(userParent)) {
      remaining -= 5; // percent
      console.log({ remaining });
      await writeBook({ userName: userParent.userName }, { balance: userParent.balance + 5 * percent });
      bot.sendMessage(
        userParent.chatId,
        `You have earned ${userParent.balance + 5 * percent} TON from deposit of ${user.userName}`,
      );
    }
  }

  // Put remaining percentage in ADMIN_DEPOSIT_LEFTOVER
  console.log({ remainingSending: remaining });
  await writeBook({ userName: adminUserName }, { balance: admin.balance + 0.5 * remaining * percent });
  await writeBook({ userName: _7SponsorPool }, { balance: pool.balance + 0.5 * remaining * percent });
};

const giveRewardsRecycle = async (user, depositedFunds) => {
  if (!user.parent) {
    console.log('no user parent, no reward');
    return;
  }

  // check balance change
  let userParent = await readBook({ userName: user.parent });
  let admin = await readBook({ userName: adminUserName });
  // TODO: resturn pool.userName as SUPER_POWER_CLUB
  let pool = await readBook({ userName: 'SUPER_POWER_CLUB' });

  let remaining = 100; // percent
  const percent = depositedFunds / 100;

  // give reward till level 6, 9, 12, 15
  for (let level = 2; level <= 15 && userParent.parent; level++) {
    userParent = await readBook({ userName: userParent.parent });
    if (level <= p.getRewardLevelsUnlocked(userParent)) {
      const reward = p.getRecycleRewardLevelPercentage(userParent.depositedFunds);
      remaining -= reward;
      console.log({ remaining });
      await writeBook({ userName: userParent.userName }, { balance: userParent.balance + reward * percent });
    }
  }

  // Put remaining percentage in ADMIN_DEPOSIT_LEFTOVER
  console.log({ remainingSending: remaining });
  await writeBook({ userName: adminUserName }, { balance: admin.balance + 0.5 * remaining * percent }); // 50% of remaining
  await writeBook({ userName: 'SUPER_POWER_CLUB' }, { balance: pool.balance + 0.5 * remaining * percent }); // 50% of remaining
};

// onMessage();
bot.on('message', onMessage);

const existsUser = (user) => {
  return user.publicKey !== null;
};

const seedDB = async () => {
  if (!existsUser(await readBook({ userName: defaultReferrer }))) {
    console.log('db used first time');

    await writeBook(
      { userName: defaultReferrer },
      {
        chatId: defaultReferrerChatId,
        userName: defaultReferrer,
        publicKey: defaultReferrerAddress,
        mnemonic: defaultReferrerMnemonic,
      },
    );
  } else {
    console.log('db used second or more times');
    // bot.sendMessage(defaultReferrerChatId, 'Bot ready to use');
  }
};

seedDB();

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
