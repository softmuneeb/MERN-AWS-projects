// why are you writing code here? explain from step 1 to end.

const jwt = require('jsonwebtoken');
const fs = require('fs');

const publicKey = fs.readFileSync('publicKey.pem');
const token =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjY1ZTEzMjk5LTcxMWEtNDQxNy1iMWFmLTgwNjA3MTMxMDM4ZiJ9.eyJuYW1lIjoiTXVuZWViIFp1YmFpciBLaGFuIiwiZW1haWwiOiJzaGFoYmF6QHdlYjNhdXRoLmlvIiwic3ViIjoiQ3VzdG9tIEpXVCBmb3IgV2ViM0F1dGggQ3VzdG9tIEF1dGgiLCJhdWQiOiJ1cm46bXktcmVzb3VyY2Utc2VydmVyIiwiaXNzIjoiaHR0cHM6Ly9teS1hdXRoei1zZXJ2ZXIiLCJpYXQiOjE2Njk1NTI4MDUsImV4cCI6MTY2OTU1Mjg2NX0.tPXLHkDFO-YRidQAxLrJGkkSFBGJuYB7-X_X9HHINiTw2leu1ft_qeN7fk8mEyIad70JHnyccGADSekpq33jRg';

const decoded = jwt.verify(token, publicKey);
console.log({ decoded });
