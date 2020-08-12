const express = require('express');
const router  = express.Router();
const bcryptjs = require('bcryptjs');
const axios = require('axios')
const BookModel = require('../models/Books.model');
const MovieModel = require('../models/Movies.model')
const CountryModel = require('../models/Country.model')
const UserModel = require('../models/User.model')


//NEW COUNTRY ROUTE
router.post('/new-country', (req, res, next) => {
  res.redirect(`/countries/${req.body.countrychoice}`)
})


router.get('/profile', (req, res) => {
  if (req.session.loggedInUser){

    let user = req.session.loggedInUser;

    if (user.countriesToDo.length > 0) {
    
    console.log('This is user countries', user.countriesToDo)
    let myPromises =[]
    user.countriesToDo.forEach((countryName, i) => {
      if (countryName != '') {
      myPromises[i] = CountryModel.findOne({name: countryName})   }   
    })
    Promise.all(myPromises)
    .then((countriesToDo) => {
      res.render('users/profile.hbs', {loggedInUser: req.session.loggedInUser, countriesToDo})
    })

    }
    else {
      let errorMessage = "You have no countries in your collection yet."
      res.render('users/profile.hbs', {errorMessage, loggedInUser: req.session.loggedInUser})
    }

  }
  else {
    res.redirect('/signin')
  }
})

router.get('/new-country', (req, res, next) => {
  if (req.session.loggedInUser){
    CountryModel.find({})
     .then((countries) => {
      res.render('users/create-new.hbs', {countries, loggedInUser: req.session.loggedInUser})
     })
  }
  else {
    res.redirect('/signin')
  }
});


router.get('/countries/:country', (req, res) => {
  if (req.session.loggedInUser){
   let countryname = req.params.country;
    CountryModel.findOne({name:countryname})
      .then((country) => {
         BookModel.find({country:country.name})
         .then((books) => {
          
          MovieModel.find({country:country.name})
            .then((movies) => {
              let myPromises = []
              books.forEach((book, i) => {
                myPromises[i] = axios.get(`https://www.googleapis.com/books/v1/volumes?q=${encodeURI(book.title)}+inauthor:${encodeURI(book.author)}&key=${process.env.GOOGLE_API_KEY}`)
             })
             let myBooks = []
             Promise.all(myPromises)
             .then((results) => {
                results.forEach((result) => {
                  let bookInfo = result.data.items[0]
                
                  bookInfo.description = bookInfo.volumeInfo.description;
                  if (bookInfo.volumeInfo.imageLinks.thumbnail == undefined) {
                    bookInfo.img = 'shorturl.at/lFX69'
                  }
                  else {
                    bookInfo.img = bookInfo.volumeInfo.imageLinks.thumbnail;
                  }
                  if (bookInfo.volumeInfo.averageRating === undefined) {
                    bookInfo.rating = "no rating"
                  }
                  else {
                    bookInfo.rating = bookInfo.volumeInfo.averageRating;
                  }
                  bookInfo.author = bookInfo.volumeInfo.authors
                  bookInfo.title = bookInfo.volumeInfo.title
                  myBooks.push(bookInfo)
                })
              res.render('users/country-details.hbs', {country, movies, books: myBooks, loggedInUser: req.session.loggedInUser})
             })
             .catch((err) => {
             })
              
          }) 
         
      })  
    })
    .catch((err) => {
    })
  }
  else {
    res.redirect('/signin')
  }
})

router.get('/countries/:country/delete', (req, res) => {
  UserModel.findByIdAndUpdate(req.session.loggedInUser._id, {$pull: {countriesToDo: req.params.country}})
      .then(() => {
        UserModel.findById(req.session.loggedInUser._id)
        .then((user)=> {
           req.session.loggedInUser = user
           res.redirect('/profile')
        })
  })
})



router.get('/countries/:country/add', (req, res) => {
  UserModel.findById(req.session.loggedInUser._id)
    .then((user)=> {
      if (user.countriesToDo.includes(req.params.country)) {
        res.redirect('/profile');
      }
      else {
        UserModel.findByIdAndUpdate(req.session.loggedInUser._id, {$push: {countriesToDo: req.params.country}})   
        .then(() => {
            UserModel.findById(req.session.loggedInUser._id)
             .then((user)=> {
                req.session.loggedInUser = user
                res.redirect('/profile')
             })
          })
        .catch((err) => {
          console.log('something is off', err)
        })
      }
    })
})




router.post('/profile', (req, res) => {
  if (req.session.loggedInUser){
  res.render('users/edit-profile', {loggedInUser: req.session.loggedInUser})
}
else {
  res.redirect('/signin')
}
});

module.exports = router;