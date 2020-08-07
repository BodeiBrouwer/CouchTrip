const express = require('express');
const router  = express.Router();

let signedIn = true;

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('country-details');
});

module.exports = router;
