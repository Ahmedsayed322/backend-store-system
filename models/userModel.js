const mongoose = require('mongoose');
const validator = require('validator');
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'username is required'],
      validate(val) {
        const pattern = new RegExp(
          '^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$'
        );
        if (!val.match(pattern)) {
          throw new Error('invalid username');
        }
      },
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
      lowercase: true,
      validate(val) {
        if (!validator.isEmail(val)) {
          throw new Error('invalid email');
        }
      },
    },
    gender: {
      type: String,
      required: [true, 'gender is required'],
      enum: ['male', 'female'],
    },
    name: { type: String, required: true },

    phonenumber: {
      type: String,
    },
    password: {
      type: String,
      required: [true, 'password is required'],
      minlength: [8, 'password is must be more than or equal to 8'],
      validate(val) {
        const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!pattern.test(val)) {
          throw new Error(
            'Password must contain at least 8 characters, including uppercase, lowercase, and a number.'
          );
        }
      },
    },
    role: {
      type: String,
      required: true,
      default: 'user',
      enum: ['admin', 'user'],
    },
  },
  { timestamps: true }
);
const User = mongoose.model('User', userSchema);
module.exports = User;
