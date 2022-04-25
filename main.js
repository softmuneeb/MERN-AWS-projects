// https://javascript.plainenglish.io/how-to-find-the-town-judge-92f07c5b7570

const findJudge = (N, trust) => {
  let trusted = {};
  let wantedTrust = {};
  for (let i = 1; i <= N; i++) {
    trusted[i] = 0;
    wantedTrust[i] = 0;
  }
  for (let ele of trust) {
    trusted[ele[0]]++;
    wantedTrust[ele[1]]++;
  }
  let judge = 0;
  for (let key in trusted) {
    if (trusted[key] === 0) judge = key;
  }
  if (wantedTrust[judge] === N - 1) return judge;
  else return -1;
};

let res = findJudge(3, [[1, 3], [2, 3]]);
console.log(res)