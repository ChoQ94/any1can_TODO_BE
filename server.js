require("dotenv").config();
// yarn 에도 추가해준다음에야 불러올 수 있음.

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connect = require("./schema");
const app = express();
const Todo = require("./schema/todo");
const port = process.env.PORT;

// Static File Service
app.use(express.static("public"));
app.use(cors()); //cors 에러를 방지하기 위해
app.use(bodyParser.json()); //req 데이터를 파싱하기 위해서 사용된디~

connect();

app.post("/api/tasks", (req, res) => {
  const newTask = new Todo({
    title: req.body.title,
    completed: false,
  });

  newTask
    .save()
    .then((task) => {
      res.json(task);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    });
});

app.get("/api/tasks/:date", (req, res) => {
  const date = req.params.date;
  console.log(date);
  Todo.find({})
    .then((todoItems) => {
      res.json(todoItems);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    });
});

app.delete("/api/tasks/:id", (req, res) => {
  Todo.findByIdAndDelete(req.params.id)
    .then(() => {
      res.json({ success: true });
    })
    .catch((err) => {
      res.status(500).json({ error: "Server error" });
    });
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
