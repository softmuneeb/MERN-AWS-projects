// give rare nft to specific person, swap two images and metadatas


import { readFileSync, writeFileSync } from "fs";

const e = (e) => e && console.log(e);

export const swapFiles = async (file1, file2) => {
  const contentFile1 = readFileSync(file1);
  const contentFile2 = readFileSync(file2);

  writeFileSync(file1, contentFile2, e);
  writeFileSync(file2, contentFile1, e);
};

export const swapNft = async (imgsPath, metaPath, tokenId1, tokenId2) => {
  await swapFiles(imgsPath + tokenId1 + ".png", imgsPath + tokenId2 + ".png");
  await swapFiles(metaPath + tokenId1, metaPath + tokenId2);
};
