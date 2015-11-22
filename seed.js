'use strict';

let User = require('./models/user')
let Movie = require('./models/movie')
let mongoose = require('mongoose');

// connect to mongodb
mongoose.connect('mongodb://localhost/moviegoerApp');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', (callback) => {
  console.log('Mongoose Connected');
});

// should username be plural?
let username = [ 'MGustave', 'Zero', 'Agatha' ]
let bio = [
  'I appreciate the finer things in life. Always looking for the next great adventure.',
  'Along for the ride--especially if the ride involves cakes.'
  'Firm believer in happy endings.'
]
let password = [
  'password1',
  'password2',
  'password3'
]
// leaving watched_list empty for now, to test API data retrieval later.
let watched_list = [];
// leaving watched_list empty for now, to test API data retrieval later.
let to_watch_list = [];
