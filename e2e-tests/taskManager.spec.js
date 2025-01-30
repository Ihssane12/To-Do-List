// const { test, expect } = require("@playwright/test");

// test.describe("Task Manager", () => {
//   test.beforeEach(async ({ page }) => {
//     await page.goto("http://localhost:3000");
//   });

//   test("should add a task to the list", async ({ page }) => {
//     await page.fill("#task-title", "Test Task");
//     await page.click('button[type="submit"]');
//     await expect(page.locator("#task-list")).toContainText("Test Task");
//   });

//   test("should edit a task", async ({ page }) => {
//     await page.fill("#task-title", "Task to be edited");
//     await page.click('button[type="submit"]');
//     await page.click(".edit-btn");
//     page.on("dialog", (dialog) => dialog.accept("Edited Task"));
//     await page.click(".edit-btn");
//     await expect(page.locator("#task-list")).toContainText("Edited Task");
//   });

//   test("should delete a task", async ({ page }) => {
//     await page.fill("#task-title", "Task to be deleted");
//     await page.click('button[type="submit"]');
//     await page.click(".delete-btn");
//     await expect(page.locator("#task-list")).not.toContainText(
//       "Task to be deleted"
//     );
//   });
// });

const { test, expect } = require("@playwright/test");

test.describe("Task Manager", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
  });

  test("should add a task to the list", async ({ page }) => {
    await page.fill("#task-title", "Test Task");
    await page.click('button[type="submit"]');
    await expect(page.locator("#task-list")).toContainText("Test Task");
  });

  test("should edit a task", async ({ page }) => {
    await page.fill("#task-title", "Task to be edited");
    await page.click('button[type="submit"]');
    await page.click(".edit-btn");
    page.on("dialog", (dialog) => dialog.accept("Edited Task"));
    await page.click(".edit-btn");
    await expect(page.locator("#task-list")).toContainText("Edited Task");
  });

  test("should delete a task", async ({ page }) => {
    test.setTimeout(120000); // Increase timeout to 2 minutes

    // Navigate to the page
    await page.goto("http://localhost:3000"); // Adjust URL as needed

    // Clear existing tasks (if any)
    await page.evaluate(() => {
      document.querySelectorAll(".delete-btn").forEach((btn) => btn.click());
    });
    await page.waitForTimeout(2000); // Wait for deletions to complete

    // Verify all tasks are cleared
    await expect(async () => {
      const taskCount = await page.locator("#task-list li").count();
      expect(taskCount).toBe(0);
    }).toPass({ timeout: 10000 });

    // Create a new task
    const taskName = "Task to be deleted " + Date.now(); // Unique task name
    await page.fill("#task-title", taskName);
    await page.click('button[type="submit"]');

    // Ensure the task is added
    await expect(page.locator("#task-list")).toContainText(taskName);

    // Click delete button for the specific task
    await page.click(`#task-list li:has-text("${taskName}") .delete-btn`);

    // Wait and verify that the task is deleted
    await expect(async () => {
      const taskElement = await page
        .locator(`#task-list li:has-text("${taskName}")`)
        .count();
      expect(taskElement).toBe(0);
    }).toPass({ timeout: 10000 });

    // Double-check that the task list doesn't contain the deleted task
    await expect(page.locator("#task-list")).not.toContainText(taskName);

    // Log the final state of the task list for debugging
    const remainingTasks = await page.locator("#task-list li").allInnerTexts();
    console.log("Remaining tasks:", remainingTasks);
  });
});