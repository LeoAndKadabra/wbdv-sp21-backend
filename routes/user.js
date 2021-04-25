const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");
const isLoggedIn = require("../middleware");
const session = require('express-session')

// -------- Authentication ---------

// Register & Create user
router.post("/register", (req, res) => {
  const { email, username, password, address, role, gender, favGenre, favMovie } = req.body;
  console.log(req.body);
  const user = new User({ email, username, address, role, gender, favGenre, favMovie});
  User.register(user, password)
  .then((result) => {
    res.status(201).json(user);
  }).catch((e) => {
    res.status(400).json(e);
  });
});

// Login
router.post("/login", passport.authenticate('local'), (req, res) => {
  req.session["profile"] = req.user
  console.log(req.session["profile"])
  res.status(200).json(req.user);
});

// Logout
router.get("/logout", isLoggedIn, (req, res) => {
  req.logout();
  res.status(200).json({message: "successful logged out"});
});


// -------- Profile Page ---------

// Note: no need read user in server side
//      when user logged in, an entire user object has already been sent back
router.get("/profile", (req, res) => {
  const username = req.query.username;
  if (!username) {
    console.log("returning current user")
    console.log(req.session["profile"])
    if (!req.session["profile"])
      return res.status(202).json({
        username: ""
      })
    return res.status(200).json(req.session["profile"]);
  }

  if (req.user && username === req.user.username) {
    const profile = req.session["profile"];
    console.log("returning current user")
    console.log(profile)
    res.status(200).json(profile);
  } else {
    User.findOne({username: username})
    .then(result => {
      if (result) {
        res.status(200).json(result)
      } else {
        res.status(404).json({message: "user not exist"})
      }}
    ).catch(e => res.status(404).json(e))
  }
});

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