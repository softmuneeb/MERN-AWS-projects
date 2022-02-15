const { default: axios } = require("axios");
const { log } = require("console");
const express = require("express");
const router = express.Router();
const fs = require("fs");
const zipFolder = require("zip-folder");

const api = "http://vps-97ac4d39.vps.ovh.net:4000/api";
// const api = "http://localhost:4000/api";

router.get("/", async (req, res) => {
  const data = await axios.get(api);
  res.send({ type: data.data.type });
});

router.get("/is-sardine-available/:tokenId", async (req, res) => {
  const data = await axios.get(api + "/is-sardine-available/" + req.params.tokenId);
  res.send({ success: data.data.success, message: data.data.message });
});

router.get("/is-penguin-available/:tokenId", async (req, res) => {
  const data = await axios.get(api + "/is-penguin-available/" + req.params.tokenId);
  res.send({ success: data.data.success, message: data.data.message });
});

router.post("/ninjas", async (req, res, next) => {
  // console.log({ req: req.body.metadata.tokenId,  });
  const data = await axios.post(api + "/ninjas", { metadata: req.body.metadata, image: req.body.image, JWT: req.body.JWT });
  res.send({ success: data.data.success, message: data.data.message });
});

router.post("/error", async (req, res, next) => {
  const data = await axios.post(api + "/ninjas", { metadata: req.body.metadata, image: req.body.image });
  res.send({ success: data.data.success, message: data.data.message });
});

module.exports = router;

/*

*/

// const run = async () => {
//   const res = await readFileAsync('./data.json')
//   console.log(res)
// }
// run()
