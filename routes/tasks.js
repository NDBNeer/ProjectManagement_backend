import express from "express";
import Task from "../models/Task.js";

const taskRouter = express.Router();

// Route to create a new task
taskRouter.post("/", async (req, res) => {
  try {
    let task = new Task(req.body);
    task = await task.save();

    res.status(200).json({
      status: 200,
      data: task,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});
// Route to get all tasks
taskRouter.get("/list", async (req, res) => {
  try {
    let tasks = await Task.find();
    res.status(200).json({
      status: 200,
      data: tasks,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});
// Route to update a task
taskRouter.put("/:taskID", async (req, res) => {
  try {
    let task = await Task.findByIdAndUpdate(req.params.taskID, req.body, {
      new: true,
    });
    if (task) {
      return res.status(200).json({
        status: 200,
        data: task,
      });
    }
    return res.status(400).json({
      status: 400,
      message: "Task not found",
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});
// Route to delete a task
taskRouter.delete("/:taskID", async (req, res) => {
  try {
    let task = await Task.findByIdAndDelete(req.params.taskID);
    if (task) {
      res.status(200).json({
        status: 200,
        data: task,
      });
    }
    res.status(400).json({
      status: 400,
      message: "Task not found",
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});
// Route to get a single task
taskRouter.get("/:taskID", async (req, res) => {
  try {
    let task = await Task.findOne({
      _id: req.params.taskID,
    });
    if (task) {
      return res.status(200).json({
        status: 200,
        data: {
          task,
          totalCost: task.totalHoursWorked * task.hourlyRate,
        },
      });
    }
    res.status(400).json({
      status: 400,
      message: "Task not found",
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

export default taskRouter;
