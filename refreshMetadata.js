// dependencies
const axios = require('axios');

// config
const nft = '0x18f87c05325ae47bfe75c039198b3dc1cb2ed23d';
const tokenIdFrom = 8000;
const tokenIdTo = 8009;

// run code
const init = async () => {
  let j = 0;
  for (let i = tokenIdFrom; i <= tokenIdTo; i++) {
    const url = `https://api.opensea.io/api/v1/asset/${nft}/${i}/?force_update=true`;

    setTimeout(() => {
      axios
        .get(url)
        .then(res => {
          if (res.data.image_url.length < 5) console.log('not ', i);
          else if (i % 1 === 0) console.log('ok ', i);
        })
        .catch(e => {
          e && console.log(e.message);
        });
    }, 200 * j++);
  }
};

init();
