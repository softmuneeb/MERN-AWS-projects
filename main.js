// code converts metadata i.e { clothes: 2 } -> { shirt: blue, pant: green}, i.e id to actual clothes

import { log } from "console";
import { all_traits } from "./all_traits.js";
import { clothes_traits_all } from "./clothes_traits_all_filt.js";

// plan
// get traits file variable with all clothes info merged
// get all 11111 img traits file
// for every 11111 img traits replace clothes number with ...obj of all cothes info
// log this > traitsV1.json

// console.log(clothes_traits_all[0]);

let new_all_traits = [];

for (let i = 0; i < all_traits.length; i++) {
  const trait = all_traits[i];

  if (!isNaN(trait.Clothes)) {
    let propsToAdd = clothes_traits_all[trait.Clothes - 1]; // -1 adjust index
    let newTrait = { ...trait, ...propsToAdd };
    delete newTrait.Clothes;
    new_all_traits.push(newTrait);
  } else {
    new_all_traits.push(trait);
  }
}

log(JSON.stringify(new_all_traits, null, 4));
// delete trait.Clothes;
// const init = async () => {
// };

// init();
