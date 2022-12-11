const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const UserSchema = new mongoose.Schema({
  chatId: {
    type: String,
    default: '0',
  },
  userName: {
    type: String,
    default: '0',
  },
  balance: {
    type: String,
    default: '0',
  },
  upgradeBalance: {
    type: String,
    default: '0',
  },
  publicKey: {
    type: String,
    default: '0',
  },
  mnemonic: {
    type: String,
    default: '0',
  },
  parent: {
    type: String, // chatId of the person who referred me
    default: '0',
  },
  child: {
    type: [], // chatId of the people I am bringing into the system
    default: [],
  },
  date: { type: Number, default: new Date() },
});

const readBook = async (user) => {
  const User = new mongoose.model('UserModel', UserSchema);

  mongoose.connect('mongodb+srv://User123:pakistan0047@verysmallcluster.gq04lby.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  let [response] = await User.find(user);

  if (response === undefined) {
    response = await User.create({ userName: user.userName });
  }

  return response;
};

const writeBook = async (user, newUserState) => {
  const Todo = new mongoose.model('UserModel', UserSchema);
  mongoose.connect('mongodb+srv://User123:pakistan0047@verysmallcluster.gq04lby.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const response = await Todo.updateOne(user, newUserState);
  // await mongoose.connection.close();
  console.log({ response });
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

module.exports = { readBook, writeBook };
