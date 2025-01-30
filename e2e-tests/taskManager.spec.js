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
    test.setTimeout(120000); 

    await page.goto("http://localhost:3000"); 

    await page.evaluate(() => {
      document.querySelectorAll(".delete-btn").forEach((btn) => btn.click());
    });
    await page.waitForTimeout(2000); // Wait for deletions to complete

    await expect(async () => {
      const taskCount = await page.locator("#task-list li").count();
      expect(taskCount).toBe(0);
    }).toPass({ timeout: 10000 });

    // Create a new task
    const taskName = "Task to be deleted " + Date.now(); 
    await page.fill("#task-title", taskName);
    await page.click('button[type="submit"]');

    await expect(page.locator("#task-list")).toContainText(taskName);

    await page.click(`#task-list li:has-text("${taskName}") .delete-btn`);

    await expect(async () => {
      const taskElement = await page
        .locator(`#task-list li:has-text("${taskName}")`)
        .count();
      expect(taskElement).toBe(0);
    }).toPass({ timeout: 10000 });

    await expect(page.locator("#task-list")).not.toContainText(taskName);

    const remainingTasks = await page.locator("#task-list li").allInnerTexts();
    console.log("Remaining tasks:", remainingTasks);
  });
});