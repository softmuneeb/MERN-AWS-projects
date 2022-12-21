require('dotenv').config();
const dbLink = process.env.DB_LINK;
const dbName = 'UserModel_83'; //+ Date.now();
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const UserSchema = new mongoose.Schema({
  chatId: {
    type: String,
    default: null,
  },
  userName: {
    type: String,
    default: null,
    unique: true,
    required: true,
  },
  isIn7SponsorPool: {
    type: Number,
    default: 0, // 0 not added to pool, 1 added to pool, 2 removed from pool and he can not enter again
  },
  earnings7SponsorPool: {
    type: Number,
    default: 0, // if earnings go 2x of depositedFunds then person is removed from pool and can not enter gain
  },
  depositedFunds: {
    // decides plan of user is START, WALK, RUN or FLY
    type: Number,
    default: 0,
  },
  balance: {
    // referral earnings
    type: Number,
    default: 0,
  },
  publicKey: {
    type: String,
    default: null,
  },
  mnemonic: {
    type: String,
    default: null,
  },
  parent: {
    type: String, // chatId of the person who referred me
    default: null,
  },
  child: {
    type: [], // chatId of the people I am bringing into the system
    default: [],
  },
  childPaying: {
    type: [], // chatId of the people I am bringing into the system and they deposited money
    default: [],
  },
  date: { type: Number, default: new Date() },
});
const User = new mongoose.model(dbName, UserSchema);
mongoose.connect(dbLink, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const readBook = async (user) => {
  let response = await User.find(user);
  if (response.length > 1) {
    console.log('problem, ', response); //only 1 user must be there with a userName
  }
  return response[0];
};

const readBooks = async (user) => {
  let response = await User.find(user);
  if (response.length < 3) {
    console.log('problem, ', response); //admin,pool1,pool2
  }
  if (response === undefined) {
    response = [];
  }
  return response;
};

const writeBook = async (user, newUserState) => {
  // only create a user if he does not exist, do not create a duplicate userName
  let responseRead = await readBook(user);
  if (!responseRead) {
    const responseCreate = await User.create(newUserState);
    // console.log({ responseCreate, newUserState });
  } else {
    const responseUpdate = await User.updateOne(user, newUserState);
    // console.log({ responseUpdate, newUserState });
  }
};
// Driver Code
(async () => {
  // await User.deleteMany({}); /// TODO: destructive line MUST DELETE BEFORE LAUNCH...
  // let r;
  // r = await User.create({ userName: 'Jean-Luc Picard' });
  // console.log({ r });
  // r = await User.exists({ userName: /picard/i }); // { _id: ... }
  // console.log({ r });
  // r = await User.exists({ userName: /riker/i }); // null
  // console.log({ r });
  // r = await writeBook({ userName }, { userName, balance: '11' });
  // console.log({ r });
  // const users = await readBooks({});
  // console.log({ users: users.length });

  // const userName = '__________3';
  // let user = await readBook({ userName });

  // if (!user) {
  //   await writeBook({ userName }, { userName, balance: 10 });
  //   user = await readBook({ userName });
  // }

  // console.log({ user });
})();

module.exports = { readBook, writeBook, readBooks };
