// what this code do? 

// plan
//

const init = async () => {
  let a = { y: 10 }
  a.x = a
  console.log(JSON.stringify(a));
};

init();
