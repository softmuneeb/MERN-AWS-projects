// const sumArray = (arr) => arr.reduce((p, a) => p + a, 0);

// console.log(sumArray([1, 2, -1]));

const arr = ["5", "2", "C"];

let resArr = [];

arr.map((a) => {
  if (!isNaN(a)) resArr.push(a);
  else if (a === "C") resArr.pop();
});

console.log(resArr);

// console.log(typeof Number("po5l"));
