/// TODO: destructive line MUST DELETE BEFORE LAUNCH...  await User.deleteMany({});
// explanation / plan in readme file

// ===============This section if for crypto millio
const keyboard = [
  ['💼 Plan Packages'], //
  ['🎒 My Package'], //
  ['💎 Wallet', '🕹 Upgrade'], //
  ['💰 Withdraw'], //
  ['🚀 My Level'], //
  ['🤖 Support', '💁‍♂️ Info'], //
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

const admins = ['crypto_millio', 'GlobalTing', 'ADMIN'];
const [adminUserName, adminChatId, adminAddress, adminMnemonic] = [
  'GlobalTing',
  '5492194169',
  'EQAUBDH8lrpWuO88cxudGbwO2KCcTJrwBcAfwVcyXlfEOo-x',
  'camp hard goose quiz crew van inner tent leopard make student around hero nation garbage task swim series enlist rude skull mass grace wheel',
];
const _7_SPONSOR_POOL = '7_SPONSOR_POOL';
const SUPER_STAR_POOL = 'SUPER_STAR_POOL';

const IN_POOL = 1;
const NOT_IN_POOL = 0;
const REMOVED_FROM_POOL = 2;

// moved some functions in an object because they depend on each other
const p = {
  REFERRERS_LIMIT_1: 1, //3, // 0 - 3 referrers 10% commission
  REFERRERS_LIMIT_2: 2, //6, // 4 - 6 referrers 15% commission
  // 7+ referrers 20% commission

  level0: 0.0, // < 5 TON ZERO
  level1: 1, // 5 TON   BABY
  level2: 2, // 25 TON  START
  level3: 3, // 50 TON  WALK
  level4: 4, // 200 TON RUN
  level5: 5, // 500 TON FLY

  ZERO: 0, // < 5 TON ZERO
  BABY: 1, // 5 TON   BABY
  START: 2, // 25 TON  START
  WALK: 3, // 50 TON  WALK
  RUN: 4, // 200 TON RUN
  FLY: 5, // 500 TON FLY

  IRON_MAN: 2, //10, // LEVEL 1
  BAT_MAN: 4, //50, // LEVEL 2
  SPIDER_MAN: 6, //200, // LEVEL 3
  SUPER_MAN: 8, //500, // LEVEL 4
  WONDER_MAN: 10, //1000, // LEVEL 5

  getLevel: u => {
    const l1 = u.level1ChildPaying;
    const l2 = u.level2ChildPaying;
    const l3 = u.level3ChildPaying;
    const l4 = u.level4ChildPaying;
    const l5 = u.level5ChildPaying;
    let ans;
    if (
      l1 >= p.IRON_MAN &&
      l2 >= p.BAT_MAN &&
      l3 >= p.SPIDER_MAN &&
      l4 >= p.SUPER_MAN &&
      l5 >= p.WONDER_MAN
    )
      ans = 5; //WONDER
    else if (
      l1 >= p.IRON_MAN &&
      l2 >= p.BAT_MAN &&
      l3 >= p.SPIDER_MAN &&
      l4 >= p.SUPER_MAN
    )
      ans = 4; //SUPER
    else if (l1 >= p.IRON_MAN && l2 >= p.BAT_MAN && l3 >= p.SPIDER_MAN)
      ans = 3; //SPIDER
    else if (l1 >= p.IRON_MAN && l2 >= p.BAT_MAN) ans = 2; //BAT
    else if (l1 >= p.IRON_MAN) ans = 1; // IRON MAN
    else ans = 0;
    return ans;
  },

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
    else if (d >= p.level2)
      ans = '⭐️ START'; // 25 TON  START --- withdraw starts here
    else if (d >= p.level1) ans = '👶 BABY';
    else ans = '👎 NONE';
    return ans;
  },
};

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
👶 BABY 5 TON
⭐️ START 25 TON
🚶 WALK 50 TON 
🏃 RUN 200 TON 
✈️ FLY 500 TON
`;

require('dotenv').config();
const token = process.env.BOT_TOKEN;
const { readBook, writeBook, readBooks } = require('./db');
const { getBalance, mnemonicGenerate, transferFrom } = require('./mlm-backend');

const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(token, { polling: true });

let SEND_MEDIA = 0;

const padSimple = {
  reply_markup: {
    keyboard,
  },
};
const padAdmin = {
  reply_markup: {
    // keyboard: [...adminKeyBoard, ...keyboard],
    keyboard: [...keyboard, ...adminKeyBoard],
  },
};

let botName;

// on telegram message
const onMessage = async (msg, ctx) => {
  const { text } = msg;
  const chatId = msg.chat.id;
  const userName = msg.chat.username;

  // console.log({ msg, ctx }); // for dev
  // console.log({ text });
  let pad = padSimple;
  let padCopyAble = {
    ...padSimple,
    parse_mode: 'Markdown',
  };
  console.log({ text, userName, chatId }); // for dev
  if (admins.includes(userName)) {
    pad = padAdmin;
    padCopyAble = {
      ...padAdmin,
      parse_mode: 'Markdown',
    };
  }

  if (admins.includes(userName) && SEND_MEDIA === 1) {
    SEND_MEDIA = 0;

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
  //
  else if (text.includes('🤖 Support')) {
    bot.sendMessage(chatId, help, pad);
    return;
  }
  //
  else if (text.includes('💁‍♂️ Info')) {
    bot.sendMessage(chatId, info, pad);
    return;
  }
  //
  else if (text.includes('💼 Plan Packages')) {
    bot.sendMessage(chatId, plans, pad);
    return;
  }

  ///////////////////////////////
  /////////  USER AUTH  /////////
  ///////////////////////////////

  let user = await readBook({ userName });
  // Old User
  if (exists(user)) {
    console.log('Old user');
    let [, depositedFunds] = await getBalance(user.mnemonic);
    console.log({ new: depositedFunds, old: user.depositedFunds });

    if (depositedFunds && depositedFunds > user.depositedFunds) {
      console.log('giveRewards');
      const newDeposit = depositedFunds - user.depositedFunds;
      await deposit(user, newDeposit, userName);
      user = await readBook({ userName });
    }
  }
  // New User
  else {
    console.log('New user');
    // if referrer undefined then make defaultReferrer his referrer
    let referrer = text.split(' ')[1];
    if (referrer === undefined) {
      referrer = adminUserName;
    }

    // if referrer not exist then make defaultReferrer his referrer
    let parent = await readBook({ userName: referrer });
    if (!exists(parent)) {
      parent = await readBook({ userName: adminUserName });
      console.log({ adminUserName });
      console.log({ parent });
    }

    // create and save wallet, make referrer chain
    const [publicKey, mnemonic] = await mnemonicGenerate();
    await writeBook(
      { userName },
      { parent: parent.userName, userName, chatId, publicKey, mnemonic },
    );
    await writeBook(
      { userName: parent.userName },
      { child: [...parent.child, userName] },
    );
    user = await readBook({ userName }); // method 1 easy, method 2, get from RAM, ...
    bot.sendMessage(chatId, 'You are invited by ' + parent.userName, pad);
    bot.sendMessage(parent.chatId, 'You invited ' + userName, pad);
  }

  console.log({ user, d: new Date() });

  ///////////////////////////////
  /////////  USER AUTH  /////////
  ///////////////////////////////

  //
  //
  //
  //
  // PUBLIC FUNCTIONS
  if (text.includes('/start') || text.includes('⭐️ Start')) {
    bot.sendMessage(
      chatId,
      `${userName}\nDeposited ${user.depositedFunds} TON\nPlan ${p.planName(
        user,
      )}`,
      pad,
    );
  }
  //
  else if (text.includes('🕹 Upgrade')) {
    if (!exists(user)) {
      bot.sendMessage(chatId, 'Invalid user', pad);
      return;
    }
    if (user.balance === 0) {
      bot.sendMessage(chatId, 'Low balance to upgrade', pad);
      return;
    }

    await deposit(user, user.balance * 0.7, userName); // 70% used in plan upgrade, distributed in referrals, admin
    await recycle(user, user.balance * 0.3); // 30% distributed in referrals, admin
    await writeBook({ userName }, { balance: 0 });
    user = await readBook({ userName });

    bot.sendMessage(
      chatId,
      'Upgraded your package is ' + p.planName(user),
      pad,
    );
  }
  //
  else if (text.includes('🚀 My Level')) {
    bot.sendMessage(
      chatId,
      `Level: ${user.level}\nInvite ${
        10 - user.childPaying
      } more users to go to Level ${user.level + 1} `,
      pad,
    );
  }
  //
  else if (text.includes('🎒 My Package')) {
    bot.sendMessage(chatId, `Plan: ${p.planName(user)}`, pad);
  }
  //
  else if (text.includes('🖇 Referrals list')) {
    let parent = user.parent
      ? 'You are invited by ' + user.parent + '\n'
      : 'Hi Admin\n';
    let child =
      user.child.length > 0
        ? 'You invited ' + user.child + '\n'
        : 'You invited none\n';
    let childPaying =
      user.childPaying.length > 0
        ? 'You invited and they have deposited in system: ' +
          user.childPaying +
          '\n'
        : 'You invited no people who deposited funds\n';
    childPaying = user.child.length > 0 ? childPaying : '';

    bot.sendMessage(chatId, `${parent}${child}${childPaying}`, pad);
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
    bot.sendMessage(
      chatId,
      `Invite link: \`https://t.me/${botName}?start=${userName}\``,
      padCopyAble,
    );
  }
  //
  else if (text.includes('🕶 All Details')) {
    let parent = user.parent
      ? 'You are invited by ' + user.parent + '\n'
      : 'Hi Admin\n';
    let child =
      user.child.length > 0
        ? 'You invited ' + user.child + '\n'
        : 'You invited none\n';
    let childPaying =
      user.childPaying.length > 0
        ? 'You invited and they have deposited in system: ' +
          user.childPaying +
          '\n'
        : 'You invited no people who deposited funds\n';
    childPaying = user.child.length > 0 ? childPaying : '';

    bot.sendMessage(
      chatId,
      `${parent}${child}${childPaying}\nPlan: ${p.planName(user)}\nEarnings: ${
        user.balance
      }\nDeposited: ${user.depositedFunds} TON`,
      pad,
    );
    bot.sendMessage(
      chatId,
      `Deposit Address:\n\`${user.publicKey}\`\nInvite link: \`https://t.me/${botName}?start=${userName}\``,
      padCopyAble,
    );
  }
  //
  else if (text.includes('💰 Withdraw')) {
    // get referrer
    let withdrawWallet = text.split(' ')[1];
    // if referrer undefined then make defaultReferrer his referrer
    // TODO: get withdraw wallet from user
    if (withdrawWallet === undefined) {
      bot.sendMessage(chatId, 'Please send valid TON deposit address', pad);
      return;
    }

    const percentage = 1 / 100;
    const [withdraw, recycle] = p.getWithdrawRecyclePercentage(
      user.depositedFunds,
    );

    // TODO: test local transferFrom then push
    // await transferFrom(adminMnemonic, withdrawWallet, user.balance * withdraw * percentage);
    // await giveRewardsRecycle(user, user.balance * recycle * percentage);
    // await writeBook({ userName }, { balance: 0 });

    if (withdraw === 0) {
      bot.sendMessage(
        chatId,
        `You must be in ⭐️ START or a bigger plan to withdraw`,
        pad,
      );
      return;
    }

    bot.sendMessage(
      chatId,
      `It will send ${withdraw}% ${
        user.balance * withdraw * percentage
      } TON to your wallet`,
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

    const usersOf7Pool = await readBooks({ status7SponsorPool: IN_POOL });
    if (usersOf7Pool.length === 0) {
      bot.sendMessage(chatId, `There are no 7 Pool Members`, pad);
      return;
    }

    const pool = await readBook({ userName: _7_SPONSOR_POOL });
    const rewardPerUser = pool.balance / usersOf7Pool.length;
    if (rewardPerUser === 0) {
      bot.sendMessage(chatId, `Not enough funds in 7 Members in Pool`, pad);
      return;
    }

    let backToPool = 0;
    for (let i = 0; i < usersOf7Pool.length; i++) {
      const user = usersOf7Pool[i];
      const newEarnings = user.earnings7SponsorPool + rewardPerUser;
      const maxEarnings = 2 * user.depositedFunds;
      if (newEarnings >= maxEarnings) {
        const excessAmount = newEarnings - maxEarnings;
        backToPool += excessAmount;
        await writeBook(
          { userName },
          {
            earnings7SponsorPool: maxEarnings,
            status7SponsorPool: REMOVED_FROM_POOL,
          },
        );
      } else {
        await writeBook({ userName }, { earnings7SponsorPool: newEarnings });
      }
    }

    await writeBook({ userName: _7_SPONSOR_POOL }, { balance: backToPool });
    bot.sendMessage(
      chatId,
      `Successfully sent ${
        pool.balance - backToPool
      } TON to pool members remaining is ${backToPool} TON`,
      pad,
    );
  }
  //
  else if (text.includes('🦸‍♂️ Reward Super Star Pool Members')) {
    if (!admins.includes(userName)) {
      bot.sendMessage(chatId, `Only admins can access this function`, pad);
      return;
    }

    const usersLevel1 = await readBooks({ level: 1 });
    const usersLevel2 = await readBooks({ level: 2 });
    const usersLevel3 = await readBooks({ level: 3 });
    const usersLevel4 = await readBooks({ level: 4 });
    const usersLevel5 = await readBooks({ level: 5 });

    const usersL1 = usersLevel1.length;
    const usersL2 = usersLevel2.length;
    const usersL3 = usersLevel3.length;
    const usersL4 = usersLevel4.length;
    const usersL5 = usersLevel5.length;

    const usersOfSuperStarPoolLength =
      usersL1 + usersL2 + usersL3 + usersL4 + usersL5;

    if (usersOfSuperStarPoolLength === 0) {
      bot.sendMessage(chatId, `There are no Super Star Pool Members`, pad);
      return;
    }

    const pool = await readBook({ userName: SUPER_STAR_POOL });
    if (pool.balance === 0) {
      bot.sendMessage(
        chatId,
        `Not enough funds in Super Star Members in Pool`,
        pad,
      );
      return;
    }

    let rewardGiven = 0,
      backToPool = 0;
    if (usersL1 > 0) {
      const rewardPerLevel1 = 0.3 * pool.balance; // 30%
      rewardGiven += rewardPerLevel1;
      const rewardPerUserPerLevel1 = rewardPerLevel1 / usersL1;
      backToPool += await giveRewardEqually(
        usersLevel1,
        rewardPerUserPerLevel1,
      );
    }
    if (usersL2 > 0) {
      const rewardPerLevel2 = 0.2 * pool.balance; // 20%
      rewardGiven += rewardPerLevel2;
      const rewardPerUserPerLevel2 = rewardPerLevel2 / usersL2;
      backToPool += await giveRewardEqually(
        usersLevel2,
        rewardPerUserPerLevel2,
      );
    }
    if (usersL3 > 0) {
      const rewardPerLevel3 = 0.2 * pool.balance; // 20%
      rewardGiven += rewardPerLevel3;
      const rewardPerUserPerLevel3 = rewardPerLevel3 / usersL3;
      backToPool += await giveRewardEqually(
        usersLevel3,
        rewardPerUserPerLevel3,
      );
    }
    if (usersL4 > 0) {
      const rewardPerLevel4 = 0.2 * pool.balance; // 20%
      rewardGiven += rewardPerLevel4;
      const rewardPerUserPerLevel4 = rewardPerLevel4 / usersL4;
      backToPool += await giveRewardEqually(
        usersLevel4,
        rewardPerUserPerLevel4,
      );
    }
    if (usersL5 > 0) {
      const rewardPerLevel5 = 0.1 * pool.balance; // 10%
      rewardGiven += rewardPerLevel5;
      const rewardPerUserPerLevel5 = rewardPerLevel5 / usersL5;
      backToPool += await giveRewardEqually(
        usersLevel5,
        rewardPerUserPerLevel5,
      );
    }

    const poolRemaining = pool.balance - rewardGiven + backToPool;
    await writeBook({ userName: SUPER_STAR_POOL }, { balance: poolRemaining });
    bot.sendMessage(
      chatId,
      `Sent successfully sent ${rewardGiven} TON to pool members, remaining in Pool ${poolRemaining} TON`,
      pad,
    );
  }
  //
  else if (text.includes('💳 Force Withdraw All Users')) {
    if (!admins.includes(userName)) {
      bot.sendMessage(chatId, `Only admins can access this function`, pad);
      return;
    }
    bot.sendMessage(chatId, 'Will force Withdraw All Users', pad);
  }
  //
  else if (text.includes('🎥 Send Media to Users')) {
    if (!admins.includes(userName)) {
      bot.sendMessage(chatId, `Only admins can access this function`, pad);
      return;
    }
    SEND_MEDIA = 1;
    bot.sendMessage(
      chatId,
      '🎥 Please send text / image / video here to send to all users',
      pad,
    );
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
    let users = await readBooks({}); // SHOW PEOPLE ON LEVELS
    console.log({ users });
    const totalUsers = users.length - 2; // 2 pools are used as users

    bot.sendMessage(
      chatId,
      `Total Users in System: ${totalUsers}\nAdmin Deposit Amount: ${admin.depositedFunds} TON\nAdmin Earnings: ${admin.balance} TON\n7 SPONSOR POOL: ${__7_SPONSOR_POOL.balance} TON\nSUPER STAR POOL: ${_SUPER_STAR_POOL.balance} TON`,
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

const giveRewardEqually = async (users, rewardPerUser) => {
  let backToPool = 0;

  for (let i = 0; i < users.length; i++) {
    const {
      userName,
      balanceOnEnteringSuperStarPool,
      earningsSuperStarPool,
      statusSuperStarPool,
    } = users[i];

    if (statusSuperStarPool === REMOVED_FROM_POOL) {
      backToPool += rewardPerUser;
      continue;
    }

    const maxEarnings = balanceOnEnteringSuperStarPool;
    const newEarnings = earningsSuperStarPool + rewardPerUser;
    if (newEarnings >= maxEarnings) {
      const excessAmount = newEarnings - maxEarnings;
      backToPool += excessAmount;
      await writeBook(
        { userName },
        {
          earningsSuperStarPool: maxEarnings,
          statusSuperStarPool: REMOVED_FROM_POOL,
        },
      );
    } else {
      await writeBook({ userName }, { earningsSuperStarPool: newEarnings });
    }
  }

  return backToPool;
};

const deposit = async (user, depositedFunds, userName) => {
  let admin = await readBook({ userName: adminUserName });
  // if (!user.parent) {
  //   await writeBook({ userName: adminUserName }, { balance: admin.balance + depositedFunds });
  //   return; //  <---------------------<
  // }

  await writeBook(
    { userName: user.userName },
    { depositedFunds: user.depositedFunds + depositedFunds },
  );
  user = await readBook({ userName });

  const percent = depositedFunds / 100;
  let pool = await readBook({ userName: _7_SPONSOR_POOL });

  // NONE OR BABY PLAN, give all balance to admin, if admin then send admins balance to admins deposit
  if (!user.parent || p.getPlanNumber(user) < p.START) {
    await writeBook(
      { userName: adminUserName },
      { balance: admin.balance + 100 * percent },
    );
    return; //  <---------------------<
  }

  let userParent = await readBook({ userName: user.parent });

  // 1 to 3
  if (userParent.childPaying.length <= p.REFERRERS_LIMIT_1) {
    await writeBook(
      { userName: userParent.userName },
      { balance: userParent.balance + 10 * percent },
    );
    await writeBook(
      { userName: adminUserName },
      { balance: admin.balance + 5 * percent },
    );
    await writeBook(
      { userName: _7_SPONSOR_POOL },
      { balance: pool.balance + 5 * percent },
    );
  }

  // 4 to 6
  else if (userParent.childPaying.length <= p.REFERRERS_LIMIT_2) {
    await writeBook(
      { userName: userParent.userName },
      { balance: userParent.balance + 15 * percent },
    );
    await writeBook(
      { userName: adminUserName },
      { balance: admin.balance + 2.5 * percent },
    );
    await writeBook(
      { userName: _7_SPONSOR_POOL },
      { balance: pool.balance + 2.5 * percent },
    );
  }

  // 7 or more child paying
  else {
    await writeBook(
      { userName: userParent.userName },
      { balance: userParent.balance + 20 * percent },
    );

    // add person to status7SponsorPool
    if (user.status7SponsorPool === NOT_IN_POOL) {
      await writeBook(
        { userName: userParent.userName },
        { status7SponsorPool: IN_POOL },
      );
    }
  }

  // START OR BIGGER PLAN
  let userDepositedFirstTime = false;
  if (!userParent.childPaying.includes(userName)) {
    userDepositedFirstTime = true;
    await writeBook(
      { userName: userParent.userName },
      {
        level1ChildPaying: userParent.level1ChildPaying + 1,
        childPaying: [...userParent.childPaying, userName],
      },
    );
    userParent = await readBook({ userName: userParent.userName });

    const newLevel = p.getLevel(userParent);
    newLevel > userParent.level &&
      (await writeBook(
        { userName: userParent.userName },
        { level: newLevel, balanceOnEnteringSuperStarPool: userParent.balance },
      ));
  }

  let remaining = 100; // percent
  remaining -= 20; // percent, 20% distributed on LEVEL 1
  // give reward till level 6, 9, 12, 15
  for (let level = 2; level <= 15 && userParent.parent; level++) {
    userParent = await readBook({ userName: userParent.parent });
    const levelUnlocked = p.getRewardLevelsUnlocked(userParent);

    // maintain data for Super Star Pool
    if (level <= 5 && userDepositedFirstTime) {
      const newUserParent = {};
      newUserParent[`level${level}ChildPaying`] =
        userParent[`level${level}ChildPaying`] + 1;
      await writeBook({ userName: userParent.userName }, newUserParent);
      userParent = await readBook({ userName: userParent.parent });

      const newLevel = p.getLevel(userParent);
      newLevel > userParent.level &&
        (await writeBook(
          { userName: userParent.userName },
          {
            level: newLevel,
            balanceOnEnteringSuperStarPool: userParent.balance,
          },
        ));
    }

    // deposit logic, reward 5% upto 15 levels
    if (level <= levelUnlocked) {
      remaining -= 5; // percent
      console.log({ remaining });
      await writeBook(
        { userName: userParent.userName },
        { balance: userParent.balance + 5 * percent },
      );
      bot.sendMessage(
        userParent.chatId,
        `You have earned ${5 * percent} TON from deposit of ${userName}`,
      );
    }
  }

  console.log({ remainingSending: remaining });
  await writeBook(
    { userName: adminUserName },
    { balance: admin.balance + remaining * percent },
  );
};

const recycle = async (user, depositedFunds) => {
  if (!user.parent) {
    bot.sendMessage(user.chatId, `Admin can not recycle`);
    return;
  }

  let userParent = await readBook({ userName: user.parent });
  let admin = await readBook({ userName: adminUserName });
  let pool = await readBook({ userName: SUPER_STAR_POOL });

  let remaining = 100; // percent
  const percent = depositedFunds / 100;

  // give reward till level 15
  for (let level = 1; level <= 15 && userParent.parent; level++) {
    userParent = await readBook({ userName: userParent.parent });
    const reward = p.getRecycleRewardLevelPercentage(userParent.depositedFunds);
    remaining -= reward;
    console.log({ remaining });
    await writeBook(
      { userName: userParent.userName },
      { balance: userParent.balance + reward * percent },
    );
  }

  // Put remaining percentage in ADMIN_DEPOSIT_LEFTOVER
  console.log({ remainingSending: remaining });
  await writeBook(
    { userName: adminUserName },
    { balance: admin.balance + 0.5 * remaining * percent },
  ); // 50% of remaining
  await writeBook(
    { userName: SUPER_STAR_POOL },
    { balance: pool.balance + 0.5 * remaining * percent },
  ); // 50% of remaining
};

const sendToAllUsers = async (method, msg) => {
  let users = await readBooks({});

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    user.chatId && bot[method](user.chatId, msg);
  }

  // bot.sendMessage(chatId, 'Sending... to all users', pad);
};

const exists = user => {
  return user !== undefined;
};

const seedDB = async () => {
  botName = (await bot.getMe()).username;

  let user = await readBook({ userName: adminUserName });
  console.log({ user });

  if (!exists(user)) {
    console.log('db used first time');

    await writeBook({ userName: _7_SPONSOR_POOL }, {});
    await writeBook({ userName: SUPER_STAR_POOL }, {});
    await writeBook(
      { userName: adminUserName },
      {
        chatId: adminChatId,
        publicKey: adminAddress,
        mnemonic: adminMnemonic,
      },
    );
    user = await readBook({ userName: adminUserName });
    console.log({ user }); // dev
  } else {
    console.log('db used second or more times');
  }
  console.log('Bot started ' + new Date());
};

seedDB().then(() => bot.on('message', onMessage));
