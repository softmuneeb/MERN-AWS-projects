// why are you writing code here? explain from step 1 to end.

// Step 1. npm init -y
// Step 2. npm install jsonwebtoken
// Step 3. create an index.js file and paste the below code
import jwt from 'jsonwebtoken';
import fs from 'fs';
// openssl genrsa -out privateKey.pem 512
var privateKey = fs.readFileSync('privateKey.pem');
// openssl rsa -in privateKey.pem -pubout -out publicKey.pem
var publicKey = fs.readFileSync('publicKey.pem');
// https://my-authz-server/.well-known/jwks.json -> publicKey to be used in Custom Authentication as JWK Endpoint.

var token = jwt.sign(
  {
    sub: 'Custom JWT for Web3Auth Custom Auth',
    name: 'Mohammad Shahbaz Alam',
    email: 'shahbaz@web3auth.io',
    aud: 'urn:my-resource-server', // -> to be used in Custom Authentication as JWT Field
    iss: 'https://my-authz-server', // -> to be used in Custom Authentication as JWT Field
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  },
  privateKey,
  { algorithm: 'RS256', keyid: '1bb9605c36e{your_kid}69386830202b2d' }, // <-- This has to be present in the JWKS endpoint.
);

console.log(token);

var decoded = jwt.verify(token, publicKey);
console.log(decoded);

// Step 4. open terminal inside the vscode and type
// openssl genrsa -out privateKey.pem 512
// This is the private key used to sign the JWT.
// Step 5. inside the vscode terminal type
// openssl rsa -in privateKey.pem -pubout -out publicKey.pem
// This is the public key used to verify the JWT. This is the key that is exposed to the user.
// Store it in gist, public folder or somewhere else that is accessible to the public.
// like this enpoint: https://my-authz-server/.well-known/jwks.json
// Step 6. Configure the JWT Verifier in Web3Auth Dashboard as per the above fields of JWT.
