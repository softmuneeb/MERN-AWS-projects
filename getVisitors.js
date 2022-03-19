// get visitors

import web3 from "web3";
import wallet from "@truffle/hdwallet-provider";
import dotenv from "dotenv";
dotenv.config();

const init = async () => {
  const PV_KEY = process.env.PV_KEY;

  const ethereum = new wallet(PV_KEY, "https://matic-mumbai.chainstacklabs.com");
  const Web3 = new web3(ethereum);
  const contract = new Web3.eth.Contract(
    JSON.parse(
      '[{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"VisitorCame","type":"event"},{"inputs":[],"name":"visitorCame","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"visitors","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]',
    ),
    "0x8e030c0a7BAe8122170134f27B23910Ddcd96E5c",
  );

  const visitor = await contract.methods.visitors().call();
  const events = await contract.getPastEvents("VisitorCame", { fromBlock: "25576056", toBlock: "30000000" });
  console.log({ visitors: visitor });
  console.log({ visitors: events.length });

  for (let i = 0; i < events.length; i++) {
    const e = events[i];
    const timestamp = e.returnValues.timestamp;
    console.log(timestamp);
  }
};

const init2 = async () => {
  const PV_KEY = process.env.PV_KEY;

  const ethereum = new wallet(PV_KEY, "https://matic-mumbai.chainstacklabs.com");
  const Web3 = new web3(ethereum);
  const contract = new Web3.eth.Contract(
    JSON.parse(
      '[{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"},{"indexed":false,"internalType":"address","name":"visitor","type":"address"}],"name":"VisitorCame","type":"event"},{"inputs":[],"name":"uniqueVisitors","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_visitor","type":"address"}],"name":"visitorCame","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"visitors","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]',
    ),
    "0x02f5991047f00f55a75043e28dd6abf118399457",
  );

  const visitor = await contract.methods.visitors().call();
  const events = await contract.getPastEvents("VisitorCame", { fromBlock: "25576056", toBlock: "30000000" });
  console.log({ visitors: visitor });
  console.log({ visitors: events.length });
  let visitors = [];

  for (let i = 0; i < events.length; i++) {
    const e = events[i];
    const { visitor } = e.returnValues;
    visitors.push(visitor);
  }

  let newVisitors = [...new Set(visitors)];
  console.log(newVisitors.sort());
};

// init();
init2();
