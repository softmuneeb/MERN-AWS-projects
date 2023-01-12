require('dotenv').config();
const dbLink = process.env.DB_LINK;
const dbName = 'UserData';
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    default: null,
  },
  balance: {
    type: Number,
    default: 0,
  },
  age: {
    type: Number,
    default: 12,
  },
});
const User = new mongoose.model(dbName, UserSchema);
mongoose.connect(dbLink, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const readBook = async (user) => {
  let readResponse = await User.find(user);
  return readResponse[0];
};

const writeBook = async (user, newUserState) => {
  let responseRead = await readBook(user);

  if (!responseRead) {
    await User.create({ ...user, ...newUserState });
    return;
  }

  await User.updateOne(user, newUserState);
};

(async () => {
  const userName = 'Muneeb';
  await writeBook({ userName }, { balance: 13 });

  const user = await readBook({ userName });
  console.log(user.userName, user.balance);
})();

module.exports = { readBook, writeBook };
