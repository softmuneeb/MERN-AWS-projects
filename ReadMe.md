why do you wrote this code? what this code do? write steps from start to end.

1. client sends his email and password to auth server
2. server creates a jwt token and send to client, jwt can also contain an expiry date after which it becomes useless
3. client uses public key of server to decode this jwt token to get back his email, name and related data
4. client passes this token to server for future requests
5. if the token is expired or invalid then do not allow user to perform the action


node backend.js
{
  token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjY1ZTEzMjk5LTcxMWEtNDQxNy1iMWFmLTgwNjA3MTMxMDM4ZiJ9.eyJuYW1lIjoiTXVuZWViIFp1YmFpciBLaGFuIiwiZW1haWwiOiJzaGFoYmF6QHdlYjNhdXRoLmlvIiwic3ViIjoiQ3VzdG9tIEpXVCBmb3IgV2ViM0F1dGggQ3VzdG9tIEF1dGgiLCJhdWQiOiJ1cm46bXktcmVzb3VyY2Utc2VydmVyIiwiaXNzIjoiaHR0cHM6Ly9teS1hdXRoei1zZXJ2ZXIiLCJpYXQiOjE2Njk1NTI4MDUsImV4cCI6MTY2OTU1Mjg2NX0.tPXLHkDFO-YRidQAxLrJGkkSFBGJuYB7-X_X9HHINiTw2leu1ft_qeN7fk8mEyIad70JHnyccGADSekpq33jRg'
}

node frontend.js
{
  decoded: {
    name: 'Muneeb Zubair Khan',
    email: 'shahbaz@web3auth.io',
    sub: 'Custom JWT for Web3Auth Custom Auth',
    aud: 'urn:my-resource-server',
    iss: 'https://my-authz-server',
    iat: 1669552805,
    exp: 1669552865
  }
}