const mongoose = require('mongoose');
const User = require('./models/User');
const Movie = require('./models/Movie');
const Review = require('./models/Comment');

mongoose.connect('mongodb://localhost:27017/movieSeeker', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  console.log("CONNECTION OPEN")
})
.catch(err => {
  console.log("CONNECTION ERROR");
  console.log(err)
});

// ----------- insert one-----------
// const u = new User({
//   username: "u1",
//   password: "p1",
//   email: 'e@'
// });
//
// u.save().then(u => {
//   console.log(u)
// })
// .catch(e => {
//   console.log(e)
// });

// ------------ insert many --------------
// ------------ insert user
const seedUsers = [
  {
    username: "u0",
    password: "p0",
    email: 'e0@'
  },
  {
    username: "u2",
    password: "p2",
    email: 'e2@'
  },
  {  username: "u3",
    password: "p2",
    email: 'e3@'}
];

User.insertMany(seedUsers)
.then(res => {
  console.log(res)
})
.catch(e => {
  console.log(e)
});

// --------- insert movie
const seedsMovie = [
  {title: 'movie1'},
  {title: 'movie2'},
  {title: 'movie3'}
]

Movie.insertMany(seedsMovie)
.then(res => {
  console.log(res)
})
.catch(e => {
  console.log(e)
});

// --------- insert review
const seedsReview = [
  {
    comment: 'comment1',
    rating: 4.5
  },
  {
    comment: 'comment2',
    rating: 3.5
  },
  {
    comment: 'comment3',
    rating: 4.7
  }
]

Review.insertMany(seedsReview)
.then(res => {
  console.log(res)
})
.catch(e => {
  console.log(e)
});