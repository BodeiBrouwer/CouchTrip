const express = require('express');
const router  = express.Router();
const bcryptjs = require('bcryptjs');
const axios = require('axios')
const BookModel = require('../models/Books.model');
const MovieModel = require('../models/Movies.model')
const CountryModel = require('../models/Country.model')


//NEW COUNTRY ROUTE
router.post('/new-country', (req, res, next) => {
  res.redirect(`/countries/${req.body.countrychoice}`)
})


router.get('/profile', (req, res) => {
  if (req.session.loggedInUser){
    res.render('users/profile.hbs', {loggedInUser: req.session.loggedInUser})
  }
  else {
    res.redirect('/signin')
  }
})

router.get('/map', (req, res, next) => {
  if (req.session.loggedInUser){
    res.render('users/country-overview.hbs', {loggedInUser: req.session.loggedInUser})
  }
  else {
    res.redirect('/signin')
  }
});



router.get('/new-country', (req, res, next) => {
  if (req.session.loggedInUser){
    CountryModel.find({})
     .then((countries) => {
       console.log('Countries are ', countries)
      res.render('users/create-new.hbs', {countries, loggedInUser: req.session.loggedInUser})
     })
  }
  else {
    res.redirect('/signin')
  }
});



router.get('/countries/:country', (req, res) => {
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
                    bookInfo.rating = 0
                  }
                  else {
                    bookInfo.rating = bookInfo.volumeInfo.averageRating;
                  }
                  bookInfo.title = bookInfo.volumeInfo.title
                  myBooks.push(bookInfo)
                })
                console.log(myBooks)
              res.render('users/country-details.hbs', {country, movies, books: myBooks, loggedInUser: req.session.loggedInUser})
             })
              
          }) 
         
      })  
    })
    .catch((err) => {
      console.log(`google is difficult`, err)
    })
})


router.post('/profile', (req, res) => {
  res.render('users/edit-profile', {loggedInUser: req.session.loggedInUser})
})

module.exports = router;