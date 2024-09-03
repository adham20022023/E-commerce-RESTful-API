//! benefits :
//h1 no need to write error handling logic in every route
//h1 all errors return in consistent format
//h1 you can customize the error responses depending on the type of error : env: dev or prod
//h1 stack trace give where the error occurred
const globalError = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";
  res.status(statusCode).json({
    status: status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
module.exports = globalError;
