'use strict';

$(function(){

  console.log ('index.html linked to script.js');

  //===== Event listener for 'Add to Database' button to save data from API to Database
  //==================================================== NOT WORKING
  // console.log("About to Click Add to MyMovies");
  //
  // $('#Add-Database-Button0').click(function(event){
  //   event.preventDefault();
  //   console.log('Clicked Add to Database Button');
  //
  // }); // close ('.Add-Database-Button')

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

  //===== Event listener for API button to retrieve & display information for a hardcoded movie from API
  //====================================================

  $('#API-button').click(function(event){
      event.preventDefault();

      console.log('Clicked API Test Button');

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
    //====================================================

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
    //====================================================

    $('#API-NowPlaying-Movies-button').click(function(event){
      event.preventDefault();

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
      console.log('movie loaded');
      console.log(data);
    })

    //===== Event listener for Submit button to search for movie & display movie profile
    //====================================================
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
      //====================================================
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


  // Render information of Movies data thru DOM in index.html
  //======================================

  var newMovies = function(movieObjs){

     console.log(movieObjs); // just to confirm data is retrieved from API and see how it is organized
     console.log("length" + movieObjs.results.length); // just to confirm how data's objects are organized

     for (var i=0; i < movieObjs.results.length; i++) {
       var movieDiv = $('<div class="single-movie-profile"></div>');
       $('#movie-profile').append(movieDiv);

       movieDiv.append('<p><strong> Title: </strong> <a href="http://www.google.com">' + movieObjs.results[i].title + '</a></p>');
       // movieDiv.append('<p><strong> Title: </strong>'+ movieObjs.results[i].title + '</p>');
       movieDiv.append('<img src=https://image.tmdb.org/t/p/w185' + movieObjs.results[i].poster_path + '></img>');
       movieDiv.append('<p><strong>  Released Date: </strong>'+ movieObjs.results[i].release_date + '</p>');
       movieDiv.append('<button id="Add-Want-Watch-Button">Add to Want to Watch List </button>');
       movieDiv.append('<button id="Add-Already-Watched-Button">Add to Already Watched List </button>');
       // movieDiv.append('<p>Add to MyMovies</p>');
        // movieDiv.append('<button id="Add-Database-Button' + i  + '">Add to MyMovies</button>');
       movieDiv.append('<button id="Add-Database-Button' + i  +'" value="'+ movieObjs.results[i].title +'">Add to MyMovies</button>');

       console.log("About to Click Add to MyMovies");

       $('#Add-Database-Button'+i).click(function(event){
         event.preventDefault();
         console.log('Clicked Add to MyMovies Button');
         console.log( $(this).closest('button').attr('value') );

         var titleSelected = ( $(this).closest('button').attr('value') );
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


       }); // close ('.Add-Database-Button')
      }; // close For loop to create Div's
    }; // close newMovies()
      //  };

        //  var selectedMovieData = {};
        //  selectedMovieData.title = movieObjs.results[i].title;
        //  selectedMovieData.overview = movieObjs.results[i].overview;

        //  console.log(selectedMovieData);



    //movieDiv.append('<button name="Add-Database-Button" value="' + i  + '">Add to MyMovies</button>');
    // $( "button[name='Add-Database-Button']" ).val( i ).click(function(event){
    // <button name="button" value="OK" type="button">Click Me</button>


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

}) // close main anonymous function
