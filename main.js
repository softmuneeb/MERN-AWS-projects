// what this code do?

// plan
//

import fetch from "node-fetch";
import pkg from "web3-utils";
const { toWei } = pkg;
const init = async () => {
  let gasPrice = "" + (await (await fetch("https://gasstation-mumbai.matic.today/v2")).json()).fast.maxFee;
  gasPrice = "" + Math.ceil(gasPrice);
  console.log({ gasPrice });
  console.log(toWei(gasPrice, "gwei"));
};

init();
