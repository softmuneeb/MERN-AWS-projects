// explanation / plan in readme file
const APP_ON_MAINNET = true;
// const APP_ON_MAINNET = false;

// const devChatId = '5207150830'; // for error messages
//

const support = 'adilkh12';
const dev = 'thinkmuneeb';
const adminAddressEth = '0xb2116927258318EFE214e6D3DC693178440BF0AC';
const MIN_WITHDRAW = 0.05; //TON
const MIN_DEPOSIT = 0.05; // TON

// ===============This section if for crypto millio
const keyboard = [
  ['🔠 Language'], //
  ['TON Coinmarketcap (ТОН КОИНМАРКЕТ КАПИТАЛ)', 'TON Exchanges (ТОН биржи)'],
  ['💎 TON Ecosystem (Экосистема ТОН)'],
  ['📈 Marketing Plan (Маркетинговый план)'], //
  ['💰 REWARD (ВОЗНАГРАЖДЕНИЕ)'], //
  ['🎖7 SPONSOR CLUB (7 Спонсорский клуб)'], //
  ['💼 Plan Packages (Пакет планов)'], //
  ['🎛 My Dashboard (щиток приборов)'], //
  ['⭐️ Home (Дом)'], //
  ['🔗 Invitation link (Пригласительная ссылка)'], //
  ['🎒 My Package (Mой пакет)'], //
  ['💵 My Wallet (Мой бумажник)'], //
  ['TON Crosschain Address (Адрес кроссчейна TON)'], //
  ['💰 Withdraw (Отзывать)', '🕹 Upgrade (Обновление)'], //
  ['🖇 Referrals list (Прямое направление)'], //
  ['🚀 Super Star Club (Суперзвездный клуб)'], //
  ['💸 Income Statement (Справка о доходах)'], //
  ['💡 Rules For Community (Правила для сообщества)'],
  ['📡 AiProTON Features (Особенности АйПроТОН)', '💁‍♂️ Basic Info (Основная информация)'], //
  ['🤖 Support (Поддерживать)'], //
];

const adminKeyBoard = [
  ['________ADMIN________'], //
  ['🎥 Send Media to Users'], //
  ['📊 System Stats'], //
  ['All Users Names'], //
  ['🤵🏼‍♂️ Reward 7 Pool Members'], //
  ['🦸‍♂️ Reward Super Star Pool Members'], //
  ['💳 Force Withdraw All Users'], //
];

const devKeyBoard = [
  ['________DEV________'], //
  ['💡 See All Users'], //
  ['🎒 Add Test Ton'], //
];

require('dotenv').config();
const token = process.env.BOT_TOKEN;
const ADMIN = process.env.ADMIN_USER_NAME;
const [adminAddress, adminMnemonic] = [process.env.ADMIN_ADDRESS, process.env.ADMIN_MNEMONIC];
const admins = [ADMIN]; // user names here can see admin pad

const _7_SPONSOR_POOL = '7_SPONSOR_POOL';
const SUPER_STAR_POOL = 'SUPER_STAR_POOL';

const IN_POOL = 1;
const NOT_IN_POOL = 0;
const REMOVED_FROM_POOL = 2;

