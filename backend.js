// why are you writing code here? explain from step 1 to end.

const jwt = require('jsonwebtoken');
const fs = require('fs');

const privateKey = fs.readFileSync('privateKey.pem');
const publicKey = fs.readFileSync('publicKey.pem');
const token = jwt.sign(
  {
    name: 'Muneeb Zubair Khan', // comes from DB after verifying that username and password is correct
    email: 'muneeb@web3auth.io', // comes from DB
    sub: 'Custom JWT for Web3Auth Custom Auth',
    aud: 'urn:my-resource-server', // audience server -> to be used in Custom Authentication as JWT Field
    iss: 'https://my-authz-server', // issuer server  -> to be used in Custom Authentication as JWT Field
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 10,
  },
  privateKey,
  { algorithm: 'RS256', keyid: '65e13299-711a-4417-b1af-80607131038f' }, // <-- This has to be present in the JWKS endpoint.
);
// issue token to client
console.log({ token });

// verify token got from client
const decoded = jwt.verify(token, publicKey);
const decoded_ = jwt.decode(token, { complete: true });
console.log({ decoded });
console.log({ decoded_ });
