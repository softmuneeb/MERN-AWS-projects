const fun = (a, b) => a + b;

const funny = (a) => (b) => a + b;

const moreFunny = (a) => {
  return (b) => {
    return a + b;
  };
};

const init = async () => {
  console.log(fun(1, 2));
  console.log(funny(1)(2));
  console.log(moreFunny(1)(2));
};
init();
