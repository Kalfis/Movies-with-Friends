'use strict';

let User = require('./models/user');
let Movie = require('./models/movie')
let mongoose = require('mongoose');
// let json = JSON.parse(data);

// connect to mongodb
mongoose.connect('mongodb://localhost/moviegoerApp');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', (callback) => {
  console.log('Mongoose Connected');
});

let usernames = [ 'MGustave', 'Zero', 'Agatha', 'Cat' ]
let bios = [
  'I appreciate the finer things in life. Always looking for the next great adventure.',
  'Along for the ride--especially if the ride involves cakes.',
  'Firm believer in happy endings.',
  'Meow.'
]
let passwords = [
  'password1',
  'password2',
  'password3',
  'password4'
]
// Note: These will ultimately be pulled from TMDb API
let watchedLists = [
  // watched list for MGustave
  [
    { title: "Spectre", overview: "A cryptic message from Bond’s past sends him on a trail to uncover a sinister organization", release_date: '2015-11-06', poster_path: "/1n9D32o30XOHMdMWuIT4AaA5ruI.jpg", comments: "Seven thumbs up!"}
  ],
  // watched by Zero
  [
    { title: "Ronaldo", overview: "Filmed over 14 months with unprecedented access into the inner circle of the man and the sport, this is the first official and fully authorised film of one of the most celebrated figures in football.", release_date: "2015-11-09", poster_path: "/kW5J5u5a7J4MtZi8CNAyFT6nUoJ.jpg", comments: "Super in-depth. Never a dull moment."},
    { title: "Heist", overview: "A father is without the means to pay for his daughter's medical treatment. As a last resort, he partners with a greedy co-worker to rob a casino. When things go awry they're forced to hijack a city bus.", release_date: "2015-11-13", poster_path: "/t5tGykRvvlLBULIPsAJEzGg1ylm.jpg", comments: "Your classic family crime duo city bus takeover situation." }
  ],
  // watched by Agatha
  [
    { title: "The Hunger Games: Mockingjay - Part 2", overview: "With the nation of Panem in a full scale war, Katniss confronts President Snow in the final showdown.", release_date: "2015-11-18", poster_path: "/l3tmn2WOAIgLyGP7zcsTYkl5ejH.jpg"},
    { title: "The 33", overview: "Based on a true story about the collapse at the mine in San Jose, Chile that  left 33 miners isolated underground for 69 days.", release_date: "2015-11-13", poster_path: "/cQ21yxf5seYrGzjFmMzCkX9PHa2.jpg"}
  ],
  // watched by Cat--will compare ObjectIds with Agatha's to see if they are identical.
  // also check mymovies to see if the total number of movies is 5 (means no duplicates) or 7 (means duplicates)
  // note: removing comments from Agatha and Cat to remove that variable.
  [
    { title: "The Hunger Games: Mockingjay - Part 2", overview: "With the nation of Panem in a full scale war, Katniss confronts President Snow in the final showdown.", release_date: "2015-11-18", poster_path: "/l3tmn2WOAIgLyGP7zcsTYkl5ejH.jpg"},
    { title: "The 33", overview: "Based on a true story about the collapse at the mine in San Jose, Chile that  left 33 miners isolated underground for 69 days.", release_date: "2015-11-13", poster_path: "/cQ21yxf5seYrGzjFmMzCkX9PHa2.jpg"}
  ]
]
// Note: these will ultimately be pulled from TMDb API.
let toWatchLists = [
  // MGustave's movies to watch
  [
    { title: "Victor Frankenstein", overview: "Eccentric scientist Victor Von Frankenstein creates a grotesque creature in an unorthodox scientific experiment.", release_date: "2015-11-25", poster_path: "/zV7JF9OxEnOWpFhsrcR3zMUhHnn.jpg", comments: "Looks hilarioulsly gory."},
    { title: "The Danish Girl", overview: "The story of Danish painter Einar Wegener, one of the first recipients of gender reassignment surgery.", release_date: "2015-11-27", poster_path: "/wkzLMkEUBVBh55932K9vPKauObL.jpg", comments: "Is there a role Eddie Redmayne can't do?"}
  ],
  // Zero's movies to watch
  [
    { title: 'Creed', overview: 'The former World Heavyweight Champion Rocky Balboa serves as a trainer and mentor to Adonis Johnson, the son of his late friend and former rival Apollo Creed.', release_date: "2015-11-25", poster_path: "/xSE4NBFDzqedwa4AIj99r1Z7ljF.jpg" , comments: "Michael B. Jordan--at it again."},
    { title: "The Good Dinosaur", overview: "‘The Good Dinosaur’ asks the question: What if the asteroid that forever changed life on Earth missed the planet completely and giant dinosaurs never became extinct?", release_date: "2015-11-25", poster_path: "/2ZckiMTfSkCep2JTtZbr73tnQbN.jpg", comments: "Planning to take my cousin!"}
  ],
  // Agatha's movies to watch
  [
    { title: "Jane Got a Gun", overview: "After her outlaw husband returns home shot with eight bullets and barely alive, Jane reluctantly reaches out to an ex-lover who she hasn't seen in over ten years to help her defend her farm when the time comes that her husband's gang eventually tracks him down to finish the job.", release_date: "2015-11-25", poster_path:  "/qg3cEqlszcU1sBb8P83hwPEEHnP.jpg"}
  ],
  // movies watched by Cat--match Agatha's again--let's see if ObjectIds are identical or different
  [
    { title: "Jane Got a Gun", overview: "After her outlaw husband returns home shot with eight bullets and barely alive, Jane reluctantly reaches out to an ex-lover who she hasn't seen in over ten years to help her defend her farm when the time comes that her husband's gang eventually tracks him down to finish the job.", release_date: "2015-11-25", poster_path:  "/qg3cEqlszcU1sBb8P83hwPEEHnP.jpg"}
  ]
];

