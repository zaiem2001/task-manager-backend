const notFound = (req, res, next) => {
  const urlError = new Error(`URL not found: ${req.originalUrl}`);

  res.status(404);
  next(urlError);
};

const errorMiddleware = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message,
  });
};

module.exports = { notFound, errorMiddleware };
