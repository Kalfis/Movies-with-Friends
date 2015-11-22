'use strict';
let express = require('express');
let router = express.Router();
let User = require('../models/user');

let Movie = require('../models/movie.js')  // requires access to the model in movie.js

app.get('/api', function(req, res){
  console.log('hit api');
  request('https://api.themoviedb.org/3/movie/550?api_key=5c47d1a627613469f840623448f6e67b', function(err, res, body){

  }).on('data', function(data){
    console.log(data)
    res.send(data)
  });

// create '/' route within /movies.  Accessed in browser at /movies/
// this route displays all of the database's contents, i.e. the profiles of each of
// the movies that have been selected by Users.
// tested OK in browser
router.route('/')
.get((req, res, next) => {
  console.log ('hit / route in /movies => /movies/');
  Movie.find([], (err, movie) => {
    if(err) throw err;
    res.send(movie);
    console.log('this is all the contents in the movies datatabase');
  });
});


})
// Sets router constructor
router.route('/searchByTitle/:title')
// SEARCHES by title for movie in mymovies collection in database
// tested OK in browser
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
  })

  // EDITS  a movie profile, selected by its title from database
  // pending to test in browser as it requires AJAX code in
  // public/js/script to be completed
  .put((req, res) => {
    var title = req.params.title;
    Movie.findOneAndUpdate({ _title: title}, { $set: req.body }, (err, movie) => {
      if(err) console.log(err);
      res.send(movie);
      console.log("Movie updated");
    });
  })

  // DELETES a movie profile, selected by its title from database
  // pending to test in browser as it requires AJAX code in
  // public/js/script to be completed
  .delete((req, res) => {
    var title = req.params.title;
    Movie.findOneAndRemove({ _title: title}, (err, movie) => {
      if(err) console.log(err);
      console.log("Movie deleted from mymovies collection");
      res.send("Movie deleleted from my movies")
    });
  });

module.exports = router;
