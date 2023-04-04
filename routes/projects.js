import express from "express";
import Project from "../models/Project.js";
import Task from "../models/Task.js";

const projectRouter = express.Router();

// function to calculate the overall status of a project
const calculateProjectStatus = (tasks) => {
  if (tasks.length === 0) {
    return "Pending";
  }

  let totalTasks = tasks.length;
  let completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;
  let inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;
  let pendingTasks = tasks.filter((task) => task.status === "Pending").length;

  if (completedTasks === totalTasks) {
    return "Completed";
  } else if (inProgressTasks > 0) {
    return "In Progress";
  } else if (pendingTasks > 0) {
    return "Pending";
  }
};

// function to calculate the total cost of a project based on the tasks and its calculated by adding the working hours and cost per hour
const calculateProjectCost = (tasks) => {
  let totalCost = 0;
  tasks.forEach((task) => {
    totalCost += task.totalHoursWorked * task.hourlyRate;
  });
  return totalCost;
};

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
projectRouter.get("/", async (req, res) => {
  try {
    let projects = await Project.find();

    for (let i = 0; i < projects.length; i++) {
      // find all the tasks with the projectID
      var tasks = await Task.find();
      tasks = tasks.filter((task) => {
        return task.project.toString() == projects[i]._id.toString();
      });

      const projectStatus = calculateProjectStatus(tasks);
      const projectCost = calculateProjectCost(tasks);

      projects[i] = {
        ...projects[i]._doc,
        status: projectStatus,
        cost: projectCost,
        tasks: tasks,
      };
    }

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
      // find all the tasks with the projectID
      var tasks = await Task.find();
      tasks = tasks.filter((task) => {
        return task.project.toString() == project._id.toString();
      });

      const projectStatus = calculateProjectStatus(tasks);
      const projectCost = calculateProjectCost(tasks);

      return res.status(200).json({
        status: 200,
        data: {
          project,
          tasks,
          status: projectStatus,
          cost: projectCost,
        },
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
      return res.status(200).json({
        status: 200,
        data: project,
      });
    }
    return res.status(400).json({
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
    // get all the tasks with the projectID
    var tasks = await Task.find();
    tasks = tasks.filter((task) => {
      return task.project.toString() == req.params.projectID.toString();
    });

    // delete all the tasks with the projectID
    tasks.forEach(async (task) => {
      await Task.findByIdAndRemove(task._id);
    });

    // delete the project
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
