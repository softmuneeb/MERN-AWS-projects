const express = require('express');
const router = express.Router();
const fs = require('fs');
// get a list of ninjas from the de
router.get('/', (req, res) => {
  res.send({ type: 'GET' });
});
// add new in db
router.post('/ninjas', async (req, res, next) => {
  try {
    const ninja = req.body;
    fs.writeFile(
      Date.now() + 'File.txt' + ninja,
      e => e && console.log(e.message),
    );
    res.send({ type: 'POST', ...ninja });
  } catch (e) {
    next(e);
  }
});
module.exports = router;
