// dependencies
const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/", async (req, res) => {
  res.send({ message: "Assalamo Alaikum" });
});

router.get("/metadata/:tokenId", async (req, res) => {
  if (Number(req.params.tokenId) < 10) {
    const metadata = fs.readFileSync("./metadata/" + req.params.tokenId, "utf8");
    res.send(JSON.parse(metadata));
  } else res.send(fs.readFileSync("./metadata/pre_reveal", "utf8"));
});

router.get("/is-penguin-available/:tokenId", async (req, res) => {
  res.send({ success: data.data.success, message: data.data.message });
});

router.post("/ninjas", async (req, res, next) => {
  res.send({ success: data.data.success, message: data.data.message });
});

router.post("/error", async (req, res, next) => {
  const data = await axios.post(api + "/ninjas", { metadata: req.body.metadata, image: req.body.image });
  res.send({ success: data.data.success, message: data.data.message });
});

module.exports = router;
