// dependencies
const axios = require('axios');

// config
const nft = '0x18f87c05325ae47bfe75c039198b3dc1cb2ed23d';
const tokenIdFrom = 1;
const tokenIdTo = 1;

// run code
const init = async () => {
  for (let i = tokenIdFrom; i <= tokenIdTo; i++) {
    const url = `https://api.opensea.io/api/v1/asset/${nft}/${i}/?force_update=true`;
    const res = await axios.get(url);

    if (res.data.image_url.length < 5) console.log('not ', i);
    else if (i % 1 === 0) console.log('ok ', i);
  }
};

init();
