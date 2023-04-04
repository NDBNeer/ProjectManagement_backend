import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: String,
  startDate: String,
  endDate: String,
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  assosicatedTask: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
  },
  totalHoursWorked: Number,
  hourlyRate: Number,
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
