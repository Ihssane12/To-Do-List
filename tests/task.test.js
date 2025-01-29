require("jsdom-global")(); // Make sure jsdom is initialized

document.body.innerHTML = `
  <div id="app">
    <h1>Task Manager</h1>
    <form id="task-form">
      <input type="text" id="task-title" placeholder="Task Title" required>
      <button type="submit">Add Task</button>
    </form>
    <ul id="task-list"></ul>
  </div>
`;

require("../frontend"); // Ensure frontend.js is properly required

describe("Task Manager", () => {
  let taskForm, taskInput, taskList;

  beforeEach(() => {
    // Reinitialize DOM elements before each test
    taskForm = document.getElementById("task-form");
    taskInput = document.getElementById("task-title");
    taskList = document.getElementById("task-list");

    // Clear the task list before each test
    taskList.innerHTML = "";
  });

  test("should add a task to the list", () => {
    // Set the task title value
    taskInput.value = "Test Task";

    // Simulate submitting the form
    taskForm.dispatchEvent(new Event("submit"));

    // Ensure the task was added
    const taskItem = taskList.querySelector("li");
    expect(taskList.children.length).toBe(1); // Check the number of tasks
    expect(taskItem).toBeTruthy(); // Ensure there's a task
    expect(taskItem.querySelector(".task-title").textContent).toBe("Test Task");
  });

  test("should edit a task", () => {
    // Add a task first
    taskInput.value = "Task to be edited";
    taskForm.dispatchEvent(new Event("submit"));

    // Ensure the task was added
    const taskItem = taskList.querySelector("li");
    expect(taskList.children.length).toBe(1); // Ensure task is in the list

    // Simulate clicking the edit button
    const editButton = taskItem.querySelector(".edit-btn");

    // Simulate the prompt and changing the task title
    global.prompt = jest.fn().mockReturnValue("Edited Task");

    // Simulate editing the task
    editButton.click();

    // Check if the task title is updated
    expect(taskItem.querySelector(".task-title").textContent).toBe(
      "Edited Task"
    );
  });

  test("should delete a task", () => {
    // Add a task first
    taskInput.value = "Task to be deleted";
    taskForm.dispatchEvent(new Event("submit"));

    // Ensure the task was added
    const taskItem = taskList.querySelector("li");
    expect(taskList.children.length).toBe(1); // Ensure task is in the list

    // Simulate clicking the delete button
    const deleteButton = taskItem.querySelector(".delete-btn");
    deleteButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    // Expect the task list to be empty
    expect(taskList.children.length).toBe(0);
  });
});
