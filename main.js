// why are you writing code here? explain from step 1 to end.

const fs = require('fs');
const obj = JSON.parse(fs.readFileSync('_metadata.json', 'utf-8'));

// https://nftstorage.link/ipfs/bafybeid222qqmcbznk7wp7jugbkpjd5unwzlvu6bqoq36e4onusuvagybi/1.png

for (let i = 0; i < (10000 || obj.length); i++) {
  obj[i].image = 'https://nftstorage.link/ipfs/bafybeid222qqmcbznk7wp7jugbkpjd5unwzlvu6bqoq36e4onusuvagybi/' + (i + 1) + '.png';
  fs.writeFileSync(`meta/` + (i + 1), JSON.stringify(obj[i], null, 4));
}
