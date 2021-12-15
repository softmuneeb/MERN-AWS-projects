const express = require('express');
const router = require('./api');
const cors = require('cors');
const app = express(); //set up express
require('dotenv').config();

const port = process.env.PORT || 4000;


// const fs = require('fs');
// fs.rename('penguinsUsed/88', 'penguinsUsed/88_', e => e && console.log(e));
// fs.rename('penguinsUsed/93', 'penguinsUsed/93_', e => e && console.log(e));

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ limit: '2mb' }));
app.use(cors());
app.use(express.json());
app.use('/api', router);

app.listen(port, () => {
  console.log('port', port);
  console.log('Muneeb bro');
});
