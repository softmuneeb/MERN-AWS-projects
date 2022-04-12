// what this code do? 

// plan
//

const init = async () => {
  // What is the output of the following code?

  let arr = [1, "Turing", { x: 2 }, [3, 4]];

  console.log(arr.length);
  delete arr[1];

  console.log(arr.length);
  console.log(arr);

  /*
4
4
[ 1, <1 empty item>, { x: 2 }, [ 3, 4 ] ]
  */
};

init();
