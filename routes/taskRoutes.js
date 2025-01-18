const express = require('express');
const router = express.Router();
const {
  getTasks,
  addTask,
  editTask,
  deleteTask,
  toggleTaskCompletion,
} = require('../controller/taskController');

router.get('/tasks', getTasks);
router.post('/tasks', addTask);
router.put('/tasks/:id', editTask);
router.delete('/tasks/:id', deleteTask);
router.patch('/tasks/:id/completed', toggleTaskCompletion);

module.exports = router;
