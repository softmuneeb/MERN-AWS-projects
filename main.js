// code converts metadata i.e { clothes: 2 } -> { shirt: blue, pant: green}, i.e id to actual clothes

// plan
// traits file variable with all clothes info merged
// get all 11111 img traits file
// for every 11111 img traits replace clothes number with ...obj of all cothes info
// log this > traitsV1.json

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

  const v = await contract.methods.visitors().call();

  console.log(v);
};

init();
