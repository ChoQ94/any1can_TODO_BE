const mongoose = require("mongoose");
require("dotenv").config();
const connect = () => {
  mongoose.connect(process.env.MONGO_DB);
  // 3. 연결된 testDB 사용
  var db = mongoose.connection;
  // 4. 연결 실패

  db.on("error", function () {
    console.log("Connection Failed!");
  });
  // 5. 연결 성공
  db.once("open", function () {
    console.log("Connected!");
  });
};

module.exports = connect;
