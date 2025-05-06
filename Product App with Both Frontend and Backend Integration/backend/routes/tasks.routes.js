const express = require("express");
const router = express.Router();
const Task = require("../model/task.model.js");

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ tasks });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching tasks", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching task", error: error.message });
  }
});

router.post("/", async (req, res) => {
  const { title, description, status } = req.body;

  if (!title || !description || !status) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newTask = new Task({
      title,
      description,
      status,
    });
    await newTask.save();
    res.status(201).json({ newTask, message: "Task is created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating task", error: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  const { title, description, status } = req.body;

  if (!title && !description && !status) {
    return res
      .status(400)
      .json({ message: "At least one field is required to update" });
  }

  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, {
      title,
      description,
      status,
    });
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating task", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting task", error: error.message });
  }
});

module.exports = router;
