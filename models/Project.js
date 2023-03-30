import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  startDate: Date,
  endDate: Date,
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
