// dependencies
const axios = require('axios');

// config
const nft = '0x1d4f5FBC869fDefd2b6D0e20C9c679E03E4CFF2F';
const tokenIdFrom = 108;
const tokenIdTo = 132;

// run code
const init = async () => {
  for (let i = tokenIdFrom; i <= tokenIdTo; i++) {
    const url = `https://api.opensea.io/api/v1/asset/${nft}/${i}/?force_update=true`;
    console.log(`url: ${url}`);
    const res = await axios.get(url);

    if (res.data.image_url.length < 5) console.log('not ', i);
    else if (i % 1 === 0) console.log('ok ', i);
  }
};

init();
