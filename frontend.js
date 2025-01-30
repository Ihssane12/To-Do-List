document.addEventListener("DOMContentLoaded", function () {
  const taskForm = document.getElementById("task-form");
  const taskInput = document.getElementById("task-title");
  const taskList = document.getElementById("task-list");

  async function fetchTasks() {
    const response = await fetch("/api/tasks");
    const tasks = await response.json();
    return tasks;
  }

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

  async function deleteTask(id) {
    await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });
  }

  taskForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const taskTitle = taskInput.value.trim();
    if (taskTitle !== "") {
      const task = await createTask(taskTitle);
      renderTask(task);
      taskInput.value = "";
    }
  });

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

  
  async function loadTasks() {
    const tasks = await fetchTasks();
    tasks.forEach((task) => renderTask(task));
  }

  loadTasks();
});