import express from "express";
import { Project } from "../models/Project.js";

const projectRouter = express.Router();

// Route to create a new project
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

// Route to get all projects
projectRouter.get("/list", async (req, res) => {
  try {
    let projects = await Project.find();
    res.status(200).json({
      status: 200,
      data: projects,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

// Route to get a single project
projectRouter.get("/:projectID", async (req, res) => {
  try {
    let project = await Project.findOne({
      _id: req.params.projectID,
    });
    if (project) {
      res.status(200).json({
        status: 200,
        data: project,
      });
    }
    res.status(400).json({
      status: 400,
      message: "No Project found",
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

// Route to update a project
projectRouter.put("/:projectID", async (req, res) => {
  try {
    let project = await Project.findByIdAndUpdate(
      req.params.projectID,
      req.body,
      {
        new: true,
      }
    );
    if (project) {
      res.status(200).json({
        status: 200,
        data: project,
      });
    }
    res.status(400).json({
      status: 400,
      message: "No Project found",
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

// Route to delete a project
projectRouter.delete("/:projectID", async (req, res) => {
  try {
    let project = await Project.findByIdAndRemove(req.params.projectID);
    if (project) {
      res.status(200).json({
        status: 200,
        message: "Project deleted successfully",
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "No Project found",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

export default projectRouter;
