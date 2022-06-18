import fs from 'fs';
const e = (e) => e && console.log(e.message);
fs.appendFile('errors.txt', "addr", e);
