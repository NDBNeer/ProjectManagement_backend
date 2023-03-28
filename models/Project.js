import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: String,
  startDate: Date,
  endDate: Date,
  team: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
