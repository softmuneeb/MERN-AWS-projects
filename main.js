// // dependencies
// const axios = require("axios").default;

// // config
// const nft = '0x18f87c05325ae47bfe75c039198b3dc1cb2ed23d';
// const tokenIdFrom = 1070;
// const tokenIdTo = 1072;

// // run code
// const init = async () => {
//   for (let i = tokenIdFrom; i <= tokenIdTo; i++) {
//     const url = `https://api.opensea.io/api/v1/asset/${nft}/${i}/?force_update=true`;
//     console.log({ url });
//     // const res = await axios.get(url);

//     // if (res.data.image_url.length < 5) console.log('not ', i);
//     // else if (i % 100 === 0) console.log('token refresh ok ', i);
//   }
// };

// init();

// https://api.opensea.io/api/v1/asset/0x18f87c05325ae47bfe75c039198b3dc1cb2ed23d/1071/?force_update=true

const axios = require("axios");

axios
  .get(
    "https://api.opensea.io/api/v1/asset/0x18f87c05325ae47bfe75c039198b3dc1cb2ed23d/1071/?force_update=true",
  )
  .then((resp) => {
    // console.log(resp.data.data.image_url);
  });