// moved some functions in an object because they depend on each other
const p = {
  REFERRERS_LIMIT_1: 3, //1, // 0 - 3 referrers 10% commission
  REFERRERS_LIMIT_2: 6, //2, // 4 - 6 referrers 15% commission
  // 7+ referrers 20% commission

  // Plan TON Value 5 TON, 25 TON, 50 TON, 200 TON, 500 TON
  ZERO_TON: 0,
  BABY_TON: 5,
  START_TON: 25, // TOUCH ME
  WALK_TON: 100,
  RUN_TON: 200,
  FLY_TON: 500,

  // Plan Ids 1,2,3,4,5
  ZERO: 0,
  BABY: 1,
  START: 2,
  WALK: 3, // DO NOT TOUCH
  RUN: 4,
  FLY: 5,

  // 1000 Referrals at Level 1 => IRON_MAN, 3000 at Level 2 => BAT_MAN, ...
  IRON_MAN: 1_000, // LEVEL 1
  BAT_MAN: 3_000, // LEVEL 2
  SPIDER_MAN: 10_000, // LEVEL 3
  SUPER_MAN: 20_000, // LEVEL 4
  WONDER_MAN: 30_000, // LEVEL 5
  AVATAR_MAN: 500_000, // LEVEL 6

  // level Max Earnings From 🦸‍♂️ Super Star Pool
  levelMaxEarnings: {
    0: 0, // TON
    1: 200, // TON
    2: 500, // TON
    3: 1000, // TON
    4: 2500, // TON
    5: 5000, // TON
    6: 25000, // TON
  },

  getLevel: (u) => {
    const l1 = u.level1ChildPaying;
    const l2 = u.level2ChildPaying;
    const l3 = u.level3ChildPaying;
    const l4 = u.level4ChildPaying;
    const l5 = u.level5ChildPaying;
    const l6 = u.level6ChildPaying;
    let ans;
    if (
      l1 >= p.IRON_MAN &&
      l2 >= p.BAT_MAN &&
      l3 >= p.SPIDER_MAN &&
      l4 >= p.SUPER_MAN &&
      l5 >= p.WONDER_MAN &&
      l6 >= p.AVATAR_MAN
    )
      ans = 6; //AVATAR MAN
    else if (l1 >= p.IRON_MAN && l2 >= p.BAT_MAN && l3 >= p.SPIDER_MAN && l4 >= p.SUPER_MAN && l5 >= p.WONDER_MAN)
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
    const l6 = u.level6ChildPaying;
    let ans;
    if (
      l1 >= p.IRON_MAN &&
      l2 >= p.BAT_MAN &&
      l3 >= p.SPIDER_MAN &&
      l4 >= p.SUPER_MAN &&
      l5 >= p.WONDER_MAN &&
      l6 >= p.AVATAR_MAN
    )
      ans = 'AVATAR MAN'; //AVATAR MAN
    else if (l1 >= p.IRON_MAN && l2 >= p.BAT_MAN && l3 >= p.SPIDER_MAN && l4 >= p.SUPER_MAN && l5 >= p.WONDER_MAN)
      ans = 'WONDER MAN'; //WONDER
    else if (l1 >= p.IRON_MAN && l2 >= p.BAT_MAN && l3 >= p.SPIDER_MAN && l4 >= p.SUPER_MAN) ans = 'SUPER MAN'; //SUPER
    else if (l1 >= p.IRON_MAN && l2 >= p.BAT_MAN && l3 >= p.SPIDER_MAN) ans = 'SPIDER MAN'; //SPIDER
    else if (l1 >= p.IRON_MAN && l2 >= p.BAT_MAN) ans = 'BAT MAN'; //BAT
    else if (l1 >= p.IRON_MAN) ans = 'IRON MAN'; // IRON MAN
    else ans = 'NOT QUALIFIED';
    return ans;
  },

  getRewardLevelsUnlocked: ({ depositedFunds: d }) => {
    let ans; // plan
    if (d >= p.FLY_TON) ans = 15;
    else if (d >= p.RUN_TON) ans = 12;
    else if (d >= p.WALK_TON) ans = 9;
    else if (d >= p.START_TON) ans = 6;
    else if (d >= p.BABY_TON) ans = 6;
    else ans = 0;
    return ans;
  },

  getWithdrawRecyclePercentage: (u) => {
    if (!u.parent) return [100, 0];

    const d = u.depositedFunds;

    let ans; // plan
    if (d >= p.FLY_TON) ans = [90, 10];
    else if (d >= p.RUN_TON) ans = [80, 20];
    else if (d >= p.WALK_TON) ans = [70, 30];
    else if (d >= p.START_TON) ans = [60, 40];
    else if (d >= p.BABY_TON) ans = [50, 50];
    else ans = [0, 0];
    return ans;
  },

  getRecycleRewardLevelPercentage: ({ depositedFunds: d }) => {
    let ans; // plan
    if (d >= p.FLY_TON) ans = 5;
    else if (d >= p.RUN_TON) ans = 4;
    else if (d >= p.WALK_TON) ans = 3;
    else if (d >= p.START_TON) ans = 2;
    else if (d >= p.BABY_TON) ans = 1;
    else ans = 0;
    return ans;
  },

  getPlanName: ({ depositedFunds: d }) => {
    let ans; // plan
    if (d >= p.FLY_TON) ans = '✈️ FLY'; // 500 TON FLY
    else if (d >= p.RUN_TON) ans = '🏃 RUN'; // 200 TON RUN
    else if (d >= p.WALK_TON) ans = '🚶 WALK'; // 50 TON  WALK
    else if (d >= p.START_TON) ans = '⭐️ START'; // 25 TON  START --- withdraw starts here
    else if (d >= p.BABY_TON) ans = '👼 BABY';
    else ans = '👎 NONE';
    return ans;
  },

  getPlanValue: ({ depositedFunds: d }) => {
    let ans; // plan
    if (d >= p.FLY_TON) ans = p.FLY_TON; // 500 TON FLY
    else if (d >= p.RUN_TON) ans = p.RUN_TON; // 200 TON RUN
    else if (d >= p.WALK_TON) ans = p.WALK_TON; // 50 TON  WALK
    else if (d >= p.START_TON) ans = p.START_TON; // 25 TON  START --- withdraw starts here
    else if (d >= p.BABY_TON) ans = p.BABY_TON;
    else ans = p.ZERO_TON;
    return ans;
  },

  getPlanNumber: ({ depositedFunds: d }) => {
    let ans; // plan
    if (d >= p.FLY_TON) ans = p.FLY; // 500 TON FLY
    else if (d >= p.RUN_TON) ans = p.RUN; // 200 TON RUN
    else if (d >= p.WALK_TON) ans = p.WALK; // 50 TON  WALK
    else if (d >= p.START_TON) ans = p.START; // 25 TON  START --- withdraw starts here
    else if (d >= p.BABY_TON) ans = p.BABY; // 5 TON BABY
    else ans = p.ZERO;
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

👼 BABY - 5 TON
⭐️ START - 25 TON
🚶 WALK - 100 TON 
🏃 RUN -  200 TON 
✈️ FLY -  500 TON

Deposit TON Amount of Any Value In Your AiProTON Deposit Wallet &
Whatever The Amount Value You Deposit , 
Your Pack Value Will Be According That. You Can Upgrade Any Time.
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
Contribution Packages –

5 TON - BABY PACK
           - Upto 6 Level Team Income
           - Withdraw 50% - Recycle 50%

25 TON – START PACK 
               – Upto 6 Level Team Income
            – Withdraw  60 % - Recycle 40%

100 TON – WALK PACK 
                – Upto 9 Level Team Income 
            – Withdraw 70 % - Recycle 30%

200 TON – RUN PACK 
                – Upto 12 Level Team Income 
            – Withdraw 80 % - Recycle 20%

500 TON – START PACK
               – Upto 15 Level Team Income
           –  Withdraw 90 % - Recycle 10% 

Choose Your Contribution Level To Start & Become the Part Of The Journey To Earn TON From Your & Global Network.

Direct INCOME 
( Direct Income From Activation Start & Above Packs )

1st You Get Direct Income from Your Network.
From Sponsoring 1,2,3 You Get 10% , 
From Sponsoring 4,5,6, You Get 15% 
and 7th and above Sponsoring You Get 20% From every Direct Sponsoring.

For All Earned Income, 
You Have Three Options – WITHDRAW / UPGRADE / RECYCLE

WITHDRAW RULE

BABY Pack ( 5 TON)
 - 50% Withdraw - 50% Recycle

START Pack  (25 TON) 
– 60 % Withdraw – 40% Recycle

WALK Pack  (100 TON)
- 70% Withdraw – 30% Recycle 

RUN Pack  (200 TON ) 
- 80% Withdraw – 20% Recycle 

FLY Pack (500 TON) - 
90% Withdraw – 10% Recycle 

Recycle Means –
The Balance Payout ( From Withdraw in Your Team) That Value TON again Distribute As Recycle Plan In All 15 Level Generations Uplines To Create A Loop Income.

YOU can UPGRADE Your PACK to get high benefit on basis.
100% UPGRADE – From Available Income

So, This System create Income In Loop. Every Time You Get Income From Your Team as They Upgrade.

TEAM INCOME –

When In Your Network , 
Any Pack Activate ( START TO FLY) ,
You Get Income From 15 Levels Depth.

Level – 1 – 10% To 20% Direct 
              ( First 3 Direct – 10% , 
               From 4th To 6th Direct – 15%,
           b7th & Above 20% Every Direct. ) 

Level – 2 – 5% 
Level – 3 – 5% 
Level – 4 – 5% 
Level – 5 – 5% 
Level – 6 – 5% 
Level – 7 – 5% 
Level – 8 – 5% 
Level – 9 – 5% 
Level – 10 – 5% 
Level – 11 – 5% 
Level – 12 – 5% 
Level – 13 – 5% 
Level – 14 – 5% 
Level – 15 – 5% 

Level Eligibility As Your Pack, 
Like If You On 

BABY or START Pack
– You Get This Income From upto 6 Level.

If You On WALK Pack – you Get This Income Upto 9 Level. 

On RUN Pack – You Get This Income upto 12 Level and

On FLY Pack – you Get This Income From All 15 Level. 

You Can upgrade any time as you convenient. 

RECYCLE –
All recycle Distribution in 15 levels , As per pack ,
if You are Baby ( Registration pack) than 1% , 
if you on Start – 2% ,
If You on Walk – 3% , 
If You On Run – 4% , 
if you on FLY pack you get 5% on Each level from each 
RECYCLE Activity. 

Thus 5% x 15 Level – Upto 75% Distribution of RECYCLE In 15 LevelS & Rest Skipped Balance Use In REWARDS

100% Distribution 

....To Know About REWARDS ...  Click REWARD TAB
`;

const { readBook, writeBook, readBooks, depositFundsEth } = require('./db');
const { getBalance, mnemonicGenerate, transferFrom, isValidAddress } = require('./mlm-backend');
const TelegramBot = require('node-telegram-bot-api');
const translate = require('translate-google');

// setup express app so we can visit link after vercel api hosting
const express = require('express');
const app = express();
const cors = require('cors');
const { getBalanceOfTonOnEth, getBalanceOfTonOnBnb } = require('./eth-get-balance');
app.use(cors());
app.set('json spaces', 2);
app.get('/', (req, res) => res.json({ message: 'hi ' + Date() }));
app.get('/adminAddressEth', (req, res) => res.json({ adminAddressEth }));
app.get('/APP_ON_MAINNET', (req, res) => res.json({ APP_ON_MAINNET }));
app.get('/TG_BOT_LINK', (req, res) => res.json({ TG_BOT_LINK: `https://t.me/${botName}` }));
app.get('/depositFundsEth/:tx/:chainId/:userName', async (req, res) => {
  const { tx, userName, chainId } = req.params;
  const status = await depositFundsEth(tx, Number(chainId), userName, botSendMessage, adminAddressEth, APP_ON_MAINNET);
  res.json(status);
});

const listener = app.listen(process.env.PORT || 8080, () =>
  console.log('Listening on port ' + listener.address().port),
);

const bot = new TelegramBot(token, { polling: true });

let SEND_MEDIA = 0;

const padSimple = {
  reply_markup: {
    keyboard,
  },
  parse_mode: 'HTML',
};
const padAdmin = {
  reply_markup: {
    keyboard: [...keyboard, ...adminKeyBoard],
  },
  parse_mode: 'HTML',
};
const padDev = {
  reply_markup: {
    keyboard: [...keyboard, ...adminKeyBoard, ...devKeyBoard],
  },
  parse_mode: 'HTML',
};
let pad;

const padLanguage = {
  reply_markup: {
    keyboard: [
      ['🇺🇸 English'],
      ['🇷🇺 Russian'],
      ['🇰🇷 Korean'],
      ['🇪🇸 Spanish'],
      ['🇻🇳 Vietnamese'],
      ['🇨🇳 Chinese Simplified'],
    ],
  },
  parse_mode: 'HTML',
};

let botName;
let HELP_STATUS = {};
let LANGUAGE_STATUS = {};
let ADD_TON_STATUS = {};
const acceptedLanguages = {
  '🇺🇸 English': 'English',
  '🇷🇺 Russian': 'Russian',
  '🇰🇷 Korean': 'Korean',
  '🇪🇸 Spanish': 'Spanish',
  '🇻🇳 Vietnamese': 'Vietnamese',
  '🇨🇳 Chinese Simplified': 'Chinese Simplified',
};

// on telegram message
const onMessage = async (msg, ctx) => {
  try {
    await _onMessage(msg, ctx);
  } catch (e) {
    console.log('error onMessage ' + e);
    const user = await readBook({ userName: dev });
    if (user) botSendMessage(user, 'error onMessage ' + e);
  }
};

const _onMessage = async (msg, ctx) => {
  const chatId = msg.chat.id;
  const { text } = msg;
  const userName = msg.chat.username;
  if (!userName) {
    botSendMessage(chatId, 'Please add your user name in telegram settings');
    return;
  }
  console.log({ text, userName, chatId, ctx }); // for dev

  ////////////////////////////////////
  /////////  ADMIN EXIST START ///////
  ////////////////////////////////////
  const admin = await readBook({ userName: ADMIN });
  if (admin) {
    console.log('Admin exist in system');
  }
  //
  else if (userName === ADMIN) {
    await writeBook({ chatId: '7 pool', userName: _7_SPONSOR_POOL }, {});
    await writeBook({ chatId: 'S pool', userName: SUPER_STAR_POOL }, {});
    await writeBook(
      { userName: ADMIN },
      {
        chatId,
        publicKey: adminAddress,
        mnemonic: adminMnemonic,
      },
    );
  }
  //
  else if (userName !== ADMIN) {
    bot.sendMessage(chatId, 'Please create the first user in system');
    return;
  }

  ////////////////////////////////////
  /////////  ADMIN EXIST END /////////
  ////////////////////////////////////

  // HELP_STATUS
  if (HELP_STATUS[chatId] === 1) {
    HELP_STATUS[chatId] = 0;
    const user = await readBook({ userName: support });
    user && bot.forwardMessage(user.chatId, chatId, msg.message_id);
    bot.forwardMessage('5745083820', chatId, msg.message_id);
    return;
  }

  ////////////////////////////////////
  /////////  USER AUTH START /////////
  ////////////////////////////////////

  let user = await readBook({ userName });

  // ADMIN
  if (user && user.userName === ADMIN) {
  }
  // Old User
  else if (exists(user)) {
    console.log('Old user');
    // empty the account
    let [, depositedFunds1] = await getBalance(user.publicKey);
    if (depositedFunds1 === null) {
      botSendMessage(user, 'Please press button again');
      return;
    }

    if (depositedFunds1 < 0.06) depositedFunds1 = 0;

    // empty the account
    let depositedFunds2 = user.depositedFundsEth;
    const depositedFunds = depositedFunds1 + depositedFunds2;
    console.log(`depositedFundsTon ${depositedFunds1} depositedFundsEth ${depositedFunds2}`);

    if (depositedFunds >= MIN_DEPOSIT) {
      if (depositedFunds1 >= MIN_DEPOSIT) {
        const transferFromResult = await transferFrom(user.mnemonic, adminAddress, depositedFunds1); // txFee 0.06
        if (!transferFromResult.success) {
          botSendMessage(
            user,
            `Sorry, error in deposit. Contact Support @AiProTONsupport. Forward this message. ${transferFromResult.message}`,
            pad,
          );
          return;
        }
      }

      await writeBook({ userName }, { depositedFundsEth: 0 });

      botSendMessage(user, 'Depositing Funds...');
      console.log('some new deposit, giving rewards');
      await deposit(user, depositedFunds, userName);
      user = await readBook({ userName });
    }

    // add person to status7SponsorPool
    if (user.status7SponsorPool === NOT_IN_POOL) {
      let users = await getUserChild(user);
      let userPlanLevels = users.map((user) => (p.getPlanNumber(user) >= p.START ? 1 : 0));
      let childAboveOrEqualStart = userPlanLevels.reduce((a, b) => a + b, 0);

      // 7 -> 7 Sponsor Pool
      if (childAboveOrEqualStart >= 7) {
        if (p.getPlanNumber(user) >= p.START) {
          await writeBook({ userName: user.userName }, { status7SponsorPool: IN_POOL });
          botSendMessage(user, `Congrats You are added to 7 sponsor pool`);
        } else {
          botSendMessage(user, `You have invited 7+ people, Upgrade to ⭐️ START plan to get into 7 sponsor pool`);
        }
      } else {
        // botSendMessage(
        //   user,
        //   `You have invited ${childAboveOrEqualStart} people who have ⭐️ START plan or bigger, invite more people to get into 7 sponsor pool`,
        // );
      }
    }
  }
  // New User
  else {
    console.log('New user');
    // if referrer undefined then make defaultReferrer his referrer
    let referrer = text.split(' ')[1];
    if (referrer === undefined) {
      botSendMessage({ chatId }, `You can only join from a referral link`);
      return;
    }

    // if referrer not exist then make defaultReferrer his referrer
    let parent = await readBook({ userName: referrer });
    if (!parent) {
      botSendMessage({ chatId }, `You sponsor do not exist in system`);
      return;
    }

    // create and save wallet, make referrer chain
    const [publicKey, mnemonic] = await mnemonicGenerate();
    await writeBook({ userName }, { parent: parent.userName, userName, chatId, publicKey, mnemonic });
    await writeBook({ userName: parent.userName }, { child: [...parent.child, userName] });
    user = await readBook({ userName }); // method 1 easy, method 2, get from RAM, ..., method 3 best: keep in ram, update db all once, it prevents errors in data
    botSendMessage(user, 'You are invited by ' + parent.userName);
    botSendMessage(parent, 'You invited ' + userName);
  }

  // till here we have user object setup
  console.log({ user, d: new Date() });

  //////////////////////////////////
  /////////  USER AUTH END /////////
  //////////////////////////////////

  // LANGUAGE_STATUS
  if (LANGUAGE_STATUS[chatId] === 1) {
    LANGUAGE_STATUS[chatId] = 0;
    if (acceptedLanguages[text]) {
      await writeBook({ userName }, { language: acceptedLanguages[text] });
      botSendMessage(user, `Language changed to ${text} successfully`);
    } else {
      botSendMessage(user, 'Please give correct language');
    }
    return;
  }

  if (ADD_TON_STATUS[chatId] === 1) {
    ADD_TON_STATUS[chatId] = 0;
    if (!(await readBook({ userName: text }))) {
      botSendMessage(user, `user not exist ${text}, create user chat first`);
      return;
    }
    await writeBook({ userName: text }, { depositedFundsEth: 25 });
    botSendMessage(user, `Balance set to 25 ton in ${text}`);
    return;
  }

  // SEND_MEDIA
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

    botSendMessage(user, 'Sending... to all users');
    return;
  }

  // Please send only text
  if (!text || text === undefined) {
    botSendMessage(user, 'Please send only text');
    return;
  }
  //
  else if (text.includes('🤖 Support (Поддерживать)')) {
    botSendMessage(user, help);
    HELP_STATUS[chatId] = 1;
    return;
  }
  //
  else if (text.includes('🔠 Language')) {
    botSendMessage(user, 'Please select language', padLanguage);
    LANGUAGE_STATUS[chatId] = 1;
    return;
  }
  //
  else if (text.includes('💡 See All Users')) {
    if (userName !== dev) botSendMessage(user, `Only dev`);

    const [, tonDepositOnTon] = await getBalance(adminAddress);
    const balanceOfTonOnEth = await getBalanceOfTonOnEth(adminAddressEth);
    const balanceOfTonOnBnb = await getBalanceOfTonOnBnb(adminAddressEth);

    const users = await readBooks();
    let total = 0;
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      total += user.balance + user.depositedFundsEth;
    }
    botSendMessage(
      user,
      `
tonDepositOnTon: ${tonDepositOnTon}
balanceOfTonOnEth: ${balanceOfTonOnEth}
balanceOfTonOnBnb: ${balanceOfTonOnBnb}
Total Ton In DB: ${total} TON\nUsers:\n${users.map((u) => `${u.userName} -> ${u.childPaying}`).join('\n')}`,
    );
    return;
  }
  //
  else if (text.includes('🎒 Add Test Ton')) {
    if (userName !== dev) botSendMessage(user, `Only dev`);
    botSendMessage(user, 'Tell user name to add ton');
    ADD_TON_STATUS[chatId] = 1;
    return;
  }
  //
  else if (text.includes('💁‍♂️ Basic Info (Основная информация)')) {
    botSendMessage(user, info);
    return;
  }
  //
  else if (text.includes('💼 Plan Packages (Пакет планов)')) {
    botSendMessage(user, plans);
    return;
  }
  //
  else if (text.includes('📡 AiProTON Features (Особенности АйПроТОН)')) {
    botSendMessage(user, features);
    return;
  }
  //
  else if (text.includes('💡 Rules For Community (Правила для сообщества)')) {
    botSendMessage(user, rules);
    return;
  }
  //
  else if (text.includes('📈 Marketing Plan (Маркетинговый план)')) {
    botSendMessage(user, market);
    return;
  }

  //
  //
  // PUBLIC FUNCTIONS
  if (text.includes('/start') || text.includes('⭐️ Home (Дом)')) {
    const textReply = `Hello ${userName}
      
Welcome To AiProTON Network

Your Sponsor Is ${user.parent}

Your Referral Link Is <code>https://t.me/${botName}?start=${userName}</code>
    
You Have Invited ${user.childPaying.length}
    
AiProTON Network is a Telegram-based Artificial Intelligence program that
offers a variety of features, tools, and services to users on the TON crypto-currency network.
This Community platform offers  full-featured Telegram wallet application that allows users to store, send, and receive TON coins and tokens.

As Telegram Network Itself Have more Than 700 Million Community Across The Globe & TON Network Is Going To Be The Best Crypto Ever In Crypto Industry.

Let’s be The Part Of New Amazing Era of Crypto & Technology World In 2023.
`;

    botSendMessage(user, textReply);
  }
  //
  else if (text.includes('🕹 Upgrade (Обновление)')) {
    if (!exists(user)) {
      botSendMessage(user, 'Invalid user');
      return;
    }
    if (user.balance === 0) {
      botSendMessage(user, 'Low balance to upgrade');
      return;
    }

    await writeBook({ userName }, { balance: 0 });
    await deposit(user, user.balance * 1.0, userName); // 100% used in plan upgrade, distributed in referrals, admin
    // await recycleRewards(user, user.balance * 0.0); // 0% distributed in referrals, admin
    user = await readBook({ userName });
    botSendMessage(user, 'Upgraded your package is ' + p.getPlanName(user));
  }
  //
  else if (text.includes('🚀 Super Star Club (Суперзвездный клуб)')) {
    const replyText = `Level: ${p.getLevelName(user)}
Level-1    (${user.level1ChildPaying})
Level-2    (${user.level2ChildPaying})
Level-3    (${user.level3ChildPaying})
Level-4    (${user.level4ChildPaying})
Level-5    (${user.level5ChildPaying})
Level 6-15 (${user.level6ChildPaying})`;

    botSendMessage(user, replyText);
    // botSendMessage(
    //   chatId,
    //   `Level: ${user.level}\nInvite ${10 - user.childPaying} more users to go to Level ${user.level + 1} `,
    //   pad,
    // );
  }
  //
  else if (text.includes('🎒 My Package (Mой пакет)')) {
    const upgradeMessage = p.getPlanNumber(user) < p.FLY ? 'Upgrade To Get More Benefits' : '';
    botSendMessage(
      user,
      `Dear TON User\nYour Current Plan Is - ${p.getPlanName(user)} - (${p.getPlanValue(user)} TON)\n${upgradeMessage}`,
      pad,
    );
  }
  //
  else if (text.includes('💸 Income Statement (Справка о доходах)')) {
    botSendMessage(
      user,
      `Your TON Earnings Available: ${user.balance}

Total TON Earnings in History: ${user.totalEarnings}
Total TON Withdraw in History: ${user.totalWithdraw}
`,
      pad,
    );
  } else if (text.includes('🖇 Referrals list (Прямое направление)')) {
    let parent = user.parent ? 'You are invited by ' + user.parent + '\n' : 'Hi Admin\n';
    let child = user.child.length > 0 ? 'You invited ' + user.child + '\n' : 'You invited none\n';
    let childPaying =
      user.childPaying.length > 0
        ? 'Your Active Direct Referrals: ' + user.childPaying + '\n'
        : 'You invited no people who deposited funds\n';
    childPaying = user.child.length > 0 ? childPaying : '';

    botSendMessage(user, `${parent}${child}${childPaying}`);
  }
  //
  else if (text.includes('💵 My Wallet (Мой бумажник)')) {
    botSendMessage(
      user,
      `Here You Can Deposit Your TON For Your Pack Activation , What Amount You Deposit , You Will Get The Benefit According That Pack Value . Deposit TON Here From Your TON WALLET.

Your TON Earnings Available: ${user.balance}

Total TON Earnings in History: ${user.totalEarnings}

Total TON Withdraw in History: ${user.totalWithdraw}

Your Deposited TON: ${user.depositedFunds} TON

Deposit Address:\n<code>${user.publicKey}</code>
<a href="https://aiproton.io/?userName=${user.userName}&balance=${user.depositedFunds}">
Click here Deposit TONcoin from Smart Chain Or Ether Chain
</a>`,
      pad,
    );
  }
  //
  else if (text.includes('TON Crosschain Address (Адрес кроссчейна TON)')) {
    botSendMessage(
      user,
      `Copy The Below Address To 
Add Assets (TONcoin) in Your Metamask Wallet. 
Kindly Use Correct Address
As Chain ( Smartchain Or ETHchain )

Copy TONcoin 
Ethchain Ethereum (ERC-20) Address

<code>0x582d872A1B094FC48F5DE31D3B73F2D9bE47def1</code>

Copy TONcoin 
BNB Smartchain (BEP-20) Address

<code>0x76A797A59Ba2C17726896976B7B3747BfD1d220f</code>

<a href="https://ton.org/bridge/?fromNetwork=ton&toNetwork=bsc">
(Swap TONcoin From BNB or ETH)
</a>
`,
      pad,
    );
  }
  //
  else if (text.includes('🔗 Invitation link (Пригласительная ссылка)')) {
    botSendMessage(
      user,
      `If you're looking to grow your AiProTON Network, this is your referral link. Share it with prospects and earn rewards for every person you referral activation. With this link, you can easily keep track of your referrals and see how much your network has grown. So start sharing and growing your network today!
      
Your Invite Link Is Below, Copy & Share It -\n <code>https://t.me/${botName}?start=${userName}</code>`,
      pad,
    );
  }
  //
  else if (text.includes('🎛 My Dashboard (щиток приборов)')) {
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
    const withdrawAmount = (user.balance + user.earningsSuperStarPool + user.earnings7SponsorPool) * withdraw * percent;

    botSendMessage(
      user,
      `
My User Name – ${userName}

My Sponsor Name – ${user.parent}

My Referral Link –  <code>https://t.me/${botName}?start=${userName}</code>

My Current Pack (${p.getPlanValue(user)} TON) – ${p.getPlanName(user)}

My Deposited Funds (${user.depositedFunds} TON)

My Total Earning Available – ${user.balance} TON

My Total Earning in History – ${user.totalEarnings} TON

My Total Withdraw in History – ${user.totalWithdraw} TON

My Total Withdraw Available – ${withdrawAmount} TON

My All Direct – ${child}

My Direct Sponsored – ${user.childPaying.length}

My 7 Sponsor Club – ${status7SponsorPool}

My Current REWARD RANK – ${p.getLevelName(user)}

My Network Team –
Level-1    (${user.level1ChildPaying})
Level-2    (${user.level2ChildPaying})
Level-3    (${user.level3ChildPaying})
Level-4    (${user.level4ChildPaying})
Level-5    (${user.level5ChildPaying})
Level 6-15 (${user.level6ChildPaying})
`,
      pad,
    );
  }
  //
  else if (text.includes('💎 TON Ecosystem (Экосистема ТОН)')) {
    botSendMessage(user, `https://ton.org/`);
  }
  //
  else if (text.includes('TON Coinmarketcap (ТОН КОИНМАРКЕТ КАПИТАЛ)')) {
    botSendMessage(user, `https://coinmarketcap.com/currencies/toncoin/`);
  }
  //
  else if (text.includes('💰 REWARD (ВОЗНАГРАЖДЕНИЕ)')) {
    botSendMessage(
      user,
      `MAGICAL POINT – Whatever The Distribution As Per Level, The Balance Value Count As SKIPPED BALANCE & Used In REWARD CLUB .

So Every TON Globally Counts For The Community Reward Earnings. 

Level    -TON Business - Reward Upto

L1       -  1,000 TON       -  100 TON
L2       -  3,000 TON       -  300 TON
L3       - 10,000 TON      - 1,000 TON
L4       - 20,000 TON      - 2,500 TON
L5       - 40,000 TON      - 5,000 TON

L6
To     - 5,00,000 TON    - 25,000 TON
L15

( Before Achieve 6th Reward.. Any Above 4 Level Must Be Achieved)

Skipped Non-Distributed Balance from Recycled TON Go To REWARD Club
And Distribute Among Achievers
Upto 25000 TON Global Rewards .

Achieve Once In Your Network & Earn From The Global Revenue . Every Joining Counts For Your REWARD.

Community Services , Ai Program , TON Chain Transaction , Promotions & Other Network Fee & Support , System Use 10% From  All Activations .

0% Withdraw fee ( Nil )

Let’s  Join  The Transparent & Amazing Opportunity With The Link Of Your Invitee , Start Earning TON From Global Network, Without Any Liability.

To Get Latest Updates , Follow The Official Telegram Channel 

@AiPROTON      
      `,
      pad,
    );
  }
  //
  else if (text.includes('🎖7 SPONSOR CLUB (7 Спонсорский клуб)')) {
    botSendMessage(
      user,
      `
When You Sponsor Total 7 Direct ( Start or Above Pack , and Self Also Start & Above Pack ) 
You Eligible For 
7 Sponsor Club Reward .

In This Club You Get 300% Value Reward 

Of Your Self Package Amount
At The Time Of Qualification Of 7th Sponsoring Club.

From Every Global 1-3rd sponsoring - 10% 
& From Every Global Sponsoring 4-6th - 5% 
This Revenue Comes In 7 Sponsor Club , And
Distribute Into Qualified Achievers of Club .
This Means If Any User Sponsor 7 Direct In His Tree,
( Start or Above Pack) 

Than He can eligible To Earn From Global Sponsoring 
upto 300% Value Of Their Pack.`,
    );
  }
  //
  else if (text.includes('TON Exchanges (ТОН биржи)')) {
    botSendMessage(user, `https://coinmarketcap.com/currencies/toncoin/markets/`);
  }
  //
  else if (text.includes('💰 Withdraw (Отзывать)') || isValidAddress(text)) {
    const percent = 1 / 100;
    const [withdraw, recycle] = p.getWithdrawRecyclePercentage(user);

    if (withdraw === 0) {
      botSendMessage(user, `You must be in 👼 BABY or a bigger plan to withdraw`);
      return;
    }

    const earnings = user.balance + user.earningsSuperStarPool + user.earnings7SponsorPool;
    const withdrawAmount = earnings * withdraw * percent;
    const recycleAmount = earnings * recycle * percent;

    if (withdrawAmount < MIN_WITHDRAW) {
      botSendMessage(
        user,
        `Can not withdraw. Your Referral Earnings + Pool Earnings are less than ${MIN_WITHDRAW} TON`,
        // `Sorry, Min withdraw is ${MIN_WITHDRAW} TON`,
        pad,
      );
      return;
    }

    const [, adminBalance] = await getBalance(adminAddress);
    if (adminBalance < withdrawAmount) {
      botSendMessage(user, `Please ask admin to open the withdraw`);
      const admin = await readBook({ userName: ADMIN });
      botSendMessage(admin, `A user is asking for withdraw: ${userName}`);
      return;
    }

    let withdrawWallet = text.split(' ')[1];
    if (!isValidAddress(text)) {
      botSendMessage(user, 'Please send TON deposit address');
      return;
    }

    withdrawWallet = text;

    botSendMessage(user, `Loading...`);

    const transferFromResult = await transferFrom(adminMnemonic, withdrawWallet, withdrawAmount);
    if (!transferFromResult.success) {
      botSendMessage(
        user,
        `Sorry, error in withdraw. Contact Support @AiProTONsupport. Forward this message. ${transferFromResult.message}`,
        pad,
      );
      return;
    }

    await recycleRewards(user, recycleAmount);
    await writeBook({ userName }, { balance: 0, earningsSuperStarPool: 0, earnings7SponsorPool: 0 });
    botSendMessage(user, `Successfully withdrawn ${withdrawAmount} TON to ${withdrawWallet}`);
  }
  //
  //
  // ADMIN FUNCTIONS
  else if (text.includes('🤵🏼‍♂️ Reward 7 Pool Members')) {
    if (!admins.includes(userName)) {
      botSendMessage(user, `Only admin can access this function`);
      return;
    }

    const usersOf7Pool = await readBooks({ status7SponsorPool: IN_POOL });
    if (usersOf7Pool.length === 0) {
      botSendMessage(user, `There are no 7 Pool Members`);
      return;
    }

    const pool = await readBook({ userName: _7_SPONSOR_POOL });
    const rewardPerUser = pool.balance / usersOf7Pool.length;
    if (rewardPerUser === 0) {
      botSendMessage(user, `Not enough funds in 7 Members in Pool`);
      return;
    }

    let backToPool = 0;
    for (let i = 0; i < usersOf7Pool.length; i++) {
      const user = usersOf7Pool[i];
      const { totalEarnings } = user;
      const newEarnings = user.earnings7SponsorPool + rewardPerUser;
      const maxEarnings = 2 * user.depositedFunds;
      if (newEarnings >= maxEarnings) {
        const excessAmount = newEarnings - maxEarnings;
        const givenAmount = maxEarnings - user.earnings7SponsorPool;
        backToPool += excessAmount;
        await writeBook(
          { userName },
          {
            earnings7SponsorPool: maxEarnings,
            status7SponsorPool: REMOVED_FROM_POOL,
            totalEarnings: totalEarnings + givenAmount,
          },
        );
      } else {
        await writeBook({ userName }, { earnings7SponsorPool: newEarnings });
      }
    }

    await writeBook({ userName: _7_SPONSOR_POOL }, { balance: backToPool });
    botSendMessage(
      user,
      `Successfully sent ${pool.balance - backToPool} TON to pool members remaining is ${backToPool} TON`,
      pad,
    );
  }
  //
  else if (text.includes('🦸‍♂️ Reward Super Star Pool Members')) {
    if (!admins.includes(userName)) {
      botSendMessage(user, `Only admins can access this function`);
      return;
    }

    const usersLevel1 = await readBooks({ level: 1 });
    const usersLevel2 = await readBooks({ level: 2 });
    const usersLevel3 = await readBooks({ level: 3 });
    const usersLevel4 = await readBooks({ level: 4 });
    const usersLevel5 = await readBooks({ level: 5 });
    const usersLevel6 = await readBooks({ level: 6 });

    const usersL1 = usersLevel1.length;
    const usersL2 = usersLevel2.length;
    const usersL3 = usersLevel3.length;
    const usersL4 = usersLevel4.length;
    const usersL5 = usersLevel5.length;
    const usersL6 = usersLevel6.length;

    const usersOfSuperStarPoolLength = usersL1 + usersL2 + usersL3 + usersL4 + usersL5 + usersL6;

    if (usersOfSuperStarPoolLength === 0) {
      botSendMessage(user, `There are no Super Star Pool Members`);
      return;
    }

    const pool = await readBook({ userName: SUPER_STAR_POOL });
    if (pool.balance === 0) {
      botSendMessage(user, `Not enough funds in Super Star Members in Pool`);
      return;
    }

    let rewardGiven = 0,
      backToPool = 0;
    if (usersL1 > 0) {
      const rewardPerLevel1 = 0.2 * pool.balance; // 20%
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
      const rewardPerLevel4 = 0.1 * pool.balance; // 10%
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
    if (usersL6 > 0) {
      const rewardPerLevel6 = 0.2 * pool.balance; // 20%
      rewardGiven += rewardPerLevel6;
      const rewardPerUserPerLevel6 = rewardPerLevel6 / usersL6;
      backToPool += await giveRewardEqually(usersLevel6, rewardPerUserPerLevel6);
    }

    const poolRemaining = pool.balance - rewardGiven + backToPool;
    await writeBook({ userName: SUPER_STAR_POOL }, { balance: poolRemaining });
    botSendMessage(
      user,
      `Sent successfully sent ${rewardGiven} TON to pool members, remaining in Pool ${poolRemaining} TON`,
      pad,
    );
  }
  //
  else if (text.includes('💳 Force Withdraw All Users')) {
    if (!admins.includes(userName)) {
      botSendMessage(user, `Only admins can access this function`);
      return;
    }

    botSendMessage(user, `Pending`);
    return;

    const withdrawWallet = 'abcd';
    const users = await readBooks({ balance: { $gte: MIN_WITHDRAW } });

    const percent = 1 / 100;
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const [withdraw, recycle] = p.getWithdrawRecyclePercentage(user);
      const earnings = user.balance + user.earningsSuperStarPool + user.earnings7SponsorPool;
      const withdrawAmount = earnings * withdraw * percent;
      const recycleAmount = earnings * recycle * percent;

      const transferFromResult = await transferFrom(adminMnemonic, withdrawWallet, withdrawAmount);
      if (!transferFromResult.success) {
        botSendMessage(
          user,
          `Sorry, error in withdraw. Contact Support @AiProTONsupport. Forward this message. ${transferFromResult.message}`,
          pad,
        );
        return;
      }

      await writeBook({ userName }, { balance: 0, earningsSuperStarPool: 0, earnings7SponsorPool: 0 });
      await recycleRewards(user, recycleAmount);

      botSendMessage(user, `Withdraw done for ${i}/${users.length}, ${user.userName}`);
    }

    botSendMessage(user, 'Success Force Withdraw All Users');
  }
  //
  else if (text.includes('🎥 Send Media to Users')) {
    if (!admins.includes(userName)) {
      botSendMessage(user, `Only admins can access this function`);
      return;
    }
    SEND_MEDIA = 1;
    botSendMessage(user, '🎥 Please send text / image / video here to send to all users');
  }
  //
  else if (text.includes('All Users Names')) {
    if (!admins.includes(userName)) {
      botSendMessage(user, `Only admins can access this function`);
      return;
    }
    const users = await readBooks(); // see all users
    let userNames = [];
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      if (user.userName === '7_SPONSOR_POOL' || user.userName === 'SUPER_STAR_POOL') continue;
      userNames.push(user.userName);
    }
    botSendMessage(user, `${userNames}`);
  }
  //
  else if (text.includes('📊 System Stats')) {
    if (!admins.includes(userName)) {
      botSendMessage(user, `Only admins can access this function`);
      return;
    }
    let admin = await readBook({ userName: ADMIN });
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
    const usersLevel6 = await readBooks({ level: 6 });

    const usersL1 = usersLevel1.length;
    const usersL2 = usersLevel2.length;
    const usersL3 = usersLevel3.length;
    const usersL4 = usersLevel4.length;
    const usersL5 = usersLevel5.length;
    const usersL6 = usersLevel6.length;

    const [, tonDepositOnTon] = await getBalance(adminAddress);
    const balanceOfTonOnEth = await getBalanceOfTonOnEth(adminAddressEth);
    const balanceOfTonOnBnb = await getBalanceOfTonOnBnb(adminAddressEth);

    botSendMessage(
      user,
      `1. Total Users in System - ${totalUsers}

2. Balance In TONChain Wallet - ${tonDepositOnTon} TON

3. Balance In Metamask Wallet - BSC: ${balanceOfTonOnBnb} TON, ETH: ${balanceOfTonOnEth} TON

4. Total Instant Payout Distributed - ${admin.totalEarnings}

5. Fund Value Current For 7 Sponsor Club - ${__7_SPONSOR_POOL.balance}

6. Fund Value Current For Reward Club - ${_SUPER_STAR_POOL.balance}

7. Fund Value History For 7 Sponsor Club - ${__7_SPONSOR_POOL.totalEarnings}

8. Fund Value History For Reward Club - ${_SUPER_STAR_POOL.totalEarnings}

9. User Level Count in System -
    Users Level 1 - ${usersL1} TON
    Users Level 2 - ${usersL2} TON
    Users Level 3 - ${usersL3} TON
    Users Level 4 - ${usersL4} TON
    Users Level 5 - ${usersL5} TON
    Users Level 6-15 - ${usersL6} TON
      `,
      pad,
    );
  }
  // bot does not understand message
  else {
    if (admins.includes(userName)) {
      botSendMessage(user, `Hi Admin ${userName}`);
      return;
    }

    botSendMessage(user, `Hi ${userName}`);
  }
};

