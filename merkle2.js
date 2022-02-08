const { MerkleTree } = require("merkletreejs");
const hash = require("crypto-js/sha256");

const leaves = ["a", "b", "c"].map((x) => hash(x));
const tree = new MerkleTree(leaves, hash);

const root = tree.getRoot();
const leaf = hash("a1");
const proof = tree.getProof(leaf);

console.log(tree.verify(proof, leaf, root)); // true
