const express = require("express");
const router = express.Router();
const Movie = require('../models/Movie');
const Review = require("../models/Review");

const findAllReviews = (idList) => {
  const result = []
  idList.array.forEach(element => {
    const singleReview = Review.findById(element);
    result.push(singleReview);
  });
  return result;
};


router.get("/:mid", (req, res) => {
  Movie.findById(req.params.mid, (err, movie) => {
    if (!movie) {
      new Movie({_id: req.params.mid, reviews: []}).save();
      res.status(200).json({reviews: []});
    } else {
      res.status(200).json({reviews: movie.reviews});
    }
  });
});

// router.post("/:mid", (req, res) => {
//   Movie.findById(req.params.mid).then((movie) => {
//     const newReview = new Review({
//       comment: req.body.comment,
//       rating: req.body.rating,
//       userId: req.body.userId
//     });
//     newReview.save();
//     movie.reviews.push(newReview);
//     res.status(200).json({reviews: findAllReviews(movie.reviews)});
//   });
// });

router.post("/:mid", (req, res) => {
  Movie.findById(req.params.mid).then((movie) => {
    const newReview = {
      comment: req.body.comment,
      rating: req.body.rating,
      userId: req.body.userId
    };
    movie.reviews.push(newReview);
    // res.status(200).json({reviews: movie.reviews});
    movie.save();
    res.status(200).json({reviews: movie.reviews});
  });
});

module.exports = router;