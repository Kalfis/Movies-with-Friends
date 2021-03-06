'use strict';
let express = require('express');
let router = express.Router();
let User = require('../models/user');
let request = require('request')
let Movie = require('../models/movie.js')  // requires access to the model in movie.js

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
})
.post((req, res) => {
  console.log('hit /movies/ POST route');
  // Look for a movie in the database
  Movie.findOne({
    title: req.body.title
    // movie parameter is a hypothetical movie that may or may not exist in the database
  }, function(err, movie) {
    console.log('req.body: ' + req.body);
    console.log('title: ' + req.body.title);
    console.log('movie hyp:' + movie);
    if (err) throw err;
    // If the movie title does not already exist in the db, add it.
    if (movie == undefined) {
      // create the new movie using the information passed from the ajax call in script.js
      var movie = new Movie(req.body);
      console.log("ran new Movie");
      movie.save(function(err){
          if (err) {
            console.log(err);
          } else {
            res.send(movie);
            console.log("Movie saved");
          }; // close if else
      }); // close movie.save

    //if title is already in the db

    } else {
    console.log("Movie already in database");
    }; // close if else
  // }; // ends function(err, movie)
});  // ends Movie.findOne
}); // ends .post


// Sets router constructor
router.route('/searchByTitle/:title')
// SEARCHES for movie by title in mymovies collection in database
  .get((req, res, next) => {
    console.log ('hit /movies/searchByTitle/:title');
    var title = req.params.title;
    // note: to make title search case insensitive, .toLowerCase titles before they are put in our db
    Movie.findOne({ title: title}, (err, movie) => {
      if(err) return next(err);
      if (movie == null) {
        //res.send twice was crashing the server
        //res.send("The Movie you searched for is not in 'mymovies'.");
      };
      console.log('movie profile searched by title accessed.');
      console.log("This is the data: " + movie);
      res.send(movie);
    });
  })

  // EDITS  a movie profile, selected by its title from database
  .put((req, res) => {
    var title = req.params.title;
    Movie.findOneAndUpdate({ _title: title}, { $set: req.body }, (err, movie) => {
      if(err) console.log(err);
      res.send(movie);
      console.log("Movie updated");
    });
  })

  // DELETES a movie profile, selected by its title from database
  .delete((req, res) => {
    var title = req.params.title;
    Movie.findOneAndRemove({ _title: title}, (err, movie) => {
      if(err) console.log(err);
      console.log("Movie deleted from mymovies collection");
      res.send("Movie deleleted from my movies")
    });
  });

  // SEARCHES for movie by ID. Used to show details of movies on a user's profile (accessible through id)
  router.route('/:id')
    .get((req, res, next) => {
    console.log ('hit /:id');
    var id = req.params.id;
    console.log(id);
    // res.send('Movie id entered: '+ id )
    Movie.findOne({ _id : id }, (err, movie) => {
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
