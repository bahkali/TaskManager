const { response } = require("express");
const Task = require("../models/taskModels");

const getAllTasks = async (req, res) => {
  await Task.find({})
    .then((tasks) => {
      res.status(200).json(tasks);
    })
    .catch((err) => {
      res.status(500).json({ msg: err });
    });
};

// get a task
const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
// get a single task
const getTask = async (req, res) => {
  const { id: taskId } = req.params;
  await Task.findById({ _id: taskId })
    .then((task) => {
      res.status(200).json(task);
    })
    .catch((err) => {
      res.status(500).json({ msg: err });
    });
};
// Update a single task
const updateTask = async (req, res) => {
  try {
    const { id: tastId } = req.params;
    const task = await Task.findByIdAndUpdate({ _id: tastId }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskId}` });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

// delete a single task
const deleteTask = async (req, res) => {
  try {
    const { id: tastId } = req.params;
    const task = await Task.findOneAndDelete({ _id: tastId });
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskId}` });
    }
    res.status(200).json({ message: "successfully remove task" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
