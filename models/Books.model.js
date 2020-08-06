const { Schema, model } = require('mongoose');

const bookSchema = new Schema({
  title:{
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  country: String,
  description: String,
  rating: Number,
  img: String
});

 module.exports = model('Book', bookSchema);
