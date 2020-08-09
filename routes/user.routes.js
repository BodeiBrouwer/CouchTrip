const express = require('express');
const router  = express.Router();
const bcryptjs = require('bcryptjs');
const BookModel = require('../models/Books.model');
const MovieModel = require('../models/Movies.model')

router.get('/map', (req, res, next) => {
  res.render('./country-overview.hbs')
});

module.exports = router;