// dependencies
const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/", async (req, res) => {
  res.send({ message: "Assalamo Alaikum" });
});

router.get("/metadata/:tokenId", async (req, res) => {
  const data = fs.readFileSync("./metadata/1", "utf8");
  if (Number(req.params.tokenId) < 10) res.send(JSON.parse(data));
  else res.send(fs.readFileSync("./metadata/pre_reveal", "utf8"));
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
