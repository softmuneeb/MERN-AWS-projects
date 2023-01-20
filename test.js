// add eth to db...
const { readBooks, writeBook, readBook } = require('./db');

(async () => {
  console.log('start');

  // // See Users
  // const users = await readBooks(); // see all users
  // console.log(users);

  // // See Users Names
  // const users = await readBooks(); // see all users
  // let userNames = [];
  // for (let i = 0; i < users.length; i++) {
  //   const user = users[i];
  //   if (user.userName === '7_SPONSOR_POOL' || user.userName === 'SUPER_STAR_POOL') continue;
  //   userNames.push(user.userName);
  // }
  // console.log(userNames + '');

  // console.log(users);

  // // Get All Users Balance
  // const users = await readBooks(); // see all users
  // let total = 0;
  // for (let i = 0; i < users.length; i++) {
  //   const user = users[i];
  //   total += user.balance;
  // }
  // console.log(total);

  // // Add Ton from ETH
  // const userName = 'MehsimBote';
  // if (!(await readBook({ userName }))) {
  //   console.log('user not found');
  //   return;
  // }
  // await writeBook({ userName }, { depositedFundsEth: 10, balance: 0 });

  console.log('done');
})();
