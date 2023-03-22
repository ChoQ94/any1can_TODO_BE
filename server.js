const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
app.use(cors()); //cors 에러를 방지하기 위해
app.use(bodyParser.json()); //req 데이터를 파싱하기 위해서 사용된디~

var mongoose = require("mongoose");
// 2. testDB 세팅
mongoose.connect(
  "mongodb+srv://choq:kw940419@choqcluster.kbhnwiy.mongodb.net/?retryWrites=true&w=majority"
);
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

// var Client = require("mongodb").MongoClient;

// Client.connect(
//   "mongodb+srv://choq:kw940419@choqcluster.kbhnwiy.mongodb.net/?retryWrites=true&w=majority",
//   function (error, db) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("connected:" + db);
//       db.close();
//     }
//   }
// );

let tasks = {
  name: "kevin",
  data: [
    { id: 1, title: "출근하기", completed: false },
    { id: 2, title: "코딩하기", completed: true },
    { id: 3, title: "퇴근하기", completed: false },
  ],
};

app.post("/api/tasks", (req, res) => {
  const newTask = {
    id: tasks.data.length + 1,
    title: req.body.title,
    completed: false,
  };

  tasks.data.push(newTask);

  console.log("post", tasks);
  res.json(tasks);
});

app.get("/api/tasks", (req, res) => {
  console.log("get", tasks);
  res.json(tasks);
});

app.delete("/api/tasks/:id", (req, res) => {
  tasks.data = tasks.data.filter((item) => item.id !== Number(req.params.id)); // http 나 tcp는  text data만 서포트 해주기에 변환된다.

  console.log("delete", tasks);
  res.json(tasks);
});

// const port = process.env.PORT || 8000;
const port = 8000;

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
