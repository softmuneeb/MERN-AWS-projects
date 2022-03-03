import { clothes_traits_all } from "./clothes_traits_all.js";

const filt_clothes_traits_all = clothes_traits_all.map((trait) => {
  delete trait.tokenId;
  return trait;
});

console.log(JSON.stringify(filt_clothes_traits_all, null, 4));
