const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const error = document.getElementById("error");

// Task storage in memory
let tasks = [];

// Load tasks from API when page loads
document.addEventListener("DOMContentLoaded", loadTasksFromAPI);

async function loadTasksFromAPI() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
    const data = await res.json();

    tasks = data.map(task => ({
      id: task.id,
      text: task.title,
      completed: task.completed
    }));

    renderTasks();
  } catch (err) {
    console.log("Error loading tasks:", err);
    error.textContent = "Failed to load tasks from API";
  }
}

// ADD TASK (API POST)
form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const taskText = input.value.trim();

  if (!taskText) {
    error.textContent = "Task cannot be empty!";
    return;
  }

  error.textContent = "";

  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: taskText,
        completed: false
      })
    });

    const newTask = await res.json();

    // Add to UI (API is fake, so we store locally in memory)
    tasks.push({
      id: newTask.id,
      text: taskText,
      completed: false
    });

    renderTasks();
    input.value = "";

  } catch (err) {
    console.log("Error adding task:", err);
    error.textContent = "Failed to add task";
  }
});

// RENDER TASKS
function renderTasks() {
  list.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span class="${task.completed ? "completed" : ""}">
        ${task.text}
      </span>

      <div class="actions">
        <button onclick="toggleTask(${task.id})">✔</button>
        <button onclick="deleteTask(${task.id})">🗑</button>
      </div>
    `;

    list.appendChild(li);
  });
}

// TOGGLE TASK
function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id
      ? { ...task, completed: !task.completed }
      : task
  );

  renderTasks();
}

// DELETE TASK (API + UI)
function deleteTask(id) {
  fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: "DELETE"
  }).catch(err => console.log(err));

  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}
