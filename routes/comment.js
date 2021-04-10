const express = require("express");
const router = express.Router();

router.get("/:cid/", (req, res) => {
  res.send("You hit the GET Comments route!");
});

router.post("/", (req, res) => {
  res.send("You hit the POST Comments route!");
});

module.exports = router;
