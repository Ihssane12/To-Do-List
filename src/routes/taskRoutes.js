const express = require('express');
const TaskController = require('../Controllers/taskController');

const router = express.Router();
const taskController = new TaskController();

router.post('/tasks', taskController.createTask.bind(taskController));
router.get('/tasks', taskController.getAllTasks.bind(taskController));
router.put('/tasks/:id', taskController.updateTask.bind(taskController));
router.delete('/tasks/:id', taskController.deleteTask.bind(taskController));

module.exports = router;