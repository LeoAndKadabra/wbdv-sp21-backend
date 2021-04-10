const express = require("express");
const router = express.Router();

const verifyPassword = function(req, res, next) {
  console.log("during authentication");
  next();
};

router.get("/:uid", verifyPassword, (req, res) => {
  const uid = req.params.uid;
  res.send("You hit the GET user route!");
});

router.post("/:uid", verifyPassword, (req, res) => {
  res.send("You hit the Update user route!");
});

router.post("/", (req, res) => {
  res.send("You hit the POST user route!");3
});

module.exports = router;