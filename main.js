// why are you writing code here? explain from step 1 to end.

const fs = require('fs');
const obj = JSON.parse(fs.readFileSync('_metadata.json', 'utf-8'));

for (let i = 0; i < obj.length; i++) {
  fs.writeFileSync(`meta/` + (i+1), JSON.stringify(obj[i], null, 4));
}
