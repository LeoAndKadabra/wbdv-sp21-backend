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
  role: {
    type: String,
    required: true
  }
});
// passport includes username and password fields, it also make sure no duplicate user
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
