const express = require("express");
const router = express.Router();
const User = require("../models/User");

const fakeAuthen = function(req, res, next) {
  console.log("during authentication");
  next();
};

// Create user
router.post("/", fakeAuthen,(req, res) => {
  const uid = req.body.username;
  User.findById(uid).then((result) => {
    if (result) {
      res.status(409).json({message: "username existed1"});
    } else {
      const newUser = new User({
        _id: uid,
        email: req.body.email,
        address: req.body.address
      });
      newUser.save();
      res.status(201).json({user: newUser});
    }
  }).catch((e) => {
    console.log(e);
    res.status(400).json({message: "bad request!"});
  })
});

// Read user
router.get("/", fakeAuthen, (req, res) => {
  const uid = req.body.username;
  User.findById(uid).then((result) => {
    if (!result) {
      res.status(404).json({message: "not found!"});
    } else {
      res.status(200).json({user: result})
    }
  }).catch((err) => {
    console.log(err);
    res.status(400).json({message: "bad request!"});
  });
});

// Update user
router.put("/", fakeAuthen, (req, res) => {
  const uid = req.body.username;
  const updatedUser = {
    _id: uid,
    email: req.body.email,
    address: req.body.address
  }
  User.findByIdAndUpdate(uid, updatedUser, {new: true}).then((updated) => {
    if (!updated) {
      res.status(404).json({message: "not found!"});
    } else {
      res.status(200).json({user: updated});
    }
  }).catch((err) => {
    console.log(err);
    res.status(400).json({message: "bad request!"});
  });
});

// Delete user
router.delete("/", fakeAuthen, (req, res) => {
  const uid = req.body.username;
  User.findByIdAndDelete(uid);
  res.status(200).json({message: "deleted!"});
});

module.exports = router;