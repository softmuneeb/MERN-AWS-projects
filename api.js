const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.send({ type: "hi 11 " });
});

router.get("/is-sardine-available/:tokenId", async (req, res) => {
  res.send({ success: data.data.success, message: data.data.message });
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
