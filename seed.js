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
let usernames = [ 'MGustave', 'Zero', 'Agatha' ]
let bios = [
  'I appreciate the finer things in life. Always looking for the next great adventure.',
  'Along for the ride--especially if the ride involves cakes.'
  'Firm believer in happy endings.'
]
let passwords = [
  'password1',
  'password2',
  'password3'
]
// Note: These will ultimately be pulled from TMDb API
let watched_lists = [
  // watched list for MGustave
  [
    { title: , overview: , release_date: , poster_path: , comments: },
    { title: , overview: , release_date: , poster_path: , comments: }
  ],
  // watched by Zero
  [
    { title: , overview: , release_date: , poster_path: , comments: },
    { title: , overview: , release_date: , poster_path: , comments: }
  ],
  // watched by Agatha
  [
    { title: , overview: , release_date: , poster_path: , comments: },
    { title: , overview: , release_date: , poster_path: , comments: }
  ]
];
// Note: these will ultimately be pulled from TMDb API.
let to_watch_lists = [
  [
    { title: "Victor Frankenstein", overview: "Eccentric scientist Victor Von Frankenstein creates a grotesque creature in an unorthodox scientific experiment.", release_date: 2015-11-25, poster_path: "/zV7JF9OxEnOWpFhsrcR3zMUhHnn.jpg", comments: "Looks hilarioulsly gory."},
    { title: "The Danish Girl", overview: "The story of Danish painter Einar Wegener, one of the first recipients of gender reassignment surgery.", release_date: 2015-11-27, poster_path: "/wkzLMkEUBVBh55932K9vPKauObL.jpg", comments: "Is there a role Eddie Redmayne can't do?"}
  ],
  [
    { title: 'Creed', overview: 'The former World Heavyweight Champion Rocky Balboa serves as a trainer and mentor to Adonis Johnson, the son of his late friend and former rival Apollo Creed.', release_date: 2015-11-25, poster_path: "/xSE4NBFDzqedwa4AIj99r1Z7ljF.jpg" , comments: "Michael B. Jordan--at it again."},
    { title: "The Good Dinosaur", overview: "‘The Good Dinosaur’ asks the question: What if the asteroid that forever changed life on Earth missed the planet completely and giant dinosaurs never became extinct?", release_date: 2015-11-25, poster_path: "/2ZckiMTfSkCep2JTtZbr73tnQbN.jpg", comments: "Planning to take my cousin!"}
  ],
  [
    { title: "Jane Got a Gun", overview: "After her outlaw husband returns home shot with eight bullets and barely alive, Jane reluctantly reaches out to an ex-lover who she hasn't seen in over ten years to help her defend her farm when the time comes that her husband's gang eventually tracks him down to finish the job.", release_date: 2015-11-25, poster_path:  "/qg3cEqlszcU1sBb8P83hwPEEHnP.jpg", comments: "I'm all about the suspense."}
  ]
];

let gustave = new User({
  username: usernames[0],
  bio: bios[0]
  password: passwords[0]
  watched_list:
  to_watch_list:
})
