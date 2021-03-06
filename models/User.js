const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String
  },
  address: {
    type: String
  },
  gender: {
    type: String
  },
  favGenre: {
    type: String
  },
  favMovie: {
    type: String
  },
  image: {
    type: String
  },
  isAdmin: {
    type: Boolean
  },
  likedComments: [String],
  numberDeleted: {
    type: Number
  }
});
// passport includes username and password fields, it also make sure no duplicate user
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
