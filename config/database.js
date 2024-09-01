const mongoose = require("mongoose");
const dbConnection = () => {
  const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
  );

  mongoose
    .connect(DB, {})
    .then((conn) => {
      console.log(`DB Connection successful 🥳 ${conn.connection.host}`);
    })
    .catch((err) => {
      console.log("Database Connection Failed! ", err);
      process.exit(1);
    });
};
module.exports = dbConnection;
