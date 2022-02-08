const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

const elements = [
  "0xd9af96861de6992b299e9ac004aa4c68771d0815",
  "0x70c2264d3672ec8efa89457317e51bad5e6b86fa",
  "0x2a30aaa70ac67ae355708a5c77fbe62c9394b65b",
];
// console.log({ elements }); // ['A', 'B', 'C', 'D', ....]
const merkleTree = new MerkleTree(elements, keccak256, {
  hashLeaves: true,
  sortPairs: true,
});

const root = merkleTree.getHexRoot();
console.log({ root }); // 0x4ead2a9bca1c784460fca2314d4a05298e50a65a1eff8ed5f3a048d74d17c1f7;
const leaf = keccak256("0xd9af96861de6992b299e9ac004aa4c68771d0815");
// console.log({ leaf }); // <Buffer 03 78 3f ac 2e fe d8 fb...>
const proof = merkleTree.getHexProof(leaf);
// console.log({ proof });
// proof: [
//   "0x1f675bff07515f5df96737194ea945c36c41e7b4fcef307b7cd4d0e602a69111",
//   "0xe62e1dfc08d58fd144947903447473a090c958fe34e2425d578237fcdf1ab5a4",
//   "0x1907ce7877ec74782a26c166b562bfbdd4c8d8833f98ad82ae9dc8e98db20093",
//   "0x511e1752d2beef1a4401200cd90356c2c613a4634904c588a0554e411b584d9d",
//   "0x5321fd6247e1697c052d1ee2c054903b15aa3558c6597d1e6509c7f1c7e25501",
//   "0xa206b020fa6e2ef9e35d21d831cc00a586b9d210a4aa57dd334303654bb0a3d8",
//   "0xf30c17f6c257181e11b9ea19fc7d498b2880fcad645a66e130edeab084271f16",
// ];
const verified = merkleTree.verify(proof, leaf, root);
console.log({ verified });
