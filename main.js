const fun1 = (a, b) => a + b;
const fun2 = (a, b) => {
  return a + b;
};

const funny1 = (a) => (b) => a + b;
const funny2 = (a) => (b) => {
  return a + b;
};

const moreFunny = (a) => {
  return (b) => {
    return a + b;
  };
};

const init = async () => {
  console.log(fun1(1, 2));
  console.log(fun2(1, 2));

  console.log(funny1(1)(2));
  console.log(funny2(1)(2));

  console.log(moreFunny(1)(2));
};
init();
