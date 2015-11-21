'use strict';
let express = require('express');
let router = express.Router();
let User = require('../models/user');

let Movie = require('../models/movie.js')  // requires access to the model in movie.js

router.route('/') // creates / route within /movies, i.e. /movies/
      .get((req, res, next) => {
        console.log ('hit / route in /movies');
        Movie.find([], (err, movie) => {
          if(err) throw err;
          console.log('this is the movie data');
          res.send(movie);
        });
      })
        .post((req, res, next) => {
          // let newUser = new User({
          //   name: req.body.name,
          //   password: req.body.password
          // });
          // console.log(newUser);
          // newUser.save((err) => {
          //   if (err) throw err;
          //   console.log('new user saved');
          // });
          // res.send('saved');
        });

  module.exports = router;