const giveRewardEqually = async (users, rewardPerUser) => {
  let backToPool = 0;

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const { userName, earningsSuperStarPool, totalEarnings } = user;

    const userLevel = p.getLevel(user);
    const userMaxEarnings = p.levelMaxEarnings[userLevel];

    console.log({ userLevel, maxEarnings: userMaxEarnings, forDebug: true });

    const newEarnings = earningsSuperStarPool + rewardPerUser;
    if (newEarnings >= userMaxEarnings) {
      const excessAmount = newEarnings - userMaxEarnings;
      const givenAmount = userMaxEarnings - earningsSuperStarPool;
      backToPool += excessAmount;
      await writeBook(
        { userName },
        {
          earningsSuperStarPool: userMaxEarnings,
          totalEarnings: totalEarnings + givenAmount,
        },
      );
    } else {
      await writeBook(
        { userName },
        {
          earningsSuperStarPool: newEarnings,
          totalEarnings: totalEarnings + rewardPerUser,
        },
      );
    }
  }

  return backToPool;
};

const deposit = async (user, depositedFunds, userName) => {
  if (!user.parent) {
    botSendMessage(user, 'You should not deposit funds');
    return;
  }

  await writeBook({ userName }, { depositedFunds: user.depositedFunds + depositedFunds });
  user = await readBook({ userName });

  const percent = depositedFunds / 100;
  // NONE OR BABY PLAN, give all balance to admin, if admin then send admins balance to admins deposit
  if (p.getPlanNumber(user) < p.BABY) {
    await writeBook(
      { userName: ADMIN },
      {
        balance: admin.balance + 100 * percent,
        totalEarnings: admin.totalEarnings + 100 * percent,
      },
    );
    botSendMessage(admin, `100% goes to admin, ${user.userName} deposited  ${depositedFunds} TON`);
    return; //  <---------------------<
  }

  let parentEarnings;
  let adminEarnings;
  let _7SponsorPoolEarnings;

  let remaining = 100; // percent

  let userParent = await readBook({ userName: user.parent });

  // Calculate Rewards
  // 1 to 3
  if (userParent.childPaying.length <= p.REFERRERS_LIMIT_1) {
    parentEarnings = 10;
    adminEarnings = 5;
    _7SponsorPoolEarnings = 5;
  }
  // 4 to 6
  else if (userParent.childPaying.length <= p.REFERRERS_LIMIT_2) {
    parentEarnings = 15;
    adminEarnings = 2.5;
    _7SponsorPoolEarnings = 2.5;
  }
  // 7 or more child paying
  else {
    parentEarnings = 20;
    adminEarnings = 0;
    _7SponsorPoolEarnings = 0;
  }

  // Give Rewards
  const rewardAdmin = adminEarnings !== 0;
  if (rewardAdmin) {
    remaining -= adminEarnings;

    let admin = await readBook({ userName: ADMIN });
    await writeBook(
      { userName: ADMIN },
      {
        balance: admin.balance + adminEarnings * percent,
        totalEarnings: admin.totalEarnings + adminEarnings * percent,
      },
    );
  }

  const reward7SponsorPool = _7SponsorPoolEarnings !== 0;
  if (reward7SponsorPool) {
    remaining -= _7SponsorPoolEarnings;

    let pool = await readBook({ userName: _7_SPONSOR_POOL });
    await writeBook(
      { userName: _7_SPONSOR_POOL },
      {
        balance: pool.balance + _7SponsorPoolEarnings * percent,
        totalEarnings: pool.totalEarnings + _7SponsorPoolEarnings * percent,
      },
    );
  }

  // Update child paying user names list of user's parent
  if (!userParent.childPaying.includes(userName)) {
    await writeBook({ userName: userParent.userName }, { childPaying: [...userParent.childPaying, userName] });
  }

  console.log({ remainingSending: remaining });

  // give reward till level 6, 9, 12, 15
  for (let level = 1; level <= 15; level++) {
    // maintain data for Super Star Pool
    if (level <= 5) {
      const newUserParent = {};
      newUserParent[`level${level}ChildPaying`] = userParent[`level${level}ChildPaying`] + depositedFunds;
      await writeBook({ userName: userParent.userName }, newUserParent);
      userParent = await readBook({ userName: userParent.userName });
      const newLevel = p.getLevel(userParent);
      newLevel > userParent.level && (await writeBook({ userName: userParent.userName }, { level: newLevel }));
    }

    const unlockedLevels = p.getRewardLevelsUnlocked(userParent);
    // Reward to up line, reward 5% upto 15 levels
    if ((level === 1 && p.getPlanNumber(userParent) >= p.BABY) || !userParent.parent) {
      remaining -= parentEarnings;
      await writeBook(
        { userName: userParent.userName },
        {
          balance: userParent.balance + parentEarnings * percent,
          totalEarnings: userParent.totalEarnings + parentEarnings * percent,
        },
      );
      botSendMessage(userParent, `You have earned ${parentEarnings * percent} TON from deposit of ${userName}`);
    } else if (level <= p.getRewardLevelsUnlocked(userParent) || !userParent.parent) {
      remaining -= 5; // percent
      await writeBook(
        { userName: userParent.userName },
        { balance: userParent.balance + 5 * percent, totalEarnings: userParent.totalEarnings + 5 * percent },
      );
      botSendMessage(userParent, `You have earned ${5 * percent} TON from deposit of ${userName}`);
    } else {
      botSendMessage(
        userParent,
        `${userName} deposited ${depositedFunds} TON, ${level} level below you, You get commissions ${unlockedLevels} levels below you. Upgrade your pack to earn more commissions.`,
      );
    }

    console.log({ parent: userParent.userName, remaining });
    if (!userParent.parent) break;
    userParent = await readBook({ userName: userParent.parent });
  }

  // send remaining funds to admin
  const admin = await readBook({ userName: ADMIN });
  await writeBook(
    { userName: ADMIN },
    {
      balance: admin.balance + remaining * percent,
      totalEarnings: admin.totalEarnings + remaining * percent,
    },
  );
  botSendMessage(admin, `${admin.userName} earned ${remaining * percent} TON from deposit of ${userName}`);
};

