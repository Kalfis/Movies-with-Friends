'use strict';

$(function(){



  // var renderTemplate_movies = Handlebars.compile($('template#movies').html));

  console.log ('index.html linked to script.js');

  //===== Event listener for API button to retrieve & display information for a hardcoded movie from API
  //======================================
    // $('#API-button').click(function(event){
    //   event.preventDefault();
    //
    //   console.log('Clicked Submit Button');
    //
    //   var titleInput = $('#title-input').val();
    //   console.log(titleInput);
    //
    //   $.ajax({
    //     url: 'https://api.themoviedb.org/3/movie/550?api_key=5c47d1a627613469f840623448f6e67b'
    //   }).done(function(data){
    //     console.log('movie title selected');
    //     $('#movie-profile').empty();
    //     showMovie(data);
    //   });
    // }); // close #submit-button

    //===== Event listener for API button to retrieve & display Upcoming Movies from API
    //======================================

    $('#API-Upcoming-Movies-button').click(function(event){
      event.preventDefault();

      console.log('Clicked Upcoming Movies Button');

      var titleInput = $('#title-input').val();
      console.log(titleInput);

      $.ajax({
        url: 'https://api.themoviedb.org/3/movie/upcoming?api_key=5c47d1a627613469f840623448f6e67b'
      }).done(function(movieObjs){
        console.log('Upcoming Movies Displayed');
        $('#movie-profile').empty();
        newMovies(movieObjs);
      });
    }); // close #API-releases-button

    //===== Event listener for API button to retrieve & display Now Playing movies from API
    //======================================

    $('#API-NowPlaying-Movies-button').click(function(event){
      event.preventDefault();

      console.log('Clicked Now Playing button');

      var titleInput = $('#title-input').val();
      console.log(titleInput);

      $.ajax({
        url: 'https://api.themoviedb.org/3/movie/now_playing?api_key=5c47d1a627613469f840623448f6e67b'
      }).done(function(movieObjs){
        console.log('Now Playing Movies Displayed');
        $('#movie-profile').empty();
        newMovies(movieObjs);
      });
    }); // close #API-releases-button


    // url: 'https://api.themoviedb.org/3/discover/movie?api_key=5c47d1a627613469f840623448f6e67b&primary_release_date.gte=2015-10-15&primary_release_date.lte=2015-11-22'
    // url: 'https://api.themoviedb.org/3/movie/now_playing?api_key=5c47d1a627613469f840623448f6e67b'
// url: 'https://api.themoviedb.org/3/movie/upcoming?api_key=5c47d1a627613469f840623448f6e67b'

    //===== Display all information from database in console log while on Index Page
    //======================================
    $.ajax({
      url: 'http://localhost:3000/movies'
    }).done(function(data){
      console.log('movie loaded');
      console.log(data);
    })

    //===== Event listener for Submit button to search for movie & display movie profile
    //======================================
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
              $('#movie-profile').empty();
              console.log(data);
              showMovie(data);
            });
      }); // close #submit-button

      //===== event listener for EDIT button
      //======================================
      $('#edit-button').click(function(event){
        event.preventDefault();

        console.log('Clicked Edit Button');

        // edit information from database
        // #####  PENDING ########## ///

      }); // close #edit-button event listener

      var updateForm = function (data) {
        var resultsDiv = $(".")
      };
      ////// POST route

  //   ('.keep').click(function(e){
  //     e.preventDefault();
  //     data = {};
  //     data.title = $('#movie_title').val();
  //     data.director = $('#director').val();
  //     data.actors = $('#actors').val();
  //     data.released = $('#released').val();
  //     data.plot = $('#plot').val();
  //     console.log(data)
  //
  //   $.ajax({
  //     type: "POST",
  //     url: "/",
  //     data: data
  //   })
  // })

  // var editMovie = function () { // PENDING
  //   $.ajax({
  //     url: 'http://localhost:3000/movies/searchByTitle/'+titleInput.
  //     method: "GET",
  //     dataType: "json"
  //   }).done(updateForm)
  // };


  // Render information of a Released Movies thru DOM in index.html
  //======================================

  var newMovies = function(movieObjs){

      console.log(movieObjs); // just to confirm data is retrieved from API and see how it is organized

      var result = $('#movie-profile').append('<div>').find('div');
      result.attr('class', 'movie');

      console.log("length" + movieObjs.results.length); // just to confirm how data's objects are organized

      for (var i=0; i < movieObjs.results.length; i++){

          result.append('<p><strong> Title: </strong>'+ movieObjs.results[i].title + '</p>');
          result.append('<img src=https://image.tmdb.org/t/p/w185' + movieObjs.results[i].poster_path + '></img>');
          result.append('<p><strong>  Released Date: </strong>'+ movieObjs.results[i].release_date + '</p>');
          result.append('<button id="Add-Watchlist-button">Add to Want to Watch List </button>');
          result.append('<button id="Add-Watchlist-button">Add to Already Watched List </button>');

          };
    };


