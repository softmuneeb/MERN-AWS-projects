require('dotenv').config();
const dbLink = process.env.DB_LINK;
const dbName = process.env.DB_NAME;

// const dbLink = 'mongodb+srv://User123:pakistan0047@verysmallcluster.gq04lby.mongodb.net/?retryWrites=true&w=majority';
// const dbName = 'UserModel51';

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

const readBook = async (user) => {
  const User = new mongoose.model(dbName, UserSchema);
  mongoose.connect(dbLink, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  let [response] = await User.find(user);

  // if (response === undefined) {
  //   response = await User.create({ userName: user.userName });
  // }

  return response;
};

const readBookMany = async (user) => {
  const User = new mongoose.model(dbName, UserSchema);
  mongoose.connect(dbLink, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  let response = await User.find(user);

  if (response === undefined) {
    response = [];
  }

  return response;
};

const writeBook = async (user, newUserState) => {
  const User = new mongoose.model(dbName, UserSchema);
  mongoose.connect(dbLink, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  let [responseRead] = await User.find(user);
  if (responseRead === undefined) {
    const responseCreate = await User.create(user, newUserState);
    console.log({ responseCreate, newUserState });
  } else {
    const responseUpdate = await User.updateOne(user, newUserState);
    console.log({ responseUpdate, newUserState });
  }

  // await mongoose.connection.close();
  // console.log({ dbModifiedCount: response.modifiedCount, newUserState });
  // return response;
};

// Driver Code
(async () => {
  const chatId = '1672843321______qqqq2';

  const user = await readBook({ chatId });
  console.log({ user });

  await writeBook({ chatId }, { chatId, balance: '11' });

  const user2 = await readBook({ chatId });
  console.log({ user2 });
})();

module.exports = { readBook, writeBook, readBookMany };
