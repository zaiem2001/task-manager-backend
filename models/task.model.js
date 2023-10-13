const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    description: { type: Stirng, required: true },
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    list: { type: mongoose.Types.ObjectId, ref: "List", required: true },

    completed: { type: Boolean, default: false, required: true },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", TaskSchema);
module.exports = { Task };
