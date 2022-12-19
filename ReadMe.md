WHATSAPP ME +923348438939
CAN NOT UNDERSTAND CODE?

Critical:
// TODO: correct the logic balance + nonce OR tx + last updated
// TODO: minus the balance upon withdrawal
// TODO: test it saparately also... 0.05 TON tx fee, 0.2 TON -> 0.1 TON (after tx fee cut)

// TODO: script to regularly calculate funds inside system vs funds on blockchain !!!!
// TODO: if users go to 1000, or Millions then any problem in loop?...
// TODO: add in DB that TON left from system

// DONE: only admin can access this function

Nice to do:

// TODO: Coding JS, And write calls at the end of the functions...
// TODO: ENHANCE SPEED TO REPLY / RUN MONGO LOCAL
// TODO: it should come from env
// TODO: optimize database read writes...

Optional:

Dont understand:
// TODO: user.balance -> user.referralEarnings, user.sevenStartPoolEarnings, user.recycleEarnings,
// TODO: if address is invalid tell users

Make video to explain code... how to use bot, how to add fetaure? remove, update.









// old user: if balance updated then update rewards up in the chain and also update balance deposited
    // new user: ------> with refer
    //         |-------> without refer
    //
    //
    // show stats saved in db to telegram user



// Show invite link to new user or not?
// or if he invites some he does not get the reward?

Road blocks:
* many /start at a time cause problem
* transactions get balance get
* 

// namaz pending and you are working = no barkat in this work

arrange read me file... backlog...
// break big problem in small ones is an art...

// make code pure...
// make the things saparately as unit functions then integrate them
// in this way I can spit work in developers and complete the work <-FAST-
// all have to agree on interfaces, inputs and outputs and expected time of each function
// functions should be stateless, pure, in-dependant etc

transferFromOnChain(from, to, amount) -> true or false with message
fundsTransferOffChain(to, amount) -> true or false with message
fundsTransferOffChainToParents(N, getPercentage: (p, level)=>{use p.depositedFunds} ) -> true or false with message

getPercentageForRecycle: p.depositedFunds
getPercentageForReferral: 5% * level > level(p.depositedFunds)

userSchema : {
  balance,
  ...
}

fundsTransferOffChainSuperClub()
.....


Buttons Menu
Level Show
My team

Withdraw
Upgrade
Recycle

About

User & Admin Dashboard:
My Wallet
My Referral Link
All Required Data

Admin Sends Video/Media to all users...










      // TODO: call the /start for the referrer here! :) // test and move it to readme





Progress:
* print 14 parents
// send deposited money to ADMIN WALLET
// add % to people balances 15 levels up
// TODO: if someone comes direct in bot, make sheikhu his default parent. for code to work proper.
// check balance increased? we can transfer funds later to admin wallet
// if yes the give rewards
// show user stats
// TODO: can do later admin runs 1 script and all money is transferred to main wallet, or monthly run with withdraw...
// transferFrom(user.mnemonic, adminAddress, balanceNano);
// TODO: refresh DB to avoid chain recursion
// TODO: child: [...user.child, userName]
// create referrals chain
// TODO: if referrer not found or undefined then register new user under first user in system
// recycle pool distribution
// await writeBook({ userName: user.parent }, {balance: getBalance(userParent.mnemonic)+ balance * userParent.plan * percent}); // userParent.plan for START is 2%, WALK 3%, RUN 4%, FLY 5%


TODO: show user name to user on start
// invitelink userId
// db identifier chatId
// on very fast /start error solve

// db backups every 5 min...
// api server if goes down then ...

doing:
* distribute profit 15 levels up (note down in db, give from company wallet...)
* send deposited money to ADMIN WALLET
* add % to people balances 15 levels up, 10% TO refferer, 2% to 5% to 15 levels up.



8 9 50 5

7 6 25 0

6 6 25 5
5 6 25 5
4 6 25 5

3 6 25 5
2 6 25 5 
1 6 25 10

50 5%

25 0 percent <---- test case

25 5%
25 5%
25 5%

25 5%
25 5% 
25 10%

25 joined



50 5%

25 0 percent <---- test case

25 5%
25 5%
25 5%

25 5%
25 5% 
25 10%

25 joined

// if (level < planNumber(user)) {}



MLM Questions:

* YES, in case if starts from 5 TON, First withdraw starts at 25 TON+ package START, Upgrade 100% on 5 TON..
* When person deposit % goes to Upgrade Pool, Upgrade Pool only use to monthly upgrade people
* When person deposit % goes to Recycle Pool, Recycle Pool only used to give monthly profit to people

