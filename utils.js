import Web3 from 'web3';
// import { Toast, Alert } from "react-bootstrap";
import detectEthereumProvider from '@metamask/detect-provider';
import { ipfsExplorer, requiredChainId, requiredChainIdName } from './smart-contracts.js';
import MetaMaskOnboarding from '@metamask/onboarding';

const msg_mobile = 'Please use MetaMask App!';
const msg_desk = 'Please intall MetaMask Wallet extension';
const deepLink = 'https://metamask.app.link/dapp/cheekylionclub.com/';

const msg_chain = `Please switch network to ${requiredChainIdName}!`;

export const _doThis = async (todo = null, prompt = true) => {
  const isMobile = require('is-mobile')();

  if (prompt && !MetaMaskOnboarding.isMetaMaskInstalled()) {
    if (isMobile) {
      if (window.confirm(msg_mobile)) window.location.href = deepLink;
    } else {
      if (window.confirm(msg_desk)) new MetaMaskOnboarding().startOnboarding();
    }
  }

  const ethereum = await detectEthereumProvider();

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

export const showAddress = _address => {
  return (
    _address.substr(0, 4) +
    '****' +
    _address.substr(_address.length - 4, _address.length)
  );
};

export const parseIpfs = uriStr => {
  const uri = new URL(uriStr);
  let url;
  if (uri.protocol === 'ipfs:') url = ipfsExplorer + uri.hostname + uri.pathname;
  else url = uriStr;

  return url;
};

// se julien video etc
export const loadImgURL = async (
  cid = 'Qmcm32sVsMYhURY3gqH7vSQ76492t5Rfxb3vsWCb35gVme',
  mime = 'image/png',
  limit = 524288,
) => {
  if (cid == '' || cid == null || cid == undefined) {
    return;
  }
  for await (const file of ipfs.get(cid)) {
    if (file.size > limit) {
      return;
    }
    const content = [];
    if (file.content) {
      for await (const chunk of file.content) {
        content.push(chunk);
      }
      return URL.createObjectURL(new Blob(content, { type: mime }));
    }
  }
};
