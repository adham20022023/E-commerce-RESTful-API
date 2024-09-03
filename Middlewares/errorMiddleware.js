//! benefits :
//h1 no need to write error handling logic in every route
//h1 all errors return in consistent format
//h1 you can customize the error responses depending on the type of error : env: dev or prod
//h1 stack trace give where the error occurred
const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    return sendErrorForDev(res, err);
  } else {
    return sendErrorForProd(res, err);
  }
};
const sendErrorForDev = (res, err) => {
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorForProd = (res, err) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

module.exports = globalError;
