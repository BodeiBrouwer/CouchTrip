const express = require('express');
const router  = express.Router();
const bcryptjs = require('bcryptjs');
const BookModel = require('../models/Books.model');
const MovieModel = require('../models/Movies.model')
const CountryModel = require('../models/Country.model')


//NEW COUNTRY ROUTE
router.post('/new-country', (req, res, next) => {
  if(req.body.countrychoice) {
    let countryname = req.body.countrychoice;
    CountryModel.findOne({name:countryname})
      .then((country) => {
        MovieModel.find({country:country.name})
          .then((movies) => {
            res.render('users/country-details.hbs', {country, movies, loggedInUser: req.session.loggedInUser})
          })  
      })  
  }
  else {
    res.redirect('/new-country');
  }
})


router.get('/profile', (req, res) => {
  if (req.session.loggedInUser){

    let user = req.session.loggedInUser;
    console.log(user);
    console.log('This is user countries', user.countriesToDo)
    let myPromises =[]
    user.countriesToDo.forEach((countryName, i) => {
      if (countryName != '') {
      myPromises[i] = CountryModel.findOne({name: countryName})   }   
    })
    Promise.all(myPromises)
    .then((countriesToDo) => {
      console.log(countriesToDo)
      res.render('users/profile.hbs', {loggedInUser: req.session.loggedInUser, countriesToDo})
    })

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
    CountryModel.find()
     .then((countries) => {
      res.render('users/create-new.hbs', {countries, loggedInUser: req.session.loggedInUser})
     })
  }
  else {
    res.redirect('/signin')
  }
});



router.get('/:id', (req, res) => {
  CountryModel.find({name: req.params.countryname})
      .then((country) => {
        res.render('users/country-details.hbs', {country})
      })
})


router.post('/profile', (req, res) => {
  res.render('users/edit-profile', {loggedInUser: req.session.loggedInUser})
})

module.exports = router;