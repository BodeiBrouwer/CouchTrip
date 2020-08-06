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

 //missing countries:
 //Belize: 1
 //Angola: 1
 //Benin: 1
 // Burkina Faso: 1
 //chad: 1