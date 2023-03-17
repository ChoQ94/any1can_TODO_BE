const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors()); //cors 에러를 방지하기 위해

app.use(bodyParser.json()); //req 데이터를 파싱하기 위해서 사용된디~

const tasks = {
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

  res.json(tasks);
});

app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

app.delete("/api/tasks/:id", (req, res) => {
  // Delete a task by ID
});

// const port = process.env.PORT || 8000;
const port = 8000;

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
