// get the nft trades


store:

'{"anonymous":false,"inputs":[{"indexed":false,"name":"buyHash","type":"bytes32"},{"indexed":false,"name":"sellHash","type":"bytes32"},{"indexed":true,"name":"maker","type":"address"},{"indexed":true,"name":"taker","type":"address"},{"indexed":false,"name":"price","type":"uint256"},{"indexed":true,"name":"metadata","type":"bytes32"}],"name":"OrdersMatched","type":"event"}'
    os abi 

    
    fromBlock: 0,
    toBlock: 9999999999999999999999,


        fromBlock:15008988,
    toBlock: 15010205,


    maker: '0x0000000000000000000000000000000000000000'



  // for (let i = 0; i < events.length; i++) {
  //   const e = events[i];
  //   const to = Web3.utils.toChecksumAddress(e.returnValues.to);

  //   users[to] = !users[to] || users[to] === undefined ? 1 : users[to] + 1;

  //   //   `tokenId#${e.returnValues.tokenId}    ${e.returnValues.to} Block#${
  //   //     e.blockNumber

const err = (e) => e && console.log(e.message);

return {
      addr,
      age: a.age,
      noOfTx: a.noOfTx,
      balance: a.balance,
      minted: users[addr],
      birdRating: a.birdRating,
    };
    
usersArr.sort((a, b) => b.minted - a.minted);
  console.log(JSON.stringify(usersArr, null, 4));

  usersArr.sort((a, b) => a.addr - b.addr);
  console.log(JSON.stringify(usersArr, null, 4));

  let usersArr4 = usersArr.filter((minter) => minter.minted === 4).map((a) => a.addr);
  let usersArr3 = usersArr.filter((minter) => minter.minted === 3).map((a) => a.addr);
  let usersArr2 = usersArr.filter((minter) => minter.minted === 2).map((a) => a.addr);
  let usersArr1 = usersArr.filter((minter) => minter.minted === 1).map((a) => a.addr);
  console.log({ usersArr });

    console.log({ _4_item_holders: usersArr4.length });
    console.log(JSON.stringify(usersArr4, null, 2));
    console.log();
    console.log();

    console.log({ _3_item_holders: usersArr3.length });
    console.log(JSON.stringify(usersArr3, null, 2));
    console.log();
    console.log();

    console.log({ _2_item_holders: usersArr2.length });
    console.log(JSON.stringify(usersArr2, null, 2));
    console.log();
    console.log();

    console.log({ _1_item_holders: usersArr1.length });
    console.log(JSON.stringify(usersArr1, null, 2));
    console.log();
    console.log();

 getAnalytics('0xc18E78C0F67A09ee43007579018b2Db091116B4C');

  console.log(`events: ${JSON.stringify(events, null, 4)}`);

    https://www.bird.money/analytics/address/0xc18E78C0F67A09ee43007579018b2Db091116B4C
