const { Schema, model } = require('mongoose');

const movieSchema = new Schema({
  title:{
    type: String,
    required: true
  },
  country: String,
  description: String,
  rating: String,
  img: String,
  imdb: String
});

 module.exports = model('Movie', movieSchema);