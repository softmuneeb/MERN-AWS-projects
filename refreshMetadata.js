// dependencies
const axios = require('axios');

// config
const nft = '0x1d4f5fbc869fdefd2b6d0e20c9c679e03e4cff2f';
const tokenIdFrom = 151;
const tokenIdTo = 157;

// run code
const init = async () => {
  let j = 0;
  for (let i = tokenIdFrom; i <= tokenIdTo; i++) {
    const url = `https://api.opensea.io/api/v1/asset/${nft}/${i}/?force_update=true`;
    console.log(`url: ${url}`);

    setTimeout(() => {
      axios
        .get(url)
        .then(res => {
          if (res.data.image_url.length < 5) console.log('not ', i);
          else if (i % 1 === 0) console.log('ok ', i);
        })
        .catch(e => {
          console.log('not ', i);
          // e && console.log(e.message);
        });
    }, 2000 * j++);
  }
};

init();
