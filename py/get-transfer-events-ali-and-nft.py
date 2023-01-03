# PROD

import json
import asyncio
from web3 import Web3

ali_abi_path = 'ali_abi.json'
ali_address = Web3.toChecksumAddress(
    '0xd8ee3e8e84798125ec820336380c3aa83dd6923d')

nft_abi_path = 'nft_abi.json'
nft_address = Web3.toChecksumAddress(
    '0x74a845adc5a0487887ccc6437cca2ee2e5ee8a8b')

rpc = 'wss://polygon-mainnet.g.alchemy.com/v2/7zYBPSmUWpfwef3V1q7jReNs2kXmC6Tf'

web3 = Web3(Web3.WebsocketProvider(rpc))

with open(ali_abi_path) as f:
    ali_abi = json.load(f)

with open(nft_abi_path) as f:
    nft_abi = json.load(f)

nft = web3.eth.contract(address=nft_address, abi=nft_abi)
ali = web3.eth.contract(address=ali_address, abi=ali_abi)

print('nft total supply:')
print(nft.functions.totalSupply().call())


async def log_loop(event_filter):
    while True:
        for event in event_filter.get_new_entries():
            print(event)
            await asyncio.sleep(2)

nft_transfer_event = nft.events.Transfer.createFilter(fromBlock="0x0")
ali_transfer_event = ali.events.Transfer.createFilter(fromBlock="0x0")

loop = asyncio.get_event_loop()
try:
    loop.run_until_complete(asyncio.gather(log_loop(ali_transfer_event)))
    loop.run_until_complete(asyncio.gather(log_loop(nft_transfer_event)))
finally:
    loop.close()
