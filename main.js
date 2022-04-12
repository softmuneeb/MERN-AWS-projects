// what this code do? 

// plan
//

const init = async () => {
  let inputs = [2, "turing", 3,4,5,6,7]
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i] === "turing") 
      inputs.splice(i, 1)
    else console.log(inputs[i]);
    
    
  }
};

init();
