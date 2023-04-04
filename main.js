// why are you writing code here? explain from step 1 to end.

import Web3 from 'web3'
const web3 = new Web3('https://rpc-mumbai.maticvigil.com')

const privateKey =
    ' '

// First NFT mint transaction
const contract1 = new web3.eth.Contract(
    JSON.parse(
        '[ { "constant": true, "inputs": [], "name": "name", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transfer", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" } ]'
    ),
    '0x2d7882bedcbfddce29ba99965dd3cdf7fcb10a1e'
)

// test
contract1.methods.name().call().then(console.log)

const tx1 = contract1.methods.transfer(
    '0xA827c2964536668D9d2ce10962392c328af4c131',
    '1000'
)

const tx2 = contract1.methods.transfer(
    '0xA827c2964536668D9d2ce10962392c328af4c131',
    '1000'
)

// Create the combined transaction data
const combinedData = tx1.encodeABI() + tx2.encodeABI()

// Create the raw transaction object
const rawTx = {
    from: '0xa286ae2E1A0e199Bd89731efDb2d6162e23825b9',
    to: '0x2d7882bedcbfddce29ba99965dd3cdf7fcb10a1e', // can be any contract address in the same network
    value: 0,
    data: combinedData,
    gasPrice: web3.utils.toWei('40', 'gwei'),
    gas: 500000, // you may need to adjust this based on the contract's gas consumption
}

// Sign the transaction with the private key
const signedTx = await web3.eth.accounts.signTransaction(rawTx, privateKey)

// // Create the raw transaction data
const rawTxData = signedTx.rawTransaction

// Send the transaction
web3.eth.sendSignedTransaction(rawTxData).on('receipt', function (receipt) {
    console.log('Combined NFT mint transaction receipt:', receipt)
})
