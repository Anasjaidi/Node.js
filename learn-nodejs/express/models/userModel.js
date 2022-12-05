const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please tell us your name'],
  },
  email: {
    type: String,
    required: [true, 'emai field is required'],
    unique: [true, 'email must be uinque'],
    validate: [validator.isEmail, 'pls provide a valid mail'],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    minLength: 8,
  },
  confirmPassword: {
    type: String,
    required: [true, 'password is required'],
    minLength: 8,
    validate: {
      validator: function (val) {
        return val === this.password
      },
      message: 'for confirming password please re-type the same password',
    },
  },
  image: String,
})

module.exports = mongoose.model('User', userSchema)
