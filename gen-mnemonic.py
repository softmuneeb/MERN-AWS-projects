from mnemonic import Mnemonic
from web3 import Web3
w3 = Web3()

mnemo = Mnemonic("english")
words = mnemo.generate(strength=256)
print(words)

w3.eth.account.enable_unaudited_hdwallet_features()
account = w3.eth.account.from_mnemonic(words, account_path="m/44'/60'/0'/0/0")
print(account.address)
print(account.key)
