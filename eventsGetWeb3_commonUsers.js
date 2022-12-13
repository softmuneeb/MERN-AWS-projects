// detect events

// web3 setup
import Web3 from 'web3';
const infuraLink = 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';
const web3 = new Web3(infuraLink);

// FACTORY contract settings
const scAddress = '0x65285c59194b8224ffaDfeEf791Ba2cBC0A87Af5';
const scAbi = JSON.parse(
  '[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"","type":"address"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"}],"name":"PurchasedClaimSpot","type":"event"},{"inputs":[],"name":"claimSpotMintActiveTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"claimSpotsBoughtBy","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimSpotsSold","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimSpotsToSell","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"costPerClaim","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxMintClaimSpotAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_mintAmount","type":"uint256"}],"name":"purchaseClaimSpot","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_claimSpotMintActiveTime","type":"uint256"}],"name":"setClaimSpotMintActiveTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_claimSpotsToSell","type":"uint256"}],"name":"setClaimSpotsToSell","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_costPerClaim","type":"uint256"}],"name":"setCostPerClaim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxMintClaimSpotAmount","type":"uint256"}],"name":"setMaxMintClaimSpotAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"payable","type":"function"}]',
);
const sc = new web3.eth.Contract(scAbi, scAddress);

// Get Events

const events = await sc.getPastEvents('PurchasedClaimSpot', {
  fromBlock: 0,
  toBlock: 16145621,
});

