const axios = require("axios");

const init = async () => {
//   const url =
//     "http://185.244.248.12:7070/api/transactions/7c3fa55b8548db425c39bd186a934c3c0d9b6c376f8db1d92951262041488825";
    // const url = "https://ddkexplorer.ddkoin.com/account/6193145164664295901";
    const url = "https://explorer.ddkoin.com/account/6193145164664295901";
  const response = await axios.get(url);
  console.log("response", response);
};
init().then();