///////
// var showData = function(data){
//       // using JavaScript to render info on the DOM
//       console.log(data);
//
//       $.each( data, function(key, value){
//         console.log( key + " : " + value);
//       }); // checking in console how data displays before sending to the DOM
//
//       var result = $('#results-container').append('<div>').find('div');
//       result.attr('class', 'movie');
//
//       $.each( data, function(key, value){
//         result.append('<p>' + key + " : " + value + '</p>');
//       });
//
//     }; // close showData


  // Render information of a movie profile thru DOM in index.html
  //======================================

  var showMovie = function(data){
    // using JavaScript to render info on the DOM
    console.log(data);

    $.each( data, function(key, value){
      console.log( key + " : " + value);
    }); // checking in console how data displays before sending to the DOM

    var result = $('#movie-profile').append('<div>').find('div');
    result.attr('class', 'movie');

    result.append('<p><strong> Title: </strong>'+ data.title + '</p>');
    result.append('<p><strong>  Overview: </strong> '+ data.overview + '</p>');
    result.append('<img src=https://image.tmdb.org/t/p/w185' + data.poster_path + '></img>');
    result.append('<p><strong>  Released Date: </strong>'+ data.release_date + '</p>');
    result.append('<p><strong>  Comments: </strong>'+ data.comments + '</p>');

    // This code below displays the information directly as a key/pair exactly as labeled in database
    // $.each( data, function(key, value){
    //   result.append('<p>' + key + " : " + value + '</p>');
    // });

  }; // close showMovie

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
       showUser(data);
      // empty user info display div.
      // add the info for this particular user into the div.
    })
  })

// Render information of a user profile thru DOM in index.html
//======================================
let showUser = function(data) {
  // console.log(data[0]);
  // try not appending another div to this div
  let result = $('#user-profile');
  // let watchedContainer = $('#watched-container').append('<div>').find('div');
  // let toWatchContainer = $('#to-watch-container');
  result.append('<h3>Username: </h3>' + '<p>' + data[0].username + '</p>' );
  result.append('<h3>Bio: </h3>' + '<p>' + data[0].bio + '</p>');
  let wantMovieDiv = document.createElement('div');
  wantMovieDiv.id = "want-movie-div";
  // wantMovieDiv.css("background-color", "red");
  wantMovieDiv.innerHTML = '<h3>Movies ' + data[0].username + ' Wants to Watch: </h3>' //+ '<p>' + data[0].toWatchList + '</p>');
  result.append(wantMovieDiv);

  ////======= a function that will display movie data in a to-watch div inside the user-profile div.
  var showToWatchMovie = function(toSee){
    // using JavaScript to render info on the DOM
    console.log(toSee);

    var toSeeIndiv = document.createElement('div');
    // toSeeIndiv.className = 'to-see-indiv';
    //
    toSeeIndiv.innerHTML =
      ['<p><strong> Title: </strong>'+ toSee.title + '</p>' +
      '<p><strong>  Overview: </strong> '+ toSee.overview + '</p>' +
      '<img src=https://image.tmdb.org/t/p/w185' + toSee.poster_path + '></img>' +
      '<p><strong>  Released Date: </strong>'+ toSee.release_date + '</p>' +
      '<p><strong>  Comments: </strong>'+ toSee.comments + '</p>']
    // console.log('Title sample: ' + toSeeIndiv.innerHTML)
    wantMovieDiv.appendChild(toSeeIndiv);
    // // toSeeIndiv.append('<p><strong>  Overview: </strong> '+ data.overview + '</p>');
    // // toSeeIndiv.append('<img src=https://image.tmdb.org/t/p/w185' + data.poster_path + '></img>');
    // // toSeeIndiv.append('<p><strong>  Released Date: </strong>'+ data.release_date + '</p>');
    // // toSeeIndiv.append('<p><strong>  Comments: </strong>'+ data.comments + '</p>');


  }; // end showToWatchMovie

  ////======== a function that will display movie data in a watched div inside the user-profile div.
  var showWatchedMovie = function(watchedMovie){
    // // using JavaScript to render info on the DOM
    // console.log(data);
    //
    // $.each( data, function(key, value){
    //   console.log( key + " : " + value);
    // }); // checking in console how data displays before sending to the DOM
    //
    // var result = $('#movie-profile').append('<div>').find('div');
    // result.attr('class', 'movie');
    //
    // result.append('<p><strong> Title: </strong>'+ data.title + '</p>');
    // result.append('<p><strong>  Overview: </strong> '+ data.overview + '</p>');
    // result.append('<img src=https://image.tmdb.org/t/p/w185' + data.poster_path + '></img>');
    // result.append('<p><strong>  Released Date: </strong>'+ data.release_date + '</p>');
    // result.append('<p><strong>  Comments: </strong>'+ data.comments + '</p>');
    //
    // // This code below displays the information directly as a key/pair exactly as labeled in database
    // // $.each( data, function(key, value){
    // //   result.append('<p>' + key + " : " + value + '</p>');
    // // });

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
          // should param be (data) ?
        }).done(function(toSee) {
          // using the data returned by the above url, display data using showToWatchMovie function
          // should param be (data) ?
          showToWatchMovie(toSee);
          // empty the div we're putting the data in.
          // run the showMovie function (described externally)
          // showMovie(data);
          // watchContainer.append(data.title);

          console.log('watchContainer data: ' + data.title );
        }); //ends .done for ajax function
      }
  }
  displayToWatch();

  // result.append('<h3> Movies' + data[0].username + ' has watched: </h3>');
  // let displayWatched = () => {
  //   console.log('watched movie list length: '+ data[0].watchedList.length);
  //   for (var i = 0; i < data[0].watchedList.length; i++){
  //     var watchedMovieId = data[0].watchedList[i];
  //     $.ajax({
  //       url: 'http://localhost:3000/movies/' + watchedMovieId
  //     }).done((data) => {
  //       // $('#movie-profile').empty();
  //       showMovie(data);
  //       console.log('Movie')
  //     });
  //   }
  // }
  // displayWatched();

}


}) // close main anonymous function