const eventsWeb2 = [
  ['0xA827c2964536668D9d2ce10962392c328af4c131', 1], // coder
  ['0x325B0d9E954740E3Ac68AC3eb4034028A814Fc46', 1], // tester
  ['0x95b4766a5AC9BA5145d9c7499982f1056B3d60fd', 5],
  ['0xD8bBe73fCAD6D54198699cc42FD8B39C754b44eD', 5],
  ['0xf1842be6aC1218ED92d90960f3BC63FBE619DC69', 5],
  ['0xE1A39b7D9f2F0411070609b296F2Af0502381867', 8],
  ['0xEd3086b0f2d1F2890ded44e4656D256d49a719f7', 5],
  ['0x37D74ca0F842817C6FC4Ea267cF2d49DEa0C06a8', 12],
  ['0x1B6c991987eD10E0Ba0A72BB989804c9089313A0', 15],
  ['0x157dFdD5211ea1a7Cc0F1b7Ee4d1D7aE28f56cF7', 15],
  ['0x8019c3978670fB5BBbC5877a1305cA347Af56Fa2', 10],
  ['0xE67bce11d498cd4c5012c27E38E3EE5f0d99AB70', 10],
  ['0x4806669fcdDDa499b76725b4A7499a71c3971c38', 10],
  ['0x500f2C848B6F5d40312918158007E0D95574Ad33', 14],
  ['0x822434F30Fc1C17AD4f3447749eAe80C5E3b67Dd', 20],
  ['0xC5883111218db8860d40c194eAed01ddf0283ddD', 3],
  ['0x7444917D446Cfd81DAA373E6BD7681C631f94c3A', 2],
  ['0xf7472054B951B8Fc61CBd96b6Da79B2Ef08a362F', 1],
  ['0xf7472054B951B8Fc61CBd96b6Da79B2Ef08a362F', 1],
  ['0x70f7e09Ee5CdcFc391A33ae755AdE5D532077775', 5],
  ['0x7734c878688638701c36cd42637841a1524f1d27', 1],
  ['0x610E24473F72f98f59A53F8e8562A8F556b81aD0', 5],
  ['0x187942FAC155670ef1bfE03f44C547b65EC32f32', 3],
  ['0xf18E0d4003719D582B347fFeE4A30b82AEf5656a', 1],
  ['0x7734c878688638701c36cd42637841a1524f1d27', 1],
  ['0x701E7eb14C81e963a3724E3f9ceDA837ad084943', 7],
  ['0xFc419C852ceEadE38d73b9bD45a55A4226EB9234', 2],
  ['0xC5883111218db8860d40c194eAed01ddf0283ddD', 3],
  ['0x8CCa788B38B5C7002c8DBa0cE9579866fd591C3B', 3],
  ['0x3207dbA00cC44247FA8deaCe8Bd9aeEE2b15f231', 3],
  ['0x8eABA2b5F8556C08b5D8f3A57570B7b06866A5D5', 5],
  ['0x51086b663E95029B11a279732878F9e6921641A1', 1],
  ['0xc7fDC975AB8efa5C0b401F10AB40Ec132f4fa72c', 1],
  ['0x4822c36a8f74f6f084de59dedafcd203995bd2ca', 2],
  ['0x4822c36a8f74f6f084de59dedafcd203995bd2ca', 1],
  ['0x690b1cbbd53dd2a4c4f0001910148452866e3d52', 1],
  ['0x6F8Bf21A018Ab23aBE07784c660CdB0844Fdc239', 3],
  ['0xB0faD9df7058D8787FBc3B1C56aBa79cf6460d49', 5],
  ['0xC5883111218db8860d40c194eAed01ddf0283ddD', 3],
  ['0x6bA3a76AdA4209EcF515D432b161744CeBFE20B4', 10],
  ['0x9c744cd5c033e0EADeC033b455d054cAB55C7186', 2],
  ['0x5646543aCFaEBb3008df8aDbD1D5D9ABf48a1F82', 2],
  ['0x184775FC1FFEE9E471840e2C8bD7574e68cB3327', 2],
  ['0x3eAddEd08384833A7eBDc62Eafe8B84cdeBd08aa', 10],
  ['0xc7fDC975AB8efa5C0b401F10AB40Ec132f4fa72c', 1],
  ['0x1a824464C37B89C1749E63628C0416d9bad22aEb', 1],
  ['0x2eaEb2452C1427f9075E81d8Aa7AFA75Ae28Ac24', 1],
  ['0x36250E5281137B74B256eF5dB0E06cd194E89f3b', 1],
  ['0x8C953D31E018289699566Bba1252f942500054a4', 3],
  ['0x4E9d8D3964F385805ceDE9161866b23368ebb562', 2],
  ['0xE33f0340804bb70779E5E5861334Dd2B88ac972f', 1],
  ['0x33Ce4c2FA136A3A62A64fED96c5A64dc1EbF0b42', 10],
  ['0xd25684014cf9b912024eea9315487b286fee01d0', 3],
  ['0xd25684014cf9b912024eea9315487b286fee01d0', 1],
  ['0xf1FA6539ef9F9944Faaf104019455E1EFe359dE1', 1],
  ['0xAFCc2a9B50AdC28110a897781A63d3326F10a63B', 1],
  ['0x95b3DF1d5DD672771ef77d8669F0D1D0a8bA4273', 2],
  ['0xE33f0340804bb70779E5E5861334Dd2B88ac972f', 1],
  ['0xf1FA6539ef9F9944Faaf104019455E1EFe359dE1', 1],
  ['0xcbB48C6Fc095F439C419EA782853Fdf026866d02', 2],
  ['0xf4F1BBF39689916Dd531648217580AF39cb493aD', 1],
  ['0xf7472054B951B8Fc61CBd96b6Da79B2Ef08a362F', 4],
  ['0x51086b663E95029B11a279732878F9e6921641A1', 2],
  ['0xC22D82b1CBAcA3667595ff7a2044f462d7C52bC6', 1],
  ['0xf4F1BBF39689916Dd531648217580AF39cb493aD', 8],
  ['0xD6AE88a4B7085E31DE1Bb14B61deb10102887874', 3],
  ['0xb010E6F84A7960fc7aa876C731A8964CDE96159e', 5],
  ['0x88DFDCe3e2703C0794cf9425D309248630E369FD', 11],
  ['0xDAe9213568c3Ab5f0f777cd5847D308941C84bD5', 1],
  ['0xC22D82b1CBAcA3667595ff7a2044f462d7C52bC6', 1],
  ['0xd25684014cf9b912024eea9315487b286fee01d0', 1],
  ['0x477d38EB0a311561D5CE4D2d0816cAe14bd1b351', 20],
  ['0xD6AE88a4B7085E31DE1Bb14B61deb10102887874', 2],
  ['0x1593F872b622eA668694743e542bF8Aa8801C759', 1],
  ['0x6f0a6c131EAc3be6E1Ceb273f4038f9FF8637854', 1],
  ['0xc37F9C5d33e88608BD42ef1a14c8D51959b31F32', 1],
  ['0xA36C55106d8dFedC866486dC54FC0D4973559d32', 1],
  ['0xf913f6414d1CE7DDFA8ffe9d9a50844E311004DE', 18],
  ['0x0f2b6d661bB4a82aa3E99A7790772f7646be8E45', 1],
  ['0x5fA449A6Fdd4a540b7215eABaFe38d48e4Ac56F4', 8],
  ['0x20Ced49dEd2a77EEDB573a6e5aa227c6E7A73F47', 20],
  ['0xc37F9C5d33e88608BD42ef1a14c8D51959b31F32', 2],
  ['0x08d65A1b1Fc4abf71D6F137aE8a8E20B3d987256', 1],
  ['0x3d71287277c98a649928d519a8bd344894e8704e', 18],
  ['0x911D6BA475cf793606252061dD15E2Cc6eA01B23', 10],
  ['0x198a3da0727752016e84d3989946b220ec05c34c', 1],
  ['0xED183052570226Dd84329506CeE10f513F3d7C33', 5],
  ['0x198a3da0727752016e84d3989946b220ec05c34c', 19],
  ['0x2b44B04aBD1e815de41FCd34A96c1662455691bC', 1],
  ['0x58D8AC0347742f8b1362289113eA1780c3640189', 2],
  ['0x2b44B04aBD1e815de41FCd34A96c1662455691bC', 5],
  ['0x58D8AC0347742f8b1362289113eA1780c3640189', 7],
  ['0x58D8AC0347742f8b1362289113eA1780c3640189', 11],
  ['0x5094E4159f8811a614d3796c16269E20e0564b51', 2],
  ['0x5A283E62f1Fc9146a80856C316477E9167A5b456', 3],
  ['0x6f0a6c131EAc3be6E1Ceb273f4038f9FF8637854', 1],
  ['0xf7472054B951B8Fc61CBd96b6Da79B2Ef08a362F', 6],
  ['0xf3c9C543666D1Ba0F232682cd74dFC5B6BaD8264', 4],
  ['0x066405FD19903bAC9aefd5883576795eECE7CAd5', 10],
  ['0x33Ce4c2FA136A3A62A64fED96c5A64dc1EbF0b42', 5],
  ['0x1808fF4aF5e8e91Ff20286FB66c22963d41dE70e', 10],
  ['0xED183052570226Dd84329506CeE10f513F3d7C33', 10],
  ['0xED183052570226Dd84329506CeE10f513F3d7C33', 10],
  ['0xb3B2Ad3a181cdb86fc847a8281F311a7bB9fb878', 2],
  ['0x33Ce4c2FA136A3A62A64fED96c5A64dc1EbF0b42', 5],
  ['0x1a824464C37B89C1749E63628C0416d9bad22aEb', 1],
  ['0x835d13cDEBCbdC9B40a848CD4DB18235E837f479', 10],
  ['0xDB76F93f60815dBf3EB6dF75c4CC2f3178d5bB9D', 5],
  ['0xDAe9213568c3Ab5f0f777cd5847D308941C84bD5', 10],
  ['0x1a824464C37B89C1749E63628C0416d9bad22aEb', 1],
  ['0x80c40D19034602eE25a7d84e40073bF8548a6732', 10],
  ['0x58D8AC0347742f8b1362289113eA1780c3640189', 7],
  ['0xF3C9c4eA5451581F88ec547b28153266a20f47E7', 6],
  ['0xCfFA2E330D2E20ce286555B585f60dbd53ac0b86', 10],
  ['0x70f7e09Ee5CdcFc391A33ae755AdE5D532077775', 10],
  ['0x477d38EB0a311561D5CE4D2d0816cAe14bd1b351', 10],
  ['0x8AFD2ec9e763cFbc566b63a39227C96A440dDB7d', 10],
  ['0xf4F1BBF39689916Dd531648217580AF39cb493aD', 1],
  ['0x3d71287277c98a649928d519a8bd344894e8704e', 10],
  ['0x198a3da0727752016e84d3989946b220ec05c34c', 10],
  ['0x9E1BC1B3e73DC1A140438967B55D1DE83Be838b7', 4],
  ['0x58D8AC0347742f8b1362289113eA1780c3640189', 3],
  ['0xE33f0340804bb70779E5E5861334Dd2B88ac972f', 1],
  ['0x6a8E0084D5A85A79f313c924F2Da484655F516D0', 10],
  ['0xf3c9C543666D1Ba0F232682cd74dFC5B6BaD8264', 10],
  ['0x29E77eE50f1fB75B700d5905a50e0Db86d7A445c', 10],
  ['0x8C953D31E018289699566Bba1252f942500054a4', 10],
  ['0x9E1BC1B3e73DC1A140438967B55D1DE83Be838b7', 1],
  ['0x47Da83D297CAE410346630738B2E6e8a23Bf8995', 5],
  ['0x88DFDCe3e2703C0794cf9425D309248630E369FD', 10],
  ['0xf913f6414d1CE7DDFA8ffe9d9a50844E311004DE', 10],
  ['0x20Ced49dEd2a77EEDB573a6e5aa227c6E7A73F47', 10],
  ['0xd25684014cf9b912024eea9315487b286fee01d0', 10],
  ['0x3C462FF53259030e3d2Adf9B89681f1c8ce262a0', 5],
  ['0x9E1BC1B3e73DC1A140438967B55D1DE83Be838b7', 4],
  ['0xc37F9C5d33e88608BD42ef1a14c8D51959b31F32', 10],
  ['0xA1c05baE922f79f7923935B4b40379ADf964f01c', 5],
  ['0x1d16d12a6d47ac5e21c4fe21a01b3d4223bc3776', 5],
  ['0xf4F1BBF39689916Dd531648217580AF39cb493aD', 1],
  ['0x208F93F2456e23EaC27c567FD8C809861915e615', 10],
  ['0x2b44B04aBD1e815de41FCd34A96c1662455691bC', 10],
  ['0x47Da83D297CAE410346630738B2E6e8a23Bf8995', 5],
  ['0x9E1BC1B3e73DC1A140438967B55D1DE83Be838b7', 2],
  ['0x3C462FF53259030e3d2Adf9B89681f1c8ce262a0', 5],
  ['0xcbB48C6Fc095F439C419EA782853Fdf026866d02', 4],
  ['0x9fDf8A92d344ee09eA91A327EBA4Dbc719AB0132', 10],
  ['0x3f6109821567bF32487C81E0c4a205DCAE072BFC', 1],
  ['0x66fB27dFF64c4cb29208A3A4F3B1Df41D6462cd6', 10],
  ['0x5094E4159f8811a614d3796c16269E20e0564b51', 10],
  ['0x33Ce4c2FA136A3A62A64fED96c5A64dc1EbF0b42', 10],
  ['0x8e9575faa5afb0c55cbe3056636e4fe733953c13', 10],
  ['0xcbB48C6Fc095F439C419EA782853Fdf026866d02', 2],
  ['0xcbB48C6Fc095F439C419EA782853Fdf026866d02', 4],
  ['0xc0455b7ef625ee51f45c2a97c5b7b17afc2c6d70', 3],
  ['0x5fA449A6Fdd4a540b7215eABaFe38d48e4Ac56F4', 10],
  ['0xf8cef5c660af25d9d60a29d35f3a2f82dd5f7752', 1],
  ['0xf8cef5c660af25d9d60a29d35f3a2f82dd5f7752', 1],
  ['0x36250E5281137B74B256eF5dB0E06cd194E89f3b', 2],
  ['0x6539C672928A173fCcf3febd4cFE08b47Ab4be0D', 2],
  ['0xE33f0340804bb70779E5E5861334Dd2B88ac972f', 1],
  ['0x1be965301d6E2E76D303C63086e15445fd3BAba1', 10],
  ['0x57C924fEb43e30a08233661F8782d10e378CD6f4', 10],
  ['0xE33f0340804bb70779E5E5861334Dd2B88ac972f', 8],
  ['0x8CCa788B38B5C7002c8DBa0cE9579866fd591C3B', 5],
  ['0xdCb9b454e13788E33fB07281C974439738faFf36', 10],
  ['0x4E9d8D3964F385805ceDE9161866b23368ebb562', 6],
  ['0xd7C2D03113FEBC1080Bb2bf60b5592579a933846', 10],
  ['0xf7472054B951B8Fc61CBd96b6Da79B2Ef08a362F', 10],
  ['0x75C33532C0b329E11B64dDe151968D1eF687C875', 4],
  ['0xE8020B9f7AaCebB4E13d304Ff059f9af1b4d1094', 3],
  ['0x9b0BCEa8a06919453DF4aDb9635b2BcafD542511', 2],
  ['0xD03Fe00ebF94Cc4DeDad7e2a761101deD5507c49', 1],
  ['0x92cE3E17c74486A265E5B8A31406B808dfE3C87B', 3],
  ['0x8988BE293b269e90b872Bd54aAdb933E937EE101', 1],
  ['0x4E9d8D3964F385805ceDE9161866b23368ebb562', 2],
  ['0x03bCD8BD340cc4FF3861CD847941F525a66331f2', 1],
  ['0xf8cef5c660af25d9d60a29d35f3a2f82dd5f7752', 1],
  ['0xb3B2Ad3a181cdb86fc847a8281F311a7bB9fb878', 1],
  ['0x2eaEb2452C1427f9075E81d8Aa7AFA75Ae28Ac24', 1],
  ['0x2eaEb2452C1427f9075E81d8Aa7AFA75Ae28Ac24', 1],
];

