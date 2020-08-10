const express = require('express');
const router  = express.Router();
const bcryptjs = require('bcryptjs');
const BookModel = require('../models/Books.model');
const MovieModel = require('../models/Movies.model')

router.get('/map', (req, res, next) => {
  if (req.session.loggedInUser){
    res.render('./country-overview.hbs', {loggedInUser: req.session.loggedInUser})
  }
  else {
    res.redirect('/signin')
  }
});

router.get('/new-country', (req, res, next) => {
  if (req.session.loggedInUser){
    res.render('./create-new.hbs', {loggedInUser: req.session.loggedInUser})
  }
  else {
    res.redirect('/signin')
  }
});

router.get('/profile', (req, res) => {
  if (req.session.loggedInUser){
    res.render('./users/profile.hbs', {loggedInUser: req.session.loggedInUser})
  }
  else {
    res.redirect('/signin')
  }
})

module.exports = router;