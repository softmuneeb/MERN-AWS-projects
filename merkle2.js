// https://www.npmjs.com/package/merkletreejs
// MerkleTree https://www.youtube.com/watch?v=n6nEPaE7KZ8

const { MerkleTree } = require("merkletreejs");
const hash = require("crypto-js/sha256");

const leaves = ["a", "b", "c"].map((x) => hash(x));
const tree = new MerkleTree(leaves, hash);

const root = tree.getRoot(); // requirement 1
const leaf = hash("a1"); // requirement 2
const proof = tree.getProof(leaf); // requirement 3

console.log(tree.verify(proof, leaf, root)); // true
