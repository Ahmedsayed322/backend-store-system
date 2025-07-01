const ApiError = require('../utils/apiError');
const multer = require('multer');

const ErrorHandler = (err, req, res, next) => {
  // 1️⃣ Default values
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // 2️⃣ Mongoose Validation Error
  if (err.name === 'ValidationError') {
    

    const messages = Object.values(err.errors).map((e) => e.message);
    err = new ApiError(`Validation Error: ${messages.join(', ')}`, 400);
  }

  // 3️⃣ Duplicate key error (e.g., email or username already exists)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    err = new ApiError(`This '${field}' already exists`, 400);
  }

  // 4️⃣ Mongoose invalid ObjectId
  if (err.name === 'CastError') {
    err = new ApiError(`Invalid ${err.path}: ${err.value}`, 400);
  }

  // 5️⃣ JWT errors
  if (err.name === 'JsonWebTokenError') {
    err = new ApiError('Invalid token. Please log in again!', 401);
  }

  if (err.name === 'TokenExpiredError') {
    err = new ApiError('Your token has expired! Please log in again.', 401);
  }

  // 6️⃣ Multer or Upload errors
  if (
    err instanceof multer.MulterError ||
    err.message?.includes('Only image files') ||
    err.message?.includes('Duplicate')
  ) {
    err = new ApiError(err.message, 400);
  }

  // 7️⃣ Final error response
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = ErrorHandler;