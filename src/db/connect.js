const mongoose = require("mongoose");

//Database connection

mongoose.Promise = global.Promise;

const connectDB = (url) => {
  return mongoose.connect(url);
};

module.exports = connectDB;
