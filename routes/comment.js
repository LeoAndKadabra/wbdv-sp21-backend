const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");

// get comments by movieId
router.get("/", (req, res) => {
  let filter = {};
  let limit = req.query.limit ? parseInt(req.query.limit) : Number.MAX_SAFE_INTEGER;
  if (req.query.movieId) {
    filter.movieId = req.query.movieId;
  }
  if (req.query.username) {
    filter.username = req.query.username;
  }
  Comment.find(filter).sort({createdTime: -1}).limit(limit)
  .then((result) => {
    res.status(200).json(result);
  })
  .catch((e) => {
    res.status(404).json(e);
  })
});

router.post("/", (req, res) => {
  let date = new Date(Date.now());
  let timestamp = date.getFullYear() + "-" +
      date.getMonth() + "-" +
      date.getDate() + "-" +
      date.getHours() + ":" + date.getMinutes();
  Comment.create({...req.body, createdTime: timestamp, likedUsers: []})
  .then(comment =>
    {
      console.log("creating comment:")
      console.log(comment)
      res.status(201).json(comment)
    })
  .catch(e => res.status(400).json(e));
});

router.put("/", (req, res) => {
  console.log("receiving update comment:")
  console.log(req.body)

  Comment.findOneAndUpdate({_id: req.body._id}, req.body, {new: true})
  .then((updated) => {
    console.log("updaing comment:")
    console.log(updated)
    res.status(200).json(updated);
  }).catch((err) => {
    res.status(400).json(err);
  });
});

router.delete("/", (req, res) => {
  Comment.deleteOne({_id: req.body})
  .then((result) => {
    res.status(200).json({message: "comment is deleted"});
  }).catch((err) => {
    res.status(400).json(err);
  });
});

module.exports = router;
