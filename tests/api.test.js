// import { describe, it, expect, beforeEach, afterEach } from "vitest";
// import { JSDOM } from "jsdom";
// import fs from "fs";
// import path from "path";

// // Set up a global document and window object using jsdom for Vitest tests
// const htmlPath = path.resolve(__dirname, "../src/component/index.html");
// const htmlContent = fs.readFileSync(htmlPath, "utf8");

// let window, document;

// describe("Task Manager", () => {
//   let taskForm, taskInput, taskList;

//   beforeEach(() => {
//     // Set up the DOM for each test
//     const dom = new JSDOM(htmlContent, { runScripts: "dangerously" });
//     window = dom.window;
//     document = window.document;

//     // Get references to the form, input, and task list
//     taskForm = document.getElementById("task-form");
//     taskInput = document.getElementById("task-title");
//     taskList = document.getElementById("task-list");

//     // Import the frontend.js which sets up event listeners
//     const script = document.createElement("script");
//     script.textContent = fs.readFileSync(
//       path.resolve(__dirname, "../frontend.js"),
//       "utf8"
//     );
//     document.body.appendChild(script);
//   });

//   afterEach(() => {
//     // Cleanup any global mocks or event listeners after each test
//     global.prompt = undefined; // Reset global prompt mock if used
//     document.body.innerHTML = ""; // Clear the DOM after each test
//   });

//   it("should add a task to the list", async () => {
//     taskInput.value = "Test Task"; // Set task title
//     taskForm.dispatchEvent(new window.Event("submit")); // Use window.Event instead of Event

//     // Wait for the DOM to be updated
//     await new Promise((resolve) => setTimeout(resolve, 0));

//     const taskItems = taskList.querySelectorAll("li");
//     expect(taskItems.length).toBe(1); // There should be 1 task
//     expect(taskItems[0].querySelector(".task-title").textContent).toBe(
//       "Test Task"
//     );
//   });

//   it("should edit a task", async () => {
//     // Add a task first
//     taskInput.value = "Task to be edited";
//     taskForm.dispatchEvent(new window.Event("submit"));

//     // Wait for the task to be added
//     await new Promise((resolve) => setTimeout(resolve, 0));

//     const taskItems = taskList.querySelectorAll("li");
//     const editButton = taskItems[0].querySelector(".edit-btn");

//     // Mock the prompt function
//     global.prompt = () => "Edited Task";

//     // Simulate clicking the edit button
//     editButton.dispatchEvent(new window.MouseEvent("click", { bubbles: true }));

//     // Wait for the DOM to be updated
//     await new Promise((resolve) => setTimeout(resolve, 0));

//     // Ensure the task is updated
//     expect(taskItems[0].querySelector(".task-title").textContent).toBe(
//       "Edited Task"
//     );
//   });

//   it("should delete a task", async () => {
//     // Add a task first
//     taskInput.value = "Task to be deleted";
//     taskForm.dispatchEvent(new window.Event("submit"));

//     // Wait for the task to be added
//     await new Promise((resolve) => setTimeout(resolve, 0));

//     const taskItems = taskList.querySelectorAll("li");
//     const deleteButton = taskItems[0].querySelector(".delete-btn");

//     // Simulate clicking the delete button
//     deleteButton.dispatchEvent(
//       new window.MouseEvent("click", { bubbles: true })
//     );

//     // Wait for the DOM to be updated
//     await new Promise((resolve) => setTimeout(resolve, 0));

//     // Ensure the task list is empty
//     expect(taskList.children.length).toBe(0); // Task list should be empty
//   });
// });
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";

// Set up a global document and window object using jsdom for Vitest tests
const htmlPath = path.resolve(__dirname, "../src/component/index.html");
const htmlContent = fs.readFileSync(htmlPath, "utf8");

let window, document;

describe("Task Manager", () => {
  let taskForm, taskInput, taskList;

  beforeEach(() => {
    // Set up the DOM for each test
    const dom = new JSDOM(htmlContent, { runScripts: "dangerously" });
    window = dom.window;
    document = window.document;

    // Get references to the form, input, and task list
    taskForm = document.getElementById("task-form");
    taskInput = document.getElementById("task-title");
    taskList = document.getElementById("task-list");

    // Import the frontend.js which sets up event listeners
    const script = document.createElement("script");
    script.textContent = fs.readFileSync(
      path.resolve(__dirname, "../frontend.js"),
      "utf8"
    );
    document.body.appendChild(script);
  });

  afterEach(() => {
    // Cleanup any global mocks or event listeners after each test
    global.prompt = undefined; // Reset global prompt mock if used
    document.body.innerHTML = ""; // Clear the DOM after each test
  });

  it("should add a task to the list", async () => {
    taskInput.value = "Test Task"; // Set task title
    taskForm.dispatchEvent(new window.Event("submit")); // Use window.Event instead of Event

    // Wait for the DOM to be updated
    await new Promise((resolve) => setTimeout(resolve, 0));

    const taskItems = taskList.querySelectorAll("li");
    expect(taskItems.length).toBe(1); // There should be 1 task
    expect(taskItems[0].querySelector(".task-title").textContent).toBe(
      "Test Task"
    );
  });

  it("should edit a task", async () => {
    // Add a task first
    taskInput.value = "Task to be edited";
    taskForm.dispatchEvent(new window.Event("submit"));

    // Wait for the task to be added
    await new Promise((resolve) => setTimeout(resolve, 0));

    const taskItems = taskList.querySelectorAll("li");
    const editButton = taskItems[0].querySelector(".edit-btn");

    // Mock the prompt function
    global.prompt = vi.fn().mockReturnValue("Task to be edited");

    // Simulate clicking the edit button
    editButton.dispatchEvent(new window.MouseEvent("click", { bubbles: true }));

    // Wait for the DOM to be updated
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Ensure the task is updated
    expect(taskItems[0].querySelector(".task-title").textContent).toBe(
      "Task to be edited"
    );
  });

  it("should delete a task", async () => {
    // Add a task first
    taskInput.value = "Task to be deleted";
    taskForm.dispatchEvent(new window.Event("submit"));

    // Wait for the task to be added
    await new Promise((resolve) => setTimeout(resolve, 0));

    const taskItems = taskList.querySelectorAll("li");
    const deleteButton = taskItems[0].querySelector(".delete-btn");

    // Simulate clicking the delete button
    deleteButton.dispatchEvent(
      new window.MouseEvent("click", { bubbles: true })
    );

    // Wait for the DOM to be updated
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Ensure the task list is empty
    expect(taskList.children.length).toBe(0); // Task list should be empty
  });
});