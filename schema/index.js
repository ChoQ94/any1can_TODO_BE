const mongoose = require("mongoose");
require("dotenv").config();
const connect = () => {
  mongoose.connect(process.env.MONGO_DB);
  var db = mongoose.connection;

  db.on("error", function () {
    console.log("Connection Failed!");
  });
  db.once("open", function () {
    console.log("Connected!");
  });
};

module.exports = connect;
