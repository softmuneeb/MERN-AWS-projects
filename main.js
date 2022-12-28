// explanation / plan in readme file

// ===============This section if for crypto millio
const keyboard = [
  ['⭐️ Home (Дом)'],//
  ['🎛 My Dashbaord (щиток приборов)'], //
  ['💼 Plan Packages (Пакет планов)'], //
  ['🎒 My Package (Mой пакет)'], //
  ['🔗 Invitation link (Пригласительная ссылка)'], //
  ['💵 My Wallet (Мой бумажник)', '🕹 Upgrade (Обновление)'], //
  ['💰 Withdraw (Отзывать)'],//
  ['💸 Income Statement (Справка о доходах)'], //
  ['🖇 Referrals list (Прямое направление)'], //
  ['🚀 Super Star Club (Суперзвездный клуб)'], //
  ['💡 Rules For Community (Правила для сообщества)', '💁‍♂️ Basic Info (Основная информация)'], //
  ['📡 AiProTON Features (Особенности АйПроТОН)'], //
  ['📈 Marketing Plan (Маркетинговый план)'], //
  ['💎 TON Ecosystem (Экосистема ТОН)', '🤖 Support (Поддерживать)'],//
  ['TON Coinmarketcap'], ['TON Exchanges (ТОН биржи)']//
];

const adminKeyBoard = [
  ['________ADMIN________'], //
  ['🎥 Send Media to Users'], //
  ['📊 System Stats'], //
  ['🤵🏼‍♂️ Reward 7 Pool Members'], //
  ['🦸‍♂️ Reward Super Star Pool Members'], //
  ['💳 Force Withdraw All Users'], //
];

require('dotenv').config();
const token = process.env.BOT_TOKEN;
const pbkey = process.env.ADMIN_ADDRESS;
const key = process.env.ADMIN_MNEMONIC;

const devChatId = '5207150830'; // for error messages
const admins = ['crypto_millio', 'GlobalTing', 'ADMIN'];
const [adminUserName, adminChatId, adminAddress, adminMnemonic] = [
  'GlobalTing',
  '5946842435',
  pbkey,
  key
];



const _7_SPONSOR_POOL = '7_SPONSOR_POOL';
const SUPER_STAR_POOL = 'SUPER_STAR_POOL';

const IN_POOL = 1;
const NOT_IN_POOL = 0;
const REMOVED_FROM_POOL = 2;

const MIN_WITHDRAW = 0.1; //TON
const MIN_DEPOSIT = 1; // TON

