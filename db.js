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
  depositedFundsEth: {
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

const depositFunds = async (userName, depositAmount) => {
  const user = await readBook({ userName });
  if (!user) return false;

  await writeBook(
    { userName },
    { depositedFundsEth: user.depositedFundsEth + depositAmount },
  );
  return true;
};

/*

(async () => {
  const userName = 'Muneeb1';
  const depositAmount = 10;

  const depositSuccess = await depositFunds(userName, depositAmount);
  if (depositSuccess) console.log(`Deposit Success ${depositAmount} TON`);
  else console.log('Deposit Failed, User not found in system');
})();

*/

module.exports = { readBook, depositFunds };
