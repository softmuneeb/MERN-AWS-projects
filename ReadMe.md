code store room

if (Moralis.Units.FromWei(result.price) === '0.28') {
      // console.log(result.price);
      result.price = Moralis.Units.ETH('0.1');
      // console.log(result.price);
    }