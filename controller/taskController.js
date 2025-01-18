const Task = require('../models/Task');

// Get all tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new task
const addTask = async (req, res) => {
  const { title, description, category, completed } = req.body;

  try {
    const task = new Task({ title, description, category, completed });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Edit a task
const editTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, category, completed } = req.body;

  if (!id) {
    return res.status(400).json({ message: 'Task ID is required' });
  }

  try {
    const task = await Task.findByIdAndUpdate(
      id,
      { title, description, category, completed },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Task ID is required' });
  }

  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Toggle task completion status
const toggleTaskCompletion = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Task ID is required' });
  }

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    task.completed = !task.completed;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { getTasks, addTask, editTask, deleteTask, toggleTaskCompletion };