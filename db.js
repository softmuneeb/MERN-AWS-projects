const dbLink = 'mongodb+srv://User123:pakistan0047@verysmallcluster.gq04lby.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'UserModel37';

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

  if (response === undefined) {
    response = await User.create({ userName: user.userName });
  }

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
  const Todo = new mongoose.model(dbName, UserSchema);
  mongoose.connect(dbLink, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const response = await Todo.updateOne(user, newUserState);
  // await mongoose.connection.close();
  // console.log({ response });
  console.log({ responseModifiedCount: response.modifiedCount });
  return response;
};

// Driver Code
// (async () => {
//   const user = await readBook({ chatId: '1672843321______qqqq1' });
//   console.log({ user });

//   await writeBook({ chatId: user.chatId }, { balance: '11' });

//   const user2 = await readBook({ chatId: user.chatId });
//   console.log({ user2 });
// })();

module.exports = { readBook, writeBook, readBookMany };
