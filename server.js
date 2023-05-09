require("dotenv").config(); // yarn 에도 추가해준다음에야 불러올 수 있음.

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
  const date = req.body.date;
  const filteredDate = new Date(date);
  const newTask = new Todo({
    title: req.body.title,
    completed: false,
    date: filteredDate,
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

app.post("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  Todo.findOneAndUpdate({ _id: id });
});

app.get("/api/tasks/:date", (req, res) => {
  const date = req.params.date;
  const filteredDate = new Date(date);

  const startDate = new Date(
    filteredDate.getFullYear(),
    filteredDate.getMonth(),
    filteredDate.getDate()
  );
  const endDate = new Date(
    filteredDate.getFullYear(),
    filteredDate.getMonth(),
    filteredDate.getDate() + 1
  );

  Todo.find({ date: { $gte: startDate, $lt: endDate } })
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
  console.log(`connected on port ${port}`);
});
