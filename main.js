// what this code do? plan, steps to do
// You are given an array of integers a, where each element a[i] represents the length of a ribbon.
// Your goal is to obtain k=5 ribbons of the same length, by cutting the ribbons into as many pieces as you want.
// Your task is to calculate the maximum integer length L for which it is possible to obtain at least k ribbons of length L by cutting the given ones.
// a = [5, 2, 7, 4, 9], k = 5; // output solution(a, k) = 4

function solution(a, k) {
  const max_of_array = Math.max.apply(Math, a);
  let note = 0;

  for (let i = 1; i <= max_of_array; i++) {
    const ribbonsCut = a.map((v) => Math.floor(v / i)); // cut ribbons in equal sizes
    const ribbons = ribbonsCut.reduce((a, b) => a + b, 0); // total number of ribbons formed
    if (k <= ribbons) note = i;
    else break;
  }

  return note;
}
let a = [5, 2, 7, 4, 9],
  k = 5; // output solution(a, k) = 4

console.log({ solution: solution(a, k) });

// console.log({ f: Math.floor(3/2) });
