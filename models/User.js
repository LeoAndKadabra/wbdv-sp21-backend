const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  address: {
    type: String
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
