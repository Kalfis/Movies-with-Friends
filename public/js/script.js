'use strict';

$(function(){

  // var renderTemplate_movies = Handlebars.compile($('template#movies').html));

  console.log ('index.html linked to script.js');


  //===== Event listener for Keep button to save data for a new Movie as input in Form
  //======================================

  $('#keep-button').click(function(event){
    event.preventDefault();

    console.log ('Clicked Keep Button');

    var newMovieData = {};
    newMovieData.title = $('#movie_title').val();
    newMovieData.overview = $('#movie-overview').val()

    console.log(newMovieData);
    $.ajax({
      url: "/movies/",
      method: "POST",
      data: newMovieData
    }); // close $.ajax
  }); // close ('.keep-button')


  //===== Event listener for API button to retrieve & display information for a hardcoded movie from API
  //======================================

  $('#API-button').click(function(event){
      event.preventDefault();

      console.log('Clicked Submit Button');

      var titleInput = $('#title-input').val();
      console.log(titleInput);

      $.ajax({
        url: 'https://api.themoviedb.org/3/movie/550?api_key=5c47d1a627613469f840623448f6e67b'
      }).done(function(data){
        console.log('movie title selected');
        $('#movie-profile').empty();
        showMovie(data);
      });
    }); // close #submit-button

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

      var titleInput = $('#title-input').val();
      console.log(titleInput);

          $.ajax({
              url: 'http://localhost:3000/movies/searchByTitle/'+titleInput
            }).done(function(data){
              console.log('movie title selected');
              $('#movie-profile').empty();
              console.log("here is the data for the movie selected: ")
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

}) // close main anonymous function
