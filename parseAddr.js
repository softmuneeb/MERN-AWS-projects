const removeDuplicates = true;

// dependencies
const fs = require('fs');
const { toChecksumAddress } = require('web3-utils');

// input
const data = fs.readFileSync('ethAddressesIn.txt', 'utf8');

// read only the addresses from file
let addresses = data.match(/(\b0x[a-fA-F0-9]{40}\b)/g);
const addrLen = addresses.length;

// remove duplicates
if (removeDuplicates) {
  let betterRes = {};
  addresses.map(address => {
    betterRes[toChecksumAddress(address)] = true;
  });
  addresses = Object.keys(betterRes);
}

// output
fs.writeFile(
  'ethAddressesOut.txt',
  `total addresses were: ${addrLen}
  ${addresses.length} 'unique addresses were found. Thanks to Allah.'
  
  ${addresses}`,
  e => e && console.log(e.message),
);