const recycleRewards = async (user, recycleAmount) => {
  if (recycleAmount === 0) return;
  if (!user.parent) {
    botSendMessage(user, `Admin can not recycle`);
    return;
  }

  let remaining = 100; // percent
  const percent = recycleAmount / 100;

  // give reward till level 15
  let userParent = await readBook({ userName: user.parent });
  for (let level = 1; level <= 15; level++) {
    const reward = p.getRecycleRewardLevelPercentage(userParent);
    remaining -= reward;
    console.log({ level, remaining });
    await writeBook(
      { userName: userParent.userName },
      { balance: userParent.balance + reward * percent, totalEarnings: userParent.totalEarnings + reward * percent },
    );

    if (!userParent.parent) break;
    userParent = await readBook({ userName: userParent.parent });
  }

  let admin = await readBook({ userName: ADMIN });
  await writeBook(
    { userName: ADMIN },
    {
      balance: admin.balance + 0.5 * remaining * percent,
      totalEarnings: admin.totalEarnings + 0.5 * remaining * percent,
    },
  ); // 50% of remaining

  let pool = await readBook({ userName: SUPER_STAR_POOL });
  await writeBook(
    { userName: SUPER_STAR_POOL },
    {
      balance: pool.balance + 0.5 * remaining * percent,
      totalEarnings: pool.totalEarnings + 0.5 * remaining * percent,
    },
  ); // 50% of remaining
};

