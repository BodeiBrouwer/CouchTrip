const express = require('express');
const router  = express.Router();
const bcryptjs = require('bcryptjs');
const BookModel = require('../models/Books.model');
const MovieModel = require('../models/Movies.model')
const CountryModel = require('../models/Country.model')

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
  CountryModel.findById(req.params.id)
      .then((country) => {
          res.render('users/country-details.hbs', {country})
      })
})


router.post('/profile', (req, res) => {
  res.render('users/edit-profile', {loggedInUser: req.session.loggedInUser})
})

module.exports = router;