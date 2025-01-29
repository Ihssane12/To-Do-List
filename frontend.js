// require("jsdom-global")(); // Make sure jsdom is initialized

// describe("Task Manager", () => {
//   let taskForm, taskInput, taskList;

//   beforeEach(() => {
//     // Reinitialize DOM elements before each test
//     document.body.innerHTML = `
//       <div id="app">
//         <h1>Task Manager</h1>
//         <form id="task-form">
//           <input type="text" id="task-title" placeholder="Task Title" required>
//           <button type="submit">Add Task</button>
//         </form>
//         <ul id="task-list"></ul>
//       </div>
//     `;
//     taskForm = document.getElementById("task-form");
//     taskInput = document.getElementById("task-title");
//     taskList = document.getElementById("task-list");

//     // Require frontend.js to set up event listeners
//     require("../frontend");
//   });

//   test("should add a task to the list", (done) => {
//     taskInput.value = "Test Task";
//     taskForm.dispatchEvent(new Event("submit"));

//     // Use a small timeout to ensure the DOM has updated
//     setTimeout(() => {
//       const taskItems = taskList.querySelectorAll("li");
//       expect(taskItems.length).toBe(1); // There should be 1 task
//       expect(taskItems[0].querySelector(".task-title").textContent).toBe(
//         "Test Task"
//       );
//       done();
//     }, 0);
//   });

//   test("should edit a task", (done) => {
//     // Add a task first
//     taskInput.value = "Task to be edited";
//     taskForm.dispatchEvent(new Event("submit"));

//     setTimeout(() => {
//       const taskItems = taskList.querySelectorAll("li");
//       const editButton = taskItems[0].querySelector(".edit-btn");
//       global.prompt = jest.fn().mockReturnValue("Edited Task");

//       // Simulate clicking the edit button
//       editButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));

//       // Ensure the task is updated
//       expect(taskItems[0].querySelector(".task-title").textContent).toBe(
//         "Edited Task"
//       );
//       done();
//     }, 0);
//   });

//   test("should delete a task", (done) => {
//     // Add a task first
//     taskInput.value = "Task to be deleted";
//     taskForm.dispatchEvent(new Event("submit"));

//     setTimeout(() => {
//       const taskItems = taskList.querySelectorAll("li");
//       const deleteButton = taskItems[0].querySelector(".delete-btn");

//       // Simulate clicking the delete button
//       deleteButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));

//       // Ensure the task is deleted
//       expect(taskList.children.length).toBe(0); // Task list should be empty
//       done();
//     }, 0);
//   });
// });

// frontend.js

document.addEventListener("DOMContentLoaded", function () {
  const taskForm = document.getElementById("task-form");
  const taskInput = document.getElementById("task-title");
  const taskList = document.getElementById("task-list");

  // Add task
  taskForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from reloading the page

    const taskTitle = taskInput.value.trim();
    if (taskTitle !== "") {
      const taskItem = document.createElement("li");
      taskItem.innerHTML = `
        <span class="task-title">${taskTitle}</span>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      `;
      taskList.appendChild(taskItem);
      taskInput.value = ""; // Clear input after adding task

      // Add edit button functionality
      taskItem.querySelector(".edit-btn").addEventListener("click", function () {
        const newTitle = prompt("Edit task:", taskTitle);
        if (newTitle !== null && newTitle.trim() !== "") {
          taskItem.querySelector(".task-title").textContent = newTitle;
        }
      });

      // Add delete button functionality
      taskItem.querySelector(".delete-btn").addEventListener("click", function () {
        taskList.removeChild(taskItem);
      });
    }
  });
});
