import { getContractMarketplace } from './smart-contracts.js';
import { _doThis } from './utils.jsx';
import { isAddress } from 'web3-utils';
export const sellNft = (setLoading, nftContract, tokenId, price) => {
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
