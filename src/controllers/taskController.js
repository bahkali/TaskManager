const Task = require("../models/taskModels");

const getAllTasks = (req, res) => {
  Task.find({}, (err, task) => {
    if (err) {
      res.send(err);
    }
    res.json(task);
  });
};

// get a task
const createTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
};
// get a single task
const getTask = (req, res) => {
  Task.findById(req.params.id, (err, task) => {
    if (err) {
      res.send(err);
    }
    res.json(task);
  });
};
// Update a single task
const updateTask = (req, res) => {
  Task.findByIdAndUpdate({ _id: req.params.id }, req.body, (err, task) => {
    if (err) {
      res.send(err);
    }
    res.json(task);
  });
};

// delete a single task
const deleteTask = (req, res) => {
  Task.remove({ _id: req.params.id }, (err, task) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: "successfully remove task" });
  });
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
