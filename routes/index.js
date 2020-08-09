const express = require('express');
const router  = express.Router();
const bcryptjs = require('bcryptjs');

const UserModel = require('../models/User.model')

let signedIn = true;

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('country-details');
});

router.get('/signup', (req, res, next) => {
  res.render('auth/signup.hbs');
});

router.post('/signup', (req, res, next) => {
  res.render('auth/signup.hbs');
});

router.get('/signin', (req, res) => {
  res.render('auth/signin.hbs')
})

module.exports = router;
