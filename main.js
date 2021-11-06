// dependencies
const axios = require('axios');

// config

// run code
const init = async () => {
  const url = `https://go.cb-w.com/mtUDhEZPy1`;
  const res = await axios.get(url);
  console.log(`res: ${JSON.stringify(res.data)}`);
};

init();
