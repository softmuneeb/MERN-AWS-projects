const express = require('express');
const router = require('./api');
const cors = require('cors');
const app = express(); //set up express
require('dotenv').config();

const port = process.env.PORT || 4000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(cors());
app.use(express.json());
app.use('/api', router);

app.listen(port, () => {
  console.log('port', port);
  console.log('Muneeb bro');
});
