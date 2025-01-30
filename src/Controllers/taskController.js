let tasks = require("../data/tasks");

class TaskController {
  /**
   * Create a new task
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  createTask(req, res) {
    const { title, completed = false } = req.body;
    const id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
    const task = { id, title, completed };
    tasks.push(task);
    res.status(201).json(task);
  }

  /**
   * Get all tasks
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  getAllTasks(req, res) {
    res.status(200).json(tasks);
  }

  /**
   * Update a task
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  updateTask(req, res) {
    const { id } = req.params;
    const { title, completed } = req.body;
    const task = tasks.find((task) => task.id === parseInt(id));
    if (task) {
      task.title = title !== undefined ? title : task.title;
      task.completed = completed !== undefined ? completed : task.completed;
      res.status(200).json(task);
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  }

  /**
   * Delete a task
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  deleteTask(req, res) {
    const { id } = req.params;
    const index = tasks.findIndex((task) => task.id === parseInt(id));
    if (index !== -1) {
      tasks.splice(index, 1);
      res.status(200).json({ message: "Task deleted successfully" });
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  }
}

module.exports = TaskController;