const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const error = document.getElementById("error");

// Start EMPTY
let tasks = [];

// Load (kept for structure, but DOES NOT auto-fill tasks)
document.addEventListener("DOMContentLoaded", () => {
  tasks = []; // important: empty start
  renderTasks();
});

// ADD TASK
form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const taskText = input.value.trim();

  if (!taskText) {
    error.textContent = "Task cannot be empty!";
    return;
  }

  error.textContent = "";

  try {
    // fake API POST (optional, not used for real data)
    await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: taskText,
        completed: false
      })
    });

    // add REAL user task
    tasks.push({
      id: Date.now(),
      text: taskText,
      completed: false
    });

    input.value = "";
    renderTasks();

  } catch (err) {
    console.log(err);
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

// DELETE TASK
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}