let gustave = new User({
  username: usernames[0],
  bio: bios[0],
  password: passwords[0]
})

gustave.save(function(err) {
  if (err) {
    console.log(err)
  } else {
    let gustaveWatched1 = new Movie ({
      title: watchedLists[0][0]["title"],
      overview: watchedLists[0][0]["overview"],
      release_date: watchedLists[0][0]["release_date"],
      poster_path: watchedLists[0][0]["poster_path"],
      comments: watchedLists[0][0]["comments"]
    });
    gustaveWatched1.save(function(err) {
      if (err) {
        console.log(err)
      } else {
        // We're using ._id to be able to populate users using reference to movies.
        gustave.watchedList.push(gustaveWatched1._id);
        let gustaveToWatch1 = new Movie ({
          title: toWatchLists[0][0]["title"],
          overview: toWatchLists[0][0]["overview"],
          release_date: toWatchLists[0][0]["release_date"],
          poster_path: toWatchLists[0][0]["poster_path"],
          comments: toWatchLists[0][0]["comments"]
        });
        gustaveToWatch1.save(function(err) {
          if (err) {
            console.log(err);
          } else {
            gustave.toWatchList.push(gustaveToWatch1._id);
            let gustaveToWatch2 = new Movie({
              title: toWatchLists[0][1]["title"],
              overview: toWatchLists[0][1]["overview"],
              release_date: toWatchLists[0][1]["release_date"],
              poster_path: toWatchLists[0][1]["poster_path"],
              comments: toWatchLists[0][1]["comments"]
            });
            gustaveToWatch2.save( function (err) {
              if (err) {
                console.log(err);
              } else {
                gustave.toWatchList.push(gustaveToWatch2._id);
                gustave.save();
                console.log('IDs of movies Gustave has watched: ', gustave.watchedList);
                console.log('IDs of Movies MGustave wants to watch: ', gustave.toWatchList)
              } //ends else statement
            }) //ends gustaveToWatch2.save
          } // ends else statement
        }) // ends gustaveToWatch1.save
      } // ends else for gustaveWatched1.save
    }) // ends gustaveWatched1.save
  } // ends else for gustave.save
}) //ends gustave.save


let zero = new User({
  username: usernames[1],
  bio: bios[1],
  password: passwords[1]
})

zero.save(function(err) {
  if (err) {
    console.log(err)
  } else {
    let zeroWatched1 = new Movie({
      title: watchedLists[1][0]["title"],
      overview: watchedLists[1][0]["overview"],
      release_date: watchedLists[1][0]["release_date"],
      poster_path: watchedLists[1][0]["poster_path"],
      comments: watchedLists[1][0]["comments"]
    });
    zeroWatched1.save( function(err) {
      if (err) {
        console.log(err)
      } else {
        zero.watchedList.push(zeroWatched1._id);
        let zeroWatched2 = new Movie ({
          title: watchedLists[1][1]["title"],
          overview: watchedLists[1][1]["overview"],
          release_date: watchedLists[1][1]["release_date"],
          poster_path: watchedLists[1][1]["poster_path"],
          comments: watchedLists[1][1]["comments"]
        });
        zeroWatched2.save(function(err) {
          if (err){
            console.log(err)
          } else {
            zero.watchedList.push(zeroWatched2._id);
            let zeroToWatch1 = new Movie ({
              title: toWatchLists[1][0]["title"],
              overview: toWatchLists[1][0]["overview"],
              release_date: toWatchLists[1][0]["release_date"],
              poster_path: toWatchLists[1][0]["poster_path"],
              comments: toWatchLists[1][0]["comments"]
            });
            zeroToWatch1.save(function(err) {
              if (err) {
                console.log(err)
              } else {
                zero.toWatchList.push(zeroToWatch1._id);
                let zeroToWatch2 = new Movie ({
                  title: toWatchLists[1][1]["title"],
                  overview: toWatchLists[1][1]["overview"],
                  release_date: toWatchLists[1][1]["release_date"],
                  poster_path: toWatchLists[1][1]["poster_path"],
                  comments: toWatchLists[1][1]["comments"]
                })
                zeroToWatch2.save(function(err) {
                  if (err) {
                    console.log(err)
                  } else {
                    zero.toWatchList.push(zeroToWatch2._id);
                    zero.save();
                    console.log('IDs of movies Zero has watched: ', zero.watchedList);
                    console.log('IDs of Movies Zero wants to watch: ', zero.toWatchList)
                  }
                })
              }
            })
          }
        })
      }
    })
  }
})

