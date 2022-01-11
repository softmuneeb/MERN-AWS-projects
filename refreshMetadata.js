// dependencies
const axios = require('axios');

// config
const nft = '0x1d4f5fbc869fdefd2b6d0e20c9c679e03e4cff2f';
const tokenIdFrom = 151;
const tokenIdTo = 157;

// https://api.nftrade.com/api/v1/tokens/owner?contractAddress=0x91fec052341750d3c6dae4e8fd258d05f82c47a0&tokenID=13&chainId=43114&contractType=EIP721
// {"username":null,"image":null,"id":"0x1f6482d3175981cf2a6b9562876ff995b188790c"}

// https://api.nftrade.com/api/v1/tokens?address=0x1f6482d3175981cf2a6b9562876ff995b188790c&connectedChainId=43114&limit=8
// https://api.nftrade.com/api/v1/tokens/04e18ad2-6934-4080-911a-97df15b76f96/refresh?refreshForce=true


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
