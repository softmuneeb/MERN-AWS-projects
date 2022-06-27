// what this code do?
// commit push current code

const execSync = require('child_process').execSync;
// import { execSync } from 'child_process';  // replace ^ if using ES modules

const output = execSync("git add . && git commit -am 'auto push' && git push --set-upstream origin terminal commands", { encoding: 'utf-8' }); // the default is 'buffer'
console.log('Output was:\n', output);
