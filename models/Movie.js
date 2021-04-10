const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const movieSchema = new Schema({
//   _id: String,
//   reviews: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: 'Review'
//     }
//   ]
// });

const movieSchema = new Schema({
  _id: String,
  reviews: []
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;