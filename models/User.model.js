const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
      type: String, 
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true, 
    },
    passwordHash: {
      type: String, 
      required: true,
      minlength: 6
    },
    countriesVisited: Array,
    countriesToDo: Array
  },
  {
    timestamps: true
  }
);

 module.exports = model('User', userSchema);