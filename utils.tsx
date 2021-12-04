import Web3 from 'web3';
// import { Toast, Alert } from "react-bootstrap";
import detectEthereumProvider from '@metamask/detect-provider';
import { requiredChainId, requiredChainIdName } from './smart-contracts.js';
import MetaMaskOnboarding from '@metamask/onboarding';

const msg_mobile = 'Please use MetaMask App!';
const msg_desk = 'Please intall MetaMask Wallet extension';
const deepLink = 'https://metamask.app.link/dapp/cheekylionclub.com/';

const msg_chain = `Please switch network to ${requiredChainIdName}!`;

export const _doThis = async (todo: any = null, prompt: any = true) => {
  const isMobile = require('is-mobile')();

  if (prompt && !MetaMaskOnboarding.isMetaMaskInstalled()) {
    if (isMobile) {
      if (window.confirm(msg_mobile)) window.location.href = deepLink;
    } else {
      if (window.confirm(msg_desk)) new MetaMaskOnboarding().startOnboarding();
    }
  }

  const ethereum: any = await detectEthereumProvider();

  if (ethereum && (prompt || (await ethereum.isConnected()))) {
    const [account] = await ethereum.request({
      method: 'eth_requestAccounts',
    });
    const chainId = await ethereum.request({
      method: 'eth_chainId',
    });

    if (chainId === requiredChainId) todo && todo(account, new Web3(ethereum));
    else alert(msg_chain);
  }
};

export const showAddress = (_address: any) => {
  return (
    _address.substr(0, 4) +
    '****' +
    _address.substr(_address.length - 4, _address.length)
  );
};
