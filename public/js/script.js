'use strict';

$(function(){

  // var renderTemplate_movies = Handlebars.compile($('template#movies').html));

  console.log ('index.html linked to script.js');

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

    //===== Event listener for API button to retrieve & display  releaased movies from API
    //======================================

    $('#API-Releases-button').click(function(event){
      event.preventDefault();

      console.log('Clicked Submit Button');

      var titleInput = $('#title-input').val();
      console.log(titleInput);

      $.ajax({
        url: 'https://api.themoviedb.org/3/discover/movie?api_key=5c47d1a627613469f840623448f6e67b&primary_release_date.gte=2015-10-15&primary_release_date.lte=2015-11-22'
      }).done(function(movieObjs){
        console.log('movies released selected');
        $('#movie-profile').empty();
        newMovies(movieObjs);
      });
    }); // close #API-releases-button

    // url: 'https://api.themoviedb.org/3/discover/movie?api_key=5c47d1a627613469f840623448f6e67b&primary_release_date.gte=2015-10-15&primary_release_date.lte=2015-11-22'
url: 'https://api.themoviedb.org/3/movie/now_playing?api_key=5c47d1a627613469f840623448f6e67b'

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

        console.log(movieObjs);
        // for (var i = 0; i < movieObjs.length; i++){
        //   var showMovies = movieObjs[i].data;

            $.each( movieObjs, function(key, value){
              console.log("now key + value");
              console.log( key + " : " + value);
            });

            var result = $('#movie-profile').append('<div>').find('div');
            result.attr('class', 'movie');

            console.log("length " + movieObjs.results.length);

            for (var i=0; i < movieObjs.results.length; i++){
            // $.each( movieObjs, function(key, value){
              // console.log(key,value);
              console.log (movieObjs.results[i].title);

                result.append('<p><strong> Title: </strong>'+ movieObjs.results[i].title + '</p>');
                result.append('<img src=https://image.tmdb.org/t/p/w185' + movieObjs.results[i].poster_path + '></img>');
                result.append('<p><strong>  Released Date: </strong>'+ movieObjs.results[i].release_date + '</p>');
              // });
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




}) // close main anonymous function
