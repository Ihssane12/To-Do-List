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
    await page.fill("#task-title", "Task to be deleted");
    await page.click('button[type="submit"]');
    await page.click(".delete-btn");
    await expect(page.locator("#task-list")).not.toContainText(
      "Task to be deleted"
    );
  });
});
