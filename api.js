const express = require("express");
const router = express.Router();
const fs = require("fs");
const zipFolder = require("zip-folder");
// get a list of ninjas from the de
router.get("/", (req, res) => {
  res.send({ type: "GET" });
});
// add new in db
router.post("/ninjas", async (req, res, next) => {
  if (process.env.JWT === null || process.env.JWT === undefined) {
    res.send({ message: "JWT not set" });
  }
  if (req.body.JWT !== process.env.JWT) {
    res.send({ message: "Wrong JWT" });
    return;
  }
  console.log("req: ", req);
  console.log("req: ", req.body);
  try {
    fs.writeFile(
      "./metadata/" + req.body.metadata.tokenId + "__" + Date.now() + ".json",
      JSON.stringify(req.body.metadata, null, 4),
      (e) => e && console.log(e.message)
    );
    res.send({ type: "POST" });
  } catch (e) {
    console.log("e: ", e.message);
  }

  //zipFolder
});

router.get("/zip", async (req, res) => {
  zipFolder("./metadata", "./metadata.zip", (err) => {
    if (err) console.log(err.message);
    else {
      res.download("./metadata.zip");
    }
  });
});
module.exports = router;
