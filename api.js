const express = require('express');
const router = express.Router();
const fs = require('fs');
// get a list of ninjas from the de
router.get('/', (req, res) => {
  res.send({ type: 'GET' });
});
// add new in db
router.post('/ninjas', async (req, res, next) => {
  console.log('req: ', req);
  console.log('req: ', req.body);
  try {
    fs.writeFile(
      'l' + Date.now() + 'File.json',
      req.body.metadata,
      e => e && console.log(e.message),
    );
    res.send({ type: 'POST' });
  } catch (e) {
    console.log('e: ', e.message);
  }
});
module.exports = router;