pool 1, 10 bacha ra on every join, 50% goes to company, 50% to 7 direct people pool
pool 2, 10 bacha ra, 50% goes to company, 50% to 5 rank people
pool 3, recycle pool ki bach rai 25% - 30%, to reward club

A person deposit 25 TON

    25 TON
  -2.5 TON  (10%) go to the referrer
 -1.25 TON  (5%) 1.25 goes to ADMIN WALLET 1
 -1.25 TON  (5%) 1.25 goes to ADMIN WALLET 2
 -1.25 TON  (5%) goes to Upgrade Pool
-----------------------------------------
= 18.75 TON is the balance of the user?
-----------------------------------------

* If this user upgrades, 70% goes to user upgrade khata and 30% goes to Recycle Pool. 70% and 30% are 18.75 TON?

* If this user withdraws, 10% goes to ADMIN WALLET 1, 40% goes to user wallet and 60% goes to Recycle Pool. 10, 40 and 60 are of 18.75 TON?
* 10 + 30 + 60 ? OR 10 + 40 + 50 ?

* Person wi
* FLY 500$, what will happen to that upgrade system. Auto & manual.
* Referral links will not generated for people at level 15.

Useful extra features:
* Admin can see how many TON are in Upgrade Pool
* Admin can see how much TON are in Recycle Pool
* Admin can see how many people are in the system
* Admin can see how much people are in Level 1, 2, 3, ….
* Any one can see much people are under him at Level 1, 2, 3, ….





















Done:
* Referring module basics done
* Deposit Wallets generate module done
* Showing balance to user
(add DB) https://mongoosejs.com/docs/queries.html
* Currently system works for 1 user, now I will make it for any number of users
* Making chains of referrers
* get public address from mnemonic 1, 2
* send TON from wallet 1 to wallet
* In bot send the address to receive TON. 
* After receiving TON. note down the balance of the person in DB.

Todo:
* MLM Logic
* Upgrade Method for user
* Withdraw Method for user
* Making Pool 1
* Make Pool 2
* Withdraw Method for user
* Admin force withdraw but TON (so admin can do a force withdraw after month)
* Super Heros logic
* Commands Panel like /invest /plan /wallet /refer etc










Write full steps from start to end, respective to a normal user of this system.
...

Make best case flow:
* Upgrade Level System, add 25 TON level 1 -> again add 25 TON You level is 2...
* pend MLM Logic Module 20% goes to ...
* REFERRING CONDItions ...
* 

Later:
* User name not exists? use chatid to store and name to display...
* Image send
* Keyboard commands


PLAN, TON MLM SYSTEM SCHEME:

Telegram MLM Project Modules:
• done 3 hr base + 3 hr phasa Database to store referrals tree
• done 2 hr Deposit Wallets generate module
• partDone Telegram Bot Module 
• pend Payment Tracker Module

General:
* Clean the code, use functions at one place...

Progress MLM System in Telegram 

Done:
* Referring module basics done
* Deposit Wallets generate module done
* Showing balance to user
(add DB) https://mongoosejs.com/docs/queries.html
* Currently system works for 1 user, now I will make it for any number of users
* Making chains of referrers

Upcoming today:
* Upgrade Method for user
* Making Pool 1

Tomorrow:
* Withdraw Method for user
* Admin force withdraw butTON (so admin can do a force withdraw after month)
* Super Heros logic
* Make Pool 2
* Commands Panel like /invest /plan /wallet /refer etc

Later:
* Add option to deposit ETH, USDT, USDC and other networks like Binance


ROAD BLOCK 2. payment confirmation in code... 


1hr TON SEND and RECEIVE module, fee used to send TON, ...:
    0. get public address from mnemonic 1, 2
    1. send TON from wallet 1 to wallet

MLM Basic System:
    1. In bot send the address to receive TON. 
    2. After receiving TON. note down the balance of the person in DB.
    3. if referrer exists, 10% goes to pool 1, 10% go to referrer if exists
    4. if referrer not exists, 20% goes to pool 1
    5. person can withdraw 30% and 70% goes to pool 2

Next Advanced Requirements:
    1. ...pool 1 distribution
    2. ...pool 2 distribution rule
    3. ...super power club



Later TODO:

* Commands Add

* start stop bot may change chat id
* get balance from public key only, not from pv key

