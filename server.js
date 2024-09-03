const express = require("express");
const morgan = require("morgan");
const dbConnection = require("./config/database");
const categoryRoute = require("./routes/categoryRoute.js");
const globalError = require("./Middlewares/errorMiddleware.js");
const dotenv = require("dotenv");
const AppError = require("./utils/Api-error.js");
dotenv.config({ path: "./config.env" });
//! Connect To DB
dbConnection();
//! Express APP
const app = express();
//! Middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json()); // parse incoming request =>request
//! Route Mount
app.use("/api/v1/categories", categoryRoute);
app.all("*", (req, res, next) => {
  // const error = new Error(
  //   `can't Find this route${req.originalUrl} on this server`
  // );
  // next(error.message);
  console.log("sfsafasfasdfasdfafdasdfsdfsdfs");
  next(
    new AppError(`Can't find this route ${req.originalUrl} on this server`, 404)
  );
});
//Global Error Handling Middleware
app.use(globalError);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}...`);
});
