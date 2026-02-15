// middlewares/errorMiddleware.js
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    message: err.message || 'Server Error',
    timestamp: new Date().toISOString(),
    // Optionally: errorType: err.type || 'Unknown Error'
  });
};

module.exports = errorHandler;