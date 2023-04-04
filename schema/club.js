const mongoose = require("mongoose");

const { Schema } = mongoose;

let todoSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Todo", todoSchema);
