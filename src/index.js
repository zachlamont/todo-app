//Use 'npm run build'

console.log("It's working 333");

let tasks = [];

//Toggle sidebar display
const menuButton = document.getElementById("menu-btn");
const main = document.getElementById("main");

menuButton.addEventListener("click", function () {
  main.classList.toggle("force-show");
});

// Factory function to create task objects
function createTask(id, title, description, dueDate, priority, project) {
  return {
    id,
    title,
    description,
    dueDate,
    priority,
    project,
  };
}
//Display the modal
const addTaskButton = document.getElementById("add-task-btn");
const addTaskModal = document.getElementById("add-task-modal");

addTaskButton.addEventListener("click", () => {
  addTaskModal.style.display = "flex";
});

// Display tasks function
function displayTasks() {
  const taskContainer = document.getElementById("task-container");
  taskContainer.innerHTML = "";

  tasks.forEach((task) => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    const titleDiv = document.createElement("div");
    titleDiv.innerText = task.title;
    titleDiv.classList.add("task-title");
    taskDiv.appendChild(titleDiv);

    const dateDiv = document.createElement("div");
    dateDiv.innerText = task.dueDate;
    dateDiv.classList.add("task-date");
    taskDiv.appendChild(dateDiv);

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", () => {
      deleteTask(task.id);
    });
    taskDiv.appendChild(deleteButton);

    taskContainer.appendChild(taskDiv);
  });
}

// Delete task function
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  displayTasks();
}

// Add task function
window.addEventListener("load", () => {
  const addTaskForm = document.getElementById("add-task-form");
  addTaskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let title = document.getElementById("task-title").value;
    let description = document.getElementById("task-desc").value;
    let dueDate = document.getElementById("due-date").value;
    let priority = document.getElementById("priority").value;
    let project = document.getElementById("project").value;

    const id = tasks.length + 1;
    const newTask = createTask(
      id,
      title,
      description,
      dueDate,
      priority,
      project
    );
    tasks.push(newTask);

    displayTasks();

    event.target.reset();

    // Hide the modal
    document.getElementById("add-task-modal").style.display = "none";
  });
});
