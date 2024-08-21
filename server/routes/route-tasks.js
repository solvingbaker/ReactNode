const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/controller-task');
const validateTask = require('../middleware/middleware.tasks');

// Get all tasks
router.get('/', async (req, res, next) => {
  try {
    await tasksController.getTasks(req, res);
  } catch (error) {
    next(error); // Pasar el error al middleware de manejo de errores
  }
});

// Create a new task
router.post('/', validateTask, async (req, res, next) => {
  try {
    await tasksController.createTask(req, res);
  } catch (error) {
    next(error);
  }
});

// Update a task
router.put('/:id', validateTask, async (req, res, next) => {
  try {
    await tasksController.updateTask(req, res);
  } catch (error) {
    next(error);
  }
});

// Delete a task
router.delete('/:id', async (req, res, next) => {
  try {
    await tasksController.deleteTask(req, res);
  } catch (error) {
    next(error);
  }
});

module.exports = router;