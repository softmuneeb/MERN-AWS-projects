const sumArray = (arr) => arr.reduce((p, a) => p + a, 0);

// console.log(sumArray([1, 2, -1]));

const arr = ["5", "2", "C", "D", "+"];

let resArr = [];

arr.map((a, i) => {
  if (!isNaN(a)) resArr.push(Number(a));
  else if (a === "C") resArr.pop();
  else if (a === "D") resArr.push(2 * resArr[resArr.length - 1]);
  else if (a === "+") resArr.push(resArr[resArr.length - 1] + resArr[resArr.length - 2]);
});

console.log(sumArray(resArr));

// console.log(typeof Number("po5l"));
