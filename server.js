'use strict';
let express = require('express');
let logger = require('morgan');
let path = require('path');
let bodyParser = require('body-parser');

// require our routes
let userRoutes = require('./controllers/users_controller');
let movieRoutes = require('./controllers/movies_controller');

let app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

let User = require('./models/user');
let Movie = require('./models/movie');

let mongoose = require('mongoose');

let connStr = 'mongodb://localhost:27017/mongoose-bcrypt-test';
mongoose.connect(connStr, (err) => {
  if (err) throw err;
  console.log('Successfully connected to MongoDB');
})

// test user
let testUser = new User({
  username: 'pizzerina',
  password: 'password123'
})

// save test user to database
// testUser.save( (err) => {
//   if (err) throw err;
//
//   // fetch user & test password verification
//   User.findOne({ username: 'maggie'}, (err, user) => {
//     if (err) throw err;
//
//     // test a matching password
//     user.authenticate('password123', (err, isMatch) => {
//       if (err) throw err;
//       console.log('password123:', isMatch)
//     });
//
//     // test a failing password
//     user.authenticate('123password', (err, isMatch) => {
//       if (err) throw err;
//       console.log('123password:', isMatch);
//     })
//   })
// //   ends findOne
// })
// // ends .save

// connect to our database, moviegoerApp
// mongoose.connect('mongodb://localhost/moviegoerApp');
//
// let db = mongoose.connection;
// db.on('error', console.error.bind(console, 'Connection error:'));
// db.once('open', (callback) => {
//   console.log('Mongoose Connected');
// });

app.get('/', function(req, res) {
  console.log('hit /');
  res.send('hello!');
})

// Register our routes
// all routes starting with /users will be in userRoutes
app.use('/users', userRoutes);
// all routes starting with /movies will be in movieRoutes
// app.use('/movies', movieRoutes);

let server = app.listen(3000, () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log('express running', host, port);
});
