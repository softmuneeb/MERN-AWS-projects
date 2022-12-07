Write full steps from start to end, respective to a normal user of this system.
...

PLAN, TON MLM SYSTEM SCHEME:

Telegram MLM Project Modules:
• done 3 hr base + 3 hr phasa Database to store referrals tree
• done 2 hr Deposit Wallets generate module
• partDone Telegram Bot Module 
• pend Payment Tracker Module
• pend MLM Logic Module

Progress MLM System in Telegram 

Done:
* Referring module basics done
* Deposit Wallets generate module done
* Showing balance to user

Upcoming today:
(add DB) https://mongoosejs.com/docs/queries.html
* Currently system works for 1 user, now I will make it for any number of users
* Making chains of referrers
* Upgrade Method for user
* Making Pool 1

Tomorrow:
* Commands Panel like /invest /plan /wallet /refer etc
* Withdraw Method for user
* Make Pool 2
* Admin force withdraw button (so admin can do a force withdraw after month)
* Super Heros logic

Later:
* Add option to deposit ETH, USDT, USDC and other networks like Binance


1hr TON SEND and RECEIVE module, fee used to send ton, ...:
    0. get public address from mnemonic 1, 2
    1. send TON from wallet 1 to wallet
    ROAD BLOCK 2. payment confirmation in code... 

MLM Basic System:
    1. In bot send the address to receive ton. 
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