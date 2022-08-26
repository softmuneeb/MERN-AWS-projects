// Listing an ERC-721 for 10 ETH and fulfilling it https://packagegalaxy.com/javascript/@opensea/seaport-js

import pkg from '@opensea/seaport-js';
const { Seaport } = pkg;
import { ethers } from 'ethers';

const provider = new ethers.providers.JsonRpcProvider('https://eth-rinkeby.alchemyapi.io/v2/nbSKzaIzs5qSfrrjPnDSmziHeKQXQNhz');

const PB1 = '0xa827c2964536668d9d2ce10962392c328af4c131';
const PV1 = 'e88d627a33fb2514f8933550fec8fceead9fe6a0a08387011acc26eb48701828';

const PB2 = '0xa286ae2E1A0e199Bd89731efDb2d6162e23825b9';
const PV2 = 'fe4c05f39bb90a57ef97338dd231339cdcc4fadbfaee3b08bd4c401da5ce8b5e';

const offerer = PB1;
const fulfiller = PB2;
const signer = new ethers.Wallet(PV1, provider);
const signer2 = new ethers.Wallet(PV2, provider);

const seaport = new Seaport(signer);
const seaport2 = new Seaport(signer2);

const { executeAllActions } = await seaport.createOrder(
  {
    offer: [
      {
        itemType: 2, //@opensea/seaport-js/lib/constants.js
        token: '0x05fe4727d3ec1280b2224602cfe7b0c866526c33',
        identifier: '1',
      },
    ],
    consideration: [
      {
        amount: '100',
        recipient: fulfiller,
      },
    ],
  },
  offerer,
);

const order = await executeAllActions();

console.log({ order });

const { executeAllActions: executeAllFulfillActions } = await seaport2.fulfillOrder({
  order,
  accountAddress: fulfiller,
});

const transaction = await executeAllFulfillActions();

console.log({ transaction });
