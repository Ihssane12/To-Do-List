import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import express from "express";
import TaskController from "../src/Controllers/taskController";

const app = express();
app.use(express.json());

const taskController = new TaskController();
app.post("/tasks", taskController.createTask.bind(taskController));
app.get("/tasks", taskController.getAllTasks.bind(taskController));
app.put("/tasks/:id", taskController.updateTask.bind(taskController));
app.delete("/tasks/:id", taskController.deleteTask.bind(taskController));

beforeEach(() => {
  const tasks = require("../src/data/tasks");
  tasks.length = 0; 
});

describe("Task API", () => {
  it("should create a new task", async () => {
    const response = await request(app)
      .post("/tasks")
      .send({ title: "Test Task" });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.title).toBe("Test Task");
    expect(response.body.completed).toBe(false);
  });

  it("should fetch all tasks", async () => {
    await request(app).post("/tasks").send({ title: "Task 1" });
    await request(app).post("/tasks").send({ title: "Task 2" });

    const response = await request(app).get("/tasks");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });

  it("should update a task", async () => {
    const task = await request(app).post("/tasks").send({ title: "Old Task" });

    const response = await request(app)
      .put(`/tasks/${task.body.id}`)
      .send({ title: "Updated Task", completed: true });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Updated Task");
    expect(response.body.completed).toBe(true);
  });

  it("should delete a task", async () => {
    const task = await request(app)
      .post("/tasks")
      .send({ title: "To be deleted" });

    const response = await request(app).delete(`/tasks/${task.body.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Task deleted successfully" });

    const allTasks = await request(app).get("/tasks");
    expect(allTasks.body.length).toBe(0);
  });

  it("should return 404 if updating a non-existent task", async () => {
    const response = await request(app)
      .put("/tasks/999")
      .send({ title: "Non-existent" });

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Task not found");
  });

  it("should return 404 if deleting a non-existent task", async () => {
    const response = await request(app).delete("/tasks/999");

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Task not found");
  });
});
