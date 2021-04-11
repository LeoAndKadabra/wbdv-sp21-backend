const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");
const isLoggedIn = require("../middleware");

const fakeAuthen = function(req, res, next) {
  console.log("during authentication");
  next();
};

// -------- Authentication ---------

// Register & Create user
router.post("/register", (req, res) => {
  const { email, username, password, address } = req.body;
  const user = new User({ email, username, address});
  User.register(user, password)
  .then((result) => {
    res.status(201).json(user);
  }).catch((e) => {
    res.status(400).json(e);
  });
});

// Login
router.post("/login", passport.authenticate('local'), (req, res) => {
  res.status(200).json(req.user);
});

// Logout


// -------- Profile Page ---------

// Note: no need read user in server side
//      when user logged in, an entire user object has already been sent back

// router.get("/profile", isLoggedIn, (req, res) => {
//   const uid = req.body.username;
//   User.findById(uid).then((result) => {
//     if (!result) {
//       res.status(404).json({message: "not found!"});
//     } else {
//       res.status(200).json({user: result})
//     }
//   }).catch((err) => {
//     console.log(err);
//     res.status(400).json({message: "bad request!"});
//   });
// });

// Update user
router.put("/", isLoggedIn, (req, res) => {
  User.findOneAndUpdate({username: req.body.username}, req.body, {new: true})
  .then((updatedUser) => {
    res.status(200).json(updatedUser);
  }).catch((err) => {
    res.status(400).json(err);
  });
});

// Delete user
router.delete("/", isLoggedIn, (req, res) => {
  User.deleteOne({username: req.body.username})
  .then((result) => {
    res.status(200).json({message: "user is deleted"});
  }).catch((err) => {
    res.status(400).json(err);
  });
});

module.exports = router;