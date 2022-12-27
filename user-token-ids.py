from web3 import Web3
w3 = Web3(Web3.HTTPProvider('https://mainnet.infura.io/v3/3da1c863472e43d989856450d4e6889d'))
b = w3.eth.get_balance('0xdd70af84ba86f29bf437756b655110d134b5651c')
print(b)


def get_owned_pods(self, wallet_address) -> list:
    """
    To get the list of pod ids on provided params
    :param wallet_address:
    :return: list of pods ids
    """
    balance = self.owned_instance.functions.balanceOf(Web3.toChecksumAddress(wallet_address)).call()
    token_ids = []
    for incr in range(balance):
        token_ids.append(
            self.owned_instance.functions.tokenOfOwnerByIndex(Web3.toChecksumAddress(wallet_address), incr).call())
    return token_ids