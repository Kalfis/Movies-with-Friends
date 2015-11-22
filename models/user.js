'use strict';
let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
// Define the rounds/iterations the bcrypy key setup phase uses
let SALT_WORK_FACTOR = 10;

let userSchema = new mongoose.Schema({
  username: String,
  created_at: Date,
  updated_at: Date,
  bio: String,
  password: String,
  watched_list: [],
  to_watch_list: []
  // consider adding comments to user?
});

let User = mongoose.model('User', userSchema);

// Before saving a password, make sure it is encrypted.
userSchema.pre('save', (next) => {
    let user = this;

  // hash the password only if it's new or has been modified
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    // hash the password and the newly generated salt
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      // override cleartext password with hashed password
      user.password = hash;
      next();
    });
  });
});

// Implement password verification
userSchema.methods.authenticate = function(password, callback) {
  // compare method that returns a boolean
  // Determine if the first argument once encrypted corres. to the second argument
  bcrypt.compare(password, this.password, (err, isMatch) => {
    callback( null, isMatch);
  });
}

module.exports = User;
