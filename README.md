# moviegoer_app
**Project 3: Working in teams to build an Express app**

**[Check out our app on Heroku](https://evening-dusk-5932.herokuapp.com/)**

**What it is:** Our app is designed for users to be able to track movies that are both upcoming and now playing that they are interested in seeing. Users can store films on their profile pages in either "Want to Watch" and "Watched" lists. 

**Technologies Used:**
* [TMDb API](https://www.themoviedb.org/documentation/api)
* Express--web framework used for Node.js
* Node.js--a runtime environment that allows us to execute JavaScript in the back-end of our app.
* Mongo--used to access our app's database locally to inspect users, movies
* Mongoose--used to create our user and movie schema, access information stored in our database.
* BCrypt--used to authenticate users at log-in
* JSON Web Token--used to assign tokens to logged-in users
* [Heroku](https://evening-dusk-5932.herokuapp.com/)--where our app is hosted. 

**Approach Taken**  
For this project, we worked with two databases: the database for our app (stored either locally in our database), and the third-party TMDb API. Our app users can browse lists of films now playing and upcoming (sourced from the TMDb API) and add a film to their own lists of films they either want to watch or have already watched (which in effect adds the film to our app's database).  This means we have two models: User and Movie. Movies are stored under a user by the movie object's id. 

**Installation Instructions**
* To use the app online: no installation needed
* Locally: $npm install to get all modules in package.json

**User Stories**  
[user_stories.md](https://github.com/Kalfis/moviegoer_app/blob/master/user_stories.md)

**Wireframes**  
[Hosted on Balsamiq](https://travelbloggerapp.mybalsamiq.com/projects/moviegoerapp/Homepage)

**Major Hurdles**
* Passing tokens between the client and the server--unable to set tokens in header using expressJwt
* Log out function--we believe this would involve either deleting a token or causing it to expire.


**Unsolved Problems**
* Setting a filter so that once a user has added a film to a list, he/she cannot add this same film. 
* Currently, when a user adds a film to her 'To Watch' or 'Watched' lists, there is a check to see if the film is already in our app's database. If it is, it is not re-added to our app's database. A potential issue with this is that users can comment on films on their lists--this means that when a user adds a film to a list, the film will have the comments of all other users who have added the film to their list. 
* Other issues found on our [Github repo](https://github.com/Kalfis/moviegoer_app/issues)

Ultimately: a user should have the ability to move a movie in the 'To Watch' list to the 'Watched' list, edit the comment/review associated with that movie; indicate, through a 'like', an interest in watching a film on another user's profile.

