const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const UserSchema = new mongoose.Schema({
  chatId: {
    type: String,
  },
  balance: {
    type: String,
  },
  publicKey: {
    type: String,
  },
  mnemonic: {
    type: String,
  },
  date: { type: Number, default: new Date() },
});

const readBook = async (user) => {
  const User = new mongoose.model('UserModel', UserSchema);

  mongoose.connect('mongodb+srv://User123:pakistan0047@verysmallcluster.gq04lby.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  let response = await User.find(user);

  if (response.length === 0) {
    response = await User.create({ chatId: user.chatId, mnemonic: '0', publicKey: '0', balance: '0' });
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

// (async () => {
//   const [data] = await readBook({ chatId: '1672843321' });
//   console.log({ data });
//   await writeBook({ chatId: data.chatId }, { balance: '11' });
// })();

module.exports = { readBook, writeBook };
