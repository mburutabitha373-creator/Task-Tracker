const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const error = document.getElementById("error");

// Load from localStorage (BONUS for higher marks)
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks();

// ADD TASK
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const taskText = input.value.trim();

  if (!taskText) {
    error.textContent = "Task cannot be empty!";
    return;
  }

  error.textContent = "";

  const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();

  input.value = "";
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

// TOGGLE COMPLETE
function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );

  saveTasks();
  renderTasks();
}

// DELETE TASK
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);

  saveTasks();
  renderTasks();
}

// SAVE TO LOCALSTORAGE
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}