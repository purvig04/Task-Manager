const mongoose = require("mongoose");
const { type } = require("os");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide name"], //can pass only true
    trim: true,
    maxlength: [25, "name cannot be more than 25 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Task", taskSchema);
