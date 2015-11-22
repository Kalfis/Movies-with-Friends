'use strict';

$(function(){
  console.log ('index.html linked to script.js'); // ADDED by LA

// displays all information from database in console log while on Index Page
    $.ajax({
      url: 'http://localhost:3000/movies'
    }).done(function(data){
      console.log('movie loaded');
      console.log(data);
    })

    // pending to add listener event to search form
    // var titleInput = $('#title-input').val();
    var titleInput = "Creed" // hard coded for now, will retrieve from input form
    console.log(titleInput);

    $.ajax({
        url: 'http://localhost:3000/movies/searchByTitle/'+titleInput
      }).done(function(data){
        console.log('movie title selected');
        $('#movie-profile').empty();
        console.log(data);
        showData(data);
      });

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

  var showData = function(data){
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

  }; // close showData

}) // close main anonymous function
