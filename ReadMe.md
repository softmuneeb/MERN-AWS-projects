
todo major:

done major:
* getTransferEvents 10K + results handle
* const os_seaport = ;
* const os_wyvern = ;

todos small improvemets:
* getTransaction vs getTransactionReceipt speed comparison
* getTransaction vs getTransactionReceipt ERC20 token trades detect

todo small improv code view
* saparate getEventsWithCombinedTokenIdsInSingleSale and getPrices

ideas:
* loopholes, if someone sells nft a higher cost to his own wallet?

output 1:
main.js"
{ fromBlock: 15149828, toBlock: 15149828 }
{ events: 8 }
{ eventsAll: 8 }
{ eventsWithoutMints: 8 }
{ eventsWithCombinedTokenIdsInSingleSale: 3 }
{ i: '1/3' }
{ i: '2/3' }
{ i: '3/3' }
{ eventsOpensea: 2 }
[
  {
    from: '0x99799dBb5A66B2ED2499524a741AB7911236db1C',
    tokenIds: [ '7169' ],
    transactionHash: '0x1083a4a4002cdd64af22266cca7e394d59864c5c00f5d8e04c1eb7aad7cd02bc',
    to: '0x00000000006c3852cbEf3e08E8dF289169EdE581',
    value: '171700000000000000',
    valueEther: '0.1717'
  },
  {
    from: '0x20542dFfc2F7A51CBc087F54fcAfD9FFd8B5C899',
    tokenIds: [ '9585' ],
    transactionHash: '0x0cddeac7332668e3a35064f7617c00a3d23dc5a0c8473547db9a104c0fa0bc7b',
    to: '0x00000000006c3852cbEf3e08E8dF289169EdE581',
    value: '172000000000000000',
    valueEther: '0.172'
  }
]


output 2:
node main.js"

{ fromBlock: 14748168, toBlock: 15148168 }
err Returned error: query returned more than 10000 results
{ mid: 14949662 }
{ fromBlock: 14748168, toBlock: 14949662 }
{ events: 8314 }
{ fromBlock: 14949663, toBlock: 15148168 }
{ events: 2958 }
{ events: 11272 }
{ eventsWithoutMints: 11272 }
{ i: '0/11272' }
{ i: '1/11272' }
{ i: '2/11272' }
{ i: '3/11272' }
{ i: '4/11272' }
{ i: '5/11272' }

store:
console.log({ value, from, tokenId });

100 300

200 mid

floor(1.6)
1

ceil(1.1)
2

round(1.6)
2

round(1.4)
1