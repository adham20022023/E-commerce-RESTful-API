const express = require("express");
const morgan = require("morgan");
const dbConnection = require("./config/database");
const categoryRoute = require("./routes/categoryRoute.js");
const dotenv = require("dotenv");
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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}...`);
});
