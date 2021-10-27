const express = require('express');
const router = express.Router();
// get a list of ninjas from the de
router.get('/ninjas', (req, res) => {
  res.send({ type: 'GET' });
});
// add new in db
router.post('/ninjas', async (req, res, next) => {
  try {
    const ninja = req.body;
    res.send({ type: 'POST', ...ninja });
  } catch (e) {
    next(e);
  }
});
module.exports = router;
