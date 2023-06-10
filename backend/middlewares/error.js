const error = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode).json({
    message: err.message.startsWith("User validation failed:")
      ? err
      : err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : "",
  });
  next();
};

module.exports = {
  error,
};
