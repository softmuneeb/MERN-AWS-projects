import axios from 'axios';
import fs from 'fs';
import base64Img from 'base64-img';
console.log('aoa');

const start = 1;
const step = 1;
for (let i = start; i < start + step; i++) {
  const d = await axios.get(`https://ikzttp.mypinata.cloud/ipfs/QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/${i}.png`);
  console.log({ i, d:d.data });

  fs.writeFile(`images/${i}.png`, d.data, (e) => e && console.log(e.message));
}
