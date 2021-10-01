const axios = require('axios');

const init = async () => {
  for (let i = 0; i < 10000; ++i) {
    const res = await axios.get(
      'https://api.opensea.io/api/v1/asset/0x350b4cdd07cc5836e30086b993d27983465ec014/1/?force_update=true',
    );

    console.log('res.data.image_url.length: ', res.data.image_url.length);
    if (res.data.image_url.length < 5) console.log('not ', i);
    else if (i % 1000 === 0) console.log('ok ', i);
  }
};

init();