const sendToAllUsers = async (func, data) => {
  let users = await readBooks({});
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    console.log(user.chatId === null, user.chatId == null, user.chatId, user.userName);
    user.chatId && bot[func](user.chatId, data);
  }
};

const exists = (user) => {
  return user !== undefined;
};

const seedDB = async () => {
  botName = (await bot.getMe()).username;

  let user = await readBook({ userName: 'ariful028' });

  if (!exists(user)) {
    console.log('db used first time');
    if (!process.env.APP_IN_TESTING_MODE) {
      await writeBook(
        { userName: 'ariful028' },
        {
          chatId: '2012374195',
          publicKey: 'EQBFwOmgDAzmVCjEu6xL1k2V6VnQY985w16LFjn-ZXg4thjw',
          mnemonic:
            'matter dutch open gossip calm analyst trap globe cute aspect escape retreat seat roast daring merge panic guide picnic dash grace word admit borrow',
          parent: ADMIN,
        },
      );
      await writeBook(
        { userName: 'luiz3948' },
        {
          chatId: '631481221',
          publicKey: 'EQAvPKUqGEBBo0Sg3UUTfCEoYHuRBowH795bR0rnCD-KVAN1',
          mnemonic:
            'able ceiling man funny demise boil logic enter bitter include sing goat major supply fork verify sock rather grass ozone okay elevator cruise lunar',
          parent: ADMIN,
        },
      );
      await writeBook(
        { userName: 'Defilove' },
        {
          chatId: '1122338568',
          publicKey: 'EQDr_CdnjQJ2NscDE0jPNYFU12ryPZsa6XzFhFuYSXDBUenl',
          mnemonic:
            'produce science rhythm mask first bitter anxiety garden disagree peasant tool youth purity foot scale replace cage artwork bridge vapor absurd payment tomato frozen',
          parent: 'ODSTech',
        },
      );
    }
  } else {
    console.log('db used second or more times');
  }
  console.log('Bot started ' + new Date());
};

