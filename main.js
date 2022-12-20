// explanation / plan in readme file

// ===============This section if for crypto millio
const keyboard = [
  ['💳 Plans'], //
  ['💳 My Plan'], //
  ['💎 Wallet', '🚀 Upgrade'], //
  ['💳 Withdraw'], //
  ['🙏🏻 HELP', '💁‍♂️ Info'], //
  ['⭐️ Start'], //
  ['🖇 Referrals list'], //
  ['🔗 Invitation link'], //
  ['🕶 All Details'], //
];

const adminKeyBoard = [
  ['________ADMIN________'], //
  ['🎥 Send Media to Users'], //
  ['📊 System Stats'], //
  ['🤵🏼‍♂️ Reward 7 Pool Members'], //
  ['🦸‍♂️ Reward Super Star Pool Members'], //
  ['💳 Force Withdraw All Users'], //
];
// ===============Till Here =====

require('dotenv').config();
const token = process.env.BOT_TOKEN;


const info = `
Website www.amazon.com
Youtube www.ebay.com
Blog www.walmart.com
`;
const help = `
Help & Support

Welcome to the Help & Support section of our website. Here, you'll find resources and information to assist you in using our site and its features.

Knowledge Base

Our knowledge base is a searchable database of answers to commonly asked questions and issues. Simply type a keyword or phrase into the search field to find helpful articles and solutions.

Tutorials & User Guides

Looking for step-by-step instructions on how to use a specific feature on our site? Our tutorials and user guides provide detailed instructions and helpful tips to help you get the most out of our site.

Contact Us

If you have a question or issue that isn't addressed in our knowledge base, don't hesitate to contact us. You can reach us by phone or email, or use our online contact form to send us a message.

Social Media & User Forums

Connect with other users and get help and advice from our community on our social media accounts or user forums.
`;
const plans = `
⭐️ START 25 TON
🚶 WALK 50 TON 
🏃 RUN 200 TON 
✈️ FLY 500 TON
`;

const padSimple = {
  reply_markup: {
    keyboard,
  },
};
const padAdmin = {
  reply_markup: {
    keyboard: [...adminKeyBoard, ...keyboard],
  },
};

const admins = ['crypto_millio', 'thinkmuneeb', 'ADMIN'];

const [adminUserName, adminChatId, adminAddress, adminMnemonic] = [
  'crypto_millio',
  '5492194169',
  'EQAUBDH8lrpWuO88cxudGbwO2KCcTJrwBcAfwVcyXlfEOo-x',
  'camp hard goose quiz crew van inner tent leopard make student around hero nation garbage task swim series enlist rude skull mass grace wheel',
];

const _7_SPONSOR_POOL = '7_SPONSOR_POOL';
const SUPER_STAR_POOL = 'SUPER_STAR_POOL';

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
    if (d >= p.level5) ans = 5; // 500 TON FLY
    else if (d >= p.level4) ans = 4; // 200 TON RUN
    else if (d >= p.level3) ans = 3; // 50 TON  WALK
    else if (d >= p.level2) ans = 2; // 25 TON  START --- withdraw starts here
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

  planName: ({ depositedFunds: d }) => {
    let ans; // plan
    if (d >= p.level5) ans = '✈️ FLY'; // 500 TON FLY
    else if (d >= p.level4) ans = '🏃 RUN'; // 200 TON RUN
    else if (d >= p.level3) ans = '🚶 WALK'; // 50 TON  WALK
    else if (d >= p.level2) ans = '⭐️ START'; // 25 TON  START --- withdraw starts here
    else if (d >= p.level1) ans = '👶 BABY';
    else ans = '👎 NONE';
    return ans;
  },
};

const IN_POOL = 1;
const NOT_IN_POOL = 0;
const REMOVED_FROM_POOL = 2;

const { readBook, writeBook, readBookMany } = require('./db');
const { getBalance, mnemonicGenerate, transferFrom } = require('./mlm-backend');

const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(token, { polling: true });

let i = 0;

