const { Schema, model } = require('mongoose');

const countrySchema = new Schema({
  name: String,
  img: String,
  books: Array,
  movies: Array
});

 module.exports = model('Country', countrySchema);
