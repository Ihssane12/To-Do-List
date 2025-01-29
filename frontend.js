document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-title');
    const taskList = document.getElementById('task-list');
  
    // Add Task
    taskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const taskTitle = taskInput.value.trim();
      
      if (taskTitle) {
        const taskItem = createTaskItem(taskTitle);
        taskList.appendChild(taskItem);
        taskInput.value = ''; // Clear the input field
      }
    });
  
    // Create Task Item (with Edit and Delete buttons)
    function createTaskItem(title) {
      const li = document.createElement('li');
      li.innerHTML = `
        <span class="task-title">${title}</span>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      `;
  
      const editBtn = li.querySelector('.edit-btn');
      const deleteBtn = li.querySelector('.delete-btn');
      const taskTitleSpan = li.querySelector('.task-title');
  
      // Edit Task
      editBtn.addEventListener('click', () => {
        const newTitle = prompt('Edit Task', taskTitleSpan.textContent);
        if (newTitle && newTitle.trim() !== '') {
          taskTitleSpan.textContent = newTitle.trim();
        }
      });
  
      // Delete Task
      deleteBtn.addEventListener('click', () => {
        taskList.removeChild(li);
      });
  
      return li;
    }
  });
  