const mongoose = require("mongoose");
const { MONGO_URL } = require("../environment");

const connectDB = () => {
  mongoose
    .connect(MONGO_URL)
    .then(() => {
      console.log("MongoDB connected successfully..");
    })
    .catch((err) => {
      console.log("Error in connecting the DB.");
      console.log(err);
    });
};

module.exports = connectDB;
