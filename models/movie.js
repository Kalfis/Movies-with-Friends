'use strict';

let mongoose = require('mongoose');

let movieSchema = new mongoose.Schema({
  title: String,
  overview: String,
  release_date: Date,
  poster_path: String,
  comments: []
});

let Movie = mongoose.model('mymovies', movieSchema);

module.exports = Movie;
