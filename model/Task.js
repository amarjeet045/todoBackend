const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  createTimestamp: {
    type: Number,
  },
});

module.exports = mongoose.model("Tasks", taskSchema);
