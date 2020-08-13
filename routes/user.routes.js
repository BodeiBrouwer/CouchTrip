const express = require('express');
const router  = express.Router();
const bcryptjs = require('bcryptjs');
const axios = require('axios')
const multer = require('multer');

const BookModel = require('../models/Books.model');
const MovieModel = require('../models/Movies.model')
const CountryModel = require('../models/Country.model')
const UserModel = require('../models/User.model')


// include CLOUDINARY:
const uploader = require('../configs/cloudinary.config.js');

router.post('/upload', uploader.single("imageUrl"), (req, res, next) => {
    if (!req.file) {
      res.redirect('/profile/edit')
    }
    let user = req.session.loggedInUser;
    UserModel.findByIdAndUpdate(user._id, {$set: {profilePic: req.file.path}})
      .then((foundUser) => {
        res.redirect('/profile')
      })
    // res.json({ secure_url: req.file.path });
})

router.post('/new-country', (req, res, next) => {
  if (req.body.countrychoice === '') {
    let errorMessage = 'Please pick a country.'
      CountryModel.find()
     .then((countries) => {
      res.render('users/create-new.hbs', {countries, loggedInUser: req.session.loggedInUser, errorMessage})
      })
  }
  else {
    res.redirect(`/countries/${req.body.countrychoice}`)
  }
})


router.post('/new-country/random', (req, res, next) => {
  let randomNum= Math.floor(Math.random() * Math.floor(197));
  console.log(randomNum);
  CountryModel.find()
    .then((allCountries) => {
      let country = allCountries[randomNum].name;
      console.log(country);
      res.redirect(`/countries/${country}`)
    })
})

router.get('/profile', (req, res) => {
  if (req.session.loggedInUser){
    UserModel.findById(req.session.loggedInUser._id)
      .then((user) => {
        req.session.loggedInUser = user;
        res.render('users/profile.hbs', {loggedInUser: req.session.loggedInUser})
      })
  }
  else {
    res.redirect('/signin')
  }
})

router.get('/my-trips', (req, res, next) => {
  if (req.session.loggedInUser){

    let user = req.session.loggedInUser;

    if (user.countriesToDo.length > 0) {
    
    let myPromises =[]
    user.countriesToDo.forEach((countryName, i) => {
      if (countryName != '') {
      myPromises[i] = CountryModel.findOne({name: countryName})   }   
    })
    Promise.all(myPromises)
    .then((countriesToDo) => {
      res.render('users/my.trips.hbs', {loggedInUser: req.session.loggedInUser, countriesToDo})
    })

    }
    else {
      let errorMessage = "You have no countries in your collection yet."
      res.render('users/my.trips.hbs', {errorMessage, loggedInUser: req.session.loggedInUser})
    }
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
                results.forEach((result, i) => {
                  if (result.data.items){
                    let bookInfo = result.data.items[0] 
                    bookInfo.description = bookInfo.volumeInfo.description;

                    if (bookInfo.volumeInfo.imageLinks.thumbnail == undefined || null || '') {
                      bookInfo.img = 'https://cdn.pixabay.com/photo/2015/11/19/21/11/knowledge-1052013_960_720.jpg'
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
                  }
                  else {
                    myBooks.push({
                      title: books[i].title,
                      author: books[i].author,
                      img: 'https://cdn.pixabay.com/photo/2015/11/19/21/11/knowledge-1052013_960_720.jpg',
                      rating: 'no rating',
                    })
                  }
                })
              res.render('users/country-details.hbs', {country, movies, books: myBooks, loggedInUser: req.session.loggedInUser})
             })
             .catch((err) => {
              res.render('users/country-details.hbs', {country, movies, loggedInUser: req.session.loggedInUser})
             })
              
          }) 
         
      })  
    })
    .catch((err) => {
      let errorMessage = 'Please pick an actual country.'
      CountryModel.find()
     .then((countries) => {
      res.render('users/create-new.hbs', {countries, loggedInUser: req.session.loggedInUser, errorMessage})
      })
      console.log(`google is difficult`, err)
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
           res.redirect('/my-trips')
        })
  })
})

router.get('/countries/:country/add', (req, res) => {
  UserModel.findById(req.session.loggedInUser._id)
    .then((user)=> {
      if (user.countriesToDo.includes(req.params.country)) {
        res.redirect('/my-trips');
      }
      else {
        UserModel.findByIdAndUpdate(req.session.loggedInUser._id, {$push: {countriesToDo: req.params.country}})   
        .then(() => {
            UserModel.findById(req.session.loggedInUser._id)
             .then((user)=> {
                req.session.loggedInUser = user
                res.redirect('/my-trips')
             })
          })
        .catch((err) => {
          console.log('something is off', err)
        })
      }
    })
})

router.get('/profile/edit', (req, res) => {
  if (req.session.loggedInUser){
  res.render('users/edit-profile', {loggedInUser: req.session.loggedInUser})
}
else {
  res.redirect('/signin')
}
});

router.post('/profile/edit', (req, res) => {
  if (req.session.loggedInUser){
    let {username, email, favouritePlaces, favouriteBooks, favouriteMovies} = req.body
    let userId = req.session.loggedInUser._id
    UserModel.findByIdAndUpdate(userId, {$set: {username, email, favouritePlaces, favouriteBooks, favouriteMovies}})
    .then(() => {
      UserModel.findById(req.session.loggedInUser._id)
       .then((user)=> {
          req.session.loggedInUser = user
          res.redirect('/profile')
       })
    })
}
else {
  res.redirect('/signin')
}
});





module.exports = router;