'use strict';

$(function(){


  console.log ('index.html linked to script.js');

  //===== Event listener for Keep button to save data for a new Movie as input in Form
  //====================================================
  $('#keep-button').click(function(event){
    event.preventDefault();

    console.log ('Clicked Keep Button');

    var newMovieData = {};
    newMovieData.title = $('#movie_title').val();
    newMovieData.overview = $('#movie-overview').val();

    console.log(newMovieData);
    $.ajax({
      url: "/movies/",
      method: "POST",
      data: newMovieData
    }); // close $.ajax
  }); // close ('.keep-button')

    //===== Event listener for API button to retrieve & display Upcoming Movies from API
    //====================================================

    $('#API-Upcoming-Movies-button').click(function(event){
      event.preventDefault();
      console.log('Clicked Upcoming Movies Button');
      // var titleInput = $('#title-input').val();
      // console.log(titleInput);
      $.ajax({
        url: 'https://api.themoviedb.org/3/movie/upcoming?api_key=5c47d1a627613469f840623448f6e67b'
      }).done(function(movieObjs){
        console.log('Upcoming Movies Displayed');
        $('#user-profile').empty();
        $('#movie-profile').empty();
        newMovies(movieObjs);
      });
    }); // close #API-releases-button

    //===== Event listener for API button to retrieve & display Now Playing movies from API
    //====================================================

    $('#API-NowPlaying-Movies-button').click(function(event){
      event.preventDefault();
      $('#user-profile').empty();
      console.log('Clicked Now Playing button');

      var titleInput = $('#title-input').val(); //
      console.log(titleInput); //

      APInowPlayingData();

    }); // close #API-releases-button

    //===== Display all information from database in console log while on Index Page
    //====================================================
    $.ajax({
      url: 'http://localhost:3000/movies'
    }).done(function(data){
      // $('#user-profile').empty();
      console.log('movie loaded');
      console.log(data);
    });

    //===== Event listener for Submit button to search for movie & display movie profile
    //====================================================
    $('#submit-button').click(function(event){
      event.preventDefault();

      console.log('Clicked Submit Button');
      // note: searches currently case sensitve. To make them case insensitive, add .toLowerCase() to the end of .val()
      // then add .toLowerCase() to titles in our method to save movies from the API into our own database.
      var titleInput = $('#title-input').val()
      console.log(titleInput);

          $.ajax({
              url: 'http://localhost:3000/movies/searchByTitle/'+titleInput
            }).done(function(data){
              console.log('movie title selected');
              $('#user-profile').empty();
              $('#movie-profile').empty();
              console.log("here is the data for the movie selected: ")
              console.log(data);
              showMovie(data);
            });
      }); // close #submit-button

    //===== event listener for EDIT button
    //====================================================
    $('#edit-button').click(function(event){
      event.preventDefault();

      console.log('Clicked Edit Button');

      var editMovieData = {};
      editMovieData.title = $('#title-data').val();
      editMovieData.overview = $('#comments-data').val();

      // PENDING  ////
      console.log(newMovieData);
      $.ajax({
        url: "/movies/",
        method: "POST",
        data: editMovieData
      }); // close $.ajax

      // #######   PENDING ####### ///
      // edit information from database
      // #######   PENDING ####### ///

    }); // close #edit-button event listener

      var updateForm = function (data) {
        var resultsDiv = $(".")
      };

      // #######   PENDING ####### ///
      // var editMovie = function () {
      //   $.ajax({
      //     url: 'http://localhost:3000/movies/searchByTitle/'+titleInput.
      //     method: "GET",
      //     dataType: "json"
      //   }).done(updateForm)
      // };
      // #######   PENDING ####### ///


  // Render information of Movies data thru DOM in index.html
  //======================================

  var newMovies = function(movieObjs){

     console.log(movieObjs); // just to confirm data is retrieved from API and see how it is organized
     console.log("length" + movieObjs.results.length); // just to confirm how data's objects are organized

     for (var i=0; i < movieObjs.results.length; i++) {
       var movieDiv = $('<div class="single-movie-profile"></div>');
       $('#movie-profile').append(movieDiv);

       movieDiv.append('<p><strong>' + movieObjs.results[i].title + '</strong></p>');
       // movieDiv.append('<p><strong> Title: </strong>'+ movieObjs.results[i].title + '</p>');
       movieDiv.append('<img src=https://image.tmdb.org/t/p/w185' + movieObjs.results[i].poster_path + '></img>');
       movieDiv.append('<p><strong>  Release Date: </strong>'+ movieObjs.results[i].release_date + '</p>');
       movieDiv.append('<button id="Add-Want-Watch-Button' + i + '" value ="' + movieObjs.results[i].title +'">Add to Want to Watch List </button>');
       movieDiv.append('<button id="Add-Already-Watched-Button">Add to Already Watched List </button>');
       movieDiv.append('<button id="Add-Database-Button' + i  +'" value="'+ movieObjs.results[i].title +'">Add to MyMovies</button>');

       //movieDiv.append('<button name="Add-Database-Button" value="' + i  + '">Add to MyMovies</button>');
       // $( "button[name='Add-Database-Button']" ).val( i ).click(function(event){
       // <button name="button" value="OK" type="button">Click Me</button>

       console.log("About to Click Add to MyMovies");

       $('#Add-Database-Button'+i).click(function(event){
         event.preventDefault();
         console.log('Clicked Add to MyMovies Button');
         console.log( $(this).closest('button').attr('value') );

         var titleSelected = ( $(this).closest('button').attr('value') );

         addToDatabase(titleSelected, movieObjs);
        }); // close ('.Add-Database-Button')

        // Event listener for Add to Want to Watch List - WORK IN PROGRESS ///
        $('#Add-Want-Watch-Button'+i).click(function(event){
          event.preventDefault();
          console.log('Clicked Add to Want to Watch List Button');
          console.log( $(this).closest('button').attr('value') );
          // get the title of the movie corresponding to the div where the button clicked is located
          var titleSelected = ( $(this).closest('button').attr('value') );

          console.log("This is the title selected: " + titleSelected);
          console.log(movieObjs);

          // Then Add Movie to local database if the movie selected is not already in the database
          addToDatabase(titleSelected, movieObjs);

          //Retrieve the Movie ID from the database
              $.ajax({
                  url: 'http://localhost:3000/movies/searchByTitle/'+titleSelected
                }).done(function(data){
                  console.log("here is the data for the movie selected: ")
                  console.log(data);
                  console.log('Overview: ' + data.overview);
                  console.log('Movie ID: ' + data._id);
                  var IDmovieToAdd = {dataID: data._id};
                  saveToUser(IDmovieToAdd);
              });  // close $.ajax (outer)

              // Add Movie ID to the User's profile in the database
              // specificically to the array of the watchedList element in the User's profile

              var saveToUser = function (IDmovieToAdd) {

                // console.log('myId: ' + myId);
                // console.log('user: ' + user.username);

                // $.ajax({
                //   url: '/users/:id',
                //   method: "GET",
                //   data: user
                //   // console.log(req.body);
                // }) //closes .ajax
                //
                // console.log ('userID:' + user.username);
                // console.log ('userID:' + user._id);
                // console.log('this is the user: ' + user);

                // console.log(myIdnow);

                // console.log( $(this).closest('button').attr('value') );
                // var titleSelected = ( $(this).closest('button').attr('value') );


                var currentUserID = $('#current-user').html();

                console.log("The Current User ID: " + currentUserID);

                console.log('IDmovieToAdd: '+ IDmovieToAdd.dataID);
                var userID = currentUserID;
                // var userID = '565329ec6907fd8329c60e8a'; // Agatha
                // var userID = '5659107f7e84b23e06e6a124'; // Luis

                $.ajax({
                url: '/users/'+userID,
                method: "PUT",
                data: IDmovieToAdd
                }); // close $.ajax (inner)
              }

         }); // close ('.Add-Database-Button')

      }; // close For loop to create Div's
    }; // close newMovies()


    var addToDatabase = function (titleSelected, movieObjs) {

      console.log("This is the title selected: " + titleSelected);
      console.log(movieObjs);

      for (var i=0; i< movieObjs.results.length; i++){
          if (movieObjs.results[i].title == titleSelected){
            var location = i;
          }; // close if function
       }; // close for loop to match Title

       var newMovieData = {};
       newMovieData.title = movieObjs.results[location].title;
       newMovieData.overview = movieObjs.results[location].overview;
       newMovieData.release_date = movieObjs.results[location].release_date;
       newMovieData.poster_path = movieObjs.results[location].poster_path;
       console.log("The newMovieData is: ");
       console.log(newMovieData);

       $.ajax({
         url: "/movies/",
         method: "POST",
         data: newMovieData
       }); // close $.ajax
    }; // close addToDatabase()

  // Render information of a movie profile thru DOM in index.html
  //======================================

  var showMovie = function(data){
    // using JavaScript to render info on the DOM
    console.log("here is the data passing from Ajax to showMovie()");
    console.log(data);

    $.each( data, function(key, value){
      console.log( key + " : " + value);
    }); // checking in console how data displays before sending to the DOM

    var result = $('#movie-profile').append('<div>').find('div');
    result.attr('class', 'movie');

    result.append('<p><strong> Title: </strong> <a href="http://www.google.com">'+ data.title + '</a></p>');
    result.append('<p><strong>  Overview: </strong> '+ data.overview + '</p>');
    result.append('<img src=https://image.tmdb.org/t/p/w185' + data.poster_path + '></img>');
    result.append('<p><strong>  Released Date: </strong>'+ data.release_date + '</p>');
    result.append('<p><strong>  Comments: </strong>'+ data.comments + '</p>');


   }; // close showMovie


  // Retrieve data for Now Playing movies from API
  //======================================
  var APInowPlayingData = function () {
    $.ajax({
      url: 'https://api.themoviedb.org/3/movie/now_playing?api_key=5c47d1a627613469f840623448f6e67b'
    }).done(function(movieObjs){
      console.log('Now Playing Movies Displayed');
      $('#movie-profile').empty();
      newMovies(movieObjs);
    });
  }

// Click a button to view an individual user's profile
//======================================
  // Ultimately we'll want this to be a link to "profile" for user and a link to another user's profile.
$('#view-user-test').click((event) => {
  event.preventDefault();
  console.log('User test button clicked');
  $.ajax({
    url: '/users/agatha'
    // url: '/users/' + id of Agatha
  }).done(function(data) {
    $('#user-profile').empty();
    $('#movie-profile').empty();
     showUser(data);
    // empty user info display div.
    // add the info for this particular user into the div.
  })
})

// When you click the 'view-user-test' button, it calls the showUser function (below).
// The showUser function encompasses displayToWatch (which calls showToWatchMovie) and displayWatched (which calls showWatchedMovie)
//======================================
let showUser = function(data) {
  // console.log(data[0]);
  // try not appending another div to this div
  let result = $('#user-profile');
  result.append('<h3>Username: </h3>' + '<p>' + data[0].username + '</p>' );
  result.append('<h3>Bio: </h3>' + '<p>' + data[0].bio + '</p>');
  let wantMovieDiv = document.createElement('div');
  wantMovieDiv.id = "want-movie-div";
  // wantMovieDiv.css("background-color", "red");
  wantMovieDiv.innerHTML = '<h3>Movies ' + data[0].username + ' Wants to Watch: </h3>';
  result.append(wantMovieDiv);
  let seenMovieDiv = document.createElement('div');
  seenMovieDiv.id = "seen-movie-div";
  seenMovieDiv.innerHTML = '<h3>Movies ' + data[0].username + ' Has Watched: </h3>'
  result.append(seenMovieDiv);

  ////======= a function that will display movie data in a to-watch div inside the user-profile div.
  var showToWatchMovie = function(toSee){
    // using JavaScript to render info on the DOM
    console.log(toSee);
    var toSeeIndiv = document.createElement('div');
    toSeeIndiv.className = 'to-see-indiv';
    // display the information about the movie, grabbed from our moviegoerApp database.
    toSeeIndiv.innerHTML =
      ['<p><strong> Title: </strong>'+ toSee.title + '</p>' +
      '<p><strong>  Overview: </strong> '+ toSee.overview + '</p>' +
      '<img src=https://image.tmdb.org/t/p/w185' + toSee.poster_path + '></img>' +
      '<p><strong>  Released Date: </strong>'+ toSee.release_date + '</p>' +
      '<p><strong>  Comments: </strong>'+ toSee.comments + '</p>']
    wantMovieDiv.appendChild(toSeeIndiv);
  }; // end showToWatchMovie

  ////======== a function that will display movie data in a watched div inside the user-profile div.
  var showWatchedMovie = function(seen){
   // using JavaScript to render info on the DOM
   console.log(seen);
   var seenIndiv = document.createElement('div');
   seenIndiv.className = 'seen-indiv'
   seenIndiv.innerHTML =
   ['<p><strong> Title: </strong>'+ seen.title + '</p>' +
   '<p><strong>  Overview: </strong> '+ seen.overview + '</p>' +
   '<img src=https://image.tmdb.org/t/p/w185' + seen.poster_path + '></img>' +
   '<p><strong>  Released Date: </strong>'+ seen.release_date + '</p>' +
   '<p><strong>  Comments: </strong>'+ seen.comments + '</p>']
   seenMovieDiv.appendChild(seenIndiv);
  }; //ends showWatchedMovie

  // console.log(data[0]._id)
  // Loop through a user's toWatchList, a list of ids of films the user wants to watch.
  let displayToWatch = function() {
    for (var i = 0; i < data[0].toWatchList.length; i++){
      let movieToSee = document.createElement('div');
      movieToSee.id = "to-see-div";
      // for each id in the user's list, call an ajax function that will hit the route of the movie associated with that id.
      let movieId = data[0].toWatchList[i];
        $.ajax({
          // look in movies_controller for the route that finds a movie by id.
          url: 'http://localhost:3000/movies/' + movieId
        }).done(function(toSee) {
          // using the data returned by the above url, display data using showToWatchMovie function
          showToWatchMovie(toSee);
          // empty the div we're putting the data in.
          console.log('watchContainer data: ' + data.title );
        }); //ends .done for ajax function
      }
  } // ends displayToWatch
  displayToWatch();

  let displayWatched = () => {
    console.log('watched movie list length: '+ data[0].watchedList.length);
    for (var i = 0; i < data[0].watchedList.length; i++){
      var watchedMovieId = data[0].watchedList[i];
      $.ajax({
        url: 'http://localhost:3000/movies/' + watchedMovieId
      }).done((seen) => {
        showWatchedMovie(seen);
      });
    }
  } // ends displayWatched
  displayWatched();
} //ends showUser

// when the page loads/before user clicks login link, hide the login form. We only want it to appear if a user clicks the "log in" link.
$('#login-form').hide();
$('#login-failed').hide();
$('#signup-form').hide();
// only want users to have a view-profile link once they've logged in.
$('#my-profile').hide();

//Let user sign up.
$('#signup-link').click((event) => {
  event.preventDefault();
  console.log('Sign up clicked');
  $('#login-form').hide();
  $('#signup-form').show();
  $('user-profile').empty();
  $('#movie-profile').empty();
})

//Do sign up when someone clicks the submit button for signing up
$('#submit-signup').click((event) => {
  event.preventDefault();
  console.log('clicked submit for sign up');

  let user = {};
  user.username = $('#signup-username').val();
  user.password = $('#signup-password').val();
    $.ajax({
      url: '/users/signup',
      method: 'POST',
      data: user
    }) //closes sign up ajax
}) //closes sign up click event

//Let user log in.
//======================================
$('#login-link').click((event) => {
  event.preventDefault();
  console.log('Log in button clicked');
  $('#signup-form').hide();
  $('#login-form').show();
  // empty user profile, movie-profile
  // (Put new movie form, edit forms in routes only accessible through token bearers)
  $('#user-profile').empty();
  $('#movie-profile').empty();
  // display a login form
}) // ends login-link click event

// create a login submit button with matching id in index
$('#submit-login').click((event) => {
  event.preventDefault();
  console.log('clicked log in submit button.');
  // console.log(req.body);
  let user = {};
  user.username = $('#username-input').val();
  user.password = $('#password-input').val();
  $.ajax({
    url: '/users/authenticate',
    method: "POST",
    data: user
    // console.log(req.body);
  }) //closes .ajax
  // data here references the object containing a token or error message
  .done(function(data){
    // if user is authenticated in /users/authenticate and granted token, hide login form
    if (data.token) {
      // console.log(user);
      $('#login-form').hide();
      $('#login-link').hide();
      $('#signup-link').hide();
      $('#divider').hide();
      // Show users the link to their profile
      $('#my-profile').show();


      // append a personalized welcome message to our user-actions div
      let welcomeUser = document.createElement('div');
      welcomeUser.id = "welcome-user";
      // user.username is something we sent in the post request, so it's still accessible using this syntax.
      welcomeUser.innerHTML = '<p> Hi, ' + user.username + '  |</p>';
      // In /users/authenticate, we're retrieving user data associated with the username and password sent in the post method, then sending all user info back as part of "data"
      console.log('user._id: '+ data.user._id);
      // note that we have to use .append here, and not .appendChild
      $('#user-actions').append(welcomeUser);

      // LA Added
      let currentUser = document.createElement('div');
      currentUser.id = "current-user";
      currentUser.innerHTML = data.user._id;
      $('#user-actions').append(currentUser);
      $('#current-user').hide();
      // LA Added

      // Once a user has logged in, they can click on a link to view their profiles.
      $('#my-profile').click((event) => {
        event.preventDefault();
        let myId = data.user._id
        console.log('myId: ' + myId);

        $.ajax({
          url: '/users/' + myId
          // /users/:id will return all user info for that id.
        })
        .done(function(data) {
          $('#user-profile').empty();
          $('#movie-profile').empty();
           showUser(data);

          // empty user info display div.
          // add the info for this particular user into the div.
        }) //ends .done
      }); //ends click event on my-profile link
    // if user is not granted token, give them a 'not found' message
    } else {
      $('#login-failed').show();
    }
  // what happens here with tokens--do I need to insert into header?
  })
}); //ends login-submit button click event


}) // close main anonymous function
