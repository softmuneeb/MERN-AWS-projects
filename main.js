// why are you writing code here? explain from step 1 to end.

const fs = require('fs');

for (let i = 0; i < 2; i++) {
  const obj = JSON.parse(fs.readFileSync('_metadata.json', 'utf-8'));
  fs.writeFileSync(`` + i, JSON.stringify(obj[i], null, 4));
}
