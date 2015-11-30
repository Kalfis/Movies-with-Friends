**Application**
* Models
  * User
  * Movie


* Access to Third Party API.
  Profiles of recently released movies will be retrieved from a 3rd party API, the '**Released Movies**'.

* App Database
  A movie selected by a **User** will be stored in the App database within the collection of '**Selected Movies**'.

**User Stories**

As a **User** I want to:
* Sign up as a new **User**, if I am a new **User**.
* Sign in as an existin **User** if I had already signed up.
* View a list of **Released Movies**.

Once a **User** is signed in.  
* View my profile.  
* Edit my profile.
* Delete my profile.
* Select a movie from the **Released Movies**, and **Add** it as a new  **Selected Movie** to my profile.
* **Edit** a movie from the **Selected Movies** in my profile.
  * Mark a **Selected Movie** as either ***'want to see'*** or ***'not seen'***.
  * Rate a **Selected Movie**.
  * **Delete** a movie from the **Selected Movies** in my profile.
* View other **Users** Profile.
* Indicate on the **Selected Movies** of any other **User** if I am also interested in seeing any of his/her **Selected Movies**.
* Post a comment on a **Released Movie**.
* Post a comment on other **Users**.

* View any **Released Movie** profile.  This will show the information of the movie as retrieved from the 3rd party API. Also, it will show any additional data input by **Users** such as Avg. Rating, list of **Users** who also want to see it, etc.

**User Profile**
* Name
* Email
* Password
* List of **Selected Movies**.
* ***Note***: A **Selected Movie** links to its corresponding **Movie Profile**.

**Movie Profile**
* Title
* Genre
* Description
* Released date
* Comments from **Users**.
