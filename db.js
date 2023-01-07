require('dotenv').config();
const dbLink = process.env.DB_LINK;
const dbName = 'UserData';
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    default: null,
    unique: true,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
});
const User = new mongoose.model(dbName, UserSchema);
mongoose.connect(dbLink, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const readBook = async (user) => {
  let readResponse = await User.find(user);
  return readResponse;
};

const writeBook = async (user, newUserState) => {
  let responseRead = await readBook(user);
  if (!responseRead) {
    const responseCreate = await User.create({ ...user, ...newUserState });
    // console.log({ responseCreate, newUserState });
  } else {
    const responseUpdate = await User.updateOne(user, newUserState);
    // console.log({ responseUpdate, newUserState });
  }
};

(async () => {
  const userName = 'Muneeb';
  await writeBook({ userName }, { balance: '11' });

  // const user = await readBook({ userName });
  // console.log({ user });
})();

module.exports = { readBook, writeBook };
