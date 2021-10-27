const express = require('express');
const router = require('./api');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express(); //set up express
require('dotenv').config();
const port = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());
//initzation of routes
app.use('/api', router);
// app.use((err, req, res, next) => {
//   res.status(422).send({ error: err.message });
// });
//Listen for req
app.listen(port, () => {
  console.log('port', port);
  console.log('Muneeb bro');
});