Model.deleteMany()
Model.deleteOne()
Model.find()
Model.findById()
Model.findByIdAndDelete()
Model.findByIdAndRemove()
Model.findByIdAndUpdate()
Model.findOne()
Model.findOneAndDelete()
Model.findOneAndRemove()
Model.findOneAndReplace()
Model.findOneAndUpdate()
Model.replaceOne()
Model.updateMany()
Model.updateOne()

Output 6.31pm sat dec 3 2022:
node mlm-backend.js
secret key: d375852d4ca7655874ff3d6acc84ecf400aa97868850de447c7d2331d7944360176c1dfa911d866384e13d8ec5615b04c67ce7c842b067547f1c3bf7b79fc35b
public key: 176c1dfa911d866384e13d8ec5615b04c67ce7c842b067547f1c3bf7b79fc35b
wallet versions: simpleR1,simpleR2,simpleR3,v2R1,v2R2,v3R1,v3R2,v4R1,v4R2
seqno: 0
{
  address: '0:c591edde904790bd7162633bb964ae89714e8525cba8c370515f79007ac4b2e1'
}


node mlm-backend.js
secret key: d375852d4ca7655874ff3d6acc84ecf400aa97868850de447c7d2331d7944360176c1dfa911d866384e13d8ec5615b04c67ce7c842b067547f1c3bf7b79fc35b
public key: 176c1dfa911d866384e13d8ec5615b04c67ce7c842b067547f1c3bf7b79fc35b
wallet versions: simpleR1,simpleR2,simpleR3,v2R1,v2R2,v3R1,v3R2,v4R1,v4R2
seqno: 0
{
  v: 'simpleR2',
  address: 'EQBETkstSCREk9zoRLPdHeQG447JKXjfi2YHYf-XIfBFrKQn'
}
seqno: 0
{
  v: 'v4R2',
  address: 'EQDFke3ekEeQvXFiYzu5ZK6JcU6FJcuow3BRX3kAesSy4SBi'
}
seqno: 0
{
  v: 'simpleR3',
  address: 'EQBTFhEKJKcAKwPzGs5V-94FccEDwYcgoG9vzkz0QIjKLTS1'
}
seqno: 0
{
  v: 'v2R1',
  address: 'EQB4FBkXh8z7s67p2Z2qMd65v0-iG0J5eoAmrc42HYdABoyT'
}
seqno: 0
{
  v: 'v3R2',
  address: 'EQAsby8THtByrEum-YfD6FjTAFvausrxmbTK0Zox50l76wG2'
}
seqno: 0
{
  v: 'simpleR1',
  address: 'EQAbuhZwJZDvdqZeckZC7u1AV9mqsjzF5RfxQDlJI6R3yVtp'
}
seqno: 0
{
  v: 'v2R2',
  address: 'EQCLIcCqHiMwXGmAQ_cEp4rP8_MZjhwVTIEya_yYcLl8eSDg'
}
seqno: 0
{
  v: 'v3R1',
  address: 'EQACreKsXgeZW9ZzwbP9jUxeh5OYGSMOnwTSyEwOGIj2DIKQ'
}
seqno: 0
{
  v: 'v4R1',
  address: 'EQDzk7gq05ZoikzELNGz6ocx58g8Cn_zjJAToBmx1paRkTVa'
}


// Store

  if (msg.text === 'invest') {
    bot.sendMessage(chatId, 'Please send 0.25 TON to this address to invest in MLM ' + user.address);
  } else


 // on each level check their plan deposited amounts...
  // level 1 done above, now we go level 2 to 15 levels up

  console.log('parents start:');
  console.log({ i: 1, userParent: userParent.userName });
    // TODO: can not understand code? whatsapp me +923348438939
    // give reward on level 6, 9, 12, 15
    console.log({ i: level, userParent: userParent.userName });
  console.log('parents end:');
bot.sendMessage(
      chatId,
      `${user.userName} has earned ${user.balance} TON
Deposited Funds ${depositedFunds} TON
Your plan ${p.planName(user)}
${parent}
${child}
Invite link: https://t.me/sheikhu_bot?start=${user.userName}
TON deposit address:
\`${publicKey}\``,
      { ...pad, parse_mode: 'Markdown' },
    );

    // send msg after 100 ms, just to confirm it reaches after 1st message
    // setTimeout(() => bot.sendMessage(chatId, '`' + publicKey + '`', pad), 100);
    // show user info
    // show stats saved in db to telegram user
