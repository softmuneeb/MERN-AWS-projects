const express = require('express');
const router = express.Router();
const fs = require('fs');
const zipFolder = require('zip-folder');

router.get('/', (req, res) => {
  res.send({ type: 'GET' });
});

router.get('/is-sardine-available/:tokenId', async (req, res) => {
  const tokenId = Number(req.params.tokenId);
  if (isNaN(tokenId) || tokenId <= 0 || tokenId >= 10000) {
    res.send({ success: false, message: 'token id invalid' });
    return;
  }

  fs.access(`./sardinesUsed/${req.params.tokenId}`, fs.F_OK, e =>
    e
      ? res.send({ success: true })
      : res.send({
          success: false,
          message: 'token id used for penguin merge',
        }),
  );
});

// add new in db
router.post('/ninjas', async (req, res, next) => {
  if (process.env.JWT === null || process.env.JWT === undefined) {
    res.send({ success: false, message: 'JWT not set' });
    return;
  }
  if (req.body.JWT !== process.env.JWT) {
    res.send({ success: false, message: 'Wrong JWT' });
    return;
  }

  const path = `./sardinesUsed/${req.params.tokenId}`;
  const tokenId = Number(req.params.tokenId);

  if (tokenId <= 0 || tokenId >= 10000) {
    res.send({ success: false, message: 'token id invalid' });
    return;
  }

  fs.access(path, fs.F_OK, e => {
    if (e) {
      // file not exists = sardine available for penguin merge
      try {
        fs.writeFile(
          `./sardinesUsed/${req.body.metadata.tokenId}`,
          '',
          e => e && console.log(e.message),
        ); // now sardine is not available penguin merge

        fs.writeFile(
          `./metadata/${req.body.metadata.tokenId}`,
          JSON.stringify(req.body.metadata, null, 4),
          e => e && console.log(e.message),
        ); // saving metadata of merged penguin

        res.send({ success: true });
        return;
      } catch (e) {
        e => e && console.log(e.message);
        res.send({ success: false, message: 'error occured'  });
        return;
      }
    }

    // file exists = sardine used for penguin merge
    res.send({ success: false, message: 'token id used for penguin merge' });
    return;
  });
});

router.get('/zip', async (req, res) => {
  zipFolder('./metadata', './metadata.zip', err => {
    if (err) console.log(err.message);
    else {
      res.download('./metadata.zip');
    }
  });
});

router.get('/zipSardinesUsed', async (req, res) => {
  zipFolder('./sardinesUsed', './sardinesUsed.zip', err => {
    if (err) console.log(err.message);
    else {
      res.download('./sardinesUsed.zip');
    }
  });
});
module.exports = router;

/*

*/

// const run = async () => {
//   const res = await readFileAsync('./data.json')
//   console.log(res)
// }
// run()
