// document.addEventListener("DOMContentLoaded", function () {
//   const taskForm = document.getElementById("task-form");
//   const taskInput = document.getElementById("task-title");
//   const taskList = document.getElementById("task-list");

//   let tasks = []; // Simulating a database in memory
//   let idCounter = 1; // Unique ID counter

//   // Simulated REST API
//   function createTask(title) {
//     const newTask = { id: idCounter++, title, completed: false };
//     tasks.push(newTask);
//     return newTask;
//   }

//   function getTasks() {
//     return tasks;
//   }

//   function updateTask(id, updatedTask) {
//     const task = tasks.find(t => t.id === id);
//     if (!task) return null;

//     task.title = updatedTask.title ?? task.title;
//     task.completed = updatedTask.completed ?? task.completed;
//     return task;
//   }

//   function deleteTask(id) {
//     const initialLength = tasks.length;
//     tasks = tasks.filter(t => t.id !== id);
//     return initialLength !== tasks.length;
//   }

//   // UI: Add a task
//   taskForm.addEventListener("submit", function (event) {
//     event.preventDefault();
//     const taskTitle = taskInput.value.trim();
//     if (taskTitle !== "") {
//       const task = createTask(taskTitle);
//       renderTask(task);
//       taskInput.value = "";
//     }
//   });

//   // UI: Render a task
//   function renderTask(task) {
//     const taskItem = document.createElement("li");
//     taskItem.setAttribute("data-id", task.id);
//     taskItem.innerHTML = `
//       <input type="checkbox" class="complete-checkbox" ${task.completed ? "checked" : ""}>
//       <span class="task-title ${task.completed ? "completed" : ""}">${task.title}</span>
//       <button class="edit-btn">Edit</button>
//       <button class="delete-btn">Delete</button>
//     `;
//     taskList.appendChild(taskItem);

//     // Toggle completed status
//     taskItem.querySelector(".complete-checkbox").addEventListener("change", function () {
//       const isChecked = this.checked;
//       const updatedTask = updateTask(task.id, { completed: isChecked });
//       if (updatedTask) {
//         taskItem.querySelector(".task-title").classList.toggle("completed", isChecked);
//       }
//     });

//     // Edit task
//     taskItem.querySelector(".edit-btn").addEventListener("click", function () {
//       const newTitle = prompt("Edit task:", task.title);
//       if (newTitle !== null && newTitle.trim() !== "") {
//         const updatedTask = updateTask(task.id, { title: newTitle });
//         if (updatedTask) {
//           taskItem.querySelector(".task-title").textContent = updatedTask.title;
//         }
//       }
//     });

//     // Delete task
//     taskItem.querySelector(".delete-btn").addEventListener("click", function () {
//       if (deleteTask(task.id)) {
//         taskList.removeChild(taskItem);
//       }
//     });
//   }

//   // Load existing tasks
//   function loadTasks() {
//     const allTasks = getTasks();
//     allTasks.forEach(task => renderTask(task));
//   }

//   loadTasks();
// });

document.addEventListener("DOMContentLoaded", function () {
  const taskForm = document.getElementById("task-form");
  const taskInput = document.getElementById("task-title");
  const taskList = document.getElementById("task-list");

  // Fetch tasks from the server
  async function fetchTasks() {
    const response = await fetch("/api/tasks");
    const tasks = await response.json();
    return tasks;
  }

  // Create a new task
  async function createTask(title) {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, completed: false }),
    });
    const task = await response.json();
    return task;
  }

  // Update a task
  async function updateTask(id, updatedTask) {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });
    const task = await response.json();
    return task;
  }

  // Delete a task
  async function deleteTask(id) {
    await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });
  }

  // UI: Add a task
  taskForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const taskTitle = taskInput.value.trim();
    if (taskTitle !== "") {
      const task = await createTask(taskTitle);
      renderTask(task);
      taskInput.value = "";
    }
  });

  // UI: Render a task
  function renderTask(task) {
    const taskItem = document.createElement("li");
    taskItem.setAttribute("data-id", task.id);
    taskItem.innerHTML = `
      <input type="checkbox" class="complete-checkbox" ${
        task.completed ? "checked" : ""
      }>
      <span class="task-title ${task.completed ? "completed" : ""}">${
      task.title
    }</span>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    `;
    taskList.appendChild(taskItem);

    // Toggle completed status
    taskItem
      .querySelector(".complete-checkbox")
      .addEventListener("change", async function () {
        const isChecked = this.checked;
        const updatedTask = await updateTask(task.id, { completed: isChecked });
        if (updatedTask) {
          taskItem
            .querySelector(".task-title")
            .classList.toggle("completed", isChecked);
        }
      });

    // Edit task
    taskItem
      .querySelector(".edit-btn")
      .addEventListener("click", async function () {
        const newTitle = prompt("Edit task:", task.title);
        if (newTitle !== null && newTitle.trim() !== "") {
          const updatedTask = await updateTask(task.id, { title: newTitle });
          if (updatedTask) {
            taskItem.querySelector(".task-title").textContent =
              updatedTask.title;
          }
        }
      });

    // Delete task
    taskItem
      .querySelector(".delete-btn")
      .addEventListener("click", async function () {
        await deleteTask(task.id);
        taskList.removeChild(taskItem);
      });
  }

  // Load existing tasks
  async function loadTasks() {
    const tasks = await fetchTasks();
    tasks.forEach((task) => renderTask(task));
  }

  loadTasks();
});