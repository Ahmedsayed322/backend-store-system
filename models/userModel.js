const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ApiError = require('../utils/apiError');
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'username is required'],
      unique: true,
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
    name: { type: String, required: [true, 'name is required'] },

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
      required: [true, 'role is required'],
      default: 'user',
      enum: ['admin', 'user'],
    },
    tokens: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
userSchema.methods.generateToken = async function () {
  const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY, {
    expiresIn: '1h',
  });
  this.tokens = [...this.tokens, token];
  await this.save();

  return token;
};
userSchema.statics.login = async function (emailorusername, password, next) {
  const User = this;
  const search = {};
  if (emailorusername) {
    if (validator.isEmail(emailorusername)) {
      search.email = emailorusername;
    } else {
      search.username = emailorusername;
    }
  } else {
    return next(new ApiError('please Enter Email/Username', 400));
  }
  if (!password) {
    return next(new ApiError('please Enter Password', 400));
  }
  const user = await User.findOne(search);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new ApiError('invalid Email/Username or password', 401));
  }
  return user;
};
const User = mongoose.model('User', userSchema);
module.exports = User;
