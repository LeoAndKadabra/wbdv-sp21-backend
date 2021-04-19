const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");

// get comments by movieId
router.get("/", (req, res) => {
  const movieId = req.query.movieId;
  const username = req.query.username;
  let filter = {};
  if (username) {
    // res.status(200).json({message: "search by username: " + username})
    filter = {username: username};
  } else if (movieId) {
    // res.status(200).json({message: "search by movieId: " + movieId})
    filter = {movieId: movieId};
  } else {
    res.status(400).json({message: "need movieId or userId"});
  }
  if (username || movieId) {
    Comment.findOne(filter)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((e) => {
      res.status(404).json(e);
    })
  }
});

router.post("/", (req, res) => {
  let date = new Date(Date.now());
  let timestamp = date.getHours() + ":" + date.getMinutes() +
      "-" + (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
  Comment.create({...req.body, createdTime: timestamp})
  .then(comment => res.status(201).json(comment))
  .catch(e => res.status(400).json(e));
});

module.exports = router;
