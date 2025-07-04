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
      validate(val) {
        if (val && !validator.isMobilePhone(val, 'any')) {
          throw new Error('Invalid phone number');
        }
      },
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
    expiresIn: '30d',
  });
  if (this.tokens.length >= 4) {
    this.tokens.shift();
  }
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
    throw new Error('please Enter Email/Username');
  }
  if (!password) {
    throw new Error('please Enter Password');
  }
  const user = await User.findOne(search);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('invalid Email/Username or password');
  }
  return user;
};
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.tokens;
  return user;
};
const User = mongoose.model('User', userSchema);
module.exports = User;
