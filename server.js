const express = require("express");
require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const dbConnection = require("./config/database");
const categoryRoute = require("./routes/categoryRoute");
const subcategoryRoute = require("./routes/subCategoryRoute");
const BrandRoutes = require("./routes/brandRoute");
const productRoute = require("./routes/productRoute");
const globalError = require("./Middlewares/errorMiddleware");
const AppError = require("./utils/Api-error");

dotenv.config({ path: "./config.env" });
//! Connect To DB
dbConnection();
//! Express APP
const app = express();
//! Middlewares
if (process.env.NODE_ENV === "development") {
  // colors console .log
  console.log("Development Mode".blue.bold);
  app.use(morgan("dev"));
}
app.use(express.json()); // parse incoming request =>request
app.use(express.static(`${__dirname}/uploads`));
//! Route Mount
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/subcategories", subcategoryRoute);
app.use("/api/v1/brands", BrandRoutes);
app.use("/api/v1/products", productRoute);
app.all("*", (req, res, next) => {
  // const error = new Error(
  //   `can't Find this route${req.originalUrl} on this server`
  // );
  // next(error.message);
  next(
    new AppError(`Can't find this route ${req.originalUrl} on this server`, 404)
  );
});
//Global Error Handling Middleware
app.use(globalError);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}...`);
});
//! Handle Rejections outside Express
process.on("unhandledRejection", (err) => {
  console.log(`unhandledRejection Errors:${err.name} | ${err.message}`);
  server.close(() => {
    console.log(`ShutingDown....`);
    process.exit(1);
  });
});
