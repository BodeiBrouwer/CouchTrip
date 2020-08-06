# Couch Trip
<br>

## Description
Provide suggestions for films and books from any country so users can travel even when they can't.
<br>

##User Stories
- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault.
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **login-signup** - As a user I want to see a page that lets me easily sign in as an existing user. 
- **signup** - As a user I want to see a page that very briefly explains CouchTrip and lets me easily sign up.
- **create-page** - As a user I want to see a page that lets me search for countries and create a new trip to go on.
- **trip-details-page** - As a user I want to see the books and films suggested to me for a specific country.
- **trips-overview-page** - As a user I want to see a map with all the countries I've been to and the ones that I still plan to visit, and be able to edit them.
- **profile-page** - As a user I want to be able to change my password and username and potentially connect with other users.
<br>

## Routes (back-end)

- GET / 
  - renders index.hbs with sign in form
- GET /auth/signup
  - redirects to / if user logged in
  - renders signup.hbs
- POST /auth/signup
  - redirects to / if user logged in
  - body:
    - email
    - password
    - first name
- POST /auth/login
  - redirects to /new-country if logged in
  - body:
    - email
    - password
- POST /auth/logout
  - body: (empty)

### Protected routes
- GET /new-country
  - renders create-new.hbs with search form
- POST /new-country
  - redirects to /:country if valid search
  - throws error and renders /new-country if not valid search
- GET /:country
  - renders country-details.hbs
- POST /:country/add
  - renders /map with added country
- POST /:country/delete
  - renders /map with country deleted
- POST /:country/visited
  - renders /:country/visited with checked off mark, edits /maps
- GET /map
  - renders country-overview.hbs
  
- GET /profile
  - renders user-profile.hbs
- POST /profile (to edit profile)
  - redirects to /add-signup (we reuse it but for edit purposes)
  - body:
    - email
    - password
    - first name

<br>

## Models
 
 - User 
    new Schema ({
     	_id: ,
     	email: String, required: true, unique: true,
      password: String, minlength: 6, maxlength: 12, required: true,
     	username: String, required: true, maxlength: 20
      countriesVisited: Array,
      countriesToDo: Array,
		})
          
  - Country 
    new Schema ({
      _id: ,
      name: String,
      picture: String,
      books: Array,
      movies: Array
    })
    
  - Movie 
		new Schema ({
			_id: ,
			title: String,
      description: String,
      country: String,
      rating: Number,
      picture: String,
    })

  - Book
    new Schema ({
      _id: ,
      title: String,
      author: String,
      description: String,
      country: String,
      rating: Number,
      picture: String,
    })
    
    <br>

## Backlog

 - User profile
    - Share function to invite to movie night
    - Add picture
    
 - Music, recipes
    - New categories to choose from based on countries

## Links
https://trello.com/b/8srhMPrV/couchtrip


### Git
https://github.com/BodeiBrouwer/CouchTrip

[Deploy Link]

<br>

### Slides
https://docs.google.com/presentation/d/1JTpy7Of4UmpOGKwh_b1haOTXWbGtGM-TAOczJIAR274/edit#slide=id.g531068d6ae_0_5