import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: true,
      maxlength: 100,
    },
    taskDescription: {
      type: String,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: null,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
