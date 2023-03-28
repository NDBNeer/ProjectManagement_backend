import express from "express";
import Project from "../models/Project.js";

const projectRouter = express.Router();

projectRouter.post("/", async (req, res) => {
  try {
    let project = new Project(req.body);
    project = await project.save();
    res.status(200).json({
      status: 200,
      data: project,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

export default projectRouter;
