// const Task = require("../Models/taskModel");
// const {
//   find,
//   findByIdAndUpdate,
//   findByIdAndDelete,
// } = require("../Models/taskModel");

// class TaskController {
//   /**
//    * Create a new task
//    * @param {Object} req - Express request object
//    * @param {Object} res - Express response object
//    */
//   async createTask(req, res) {
//     try {
//       const task = new Task(req.body);
//       await task.save();
//       res
//         .status(201)
//         .json({ id: task._id, title: task.title, completed: task.completed });
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   }

//   /**
//    * Get all tasks
//    * @param {Object} req - Express request object
//    * @param {Object} res - Express response object
//    */
//   async getAllTasks(req, res) {
//     try {
//       const tasks = await find();
//       res
//         .status(200)
//         .json(
//           tasks.map((task) => ({
//             id: task._id,
//             title: task.title,
//             completed: task.completed,
//           }))
//         );
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   }

//   /**
//    * Update a task
//    * @param {Object} req - Express request object
//    * @param {Object} res - Express response object
//    */
//   async updateTask(req, res) {
//     try {
//       const task = await findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//       });
//       if (task) {
//         res
//           .status(200)
//           .json({ id: task._id, title: task.title, completed: task.completed });
//       } else {
//         res.status(404).json({ error: "Task not found" });
//       }
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   }

//   /**
//    * Delete a task
//    * @param {Object} req - Express request object
//    * @param {Object} res - Express response object
//    */
//   async deleteTask(req, res) {
//     try {
//       const success = await findByIdAndDelete(req.params.id);
//       if (success) {
//         res.status(200).json({ message: "Task deleted successfully" });
//       } else {
//         res.status(404).json({ error: "Task not found" });
//       }
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   }
// }

// module.exports = TaskController;

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