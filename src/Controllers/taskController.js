const Task = require("../Models/taskModel");
const {
  find,
  findByIdAndUpdate,
  findByIdAndDelete,
} = require("../Models/taskModel");

class TaskController {
  /**
   * Create a new task
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async createTask(req, res) {
    try {
      const task = new Task(req.body);
      await task.save();
      res
        .status(201)
        .json({ id: task._id, title: task.title, completed: task.completed });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * Get all tasks
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getAllTasks(req, res) {
    try {
      const tasks = await find();
      res
        .status(200)
        .json(
          tasks.map((task) => ({
            id: task._id,
            title: task.title,
            completed: task.completed,
          }))
        );
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Update a task
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async updateTask(req, res) {
    try {
      const task = await findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (task) {
        res
          .status(200)
          .json({ id: task._id, title: task.title, completed: task.completed });
      } else {
        res.status(404).json({ error: "Task not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * Delete a task
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async deleteTask(req, res) {
    try {
      const success = await findByIdAndDelete(req.params.id);
      if (success) {
        res.status(200).json({ message: "Task deleted successfully" });
      } else {
        res.status(404).json({ error: "Task not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = TaskController;