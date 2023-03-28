import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: String,
  startDate: Date,
  endDate: Date,
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
