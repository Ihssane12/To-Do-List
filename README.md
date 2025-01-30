```markdown
# 📝 Task Manager App

A simple and interactive **Task Manager** web app built with vanilla JavaScript and a RESTful API. Add, edit, mark as complete, and delete tasks with ease! 🚀

## 📦 Features

- **Add new tasks** 📥
- **Edit existing tasks** ✏️
- **Mark tasks as completed** ✅
- **Delete tasks** 🗑️
- Tasks persist after a refresh (assuming the backend API stores them) 🔄

## 🔧 Technologies Used

- **JavaScript** 💻
- **HTML** 🖥️
- **CSS** 🎨
- **Fetch API** 🌐 (for interacting with the backend)
- **REST API** 🔌 (for task CRUD operations)

## 🌍 Live Demo

Check out the live demo at [Link to your live demo](#) 🔗

## 📄 How It Works

1. **Fetching tasks**: The app loads all tasks stored on the server using the `fetch` API and displays them in a list.
2. **Creating tasks**: You can add new tasks via a form. Each new task is sent to the server and rendered on the page.
3. **Editing tasks**: Tasks can be edited by clicking the **Edit** button next to each task.
4. **Completing tasks**: Check or uncheck the task to mark it as completed. The completion state is reflected both visually and in the server database.
5. **Deleting tasks**: Tasks can be deleted from the list by clicking the **Delete** button.

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ihssane12/To-Do-List.git
   ```

2. Navigate to the project folder:

   ```bash
   cd task-manager
   npm install
   npm start
   ```

3. Go to 3000 url in your browser and you're good to go! 🌟

## 📑 API Endpoints

The app interacts with a backend API. Here are the endpoints:

- **GET** `/api/tasks` – Fetch all tasks
- **POST** `/api/tasks` – Create a new task
- **PUT** `/api/tasks/:id` – Update an existing task
- **DELETE** `/api/tasks/:id` – Delete a task

## 🤝 Contributing

We welcome contributions! 🎉

1. Fork the repository 🍴
2. Create a new branch 🌿 (`git checkout -b feature-name`)
3. Make your changes ✏️
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature-name`)
6. Open a pull request 🚀

## ⚖️ License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💬 Feedback

If you have any feedback, feel free to create an issue or reach out to me directly. 📬

---

Enjoy using the Task Manager! 😄

```
