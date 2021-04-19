const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  username: {
    type: String,
    ref: 'User',
    required: true
  },
  movieId: {
    type: String,
    required: true
  },
  createdTime: {
    type: String,
    required: true
  }
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;