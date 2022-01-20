// dependencies
import axios from "axios";

// config
const nft = "0x734f5d723f27963ba48589170fbd39453196cb0f";
const tokenIdFrom = 100;
const tokenIdTo = 102;

// https://api.nftrade.com/api/v1/tokens/owner?contractAddress=0x91fec052341750d3c6dae4e8fd258d05f82c47a0&tokenID=13&chainId=43114&contractType=EIP721
// {"username":null,"image":null,"id":"0x1f6482d3175981cf2a6b9562876ff995b188790c"}

// https://api.nftrade.com/api/v1/tokens?address=0x1f6482d3175981cf2a6b9562876ff995b188790c&connectedChainId=43114&limit=8
// https://api.nftrade.com/api/v1/tokens/04e18ad2-6934-4080-911a-97df15b76f96/refresh?refreshForce=true

// run code
const init = async () => {
  console.log("aoa");
  let j = 0;
  for (let i = tokenIdFrom; i <= tokenIdTo; i++) {
    // const url = `https://testnets-api.opensea.io/api/v1/asset/${nft}/${i}/?force_update=true`;
    const url = `https://api.opensea.io/api/v1/asset/${nft}/${i}/?force_update=true`;
    // console.log(`url: ${url}`);
    // https://api.opensea.io/api/v1/asset/0x734f5d723f27963ba48589170fbd39453196cb0f/101/?force_update=true

    setTimeout(() => {
      axios
        .get(url)
        .then((res) => {
          console.log({ a: res.data.image_url });
          if (res.data.image_url.length < 5) console.log("not ", i);
          else if (i % 1 === 0) console.log("ok ", i);
        })
        .catch((e) => {
          e && console.log(e.message)
          console.log("not ", i);
          // e && console.log(e.message);
        });
    }, 2000 * j++);
  }
};

init();