// moved some functions in an object because they depend on each other
const p = {
  REFERRERS_LIMIT_1: 1, //3, // 0 - 3 referrers 10% commission
  REFERRERS_LIMIT_2: 2, //6, // 4 - 6 referrers 15% commission
  // 7+ referrers 20% commission

  level0: 0, // < 5 TON ZERO
  level1: 1, // 5 TON   BABY
  level2: 2, // 25 TON  START
  level3: 3, // 50 TON  WALK
  level4: 4, // 200 TON RUN
  level5: 5, // 500 TON FLY

  // level0: 0.0, // < 5 TON ZERO
  // level1: 1, // 5 TON   BABY
  // level2: 2, // 25 TON  START
  // level3: 3, // 50 TON  WALK
  // level4: 4, // 200 TON RUN
  // level5: 5, // 500 TON FLY

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

  getLevel: (u) => {
    const l1 = u.level1ChildPaying;
    const l2 = u.level2ChildPaying;
    const l3 = u.level3ChildPaying;
    const l4 = u.level4ChildPaying;
    const l5 = u.level5ChildPaying;
    let ans;
    if (l1 >= p.IRON_MAN && l2 >= p.BAT_MAN && l3 >= p.SPIDER_MAN && l4 >= p.SUPER_MAN && l5 >= p.WONDER_MAN)
      ans = 5; //WONDER
    else if (l1 >= p.IRON_MAN && l2 >= p.BAT_MAN && l3 >= p.SPIDER_MAN && l4 >= p.SUPER_MAN) ans = 4; //SUPER
    else if (l1 >= p.IRON_MAN && l2 >= p.BAT_MAN && l3 >= p.SPIDER_MAN) ans = 3; //SPIDER
    else if (l1 >= p.IRON_MAN && l2 >= p.BAT_MAN) ans = 2; //BAT
    else if (l1 >= p.IRON_MAN) ans = 1; // IRON MAN
    else ans = 0;
    return ans;
  },

  getLevelName: (u) => {
    const l1 = u.level1ChildPaying;
    const l2 = u.level2ChildPaying;
    const l3 = u.level3ChildPaying;
    const l4 = u.level4ChildPaying;
    const l5 = u.level5ChildPaying;
    let ans;
    if (l1 >= p.IRON_MAN && l2 >= p.BAT_MAN && l3 >= p.SPIDER_MAN && l4 >= p.SUPER_MAN && l5 >= p.WONDER_MAN)
      ans = 'WONDER MAN'; //WONDER
    else if (l1 >= p.IRON_MAN && l2 >= p.BAT_MAN && l3 >= p.SPIDER_MAN && l4 >= p.SUPER_MAN) ans = 'SUPER MAN'; //SUPER
    else if (l1 >= p.IRON_MAN && l2 >= p.BAT_MAN && l3 >= p.SPIDER_MAN) ans = 'SPIDER MAN'; //SPIDER
    else if (l1 >= p.IRON_MAN && l2 >= p.BAT_MAN) ans = 'BAT MAN'; //BAT
    else if (l1 >= p.IRON_MAN) ans = 'IRON MAN'; // IRON MAN
    else ans = 'NOT QUALIFIED';
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

  getWithdrawRecyclePercentage: (u) => {
    if (!u.parent) return [100, 0];

    const d = u.depositedFunds

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
    else if (d >= p.level2) ans = '⭐️ START'; // 25 TON  START --- withdraw starts here
    else if (d >= p.level1) ans = '👼 BABY';
    else ans = '👎 NONE';
    return ans;
  },

  planValue: ({ depositedFunds: d }) => {
    let ans; // plan
    if (d >= p.level5) ans = p.level5; // 500 TON FLY
    else if (d >= p.level4) ans = p.level4; // 200 TON RUN
    else if (d >= p.level3) ans = p.level3; // 50 TON  WALK
    else if (d >= p.level2) ans = p.level2; // 25 TON  START --- withdraw starts here
    else if (d >= p.level1) ans = p.level1;
    else ans = p.level0;
    return ans;
  },
};

const info = `
Just Start With 5 TON or above and Get An Opportunity To Earn Unlimited TON From Your and Global Network Power Without Any Liability  . Let’s Know How To Do It.

Just Open Your Telegram App. If You Already Registered Check Your Account Is Working With Current Mobile number Or If Not You Can Operate Same Account with new number or create new account in telegram.
It’s as simple step as become a Telegram Active User.

Now, Do You Know, Telegram itself have  a Active Wallet For Your Crypto Transaction with TON Network.
Yes, Now You can create your TON Wallet from @wallet

Make Your TON Wallet.

Now You have active Wallet of TON , You can send receive TON to any User on Telegram or TON Wallet.
Do You Want to Collect TON From Global Community without creating any Liability ..It’s The Magical Plan With AiProTON Network
`;
const help = `
Please write your message here! We will send this message to Support he will get back to you.
`;
const plans = `
Choose Your Package To Earn TON From The AiProTON Community Network ,
The More Your Contribute The More You Earn & Even You Start With The Minimum & Upgrade It Later From Your Earnings.

Following The Packages - 

👼 BABY 5 TON
⭐️ START 25 TON
🚶 WALK 50 TON 
🏃 RUN 200 TON 
✈️ FLY 500 TON

Deposit TON Amount of Any Value In Your AiProTON Deposit Wallet &
Whatever The Amount Value You Deposit , Your Pack Value Will Be According That. You Can Upgrade Any Time.
To Know The Features Of Packs Follow , Marketing Plan Features Tab.
`;

const features = `
100% Distribution Of Revenue In Community & System.

Upto 20% Direct Income.

Upto 100000 TON Reward From Community.

Easy Upgrade & Auto Income Generation.

Self Team Working Income.

Global Team Working Benefits.

Global Team Working Rewards

And..

Even All Can Start With Just 5 Ton , No Risk, No Liability , Work & Earn.

Unlimited  From Global And Your Network.

Just Signup with the link of Any Sponsor from AiProTON Community Network.
`;

const rules = `
Let’s Learn The Rules For The Community.

Package – The Bigger Your Contribution, The Bigger Your  Earnings.

Withdraw – From Any Pack Activation in Your Team You Get Instant Incentives In Your Wallet From There You Can Withdraw Your Total Amount as Per Package Withdraw Rule.

Recycle – For Auto Acceleration to The System Belongs To Every Withdraw Their is Certain Amount for RECYCLE, Which Gives You Again Commissions & You Enjoy Again The benefits, And This Cycle Continues in Loop.

Upgrade – The Bigger Your Contribution, The Bigger Benefits You will reap, But No Worry You Can Start Just From Very Beginning, Even Small Pack or Even Just Registration Pack , Earn , Upgrade & Grow Your Benefits , No Compulsion for Bigger Amount. Just Start From Very Small. Even just 5 Ton.

And This Help to Community Also, As Your Team Start From Very Little, Your Team Will Not Face any Risk and As They Earn ,They Upgrade, You Reap Again Benefits From The entire Network.. It’s Amazing.

Yes More Here…
Community Rewards, You Can Earn upto 100000 $ Reward Not Just From Your Network but also from the Community & Its All Start from 5 TON & With Your Growing Team….

So , Are You Excited To Earn & Grow With amazing opportunity . So Be Ready with Your Telegram ID & Your TON Wallet. Let’s Start.
`;

const market = `
You Can Start With 25 TON or other Options, Like 100, 200 or 500 TON.

As you Signup There Are lot of Incomes to Get From The Network you create.

1st You Get Direct Income from Your Network.

From Sponsoring 1,2,3 You Get 10% , From Sponsoring 4,5,6,
You Get 15% and 7th and above Sponsoring You Get 20% From every Direct Sponsoring.

From All Income You Have Three Way –
WITHDRAW / UPGRADE / RECYCLE

WITHDRAW Rule - 

START – 40 % Withdraw – 60% Recycle
WALK- 50% Withdraw – 50% Recycle 
RUN- 60% Withdraw – 40% Recycle 
FLY- 70% Withdraw – 30% Recycle 

You can Register With 5 TON as Baby pack, Where From Upto 6 Level You can Earn, and Use Your 100% Earnings in Upgrade. After START PACK , you can follow the same system.

Recycle Means – The Balance Payout Value TON again Distribute As Recycle Plan.

YOU can UPGRADE Your PACK to get high benefit on basis.
70% UPGRADE – 30% Recycle.

So, This System create Income In Loop. Every Time You Get Income From Your Team.

TEAM INCOME –

When In Your Network , Any Pack Activate ,

You Eligible  10% To 20% Direct As Direct Income From Level One , And Form Level Two to Level 15 You Get , 5% TON from Every joiner in Your Network community in 15 level. 

Level Eligibility As Your Pack, Like If You On  Baby or Start Pack – You Get This Income From upto 6 Level.

If You On Walk Pack – you Get This Income Upto 9 Level. 
On Run Pack – You Get This Income upto 12 Level and
On Fly Pack – you Get This Income From All 15 Level. 

You Can upgrade any time as you convenient. 

RECYCLE – All recycle Distribution in 15 levels , As per pack , if You are Baby ( Registration pack) than 1% , if you on Start – 2% , If You on Walk – 3% , If You On Run – 4% , and if you on FLY pack , you get 5% on Each level from each RECYCLE Activity.

Thus 5% x 15 Level – Upto 75% Distribution of RECYCLE In 15 Levels.

& Whatever Skipped Balance Either Small pack or bigger pack , left skipped balance from Direct Joining Will Go To 7 Sponsor Club and Skipped balance from recycle will GO To REWARD CLUB from every recycle entry from the globe. And this provide you , From 2x To 5x Global Rewards. an also upto 100000 TON REWARDS and revenue from Your Network as well as  From the Global Community.

5 TON First Time And 10%  is used As Service provider Fee ,  Network  AI Program  & Chain Fees setup By AI ProTONnetwork.

So, It’s Time Join With The Link & Start Earning TON From Global Network, Without Any Liability, & follow The Telegram Channel Network To Know More Updates.
`;


const { readBook, writeBook, readBooks } = require('./db');
const { getBalance, mnemonicGenerate, transferFrom, isValidAddress } = require('./mlm-backend');
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
let HELP_STATUS = {};

// on telegram message
const onMessage = async (msg, ctx) => {
  const chatId = msg.chat.id;

  if (HELP_STATUS[chatId] === 1) {
    HELP_STATUS[chatId] = 0;
    bot.forwardMessage("5745083820", chatId, msg.message_id);
    return;
  }

  const { text } = msg;
  const userName = msg.chat.username;

  // console.log({ msg, ctx }); // for dev
  // console.log({ text });

  if (!userName) {
    bot.sendMessage(chatId, 'Please add your user name in telegram settings');
    return;
  }

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
    // bot.forwardMessage(adminChatId, chatId, msg.message_id);
    await sendToAllUsers('forwardMessage', msg.message_id);

    // if (msg.document) {
    //   await sendToAllUsers('sendDocument', msg.document.file_id);
    // } //
    // else if (msg.photo) {
    //   await sendToAllUsers('sendPhoto', msg.photo[0].file_id);
    // } //
    // else if (msg.text) {
    //   await sendToAllUsers('sendMessage', msg.text);
    // }

    bot.sendMessage(chatId, 'Sending... to all users', pad);
    return;
  }

  if (!text || text === undefined) {
    bot.sendMessage(chatId, 'Please send only text', pad);
    return;
  }
  //
  else if (text.includes('🤖 Support (Поддерживать)')) {
    bot.sendMessage(chatId, help, pad);
    HELP_STATUS[chatId] = 1;
    return;
  }
  //
  else if (text.includes('💁‍♂️ Basic Info (Основная информация)')) {
    bot.sendMessage(chatId, info, pad);
    return;
  }
  //
  else if (text.includes('💼 Plan Packages (Пакет планов)')) {
    bot.sendMessage(chatId, plans, pad);
    return;
  }
  //
  else if (text.includes('📡 AiProTON Features (Особенности АйПроТОН)')) {
    bot.sendMessage(chatId, features, pad);
    return;
  }
  //
  else if (text.includes('💡 Rules For Community (Правила для сообщества)')) {
    bot.sendMessage(chatId, rules, pad);
    return;
  }
  //
  else if (text.includes('📈 Marketing Plan (Маркетинговый план)')) {
    bot.sendMessage(chatId, market, pad);
  }

  ///////////////////////////////
  /////////  USER AUTH  /////////
  ///////////////////////////////

  let user = await readBook({ userName });
  // Old User
  if (exists(user)) {
    console.log('Old user');
    let [, depositedFunds] = await getBalance(user.publicKey);
    console.log({ new: depositedFunds, old: user.depositedFunds });

    if (depositedFunds && depositedFunds > MIN_DEPOSIT) {
      console.log('giveRewards');
      await deposit(user, depositedFunds, userName);
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
    await writeBook({ userName }, { parent: parent.userName, userName, chatId, publicKey, mnemonic });
    await writeBook({ userName: parent.userName }, { child: [...parent.child, userName] });
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
  //Plan ${p.planName(user)}
  // Deposited ${user.depositedFunds} TON
  // PUBLIC FUNCTIONS
  if (text.includes('/start') || text.includes('⭐️ Home (Дом)')) {
    bot.sendMessage(
      chatId,
      `Hello ${userName}
      
Welcome To AiProTON Network

Your Sponsor Is ${user.parent}

Your Referral Link Is \`https://t.me/${botName}?start=${userName}\`
    
You Have Invited ${user.childPaying.length}
    
AiProTON Network is a Telegram-based Artificial Intelligence program that
offers a variety of features, tools, and services to users on the TON crypto-currency network.
This Community platform offers  full-featured Telegram wallet application that allows users to store, send, and receive TON coins and tokens.

As Telegram Network Itself Have more Than 700 Million Community Across The Globe & TON Network Is Going To Be The Best Crypto Ever In Crypto Industry.

Let’s be The Part Of New Amazing Era of Crypto & Technology World In 2023.
    `,
      padCopyAble,
    );
  }
  //
  else if (text.includes('🕹 Upgrade (Обновление)')) {
    if (!exists(user)) {
      bot.sendMessage(chatId, 'Invalid user', pad);
      return;
    }
    if (user.balance === 0) {
      bot.sendMessage(chatId, 'Low balance to upgrade', pad);
      return;
    }

    await deposit(user, user.balance * 0.7, userName); // 70% used in plan upgrade, distributed in referrals, admin
    await recycleRewards(user, user.balance * 0.3); // 30% distributed in referrals, admin
    await writeBook({ userName }, { balance: 0 });
    user = await readBook({ userName });

    bot.sendMessage(chatId, 'Upgraded your package is ' + p.planName(user), pad);
  }
  //
  else if (text.includes('🚀 Super Star Club (Суперзвездный клуб)')) {
    bot.sendMessage(chatId, `Level: ${p.getLevelName(user)}
Level-1 (${user.level1ChildPaying})
Level-2 (${user.level2ChildPaying})
Level-3 (${user.level3ChildPaying})
Level-4 (${user.level4ChildPaying})
Level-5 (${user.level5ChildPaying})`, pad);
    // bot.sendMessage(
    //   chatId,
    //   `Level: ${user.level}\nInvite ${10 - user.childPaying} more users to go to Level ${user.level + 1} `,
    //   pad,
    // );
  }
  //
  else if (text.includes('🎒 My Package (Mой пакет)')) {
    const upgradeMessage = p.getPlanNumber(user) < p.FLY ? 'Upgrade To Get More Benefits' : '';

    bot.sendMessage(
      chatId,
      `Dear TON User\nYour Current Plan Is - ${p.planName(user)} - (${p.planValue(user)} TON)\n${upgradeMessage}`,
      pad,
    );
  }
  //
  else if (text.includes('💸 Income Statement (Справка о доходах)')) {
    bot.sendMessage(chatId,
`Your TON Earnings Available: ${user.balance}

Total TON Earnings in History: ${user.totalEarnings}
`, pad);
  }
  
  else if (text.includes('🖇 Referrals list (Прямое направление)')) {
    let parent = user.parent ? 'You are invited by ' + user.parent + '\n' : 'Hi Admin\n';
    let child = user.child.length > 0 ? 'You invited ' + user.child + '\n' : 'You invited none\n';
    let childPaying =
      user.childPaying.length > 0
        ? 'Your Active Direct Referrals: ' + user.childPaying + '\n'
        : 'You invited no people who deposited funds\n';
    childPaying = user.child.length > 0 ? childPaying : '';

    bot.sendMessage(chatId, `${parent}${child}${childPaying}`, pad);
  }
  //
  else if (text.includes('💵 My Wallet (Мой бумажник)')) {
    bot.sendMessage(
      chatId,
      `Here You Can Deposit Your TON For Your Pack Activation , What Amount You Deposit , You Will Get The Benefit According That Pack Value . Deposit TON Here From Your TON WALLET.

Your TON Earnings Available: ${user.balance}

Total TON Earnings in History: ${user.totalEarnings}

Your Deposited TON: ${user.depositedFunds} TON

Deposit Address:\n\`${user.publicKey}\``,
      padCopyAble,
    );
  }
  //
  else if (text.includes('🔗 Invitation link (Пригласительная ссылка)')) {
    bot.sendMessage(
      chatId,
      `If you're looking to grow your AiProTON Network, this is your referral link. Share it with prospects and earn rewards for every person you referral activation. With this link, you can easily keep track of your referrals and see how much your network has grown. So start sharing and growing your network today!
      
Your Invite Link Is Below, Copy & Share It -\n \`https://t.me/${botName}?start=${userName}\``,
      padCopyAble,
    );
  }
  //
  else if (text.includes('🎛 My Dashbaord (щиток приборов)')) {
    let parent = user.parent ? 'You are invited by ' + user.parent + '\n' : 'Hi Admin\n';
    let child = user.child.length > 0 ? 'You invited ' + user.child + '\n' : 'You invited none\n';
    let childPaying =
      user.childPaying.length > 0
        ? 'You invited and they have deposited in system: ' + user.childPaying + '\n'
        : 'You invited no people who deposited funds\n';
    childPaying = user.child.length > 0 ? childPaying : '';
    let { status7SponsorPool } = user;
    status7SponsorPool = status7SponsorPool === IN_POOL ? 'Qualified' : 'Not Qualify';

    let usersOf7PoolLength;
    let newBalanceCanBe;
    const usersOf7Pool = await readBooks({ status7SponsorPool: IN_POOL });
    if (usersOf7Pool.length === 0) {
      usersOf7PoolLength = 1;
    }

    const pool = await readBook({ userName: _7_SPONSOR_POOL });
    const rewardPerUser = pool.balance / usersOf7PoolLength;
    const newEarnings = user.earnings7SponsorPool + rewardPerUser;
    const maxEarnings = 2 * user.depositedFunds;
    if (newEarnings >= maxEarnings) {
      newBalanceCanBe = maxEarnings;
    } else {
      newBalanceCanBe = newEarnings;
    }

    const percent = 1 / 100;
    const [withdraw] = p.getWithdrawRecyclePercentage(user);
    const withdrawAmount = user.balance * withdraw * percent;

    bot.sendMessage(
      chatId,
      `
My User Name – ${userName}

My Sponsor Name – ${user.parent}

My Referral Link –  \`https://t.me/${botName}?start=${userName}\`

My Current Pack (${p.planValue(user)} TON) – ${p.planName(user)}

My Total Earning Available – ${user.balance} TON

My Total Earning in History – ${user.totalEarnings} TON

My Total Withdraw – ${withdrawAmount} TON

My All Direct – ${child}

My Direct Sponsored – ${user.childPaying.length}

My 7 Sponsor Club – ${status7SponsorPool}

My Current REWARD RANK – ${p.getLevelName(user)}

My Network Team –
    Level-1 (${user.level1ChildPaying})
    Level-2 (${user.level2ChildPaying})
    Level-3 (${user.level3ChildPaying})
    Level-4 (${user.level4ChildPaying})
    Level-5 (${user.level5ChildPaying})
`,
      padCopyAble,
    );
    // (REWARD ${user.balance - newBalanceCanBe} TON)
    // bot.sendMessage(
    //   chatId,
    //   `
    //   ${parent}${child}${childPaying}\nPlan: ${p.planName(user)}\nEarnings: ${user.balance}\nDeposited: ${
    //     user.depositedFunds
    //   } TON\nLevel: ${user.level}
    //   Deposit Address:\n\`${user.publicKey}\`\nInvite link: \`https://t.me/${botName}?start=${userName}\``,
    //   padCopyAble,
    // );
  }
  //
  else if (text.includes('💎 TON Ecosystem (Экосистема ТОН)')) {
    bot.sendMessage(chatId, `https://ton.org/`, pad);
  }
  //
  else if (text.includes('TON Coinmarketcap')) {
    bot.sendMessage(chatId, `https://coinmarketcap.com/currencies/toncoin/`, pad);
  }
  //
  else if (text.includes('TON Exchanges (ТОН биржи)')) {
    bot.sendMessage(chatId, `https://coinmarketcap.com/currencies/toncoin/markets/`, pad);
  }
  //
  else if (text.includes('💰 Withdraw (Отзывать)') || isValidAddress(text)) {
    const percent = 1 / 100;
    const [withdraw, recycle] = p.getWithdrawRecyclePercentage(user);

    if (withdraw === 0) {
      bot.sendMessage(chatId, `You must be in ⭐️ START or a bigger plan to withdraw`, pad);
      return;
    }

    const withdrawAmount = user.balance * withdraw * percent;
    if (withdrawAmount < MIN_WITHDRAW) {
      bot.sendMessage(chatId, `Minimum withdraw is ${MIN_WITHDRAW} TON`, pad);
      return;
    }

    const [, adminBalance] = await getBalance(adminAddress);
    if (adminBalance < withdrawAmount) {
      bot.sendMessage(chatId, `Please ask admin to open the withdraw`, pad);
      bot.sendMessage(adminChatId, `A user is asking for withdraw: ${userName}`, pad);
      return;
    }

    let withdrawWallet = text.split(' ')[1];
    if (!isValidAddress(text)) {
      bot.sendMessage(chatId, 'Please send TON deposit address', pad);
      return;
    }

    withdrawWallet = text;

    const recycleAmount = user.balance * recycle * percent;
    bot.sendMessage(chatId, `Loading...`, pad);
    await recycleRewards(user, recycleAmount);
    await transferFrom(adminMnemonic, withdrawWallet, withdrawAmount, transferError);
    await writeBook({ userName }, { balance: 0 });

    bot.sendMessage(chatId, `Successfully withdrawn ${withdrawAmount} TON to ${withdrawWallet}`, pad);
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
      `Successfully sent ${pool.balance - backToPool} TON to pool members remaining is ${backToPool} TON`,
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

    const usersOfSuperStarPoolLength = usersL1 + usersL2 + usersL3 + usersL4 + usersL5;

    if (usersOfSuperStarPoolLength === 0) {
      bot.sendMessage(chatId, `There are no Super Star Pool Members`, pad);
      return;
    }

    const pool = await readBook({ userName: SUPER_STAR_POOL });
    if (pool.balance === 0) {
      bot.sendMessage(chatId, `Not enough funds in Super Star Members in Pool`, pad);
      return;
    }

    let rewardGiven = 0,
      backToPool = 0;
    if (usersL1 > 0) {
      const rewardPerLevel1 = 0.3 * pool.balance; // 30%
      rewardGiven += rewardPerLevel1;
      const rewardPerUserPerLevel1 = rewardPerLevel1 / usersL1;
      backToPool += await giveRewardEqually(usersLevel1, rewardPerUserPerLevel1);
    }
    if (usersL2 > 0) {
      const rewardPerLevel2 = 0.2 * pool.balance; // 20%
      rewardGiven += rewardPerLevel2;
      const rewardPerUserPerLevel2 = rewardPerLevel2 / usersL2;
      backToPool += await giveRewardEqually(usersLevel2, rewardPerUserPerLevel2);
    }
    if (usersL3 > 0) {
      const rewardPerLevel3 = 0.2 * pool.balance; // 20%
      rewardGiven += rewardPerLevel3;
      const rewardPerUserPerLevel3 = rewardPerLevel3 / usersL3;
      backToPool += await giveRewardEqually(usersLevel3, rewardPerUserPerLevel3);
    }
    if (usersL4 > 0) {
      const rewardPerLevel4 = 0.2 * pool.balance; // 20%
      rewardGiven += rewardPerLevel4;
      const rewardPerUserPerLevel4 = rewardPerLevel4 / usersL4;
      backToPool += await giveRewardEqually(usersLevel4, rewardPerUserPerLevel4);
    }
    if (usersL5 > 0) {
      const rewardPerLevel5 = 0.1 * pool.balance; // 10%
      rewardGiven += rewardPerLevel5;
      const rewardPerUserPerLevel5 = rewardPerLevel5 / usersL5;
      backToPool += await giveRewardEqually(usersLevel5, rewardPerUserPerLevel5);
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

    const users = await readBooks({ balance: { $gte: MIN_WITHDRAW } });
    const withdrawWallet = 'abcd';

    const percent = 1 / 100;
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const [withdraw, recycle] = p.getWithdrawRecyclePercentage(user);
      const withdrawAmount = user.balance * withdraw * percent;
      const recycleAmount = user.balance * recycle * percent;

      await recycleRewards(user, recycleAmount);
      await transferFrom(adminMnemonic, withdrawWallet, withdrawAmount, transferError);
      await writeBook({ userName }, { balance: 0 });

      bot.sendMessage(chatId, `Withdraw done for ${i}/${users.length}, ${user.userName}`, pad);
    }

    bot.sendMessage(chatId, 'Success Force Withdraw All Users', pad);
  }
  //
  else if (text.includes('🎥 Send Media to Users')) {
    if (!admins.includes(userName)) {
      bot.sendMessage(chatId, `Only admins can access this function`, pad);
      return;
    }
    SEND_MEDIA = 1;
    bot.sendMessage(chatId, '🎥 Please send text / image / video here to send to all users', pad);
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

    bot.sendMessage(
      chatId,
      `Total Users in System: ${totalUsers}\nAdmin Deposit Amount: ${admin.depositedFunds} TON\nAdmin Earnings Available: ${admin.balance} TON\nAdmin Earnings History: ${admin.totalEarnings} TON\n7 SPONSOR POOL AVAILABLE: ${__7_SPONSOR_POOL.balance} TON\n7 SPONSOR POOL HISTORY: ${__7_SPONSOR_POOL.balance} TON\nSUPER STAR POOL AVAILABLE: ${_SUPER_STAR_POOL.balance} TON\nSUPER STAR POOL HISTORY: ${_SUPER_STAR_POOL.balance} TON

Users Level 1: ${usersL1} 
Users Level 2: ${usersL2} 
Users Level 3: ${usersL3} 
Users Level 4: ${usersL4} 
Users Level 5: ${usersL5} 
      `,
      pad,
    );
  }
  // bot does not understand message
  else {
    if (admins.includes(userName)) {
      bot.sendMessage(chatId, `Hi Admin ${userName}`, pad);
      return;
    }

    bot.sendMessage(chatId, `Hi ${userName}`, pad);
  }
};

const giveRewardEqually = async (users, rewardPerUser) => {
  let backToPool = 0;

  for (let i = 0; i < users.length; i++) {
    const { userName, balanceOnEnteringSuperStarPool, earningsSuperStarPool, statusSuperStarPool } = users[i];

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
  if (!user.parent) return;
  let admin = await readBook({ userName: adminUserName });

  await writeBook({ userName }, { depositedFunds: user.depositedFunds + depositedFunds });
  await transferFrom(user.mnemonic, adminAddress, depositedFunds - 0.06, transferError); // txFee 0.06
  user = await readBook({ userName });

  const percent = depositedFunds / 100;
  let pool = await readBook({ userName: _7_SPONSOR_POOL });

  // NONE OR BABY PLAN, give all balance to admin, if admin then send admins balance to admins deposit
  if (!user.parent || p.getPlanNumber(user) < p.START) {
    await writeBook(
      { userName: adminUserName },
      { balance: admin.balance + 100 * percent, totalEarnings: admin.totalEarnings + 100 * percent },
    );
    console.log('returning from here, p.getPlanNumber(user)', p.getPlanNumber(user), 'user.parent', user.parent);
    return; //  <---------------------<
  }

  let userParent = await readBook({ userName: user.parent });

  // 1 to 3
  if (userParent.childPaying.length <= p.REFERRERS_LIMIT_1) {
    await writeBook(
      { userName: userParent.userName },
      { balance: userParent.balance + 10 * percent, totalEarnings: userParent.totalEarnings + 10 * percent },
    );
    await writeBook(
      { userName: adminUserName },
      { balance: admin.balance + 5 * percent, totalEarnings: admin.totalEarnings + 5 * percent },
    );
    await writeBook(
      { userName: _7_SPONSOR_POOL },
      { balance: pool.balance + 5 * percent, totalEarnings: pool.totalEarnings + 5 * percent },
    );
  }

  // 4 to 6
  else if (userParent.childPaying.length <= p.REFERRERS_LIMIT_2) {
    await writeBook(
      { userName: userParent.userName },
      { balance: userParent.balance + 15 * percent, totalEarnings: userParent.totalEarnings + 15 * percent },
    );
    await writeBook(
      { userName: adminUserName },
      {
        balance: admin.balance + 2.5 * percent,
        totalEarnings: admin.totalEarnings + 2.5 * percent,
      },
    );
    await writeBook(
      { userName: _7_SPONSOR_POOL },
      { balance: pool.balance + 2.5 * percent, totalEarnings: pool.totalEarnings + 2.5 * percent },
    );
  }

  // 7 or more child paying
  else {
    await writeBook(
      { userName: userParent.userName },
      { balance: userParent.balance + 20 * percent, totalEarnings: userParent.totalEarnings + 20 * percent },
    );

    // add person to status7SponsorPool
    if (user.status7SponsorPool === NOT_IN_POOL) {
      await writeBook({ userName: userParent.userName }, { status7SponsorPool: IN_POOL });
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

    console.log({ userParent, wasError: 'can not read value of undefined' });
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
      newUserParent[`level${level}ChildPaying`] = userParent[`level${level}ChildPaying`] + 1;
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
        {
          balance: userParent.balance + 5 * percent,
          totalEarnings: userParent.totalEarnings + 5 * percent,
        },
      );
      bot.sendMessage(userParent.chatId, `You have earned ${5 * percent} TON from deposit of ${userName}`);
    }
  }

  console.log({ remainingSending: remaining });
  await writeBook(
    { userName: adminUserName },
    { balance: admin.balance + remaining * percent, totalEarnings: admin.totalEarnings + remaining * percent },
  );
};

const transferError = (e) => {
  try {
    bot.sendMessage(devChatId, `1, ${JSON.stringify(e)}`);
  } catch (error) {
    bot.sendMessage(devChatId, `2, ${e}`);
  }
};

const recycleRewards = async (user, depositedFunds) => {
  if (depositedFunds === 0) return;
  if (!user.parent) {
    // bot.sendMessage(user.chatId, `Admin can not recycle`);
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
    const reward = p.getRecycleRewardLevelPercentage(userParent);
    remaining -= reward;
    console.log({ remaining });
    await writeBook({ userName: userParent.userName }, { balance: userParent.balance + reward * percent });
  }

  // Put remaining percentage in ADMIN_DEPOSIT_LEFTOVER
  console.log({ remainingSending: remaining });
  await writeBook({ userName: adminUserName }, { balance: admin.balance + 0.5 * remaining * percent }); // 50% of remaining
  await writeBook(
    { userName: SUPER_STAR_POOL },
    {
      balance: pool.balance + 0.5 * remaining * percent,
      totalEarnings: pool.totalEarnings + 0.5 * remaining * percent,
    },
  ); // 50% of remaining
};

const sendToAllUsers = async (method, msg) => {
  let users = await readBooks({});

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    user.chatId && bot[method](adminChatId, user.chatId, msg);
  }

  // bot.sendMessage(chatId, 'Sending... to all users', pad);
};
// const sendToAllUsers = async (method, msg) => {
//   let users = await readBooks({});

//   for (let i = 0; i < users.length; i++) {
//     const user = users[i];
//     user.chatId && bot[method](user.chatId, msg);
//   }

//   // bot.sendMessage(chatId, 'Sending... to all users', pad);
// };

const exists = (user) => {
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

/*
writeBook(
  { userName: 'AdilKhanG' },
  {
    depositedFunds: 0,
  },
).then(() => console.log('ok'));
*/
