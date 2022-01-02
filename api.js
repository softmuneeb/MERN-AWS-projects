const { log } = require("console");
const express = require("express");
const router = express.Router();
const fs = require("fs");
const zipFolder = require("zip-folder");

router.get("/", (req, res) => {
  res.send({ type: "GET" });
});

router.get("/is-sardine-available/:tokenId", async (req, res) => {
  const tokenId = Number(req.params.tokenId);
  if (isNaN(tokenId) || tokenId <= 0 || tokenId >= 10000) {
    res.send({ success: false, message: "token id invalid" });
    return;
  }

  fs.access(`./sardinesUsed/${req.params.tokenId}`, fs.F_OK, (e) =>
    e
      ? res.send({ success: true })
      : res.send({
          success: false,
          message: "token id used for penguin merge",
        }),
  );
});

router.get("/is-penguin-available/:tokenId", async (req, res) => {
  try {
    const tokenId = Number(req.params.tokenId);
    if (isNaN(tokenId) || tokenId <= 0 || tokenId >= 10000) {
      res.send({ success: false, message: "token id invalid" });
      return;
    }

    fs.access(`./penguinsUsed/${req.params.tokenId}`, fs.F_OK, (e) =>
      e
        ? res.send({ success: true })
        : res.send({
            success: false,
            message: "token id used for penguin merge",
          }),
    );
  } catch (e) {
    e && log("server sould not go down\n", e.message);
  }
});

router.post("/ninjas", async (req, res, next) => {
  try {
    if (process.env.JWT === null || process.env.JWT === undefined) {
      res.send({ success: false, message: "JWT not set" });
      return;
    }
    if (req.body.JWT !== process.env.JWT) {
      res.send({ success: false, message: "Wrong JWT" });
      return;
    }

    const sardineTokenId = Number(req.body.metadata.sardineTokenIdUsed);
    if (
      isNaN(sardineTokenId) ||
      sardineTokenId <= 0 ||
      sardineTokenId >= 10000
    ) {
      res.send({ success: false, message: "sardine token id invalid" });
      return;
    }

    const penguinTokenId = Number(req.body.metadata.tokenId);
    if (
      isNaN(penguinTokenId) ||
      penguinTokenId <= 0 ||
      penguinTokenId >= 10000
    ) {
      res.send({ success: false, message: "penguin token id invalid" });
      return;
    }

    console.log(`sardineTokenIdUsed: ${sardineTokenId}`);
    console.log(`penguinTokenId: ${penguinTokenId}\n`);

    const path = `./penguinsUsed/${sardineTokenId}`;
    const sardinePath = `./sardinesUsed/${sardineTokenId}`;

    fs.access(path, fs.F_OK, (e) => {
      // file not exists = penguin available for penguin merge
      if (e) {
        fs.access(sardinePath, fs.F_OK, (e) => {
          if (e) {
            // file not exists = sardine available for penguin merge
            try {
              fs.writeFile(
                `./sardinesUsed/${req.body.metadata.sardineTokenIdUsed}`,
                "",
                (e) => e && console.log(e.message),
              ); // now sardine is not available penguin merge

              fs.writeFile(
                `./penguinsUsed/${req.body.metadata.tokenId}`,
                "",
                (e) => e && console.log(e.message),
              ); // now penguin is not available penguin merge

              fs.writeFile(
                `./penguinsUsed/${req.body.metadata.tokenIdBurned}`,
                "",
                (e) => e && console.log(e.message),
              ); // now penguin burned is not available penguin merge

              fs.writeFile(
                `./penguinImages/${req.body.metadata.tokenId}.png`,
                req.body.image.split(";base64,").pop(),
                { encoding: "base64" },
                (e) => e && console.log(e.message),
              );

              fs.writeFile(
                `./metadata/${req.body.metadata.tokenId}`,
                JSON.stringify(req.body.metadata, null, 4),
                (e) => e && console.log(e.message),
              ); // saving metadata of merged penguin

              res.send({ success: true });
              return;
            } catch (e) {
              (e) => e && console.log(e.message);
              res.send({ success: false, message: "error occured" });
              return;
            }
          } else {
            // file exists = sardine used for penguin merge
            res.send({
              success: false,
              message: "token id used for penguin merge",
            });
            return;
          }
        });
      } else {
        // file exists = sardine used for penguin merge
        res.send({
          success: false,
          message: "penguin token id already used for penguin merge",
        });
        return;
      }
    });
  } catch (e) {
    e && log("server sould not go down\n", e.message);
  }
});

router.post("/error", async (req, res, next) => {
  if (process.env.JWT === null || process.env.JWT === undefined) {
    res.send({ success: false, message: "JWT not set" });
    return;
  }
  if (req.body.JWT !== process.env.JWT) {
    res.send({ success: false, message: "Wrong JWT" });
    return;
  }

  fs.writeFile(
    `./error/${req.body.metadata.tokenId}`,
    JSON.stringify(req.body.metadata, null, 4),
    (e) => e && console.log(e.message),
  ); // saving metadata of merged penguin

  fs.writeFile(
    `./error/${req.body.metadata.tokenId}.png`,
    req.body.image.split(";base64,").pop(),
    { encoding: "base64" },
    (e) => e && console.log(e.message),
  );

  res.send({ success: true });
});

router.get("/zip", async (req, res) => {
  zipFolder("./", "./metadata.zip", (err) => {
    if (err) console.log(err.message);
    else {
      res.download("./metadata.zip");
    }
  });
});

router.get("/zipSardinesUsed", async (req, res) => {
  zipFolder("./sardinesUsed", "./sardinesUsed.zip", (err) => {
    if (err) console.log(err.message);
    else {
      res.download("./sardinesUsed.zip");
    }
  });
});
router.get("/zipError", async (req, res) => {
  zipFolder("./error", "./error.zip", (err) => {
    if (err) console.log(err.message);
    else {
      res.download("./error.zip");
    }
  });
});
router.get("/zipPenguinImages", async (req, res) => {
  zipFolder("./penguinImages", "./penguinImages.zip", (err) => {
    if (err) console.log(err.message);
    else {
      res.download("./penguinImages.zip");
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
