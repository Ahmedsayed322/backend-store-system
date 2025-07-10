const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const ApiError = require('../utils/apiError');

exports.signup = asyncHandler(async (req, res, next) => {
  req.body.role = 'user';
  const user = new User(req.body);
  const token = await user.generateToken();
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.status(201).json({
    status: 'success',
    message: 'signup successful',

    user,
  });
});
exports.login = asyncHandler(async (req, res, next) => {
  const user = await User.login(
    req.body.emailorusername,
    req.body.password,
    
  );
  const token = await user.generateToken();
  res.cookie('token', token, {
    httpOnly: true,

    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.status(200).json({
    status: 'success',
    message: 'login successful',
    user: user,
  });
});
exports.profile = asyncHandler(async (req, res, next) => {
  return res.status(200).json(req.user);
});
exports.edit = asyncHandler(async (req, res, next) => {
  const user = req.user;
  if ('role' in req.body) {
    delete req.body.role;
  }
  // If user wants to change password
  if ('newPassword' in req.body && !req.body.oldPassword) {
    return next(new ApiError('You must provide your old password', 400));
  }
  if (req.body.oldPassword && req.body.newPassword) {
    const isMatch = await bcrypt.compare(req.body.oldPassword, user.password);
    if (!isMatch) {
      return next(new ApiError('Incorrect old password', 401));
    }
    user.password = req.body.newPassword;
  }

  // Update other fields (except restricted ones)
  const allowedFields = ['name', 'phonenumber', 'gender'];
  allowedFields.forEach((field) => {
    if (req.body[field]) {
      user[field] = req.body[field];
    }
  });

  await user.save();
  res.status(200).json({ message: 'Updated successfully', user });
});
exports.logout = asyncHandler(async (req, res, next) => {
  req.user.tokens = req.user.tokens.filter((token) => token !== req.token);
  await req.user.save();
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });

  res.status(200).json({ message: 'Logged out' });
});
exports.logoutAll = asyncHandler(async (req, res, next) => {
  req.user.tokens = [];
  await req.user.save();
  res.status(201).json({ message: 'user logged out from all devices' });
});
