const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const userAuth = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ApiError('Authorization header must be provided', 400));
  }
  const token = req.headers['authorization'].replace('Bearer ', '');
  const decoded = await jwt.verify(token, process.env.SECRET_KEY);
  const user = await User.findOne({ _id: decoded._id, tokens: token });
  if (!user) {
    return next(new ApiError('User not found or token not valid', 401));
  }

  req.user = user;
  req.token = token;
  next();
});
module.exports = {
  userAuth,
};
