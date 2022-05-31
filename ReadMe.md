code store room

if (Moralis.Units.FromWei(result.price) === '0.28') {
      // console.log(result.price);
      result.price = Moralis.Units.ETH('0.1');
      // console.log(result.price);
    }


    console.log({
        sellingPrice: Moralis.Units.FromWei(sellingPrice + ''),
        ownerRoyalty: Moralis.Units.FromWei(ownerRoyalty + ''),
        reward: Moralis.Units.FromWei(reward + ''),
      });


      console.log(
        `${result.block_timestamp}, '${result.seller_address}', ${result.token_ids[0]}, ${Moralis.Units.FromWei(mint.price + '')}, ${Moralis.Units.FromWei(sellingPrice + '')}, ${upSold*100}%, ${rewardRoyalty*100}%, ${Moralis.Units.FromWei(reward + '')} `,
      );



/*
moralis options:

from_block
to_block
from_date: '26 May 2021 00:00:00 GMT',
to_date: '26 May 2021 00:00:00 GMT'
limit: '3'
*/
