const express = require("express");
const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const router = express.Router();

// app.get('/api/v1/tasks') - get all the tasks
// app.post('/api/v1/tasks') - create a new tasks
// app.get('/api/v1/tasks/:id') - get single tasks
// app.patch('/api/v1/tasks/:id') - update tasks
// app.delete('/api/v1/tasks/:id') - delete tasks

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getTask).put(updateTask).delete(deleteTask);

module.exports = router;
