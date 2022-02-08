// https://www.npmjs.com/package/merkletreejs
// MerkleTree https://www.youtube.com/watch?v=n6nEPaE7KZ8

const { MerkleTree } = require("merkletreejs");
const hash = require("keccak256");

const leaves = [
  "0xd9af96861de6992b299e9ac004aa4c68771d0815",
  "0x70c2264d3672ec8efa89457317e51bad5e6b86fa",
  "0x2a30aaa70ac67ae355708a5c77fbe62c9394b65b",
].map((x) => hash(x));
const tree = new MerkleTree(leaves, hash);

const root = tree.getRoot(); // requirement 1
console.log({ root });
const leaf = hash("0x70c2264d3672ec8efa89457317e51bad5e6b86fa"); // requirement 2
const proof = tree.getProof(leaf); // requirement 3

console.log(tree.verify(proof, leaf, root)); // true
