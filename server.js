const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(bodyParser.json());

const tasks = [];

app.post("api/tasks", (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: false,
  };

  tasks.push(newTask);

  res.json(tasks);
});

app.get("/api/tasks", (req, res) => {
  const tasks = [
    { id: 1, title: "Task 1", completed: false },
    { id: 2, title: "Task 2", completed: true },
    { id: 3, title: "Task 3", completed: false },
  ];
  res.json(tasks);
});

app.delete("/api/tasks/:id", (req, res) => {
  // Delete a task by ID
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
