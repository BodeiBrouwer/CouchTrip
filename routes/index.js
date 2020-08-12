const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');

const UserModel = require('../models/User.model')

let signedIn = true;

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index.hbs');
});

router.get('/signup', (req, res, next) => {
  res.render('auth/signup.hbs');
});

router.get('/signin', (req, res) => {
  res.render('auth/signin.hbs')
})

router.post('/signup', (req, res) => {
  const {
    name,
    email,
    password
  } = req.body

  if (!name || !email || !password) {
    res.status(500).render('auth/signup.hbs', {
      errorMessage: 'Please enter all details'
    })
    return;
  }

  UserModel.findOne({
    email: email
  }).then(user => {
    if (user) {
      res.status(500).render('auth/signup.hbs', {
        errorMessage: 'Email address already in use'
      })
      return;
    }
  })

  const emailReg = new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
  if (!emailReg.test(email)) {
    res.status(500).render('auth/signup.hbs', {
      errorMessage: 'Please enter valid email'
    })
    return;
  }

  const passReg = new RegExp(/^(?=.*\d).{6,20}$/)
  if (!passReg.test(password)) {
    res.status(500).render('auth/signup.hbs', {
      errorMessage: 'Password must be between 6 and 20 characters and must contain at least one number'
    })
    return;
  }

  bcryptjs.genSalt(10)
    .then((salt) => {
      bcryptjs.hash(password, salt)
        .then((hashPass) => {
          // create that user in the db
          UserModel.create({
              username: name,
              email,
              passwordHash: hashPass
            })
            .then(() => {
              res.redirect('/new-country')
            })
        })
    })
})

router.post('/', (req, res) => {
  const {
    email,
    password
  } = req.body

  if (!email || !password) {
    res.status(500).render('auth/signin.hbs', {
      errorMessage: 'Please enter all details'
    })
    return;
  }

  const emailReg = new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
  if (!emailReg.test(email)) {
    res.status(500).render('auth/signin.hbs', {
      errorMessage: 'Please enter valid email'
    })
    return;
  }

  const passReg = new RegExp(/^(?=.*\d).{6,20}$/)
  if (!passReg.test(password)) {
    res.status(500).render('auth/signin.hbs', {
      errorMessage: 'Password must be between 6 and 20 characters and must contain at least one number'
    })
    return;
  }

  UserModel.findOne({
      email: email
    })
    .then((userData) => {

      let doesItMatch = bcryptjs.compareSync(password, userData.passwordHash);
      if (doesItMatch) {
        // loggedInUser = userData
        req.session.loggedInUser = userData
        res.redirect('/new-country')
      } else {
        res.status(500).render('auth/signin.hbs', {
          errorMessage: 'Passwords do not match'
        })
      }
    })
    .catch((err) => {
      console.log('Error ', err)
    })
})

router.post('/signin', (req, res) => {
  const {
    email,
    password
  } = req.body
  if (!email || !password) {
    res.status(500).render('auth/signin.hbs', {
      errorMessage: 'Please enter all details'
    })
    return;
  }

  const emailReg = new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
  if (!emailReg.test(email)) {
    res.status(500).render('auth/signin.hbs', {
      errorMessage: 'Please enter valid email'
    })
    return;
  }

  const passReg = new RegExp(/^(?=.*\d).{6,20}$/)
  if (!passReg.test(password)) {
    res.status(500).render('auth/signin.hbs', {
      errorMessage: 'Password must be between 6 and 20 characters and must contain at least one number'
    })
    return;
  }

  UserModel.findOne({
      email: email
    })
    .then((userData) => {

      let doesItMatch = bcryptjs.compareSync(password, userData.passwordHash);
      if (doesItMatch) {
        // loggedInUser = userData
        req.session.loggedInUser = userData
        res.redirect('/new-country')
      } else {
        res.status(500).render('auth/signin.hbs', {
          errorMessage: 'Passwords do not match'
        })
      }
    })
    .catch((err) => {
      console.log('Error ', err)
    })
})

router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });

module.exports = router;