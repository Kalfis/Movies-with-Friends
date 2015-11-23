'use strict';

$(function(){
  console.log ('index.html linked to script.js'); // ADDED by LA


  // event listener for Submit button
    $('#newRelease-button').click(function(event){
      event.preventDefault();

      console.log('Clicked New Release Button');

      $.ajax({
        url: 'https://api.themoviedb.org/3/discover/movie?api_key=5c47d1a627613469f840623448f6e67b&primary_release_date.gte=2015-10-15&primary_release_date.lte=2015-11-22'
      }).done(function(movieObjs){
        console.log(movieObjs);
        // $('#results-container').empty();
        newMovies(movieObjs);
      });
    }); // close #submit-button


// displays all information from database in console log while on Index Page
    $.ajax({
      url: 'http://localhost:3000/movies'
    }).done(function(data){
      console.log('movie loaded');
      console.log(data);
    })

    // event listener for Submit button to display movie that we searched for
    $('#submit-button').click(function(event){
      event.preventDefault();

      console.log('Clicked Submit Button');

      var titleInput = $('#title-input').val();
      console.log(titleInput);

    // var titleInput = "Creed" // hard coded for now, will retrieve from input form
    // console.log(titleInput);

          $.ajax({
              url: 'http://localhost:3000/movies/searchByTitle/'+titleInput
            }).done(function(data){
              console.log('movie title selected');
              $('#movie-profile').empty();
              console.log(data);
              showMovie(data);
            });
      }); // close #submit-button

      // event listener for EDIT button\
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

    var newMovies = function(movieObjs){
      console.log(movieObjs);
      for (var i = 0; i < movieObjs.length; i++){
        var showMovies = movieObjs[i].data;

          $.each( data, function(key, value){
            console.log( key + " : " + value);
          });

          var result = $('#movie-profile').append('<div>').find('div');
          result.attr('class', 'movie');
          result.append('<p><strong> Title: </strong>'+ data.title + '</p>');
          result.append('<img src=https://image.tmdb.org/t/p/w185' + data.poster_path + '></img>');
          result.append('<p><strong>  Released Date: </strong>'+ data.release_date + '</p>');
      }
  }; // close newMovies
})
