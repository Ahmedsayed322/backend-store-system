const ApiError = require('../utils/apiError');

const ErrorHandler = (err, req, res, next) => {
  // Default values
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Handle Mongoose Validation Errors
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    err = new ApiError(`Validation Error: ${messages.join(', ')}`, 400);
  }

  // Handle Duplicate Key Errors
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    err = new ApiError(`Duplicate field value: '${field}' already exists`, 400);
  }

  // Handle Cast Errors (e.g. invalid Mongo ID)
  if (err.name === 'CastError') {
    err = new ApiError(`Invalid ${err.path}: ${err.value}`, 400);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    err = new ApiError('Invalid token. Please log in again!', 401);
  }

  if (err.name === 'TokenExpiredError') {
    err = new ApiError('Your token has expired! Please log in again.', 401);
  }

  // Final response
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

module.exports = ErrorHandler;
