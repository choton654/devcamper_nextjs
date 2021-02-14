// const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  // Log to console for dev
  console.log(err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    err.message = `Resource not found`;
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    err.message = 'Duplicate field value entered';
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    err.message = Object.values(err.errors).map((val) => val.message);
  }

  res.status(err.statusCode || 500).json({
    success: false,
    err: err.message || 'Server Error',
  });
};

module.exports = errorHandler;