// console.log('previousEvents sc', JSON.stringify(events, null, 4));
const obj = {};
let totalMinted = 0;

// make mint groups wrt,  0xa12 : minted 10, 0xab: minted 2, ...
// Web3 users
for (let i = 0; i < events.length; i++) {
  const event = events[i];
  const minter = event.returnValues[0].toLowerCase();
  const mintQty = Number(event.returnValues[1]);
  totalMinted += mintQty;
  obj[minter] = (obj[minter] || 0) + mintQty;
}
console.log({ totalMinted });
const web3addrs = Object.keys(obj);

// Web2 users
const objWeb2 = {};
for (let i = 0; i < eventsWeb2.length; i++) {
  const event = eventsWeb2[i];
  const minter = event[0].toLowerCase();
  const mintQty = event[1];
  totalMinted += mintQty;
  objWeb2[minter] = (objWeb2[minter] || 0) + mintQty;
}
console.log({ totalMinted });
const web2addrs = Object.keys(objWeb2);

// web2users = web3and2addrs - web3addrs, let difference = arr1.filter(x => !arr2.includes(x));
// webCommon = common web2 web3, let intersection =

let webCommon = web2addrs.filter((x) => web3addrs.includes(x));
console.log({ webCommon });

// combining data
const addresses = Object.keys(obj);
const obj2 = [];
for (let i = 0; i < 50; i++) {
  obj2.push([]);
}

for (let i = 0; i < addresses.length; i++) {
  const user = addresses[i];
  const userMinted = obj[user];
  obj2[userMinted - 1].push(user); // arrIndexForUI
}

// console.log('groups made', obj2);

for (let i = 0; i < obj2.length; i++) {
  const obj = obj2[i];

  // console.log('// can mint ' + (i + 1) + ': ');
  // console.log(
  //   obj.map((a) => a.toLowerCase()),
  //   ', ',
  // );
}