const botSendMessage = (user, msg, pad) => {
  if (!pad) {
    pad = admins.includes(user.userName) ? padAdmin : padSimple;
    if (user.userName === dev) pad = padDev;
  }

  // user.userName !== dev && readBook({ userName: dev }).then((user) => user && bot.sendMessage(user.chatId, `<b>${msg}</b>`, pad));

  if (!user.language || user.language.toLowerCase() === 'english') {
    bot.sendMessage(user.chatId, `<b>${msg}</b>`, pad);
    return;
  }

  translate(msg, { to: user.language })
    .then((translation) => {
      bot.sendMessage(user.chatId, `<b>${translation}</b>`, pad);
    })
    .catch((err) => {
      bot.sendMessage(user.chatId, `<b>${msg}</b>`, pad);
    });
};

const getUserChild = async (user) => {
  let children = [];
  for (let i = 0; i < user.child.length; i++) {
    const child = user.child[i];
    children.push(await readBook({ userName: child }));
  }
  return children;
};

seedDB().then(async () => {
  bot.on('message', onMessage);

  {
    const user = await readBook({ userName: support });
    if (user) botSendMessage(user, 'bot deployed ');
  }

  {
    const user = await readBook({ userName: dev });
    if (user) botSendMessage(user, 'bot deployed ');
  }
});
