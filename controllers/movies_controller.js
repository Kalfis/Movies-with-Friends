'use strict';
let express = require('express');
let router = express.Router();
let User = require('../models/user');

let Movie = require('../models/movie.js')  // requires access to the model in movie.js

// create '/' route within /movies.  Accessed in browser at /movies/
// this route displays all of the database's contents, i.e. the profiles of each of
// the movies that have been selected by Users.
router.route('/')
.get((req, res, next) => {
  console.log ('hit / route in /movies => /movies/');
  Movie.find([], (err, movie) => {
    if(err) throw err;
    res.send(movie);
    console.log('this is all the contents in the movies datatabase');
  });
});

// search by title for movie in mymovies collection in database
router.route('/searchByTitle/:title')
  .get((req, res, next) => {
    console.log ('hit /movies/searchByTitle:/:title');
    var title = req.params.title;
    Movie.findOne({ title: title}, (err, movie) => {
      if(err) return next(err);
      if (movie == null) {
        res.send("The Movie you searched for is not in 'mymovies'.");
      };
      console.log('movie profile searched by title accessed.');
      console.log("This is the data: " + movie);
      res.send(movie);
    });
  });

module.exports = router;
