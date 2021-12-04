import { getContractMarketplace, getContractNft } from './smart-contracts.js';
import { parseIpfs, _doThis } from './utils.js';
import pkg from 'web3-utils';
import axios from 'axios';
const { isAddress } = pkg;

export const sellNft = async (setLoading, nftContract, tokenId, price) => {
  _doThis(async (account, web3) => {
    if (isAddress(nftContract)) {
      alert('Invalid NFT Address');
      return;
    }

    const nftmarketPlace = getContractMarketplace(web3);
    // const price = web3.utils.fromWei(
    //   await nft.methods.itemPrice().call(),
    // );
    const listingPrice = web3.utils.fromWei(
      await nftmarketPlace.methods.getListingPrice().call(),
    );

    const _howMany = Number(mintCount);
    const totalPrice = web3.utils.toWei(
      (Number(listingPrice) * _howMany).toString(),
    );

    // here we use code from twitter post of nft
    // const purchase = nft.methods.purchaseTokens(mintCount);
    const createMarketItem = nftmarketPlace.methods.createMarketItem(
      nftContract,
      tokenId,
      price,
    );
    let options = {
      from: account,
      gas: '0',
      value: listingPrice,
    };
    try {
      const estimateGas = Math.trunc(
        await createMarketItem.estimateGas(options),
      );
      options = {
        ...options,
        gas: '' + estimateGas,
      };
    } catch (e) {
      let msg = e.message.split('\n')[0].split('reverted:')[1];

      if (!msg) msg = 'Insufficient funds';

      alert(msg);
      return;
    }

    try {
      setLoading(true);
      await createMarketItem.send(options).on('confirmation', i => {
        //here
        if (i === 0) {
          setLoading(false);
          alert('DONEEEEEEEEEEEEEEEEEEEEEEEEEEE');
          // if (
          //   window.confirm(
          //     `Welcome to the Cheeky Lion Club King! Go check out your Lions on opensea.io`,
          //   )
          // ) {
          //   window.location.href = `https://opensea.io/${account}`;
          // }
        }
      });
    } catch (e) {
      setLoading(false);
      alert(e.message);
    }
  });
};

export const getNftImageUrl = async (nftContract, tokenId) => {
  const nft = getContractNft({ address: nftContract });
  const tokenURI = await nft.methods.tokenURI(tokenId).call();
  const url = parseIpfs(tokenURI);
  const metadata = (await axios.get(url)).data;
  return parseIpfs(metadata.image);
};

export const getNftCollectionName = async nftContract => {
  const nft = getContractNft({ address: nftContract });
  const name = await nft.methods.name().call();
  return name;
};

console.log(
  await getNftCollectionName('0x16951a59f9d62a2ff70fbe7fccfc0dfb1d61acc4'),
);
