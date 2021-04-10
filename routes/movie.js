const express = require("express");
const router = express.Router();

router.get("/:mid/", (req, res) => {
  res.send("You hit the GET Movies route!");
});

router.post("/", (req, res) => {
  res.send("You hit the POST Movies route!");
});

module.exports = router;