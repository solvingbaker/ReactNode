// controllers/controller-task.js
const tasks = require('../data/data.task');

// Get all tasks
const getTasks = (req, res) => {
  res.json(tasks);
};

// Create a new task
const createTask = (req, res) => {
  const { text, completed } = req.body;
  if (!text) {
    return res.status(400).json({ message: 'Task text is required' });
  }
  const newTask = { id: Date.now(), text, completed: completed || false };
  tasks.push(newTask);
  res.status(201).json(newTask);
};

// Update a task
const updateTask = (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const task = tasks.find(t => t.id == id);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  task.completed = completed;
  res.json(task);
};

// Delete a task
const deleteTask = (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex(t => t.id == id);
  if (index === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  tasks.splice(index, 1);
  res.status(204).end();
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};