let agatha = new User({
  username: usernames[2],
  bio: bios[2],
  password: passwords[2]
})

agatha.save(function(err) {
  if (err) {
    console.log(err)
  } else {
    let agathaWatched1 = new Movie({
      title: watchedLists[2][0]["title"],
      overview: watchedLists[2][0]["overview"],
      release_date: watchedLists[2][0]["release_date"],
      poster_path: watchedLists[2][0]["poster_path"],
      comments: watchedLists[2][0]["comments"]
    });
    agathaWatched1.save( function(err) {
      if (err) {
        console.log(err)
      } else {
        agatha.watchedList.push(agathaWatched1._id);
        let agathaWatched2 = new Movie ({
          title: watchedLists[2][1]["title"],
          overview: watchedLists[2][1]["overview"],
          release_date: watchedLists[2][1]["release_date"],
          poster_path: watchedLists[2][1]["poster_path"],
          comments: watchedLists[2][1]["comments"]
        });
        agathaWatched2.save(function(err) {
          if (err){
            console.log(err)
          } else {
            agatha.watchedList.push(agathaWatched2._id);
            let agathaToWatch1 = new Movie ({
              title: toWatchLists[2][0]["title"],
              overview: toWatchLists[2][0]["overview"],
              release_date: toWatchLists[2][0]["release_date"],
              poster_path: toWatchLists[2][0]["poster_path"],
              comments: toWatchLists[2][0]["comments"]
            });
            agathaToWatch1.save(function(err) {
              if (err) {
                console.log(err)
              } else {
                agatha.toWatchList.push(agathaToWatch1._id);
                agatha.save();
                console.log('IDs of movies Agatha has watched: ', agatha.watchedList);
                console.log('IDs of Movies Agatha wants to watch: ', agatha.toWatchList)
              }
            }) //ends agathaToWatch1.save
          } // ends else (l. 227)
        }) // ends agathaWatched2.save
      } // ends else (l. 215)
    }) //ends agathaWatched1.save (l. 212)
  } // ends else (l. 204)
}) //ends agatha.save

let cat = new User({
  username: usernames[3],
  bio: bios[3],
  password: passwords[3]
})

cat.save(function(err) {
  if (err) {
    console.log(err)
  } else {
    let catWatched1 = new Movie({
      title: watchedLists[3][0]["title"],
      overview: watchedLists[3][0]["overview"],
      release_date: watchedLists[3][0]["release_date"],
      poster_path: watchedLists[3][0]["poster_path"],
      comments: watchedLists[3][0]["comments"]
    });
    catWatched1.save( function(err) {
      if (err) {
        console.log(err)
      } else {
        cat.watchedList.push(catWatched1._id);
        let catWatched2 = new Movie ({
          title: watchedLists[3][1]["title"],
          overview: watchedLists[3][1]["overview"],
          release_date: watchedLists[3][1]["release_date"],
          poster_path: watchedLists[3][1]["poster_path"],
          comments: watchedLists[3][1]["comments"]
        });
        catWatched2.save(function(err) {
          if (err){
            console.log(err)
          } else {
            cat.watchedList.push(catWatched2._id);
            let catToWatch1 = new Movie ({
              title: toWatchLists[3][0]["title"],
              overview: toWatchLists[3][0]["overview"],
              release_date: toWatchLists[3][0]["release_date"],
              poster_path: toWatchLists[3][0]["poster_path"],
              comments: toWatchLists[3][0]["comments"]
            });
            catToWatch1.save(function(err) {
              if (err) {
                console.log(err)
              } else {
                cat.toWatchList.push(catToWatch1._id);
                cat.save();
                console.log('IDs of movies Cat has watched: ', cat.watchedList);
                console.log('IDs of Movies Cat wants to watch: ', cat.toWatchList)
              }
            })
          }
        })
      }
    })
  }
})
