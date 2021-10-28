const express = require('express');
const router = express.Router();
const fs = require('fs');
const zipFolder = require('zip-folder');
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
      './metadata/' + Date.now() + 'File.json',
      req.body.metadata,
      e => e && console.log(e.message),
    );
    res.send({ type: 'POST' });
  } catch (e) {
    console.log('e: ', e.message);
  }

  //zipFolder
});

router.get('/zip', async (req, res) => {
  zipFolder('./metadata', './metadata.zip', err => {
    if (err) console.log(err.message);
    else {
      res.download('./metadata.zip');
    }
  });
});
module.exports = router;
