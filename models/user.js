'use strict';
let mongoose = require('mongoose');
let bcrypt = require('bcrypt');

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

let user = mongoose.model('User', userSchema);

module.exports = user;