// on telegram message
const onMessage = async (msg) => {
  // console.log({ msg });
  let pad = padSimple;
  let padCopyAble = {
    ...padSimple,
    parse_mode: 'Markdown',
  };

  const { text } = msg;

  const userName = msg.chat.username;

  if (admins.includes(userName)) {
    pad = padAdmin;
    padCopyAble = {
      ...padAdmin,
      parse_mode: 'Markdown',
    };
  }

  const chatId = msg.chat.id;
  console.log({ chatId });
  if (text && text.includes('🙏🏻 HELP')) {
    bot.sendMessage(chatId, help, pad);
    return;
  }
  //
  else if (text && text.includes('💁‍♂️ Info')) {
    bot.sendMessage(chatId, info, pad);
    return;
  }
  //
  else if (text && text.includes('💳 Plans')) {
    bot.sendMessage(chatId, plans, pad);
    return;
  }

  let publicKey, mnemonic, depositedFunds;
  let user = await readBook({ userName });

  if (admins.includes(userName) && i === 1) {
    i = 0;

    if (msg.document) {
      await sendToAllUsers('sendDocument', msg.document.file_id);
    } //
    else if (msg.photo) {
      await sendToAllUsers('sendPhoto', msg.photo[0].file_id);
    } //
    else if (msg.text) {
      await sendToAllUsers('sendMessage', msg.text);
    }

    bot.sendMessage(chatId, 'Sending... to all users', pad);
    return;
  }

  if (!text || text === undefined) {
    bot.sendMessage(chatId, 'Please send only text', pad);
    return;
  }
  console.log({ text });

  // Old User
  if (existsUser(user)) {
    [, depositedFunds] = await getBalance(user.mnemonic);

    if (depositedFunds && depositedFunds > user.depositedFunds) {
      console.log('giveRewards');
      const newDeposit = depositedFunds - user.depositedFunds;
      await giveRewardsNormal(user, newDeposit);
    }
  }
  // New User
  else {
    let referrer = text.split(' ')[1];
    // if referrer undefined then make defaultReferrer his referrer
    if (referrer === undefined) {
      referrer = adminUserName;
    }
    // if referrer not exist then make defaultReferrer his referrer
    let parent = await readBook({ userName: referrer });
    if (!existsUser(parent)) {
      parent = await readBook({ userName: adminUserName });
    }

    // create and save wallet
    [publicKey, mnemonic] = await mnemonicGenerate();
    await writeBook({ userName }, { userName, chatId, publicKey, mnemonic }); // TODO: can we skip await here? any problem?

    // make referrer chain
    await writeBook({ userName }, { parent: parent.userName });
    await writeBook({ userName: parent.userName }, { child: [...parent.child, userName] });

    bot.sendMessage(chatId, 'You are invited by ' + parent.userName, pad);
    bot.sendMessage(parent.chatId, 'You invited ' + userName, pad);
  }

  //
  user = await readBook({ userName });

  //
  //
  //
  // PUBLIC FUNCTIONS
  if (text.includes('/start') || text.includes('⭐️ Start')) {
    bot.sendMessage(chatId, `${user.userName}\nDeposited ${user.depositedFunds} TON\nPlan ${p.planName(user)}`, pad);
  }
  //
  else if (text.includes('🚀 Upgrade')) {
    if (!existsUser(user)) {
      bot.sendMessage(chatId, 'Invalid user', pad);
      return;
    }
    if (user.balance === 0) {
      bot.sendMessage(chatId, 'Low balance to upgrade', pad);
      return;
    }

    await giveRewardsRecycle(user, user.balance * 0.3); // 30%
    await giveRewardsNormal(user, user.balance * 0.7); // 70%
    await writeBook({ userName }, { balance: 0 });

    user = await readBook({ userName });

    bot.sendMessage(chatId, 'Upgraded your package is ' + p.planName(user), pad);
  }
  //
  else if (text.includes('💳 My Plan')) {
    bot.sendMessage(chatId, `Plan: ${p.planName(user)}`, pad);
  }
  //
  else if (text.includes('🖇 Referrals list')) {
    let parent = user.parent ? 'You are invited by ' + user.parent + '\n' : 'Hi Admin\n';
    let child = user.child.length > 0 ? 'You invited ' + user.child + '\n' : 'You invited none\n';
    let childPaying =
      user.childPaying.length > 0
        ? 'You invited and they have deposited in system: ' + user.childPaying + '\n'
        : 'You invited no people who deposited funds\n';
    publicKey = user.publicKey ? user.publicKey : publicKey;

    bot.sendMessage(chatId, `${parent} ${child} ${childPaying}`, pad);
  }
  //
  else if (text.includes('💎 Wallet')) {
    bot.sendMessage(
      chatId,
      `Earnings: ${user.balance}\nDeposited: ${user.depositedFunds} TON\nDeposit Address:\n\`${user.publicKey}\``,
      padCopyAble,
    );
  }
  //
  else if (text.includes('🔗 Invitation link')) {
    bot.sendMessage(chatId, `Invite link: \`https://t.me/MLMS_bot?start=${userName}\``, padCopyAble);
  }
  //
  else if (text.includes('🕶 All Details')) {
    let parent = user.parent ? 'You are invited by ' + user.parent + '\n' : 'You are invited by admin\n';
    let child = user.child.length > 0 ? 'You invited ' + user.child + '\n' : 'You invited none\n';
    let childPaying =
      user.childPaying.length > 0
        ? 'You invited and they have deposited in system: ' + user.childPaying + '\n'
        : 'You invited no people who deposited funds\n';
    publicKey = user.publicKey ? user.publicKey : publicKey;

    bot.sendMessage(
      chatId,
      `${user.userName} has earned ${user.balance} TON
Deposited Funds ${depositedFunds} TON
Your plan ${p.planName(user)}
${parent}
${child}
${childPaying}
Invite link: https://t.me/MLMS_bot?start=${user.userName}
TON deposit address:
\`${publicKey}\``,
      { ...pad, parse_mode: 'Markdown' },
    );
  }
  //
  else if (text.includes('💳 Withdraw')) {
    // get referrer
    let withdrawWallet = text.split(' ')[1];
    // if referrer undefined then make defaultReferrer his referrer
    // TODO: get withdraw wallet from user
    // if (withdrawWallet === undefined) {
    //   bot.sendMessage(chatId, 'Please send valid TON deposit address', pad);
    //   return;
    // }

    const percentage = 1 / 100;
    const [withdraw, recycle] = p.getWithdrawRecyclePercentage(user.depositedFunds);

    // TODO: test local transferFrom then push
    // await transferFrom(adminMnemonic, withdrawWallet, user.balance * withdraw * percentage);
    // await giveRewardsRecycle(user, user.balance * recycle * percentage);
    // await writeBook({ userName }, { balance: 0 });

    if (withdraw === 0) {
      bot.sendMessage(chatId, `You must be in ⭐️ START or a bigger plan to withdraw`, pad);
      return;
    }

    bot.sendMessage(
      chatId,
      `It will send ${withdraw}% ${user.balance * withdraw * percentage} TON to your wallet`,
      pad,
    );
  }
  //
  //
  // ADMIN FUNCTIONS
  else if (text.includes('🤵🏼‍♂️ Reward 7 Pool Members')) {
    if (!admins.includes(userName)) {
      bot.sendMessage(chatId, `Only admins can access this function`, pad);
      return;
    }

    const usersOf7Pool = await readBookMany({ isIn7SponsorPool: IN_POOL });
    const pool = await readBook({ userName: _7_SPONSOR_POOL });
    const rewardPerUser = pool.balance / usersOf7Pool.length;

    let backToPoolTotal = 0;

    if (rewardPerUser === 0) {
      bot.sendMessage(chatId, `Not enough funds in 7 Members in Pool`, pad);
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

    await writeBook({ userName: _7_SPONSOR_POOL }, { balance: backToPoolTotal });

    bot.sendMessage(chatId, `Successfully sent TON to pool members remaining is ${backToPoolTotal} TON`, pad);
  }
  //
  else if (text.includes('🦸‍♂️ Reward Super Star Pool Members')) {
    if (!admins.includes(userName)) {
      bot.sendMessage(chatId, `Only admins can access this function`, pad);
      return;
    }

    bot.sendMessage(chatId, `Successfully sent TON to pool members`, pad);
  }
  //
  else if (text.includes('💳 Force Withdraw All Users')) {
    if (!admins.includes(userName)) {
      bot.sendMessage(chatId, `Only admins can access this function`, pad);
      return;
    }
    bot.sendMessage(chatId, 'Invitation link', pad);
  }
  //
  else if (text.includes('🎥 Send Media to Users')) {
    if (!admins.includes(userName)) {
      bot.sendMessage(chatId, `Only admins can access this function`, pad);
      return;
    }

    if (i === 0) {
      i = 1;
      bot.sendMessage(chatId, '🎥 Please send text / image / video here to send to all users', pad);
    }
    // bot.sendPhoto(chatId, 'plans .png', pad);
  }
  //
  else if (text.includes('📊 System Stats')) {
    if (!admins.includes(userName)) {
      bot.sendMessage(chatId, `Only admins can access this function`, pad);
      return;
    }
    let admin = await readBook({ userName: adminUserName });
    let __7_SPONSOR_POOL = await readBook({ userName: _7_SPONSOR_POOL });
    let _SUPER_STAR_POOL = await readBook({ userName: SUPER_STAR_POOL });
    let users = await readBookMany({});
    console.log({ users });

    bot.sendMessage(
      chatId,
      `Total Users in System: ${users.length}\nAdmin Deposit Amount: ${admin.depositedFunds}\nAdmin Earnings: ${admin.balance} TON\n7 SPONSOR POOL: ${__7_SPONSOR_POOL.balance} TON\nSUPER STAR POOL: ${_SUPER_STAR_POOL.balance} TON`,
      pad,
    );
  }
  // bot does not understand message
  else {
    if (admins.includes(userName)) {
      bot.sendMessage(chatId, `Hi Admin`, pad);
      return;
    }

    bot.sendMessage(chatId, info, pad);
  }
};

// namaz pending and you are working = no barkat in this work
const giveRewardsNormal = async (user, depositedFunds) => {
  if (!user.parent) {
    await writeBook({ userName: adminUserName }, { depositedFunds });
    console.log('All depositedFunds sent to admin');
    return;
  }

  await writeBook({ userName: user.userName }, { depositedFunds });

  let remaining = 100; // percent
  const percent = depositedFunds / 100;
  let admin = await readBook({ userName: adminUserName });
  let pool = await readBook({ userName: _7_SPONSOR_POOL });

  // NONE OR BABY PLAN
  // give all balance to admin
  if (p.getPlanNumber(user) < 2) {
    // START
    remaining -= 100; // percent
    await writeBook({ userName: adminUserName }, { balance: admin.balance + 100 * percent });
    return; //  <---------------------<
  }

  console.log('1');
  // START OR BIGGER PLAN
  let userParent = await readBook({ userName: user.parent });
  if (!userParent.childPaying.includes(user.userName)) {
    console.log('2');
    await writeBook({ userName: userParent.userName }, { childPaying: [...userParent.childPaying, user.userName] });
  }

  console.log('3');
  userParent = await readBook({ userName: user.parent });

  // 1 to 3
  if (userParent.childPaying.length <= 3) {
    console.log('4');
    await writeBook({ userName: user.parent }, { balance: userParent.balance + 10 * percent });
    await writeBook({ userName: adminUserName }, { balance: admin.balance + 5 * percent });
    await writeBook({ userName: _7_SPONSOR_POOL }, { balance: pool.balance + 5 * percent });
  }

  // 4 to 6
  else if (userParent.childPaying.length <= 6) {
    await writeBook({ userName: user.parent }, { balance: userParent.balance + 15 * percent });
    await writeBook({ userName: adminUserName }, { balance: admin.balance + 2.5 * percent });
    await writeBook({ userName: _7_SPONSOR_POOL }, { balance: pool.balance + 2.5 * percent });
  }
  // 7 or more child Paying
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
  await writeBook({ userName: _7_SPONSOR_POOL }, { balance: pool.balance + 0.5 * remaining * percent });
};

const giveRewardsRecycle = async (user, depositedFunds) => {
  if (!user.parent) {
    await writeBook({ userName: adminUserName }, { depositedFunds }); // 50% of remaining
    console.log('no user parent, no reward');
    return;
  }

  // check balance change
  let userParent = await readBook({ userName: user.parent });
  let admin = await readBook({ userName: adminUserName });
  // TODO: return pool.userName as SUPER_POWER_CLUB
  let pool = await readBook({ userName: SUPER_STAR_POOL });

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
  await writeBook({ userName: SUPER_STAR_POOL }, { balance: pool.balance + 0.5 * remaining * percent }); // 50% of remaining
};
const sendToAllUsers = async (method, msg) => {
  let users = await readBookMany({});

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    user.chatId && bot[method](user.chatId, msg);
  }

  // bot.sendMessage(chatId, 'Sending... to all users', pad);
};

const existsUser = (user) => {
  return user.publicKey !== null;
};

const seedDB = async () => {
  const user = await readBook({ userName: adminUserName });

  console.log({ user });

  if (!existsUser(user)) {
    console.log('db used first time');

    await writeBook(
      { userName: adminUserName },
      {
        chatId: adminChatId,
        userName: adminUserName,
        publicKey: adminAddress,
        mnemonic: adminMnemonic,
      },
    );
  } else {
    console.log('db used second or more times');
  }
  console.log('Bot started');
};

// prod
seedDB().then(() => bot.on('message', onMessage));

// dev
// bot.on('message', onMessage);

// let botBalance = '';
// setInterval(async () => {
//   const [, balance] = await getBalance(m);

//   if (botBalance !== balance) {
//     botBalance !== '' && bot.sendMessage(chatId, `Payment received`, pad);

//     console.log({ balance, botBalance });
//     botBalance = balance;
//   }
// }, 60 * 1000);

// TonWeb.utils.fromNano
// TonWeb.utils.toNano

// unit testing, testing single functions
// console.log(p.planName({depositedFunds: (6*0.0005)}));
