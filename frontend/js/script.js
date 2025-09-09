// MAIN TO DO LIST FUNCTIONALITY

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const noTasks = document.getElementById('no-tasks');

// Fetch tasks from backend on page load
async function fetchTasks() {
  try {
    const res = await fetch('http://localhost:5000/tasks');
    const tasks = await res.json();
    renderTasks(tasks);
  } catch (err) {
    console.error(err);
  }
}

// Render tasks in the UI
function renderTasks(tasks) {
  taskList.innerHTML = '';

  if (tasks.length === 0) {
    noTasks.style.display = 'block';
    return;
  } else {
    noTasks.style.display = 'none';
  }

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.title;
    li.className = task.completed ? 'completed' : '';

    // Toggle completed status on click
    li.addEventListener('click', () => toggleCompleted(task._id, !task.completed));

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // prevent toggling completed
      deleteTask(task._id);
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

// Add new task
async function addTask(title) {
  try {
    await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });
    fetchTasks();
  } catch (err) {
    console.error(err);
  }
}

// Toggle completed
async function toggleCompleted(id, completed) {
  try {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed })
    });
    fetchTasks();
  } catch (err) {
    console.error(err);
  }
}

// Delete task
async function deleteTask(id) {
  try {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' });
    fetchTasks();
  } catch (err) {
    console.error(err);
  }
}

// Form submit
taskForm.addEventListener('submit', e => {
  e.preventDefault();
  const title = taskInput.value.trim();
  if (title !== '') {
    addTask(title);
    taskInput.value = '';
  }
});

// Initial fetch
fetchTasks();
