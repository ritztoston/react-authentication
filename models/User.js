const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define model
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});
// Save hook
userSchema.pre('save', function(next) {
  const user = this;

  bcrypt.genSalt(10, function(err, salt) {
    if (err) {return next(err)}

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) { return next(err)}

      user.password = hash;
      next();
    })
  })
});


// Create and export model
module.exports = User = mongoose.model('users', userSchema);