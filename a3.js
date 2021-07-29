const axios = require("axios");

const getManyTransactions = async () => {
  const url = "http://178.128.215.21:7070/api/transactions/getMany";
  try {
    const response = await axios.post(url, {
      filter: {
        sender_public_key:
          "ad04249e078600b0a6f47bcc77be072ff4f7b80f645554454b22fbce25b21078",
        type: 10,
      },
      sort: [["createdAt", "DESC"]],
      limit: 1,
      offset: 0,
    });
    console.log(response.data.data.transactions[0]);
    return { ok: true, data: response.data.data.transactions[0] };
  } catch (e) {
    return { ok: false, data: "Some error. " + e.message };
  }
};

//   const array = response.data.data.transactions[0];
//   console.log("array", array);
//   const { type, senderAddress, fee, asset, createdAt } = array;
//   console.log('type, senderAddress, fee, asset, createdAt', type, senderAddress, fee, asset, createdAt)

getManyTransactions();
// type: 10
// from, to
// fee
// amount
// time
