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
// 설정을 추가할 수 있는 방식
// mongoose
//   .connect(process.env.MONGO_DB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Successfully connected to mongodb"))
//   .catch((e) => console.error(e));

module.exports = connect;
