//Use 'npm run build'

console.log("It's working 333");

//Array of task objects
let tasks = [
  {
    id: 1,
    title: "Walk the dog",
    description: "Take Bono for a 10 minute walk",
    dueDate: "2023-02-07",
    priority: "low",
    project: "Dog ",
  },
  {
    id: 2,
    title: "Practice guitar",
    description: "Learn the CAGED method",
    dueDate: "2023-02-11",
    priority: "low",
    project: "Music",
  },
  {
    id: 3,
    title: "Pay electricity bill",
    description: "Pay bill online",
    dueDate: "2023-02-25",
    priority: "medium",
    project: "Money",
  },
];

// Array of Projects
let projects = [];

let editingTask = false;
let editIndex;

//Toggle sidebar display
const menuButton = document.getElementById("menu-btn");
const main = document.getElementById("main");
const addTaskButton = document.getElementById("add-task-btn");
const addTaskModal = document.getElementById("add-task-modal");
const taskContainer = document.getElementById("task-container");
const completedTaskContainer = document.getElementById(
  "completed-task-container"
);
const addTaskForm = document.getElementById("add-task-form");
const projectsMenu = document.getElementById("projects-menu");

const addProjectButton = document.querySelector("#add-new-project");
const addProjectModal = document.querySelector("#add-project-modal");
const addProjectForm = document.querySelector("#add-project-form");
const projectNameInput = document.querySelector("#project-name");
const projectsContainer = document.querySelector("#projects-container");

//Toggle sidebar visibility
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
    complete: false,
  };
}
//Display the modal

addTaskButton.addEventListener("click", () => {
  addTaskModal.style.display = "flex";
  displayProjects();
});

// Display tasks function
function displayTasks() {
  taskContainer.innerHTML = "";

  tasks
    .filter((task) => !task.complete)
    .forEach((task, index) => {
      const taskDiv = document.createElement("div");
      taskDiv.classList.add("task");

      const checkbox = document.createElement("input");
      checkbox.setAttribute("type", "checkbox");
      checkbox.addEventListener("click", () => {
        task.complete = !task.complete;
        displayTasks();
        displayCompletedTasks();
      });
      taskDiv.appendChild(checkbox);

      const titleDiv = document.createElement("div");
      titleDiv.innerText = task.title;
      titleDiv.classList.add("task-title");
      taskDiv.appendChild(titleDiv);

      const deleteButton = document.createElement("button");
      deleteButton.innerText = "Delete";
      deleteButton.classList.add("delete-button");
      deleteButton.addEventListener("click", () => {
        deleteTask(task.id);
      });
      taskDiv.appendChild(deleteButton);

      const editButton = document.createElement("button");
      editButton.innerText = "Edit";
      editButton.classList.add("edit-button");
      editButton.addEventListener("click", () => {
        document.getElementById("add-task-modal").style.display = "flex";
        editingTask = true;
        editIndex = index;
        document.getElementById("task-title").value = task.title;
        document.getElementById("task-desc").value = task.description;
        document.getElementById("due-date").value = task.dueDate;
        document.getElementById("priority").value = task.priority;
        document.getElementById("project").value = task.project;
      });
      taskDiv.appendChild(editButton);

      taskContainer.appendChild(taskDiv);
    });
}

// Display completed tasks function
function displayCompletedTasks() {
  completedTaskContainer.innerHTML = "";

  tasks
    .filter((task) => task.complete)
    .forEach((task, index) => {
      const taskDiv = document.createElement("div");
      taskDiv.classList.add("task");

      const checkbox = document.createElement("input");
      checkbox.setAttribute("type", "checkbox");
      checkbox.checked = task.complete;
      checkbox.addEventListener("click", () => {
        task.complete = !task.complete;
        displayTasks();
        displayCompletedTasks();
      });
      taskDiv.appendChild(checkbox);

      const titleDiv = document.createElement("div");
      titleDiv.innerText = task.title;
      titleDiv.classList.add("task-title");
      taskDiv.appendChild(titleDiv);

      const deleteButton = document.createElement("button");
      deleteButton.innerText = "Delete";
      deleteButton.classList.add("delete-button");
      deleteButton.addEventListener("click", () => {
        deleteTask(task.id);
      });
      taskDiv.appendChild(deleteButton);

      const editButton = document.createElement("button");
      editButton.innerText = "Edit";
      editButton.classList.add("edit-button");
      editButton.addEventListener("click", () => {
        document.getElementById("add-task-modal").style.display = "flex";
        editingTask = true;
        editIndex = index;
        document.getElementById("task-title").value = task.title;
        document.getElementById("task-desc").value = task.description;
        document.getElementById("due-date").value = task.dueDate;
        document.getElementById("priority").value = task.priority;
        document.getElementById("project").value = task.project;
      });
      taskDiv.appendChild(editButton);

      completedTaskContainer.appendChild(taskDiv);
    });
}

// Delete task function
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  displayTasks();
  displayCompletedTasks();
}

// Add task function

function addTask(tasks) {
  let title = document.getElementById("task-title").value;
  let description = document.getElementById("task-desc").value;
  let dueDate = document.getElementById("due-date").value;
  let priority = document.getElementById("priority").value;
  let project = document.getElementById("project").value;

  if (!editingTask) {
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
  } else {
    tasks[editIndex].title = title;
    tasks[editIndex].description = description;
    tasks[editIndex].dueDate = dueDate;
    tasks[editIndex].priority = priority;
    tasks[editIndex].project = project;
    editingTask = false;
  }
  displayTasks();
  displayCompletedTasks();
  console.log(tasks);

  // Hide the modal
  document.getElementById("add-task-modal").style.display = "none";
  // Reset form
  document.getElementById("add-task-form").reset();
}

addTaskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addTask(tasks);
});

// Show the modal when the add project button is clicked
addProjectButton.addEventListener("click", () => {
  addProjectModal.style.display = "flex";
});

// Add the project to the projects array and update the projects list in the DOM
addProjectForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addProject();
});

function addProject() {
  // Get the project name from the input
  const projectName = projectNameInput.value;

  // Add the project name to the projects array
  projects.push(projectName);

  // Update the projects list in the DOM
  projectsContainer.innerHTML = "";
  for (const project of projects) {
    const projectItem = document.createElement("li");
    projectItem.textContent = project;
    projectsContainer.appendChild(projectItem);
  }

  // Reset the form
  addProjectForm.reset();

  // Hide the modal
  addProjectModal.style.display = "none";

  console.log(projects);
  updateOptions();
}
//Update 'Project' options in the form

// Get the select element
const projectSelect = document.querySelector("#project");

function updateOptions() {
  projectSelect.innerHTML = "";
  projects.forEach((project) => {
    const option = document.createElement("option");
    option.value = project;
    option.innerText = project;
    projectSelect.appendChild(option);
  });
}

displayTasks();
displayCompletedTasks();
