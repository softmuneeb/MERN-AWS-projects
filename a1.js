// coinranking12a2a703e214ecfc4610dfe717c34091b4f734f51ece1674

const axios = require("axios");

const getDdkPrice = async () => {
  const instance = axios.create({
    baseURL: "https://api.coinranking.com/v2/coin/kmGGzflTwc8Q/historic-price",
    headers: {
      "x-access-token":
        "coinranking12a2a703e214ecfc4610dfe717c34091b4f734f51ece1674",
    },
  });

  try {
    return (await instance.get()).data.data.price;
  } catch (e) {
    return "Please turn on internet";
  }
};

const init = async () => {
  console.log("getDdkPrice()", await getDdkPrice());
};

init();
