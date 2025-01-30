document.addEventListener("DOMContentLoaded", function () {
  const taskForm = document.getElementById("task-form");
  const taskInput = document.getElementById("task-title");
  const taskList = document.getElementById("task-list");

  /**
   * Fetches all tasks from the API.
   * @returns {Promise<Object[]>} A promise that resolves to an array of tasks.
   */
  async function fetchTasks() {
    const response = await fetch("/api/tasks");
    const tasks = await response.json();
    return tasks;
  }

  /**
   * Creates a new task by sending a POST request to the API.
   * @param {string} title - The title of the task to be created.
   * @returns {Promise<Object>} A promise that resolves to the newly created task.
   */
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

  /**
   * Updates a task by sending a PUT request to the API.
   * @param {number} id - The ID of the task to be updated.
   * @param {Object} updatedTask - The updated task data.
   * @param {string} updatedTask.title - The updated title of the task.
   * @param {boolean} updatedTask.completed - The updated completion status of the task.
   * @returns {Promise<Object>} A promise that resolves to the updated task.
   */
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

  /**
   * Deletes a task by sending a DELETE request to the API.
   * @param {number} id - The ID of the task to be deleted.
   * @returns {Promise<void>} A promise that resolves when the task is deleted.
   */
  async function deleteTask(id) {
    await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });
  }

  /**
   * Handles the form submission to create a new task.
   * @param {Event} event - The form submission event.
   */
  taskForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const taskTitle = taskInput.value.trim();
    if (taskTitle !== "") {
      const task = await createTask(taskTitle);
      renderTask(task);
      taskInput.value = "";
    }
  });

  /**
   * Renders a task item in the task list.
   * @param {Object} task - The task to render.
   * @param {number} task.id - The ID of the task.
   * @param {string} task.title - The title of the task.
   * @param {boolean} task.completed - The completion status of the task.
   */
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

    taskItem
      .querySelector(".delete-btn")
      .addEventListener("click", async function () {
        await deleteTask(task.id);
        taskList.removeChild(taskItem);
      });
  }

  /**
   * Loads tasks from the API and renders them.
   */
  async function loadTasks() {
    const tasks = await fetchTasks();
    tasks.forEach((task) => renderTask(task));
  }

  loadTasks();
});
