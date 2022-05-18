import axios from 'axios';
import fs from 'fs';

console.log('aoa');

const start = 122;
const step = 10;
for (let i = start; i < start + step; i++) {
  const d = await axios.get(`https://ikzttp.mypinata.cloud/ipfs/QmQFkLSQysj94s5GvTHPyzTxrawwtjgiiYS2TBLgrvw8CW/${i}`);
  console.log({ i });

  fs.writeFile(`metadata/${i}.json`, JSON.stringify(d.data, null, 4), (e)=> e && console.log(e.message));
  // s.saveAs(`https://ikzttp.mypinata.cloud/ipfs/QmQFkLSQysj94s5GvTHPyzTxrawwtjgiiYS2TBLgrvw8CW/${i}`, `${i}.json`);
  // s.saveAs(`https://ikzttp.mypinata.cloud/ipfs/QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/${i}.png`, `${i}.png`);
}
