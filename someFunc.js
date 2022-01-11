import axios from "axios";

const someFunc = async () => {
  const res = await axios.get(
    `https://api.nftrade.com/api/v1/tokens?address=0x1f6482d3175981cf2a6b9562876ff995b188790c&connectedChainId=43114&limit=100`,
  );

  for (let i = 70; i < res.data.length; i++) {
    const data = res.data[i];

    // console.log({ i });
    // console.log({ id: data.id });
    console.log({ tokenID: data.tokenID });

    const res2 = await axios.get(
      `https://api.nftrade.com/api/v1/tokens/${data.id}/refresh?refreshForce=true`,
    );

    // console.log({ image: res2.data.image });
  }
};
someFunc();
