/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
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
let selectedProject = "";

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

//addTaskButton.addEventListener("click", () => {
//addTaskModal.style.display = "flex";
//updateOptions();
//});

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
  projects.forEach((project) => {
    const projectItem = document.createElement("div");
    projectItem.innerText = project;
    projectItem.classList.add("project-item");
    projectItem.addEventListener("click", () => {
      selectedProject = project;
      console.log(selectedProject);

      displayTasks();
      displayCompletedTasks();
    });
    projectsContainer.appendChild(projectItem);
  });
  console.log(selectedProject);

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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvL1VzZSAnbnBtIHJ1biBidWlsZCdcblxuY29uc29sZS5sb2coXCJJdCdzIHdvcmtpbmcgMzMzXCIpO1xuXG4vL0FycmF5IG9mIHRhc2sgb2JqZWN0c1xubGV0IHRhc2tzID0gW1xuICB7XG4gICAgaWQ6IDEsXG4gICAgdGl0bGU6IFwiV2FsayB0aGUgZG9nXCIsXG4gICAgZGVzY3JpcHRpb246IFwiVGFrZSBCb25vIGZvciBhIDEwIG1pbnV0ZSB3YWxrXCIsXG4gICAgZHVlRGF0ZTogXCIyMDIzLTAyLTA3XCIsXG4gICAgcHJpb3JpdHk6IFwibG93XCIsXG4gICAgcHJvamVjdDogXCJEb2cgXCIsXG4gIH0sXG4gIHtcbiAgICBpZDogMixcbiAgICB0aXRsZTogXCJQcmFjdGljZSBndWl0YXJcIixcbiAgICBkZXNjcmlwdGlvbjogXCJMZWFybiB0aGUgQ0FHRUQgbWV0aG9kXCIsXG4gICAgZHVlRGF0ZTogXCIyMDIzLTAyLTExXCIsXG4gICAgcHJpb3JpdHk6IFwibG93XCIsXG4gICAgcHJvamVjdDogXCJNdXNpY1wiLFxuICB9LFxuICB7XG4gICAgaWQ6IDMsXG4gICAgdGl0bGU6IFwiUGF5IGVsZWN0cmljaXR5IGJpbGxcIixcbiAgICBkZXNjcmlwdGlvbjogXCJQYXkgYmlsbCBvbmxpbmVcIixcbiAgICBkdWVEYXRlOiBcIjIwMjMtMDItMjVcIixcbiAgICBwcmlvcml0eTogXCJtZWRpdW1cIixcbiAgICBwcm9qZWN0OiBcIk1vbmV5XCIsXG4gIH0sXG5dO1xuXG4vLyBBcnJheSBvZiBQcm9qZWN0c1xubGV0IHByb2plY3RzID0gW107XG5sZXQgc2VsZWN0ZWRQcm9qZWN0ID0gXCJcIjtcblxubGV0IGVkaXRpbmdUYXNrID0gZmFsc2U7XG5sZXQgZWRpdEluZGV4O1xuXG4vL1RvZ2dsZSBzaWRlYmFyIGRpc3BsYXlcbmNvbnN0IG1lbnVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1lbnUtYnRuXCIpO1xuY29uc3QgbWFpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpblwiKTtcbmNvbnN0IGFkZFRhc2tCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC10YXNrLWJ0blwiKTtcbmNvbnN0IGFkZFRhc2tNb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLXRhc2stbW9kYWxcIik7XG5jb25zdCB0YXNrQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLWNvbnRhaW5lclwiKTtcbmNvbnN0IGNvbXBsZXRlZFRhc2tDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgXCJjb21wbGV0ZWQtdGFzay1jb250YWluZXJcIlxuKTtcbmNvbnN0IGFkZFRhc2tGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtdGFzay1mb3JtXCIpO1xuY29uc3QgcHJvamVjdHNNZW51ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0cy1tZW51XCIpO1xuXG5jb25zdCBhZGRQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGQtbmV3LXByb2plY3RcIik7XG5jb25zdCBhZGRQcm9qZWN0TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZC1wcm9qZWN0LW1vZGFsXCIpO1xuY29uc3QgYWRkUHJvamVjdEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZC1wcm9qZWN0LWZvcm1cIik7XG5jb25zdCBwcm9qZWN0TmFtZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0LW5hbWVcIik7XG5jb25zdCBwcm9qZWN0c0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdHMtY29udGFpbmVyXCIpO1xuXG4vL1RvZ2dsZSBzaWRlYmFyIHZpc2liaWxpdHlcbm1lbnVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgbWFpbi5jbGFzc0xpc3QudG9nZ2xlKFwiZm9yY2Utc2hvd1wiKTtcbn0pO1xuXG4vLyBGYWN0b3J5IGZ1bmN0aW9uIHRvIGNyZWF0ZSB0YXNrIG9iamVjdHNcbmZ1bmN0aW9uIGNyZWF0ZVRhc2soaWQsIHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QpIHtcbiAgcmV0dXJuIHtcbiAgICBpZCxcbiAgICB0aXRsZSxcbiAgICBkZXNjcmlwdGlvbixcbiAgICBkdWVEYXRlLFxuICAgIHByaW9yaXR5LFxuICAgIHByb2plY3QsXG4gICAgY29tcGxldGU6IGZhbHNlLFxuICB9O1xufVxuLy9EaXNwbGF5IHRoZSBtb2RhbFxuXG4vL2FkZFRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbi8vYWRkVGFza01vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbi8vdXBkYXRlT3B0aW9ucygpO1xuLy99KTtcblxuLy8gRGlzcGxheSB0YXNrcyBmdW5jdGlvblxuZnVuY3Rpb24gZGlzcGxheVRhc2tzKCkge1xuICB0YXNrQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgdGFza3NcbiAgICAuZmlsdGVyKCh0YXNrKSA9PiAhdGFzay5jb21wbGV0ZSlcbiAgICAuZm9yRWFjaCgodGFzaywgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHRhc2tEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgdGFza0Rpdi5jbGFzc0xpc3QuYWRkKFwidGFza1wiKTtcblxuICAgICAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICBjaGVja2JveC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiY2hlY2tib3hcIik7XG4gICAgICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICB0YXNrLmNvbXBsZXRlID0gIXRhc2suY29tcGxldGU7XG4gICAgICAgIGRpc3BsYXlUYXNrcygpO1xuICAgICAgICBkaXNwbGF5Q29tcGxldGVkVGFza3MoKTtcbiAgICAgIH0pO1xuICAgICAgdGFza0Rpdi5hcHBlbmRDaGlsZChjaGVja2JveCk7XG5cbiAgICAgIGNvbnN0IHRpdGxlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHRpdGxlRGl2LmlubmVyVGV4dCA9IHRhc2sudGl0bGU7XG4gICAgICB0aXRsZURpdi5jbGFzc0xpc3QuYWRkKFwidGFzay10aXRsZVwiKTtcbiAgICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQodGl0bGVEaXYpO1xuXG4gICAgICBjb25zdCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgZGVsZXRlQnV0dG9uLmlubmVyVGV4dCA9IFwiRGVsZXRlXCI7XG4gICAgICBkZWxldGVCdXR0b24uY2xhc3NMaXN0LmFkZChcImRlbGV0ZS1idXR0b25cIik7XG4gICAgICBkZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgZGVsZXRlVGFzayh0YXNrLmlkKTtcbiAgICAgIH0pO1xuICAgICAgdGFza0Rpdi5hcHBlbmRDaGlsZChkZWxldGVCdXR0b24pO1xuXG4gICAgICBjb25zdCBlZGl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIGVkaXRCdXR0b24uaW5uZXJUZXh0ID0gXCJFZGl0XCI7XG4gICAgICBlZGl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJlZGl0LWJ1dHRvblwiKTtcbiAgICAgIGVkaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtdGFzay1tb2RhbFwiKS5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgICAgIGVkaXRpbmdUYXNrID0gdHJ1ZTtcbiAgICAgICAgZWRpdEluZGV4ID0gaW5kZXg7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay10aXRsZVwiKS52YWx1ZSA9IHRhc2sudGl0bGU7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1kZXNjXCIpLnZhbHVlID0gdGFzay5kZXNjcmlwdGlvbjtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdWUtZGF0ZVwiKS52YWx1ZSA9IHRhc2suZHVlRGF0ZTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmlvcml0eVwiKS52YWx1ZSA9IHRhc2sucHJpb3JpdHk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdFwiKS52YWx1ZSA9IHRhc2sucHJvamVjdDtcbiAgICAgIH0pO1xuICAgICAgdGFza0Rpdi5hcHBlbmRDaGlsZChlZGl0QnV0dG9uKTtcblxuICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrRGl2KTtcbiAgICB9KTtcbn1cblxuLy8gRGlzcGxheSBjb21wbGV0ZWQgdGFza3MgZnVuY3Rpb25cbmZ1bmN0aW9uIGRpc3BsYXlDb21wbGV0ZWRUYXNrcygpIHtcbiAgY29tcGxldGVkVGFza0NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuXG4gIHRhc2tzXG4gICAgLmZpbHRlcigodGFzaykgPT4gdGFzay5jb21wbGV0ZSlcbiAgICAuZm9yRWFjaCgodGFzaywgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHRhc2tEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgdGFza0Rpdi5jbGFzc0xpc3QuYWRkKFwidGFza1wiKTtcblxuICAgICAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICBjaGVja2JveC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiY2hlY2tib3hcIik7XG4gICAgICBjaGVja2JveC5jaGVja2VkID0gdGFzay5jb21wbGV0ZTtcbiAgICAgIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIHRhc2suY29tcGxldGUgPSAhdGFzay5jb21wbGV0ZTtcbiAgICAgICAgZGlzcGxheVRhc2tzKCk7XG4gICAgICAgIGRpc3BsYXlDb21wbGV0ZWRUYXNrcygpO1xuICAgICAgfSk7XG4gICAgICB0YXNrRGl2LmFwcGVuZENoaWxkKGNoZWNrYm94KTtcblxuICAgICAgY29uc3QgdGl0bGVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgdGl0bGVEaXYuaW5uZXJUZXh0ID0gdGFzay50aXRsZTtcbiAgICAgIHRpdGxlRGl2LmNsYXNzTGlzdC5hZGQoXCJ0YXNrLXRpdGxlXCIpO1xuICAgICAgdGFza0Rpdi5hcHBlbmRDaGlsZCh0aXRsZURpdik7XG5cbiAgICAgIGNvbnN0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICBkZWxldGVCdXR0b24uaW5uZXJUZXh0ID0gXCJEZWxldGVcIjtcbiAgICAgIGRlbGV0ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZGVsZXRlLWJ1dHRvblwiKTtcbiAgICAgIGRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBkZWxldGVUYXNrKHRhc2suaWQpO1xuICAgICAgfSk7XG4gICAgICB0YXNrRGl2LmFwcGVuZENoaWxkKGRlbGV0ZUJ1dHRvbik7XG5cbiAgICAgIGNvbnN0IGVkaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgZWRpdEJ1dHRvbi5pbm5lclRleHQgPSBcIkVkaXRcIjtcbiAgICAgIGVkaXRCdXR0b24uY2xhc3NMaXN0LmFkZChcImVkaXQtYnV0dG9uXCIpO1xuICAgICAgZWRpdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC10YXNrLW1vZGFsXCIpLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICAgICAgZWRpdGluZ1Rhc2sgPSB0cnVlO1xuICAgICAgICBlZGl0SW5kZXggPSBpbmRleDtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLXRpdGxlXCIpLnZhbHVlID0gdGFzay50aXRsZTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLWRlc2NcIikudmFsdWUgPSB0YXNrLmRlc2NyaXB0aW9uO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1ZS1kYXRlXCIpLnZhbHVlID0gdGFzay5kdWVEYXRlO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByaW9yaXR5XCIpLnZhbHVlID0gdGFzay5wcmlvcml0eTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0XCIpLnZhbHVlID0gdGFzay5wcm9qZWN0O1xuICAgICAgfSk7XG4gICAgICB0YXNrRGl2LmFwcGVuZENoaWxkKGVkaXRCdXR0b24pO1xuXG4gICAgICBjb21wbGV0ZWRUYXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tEaXYpO1xuICAgIH0pO1xufVxuXG4vLyBEZWxldGUgdGFzayBmdW5jdGlvblxuZnVuY3Rpb24gZGVsZXRlVGFzayhpZCkge1xuICB0YXNrcyA9IHRhc2tzLmZpbHRlcigodGFzaykgPT4gdGFzay5pZCAhPT0gaWQpO1xuICBkaXNwbGF5VGFza3MoKTtcbiAgZGlzcGxheUNvbXBsZXRlZFRhc2tzKCk7XG59XG5cbi8vIEFkZCB0YXNrIGZ1bmN0aW9uXG5cbmZ1bmN0aW9uIGFkZFRhc2sodGFza3MpIHtcbiAgbGV0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLXRpdGxlXCIpLnZhbHVlO1xuICBsZXQgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stZGVzY1wiKS52YWx1ZTtcbiAgbGV0IGR1ZURhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1ZS1kYXRlXCIpLnZhbHVlO1xuICBsZXQgcHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByaW9yaXR5XCIpLnZhbHVlO1xuICBsZXQgcHJvamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdFwiKS52YWx1ZTtcblxuICBpZiAoIWVkaXRpbmdUYXNrKSB7XG4gICAgY29uc3QgaWQgPSB0YXNrcy5sZW5ndGggKyAxO1xuICAgIGNvbnN0IG5ld1Rhc2sgPSBjcmVhdGVUYXNrKFxuICAgICAgaWQsXG4gICAgICB0aXRsZSxcbiAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgZHVlRGF0ZSxcbiAgICAgIHByaW9yaXR5LFxuICAgICAgcHJvamVjdFxuICAgICk7XG4gICAgdGFza3MucHVzaChuZXdUYXNrKTtcbiAgfSBlbHNlIHtcbiAgICB0YXNrc1tlZGl0SW5kZXhdLnRpdGxlID0gdGl0bGU7XG4gICAgdGFza3NbZWRpdEluZGV4XS5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIHRhc2tzW2VkaXRJbmRleF0uZHVlRGF0ZSA9IGR1ZURhdGU7XG4gICAgdGFza3NbZWRpdEluZGV4XS5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgIHRhc2tzW2VkaXRJbmRleF0ucHJvamVjdCA9IHByb2plY3Q7XG4gICAgZWRpdGluZ1Rhc2sgPSBmYWxzZTtcbiAgfVxuICBkaXNwbGF5VGFza3MoKTtcbiAgZGlzcGxheUNvbXBsZXRlZFRhc2tzKCk7XG4gIGNvbnNvbGUubG9nKHRhc2tzKTtcblxuICAvLyBIaWRlIHRoZSBtb2RhbFxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC10YXNrLW1vZGFsXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgLy8gUmVzZXQgZm9ybVxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC10YXNrLWZvcm1cIikucmVzZXQoKTtcbn1cblxuYWRkVGFza0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZlbnQpID0+IHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgYWRkVGFzayh0YXNrcyk7XG59KTtcblxuLy8gU2hvdyB0aGUgbW9kYWwgd2hlbiB0aGUgYWRkIHByb2plY3QgYnV0dG9uIGlzIGNsaWNrZWRcbmFkZFByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgYWRkUHJvamVjdE1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbn0pO1xuXG4vLyBBZGQgdGhlIHByb2plY3QgdG8gdGhlIHByb2plY3RzIGFycmF5IGFuZCB1cGRhdGUgdGhlIHByb2plY3RzIGxpc3QgaW4gdGhlIERPTVxuYWRkUHJvamVjdEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZlbnQpID0+IHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgYWRkUHJvamVjdCgpO1xufSk7XG5cbmZ1bmN0aW9uIGFkZFByb2plY3QoKSB7XG4gIC8vIEdldCB0aGUgcHJvamVjdCBuYW1lIGZyb20gdGhlIGlucHV0XG4gIGNvbnN0IHByb2plY3ROYW1lID0gcHJvamVjdE5hbWVJbnB1dC52YWx1ZTtcblxuICAvLyBBZGQgdGhlIHByb2plY3QgbmFtZSB0byB0aGUgcHJvamVjdHMgYXJyYXlcbiAgcHJvamVjdHMucHVzaChwcm9qZWN0TmFtZSk7XG5cbiAgLy8gVXBkYXRlIHRoZSBwcm9qZWN0cyBsaXN0IGluIHRoZSBET01cbiAgcHJvamVjdHNDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgcHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgIGNvbnN0IHByb2plY3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBwcm9qZWN0SXRlbS5pbm5lclRleHQgPSBwcm9qZWN0O1xuICAgIHByb2plY3RJdGVtLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LWl0ZW1cIik7XG4gICAgcHJvamVjdEl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIHNlbGVjdGVkUHJvamVjdCA9IHByb2plY3Q7XG4gICAgICBjb25zb2xlLmxvZyhzZWxlY3RlZFByb2plY3QpO1xuXG4gICAgICBkaXNwbGF5VGFza3MoKTtcbiAgICAgIGRpc3BsYXlDb21wbGV0ZWRUYXNrcygpO1xuICAgIH0pO1xuICAgIHByb2plY3RzQ29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3RJdGVtKTtcbiAgfSk7XG4gIGNvbnNvbGUubG9nKHNlbGVjdGVkUHJvamVjdCk7XG5cbiAgLy8gUmVzZXQgdGhlIGZvcm1cbiAgYWRkUHJvamVjdEZvcm0ucmVzZXQoKTtcblxuICAvLyBIaWRlIHRoZSBtb2RhbFxuICBhZGRQcm9qZWN0TW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXG4gIGNvbnNvbGUubG9nKHByb2plY3RzKTtcbiAgdXBkYXRlT3B0aW9ucygpO1xufVxuLy9VcGRhdGUgJ1Byb2plY3QnIG9wdGlvbnMgaW4gdGhlIGZvcm1cblxuLy8gR2V0IHRoZSBzZWxlY3QgZWxlbWVudFxuY29uc3QgcHJvamVjdFNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdFwiKTtcblxuZnVuY3Rpb24gdXBkYXRlT3B0aW9ucygpIHtcbiAgcHJvamVjdFNlbGVjdC5pbm5lckhUTUwgPSBcIlwiO1xuICBwcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICBvcHRpb24udmFsdWUgPSBwcm9qZWN0O1xuICAgIG9wdGlvbi5pbm5lclRleHQgPSBwcm9qZWN0O1xuICAgIHByb2plY3RTZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcbiAgfSk7XG59XG5cbmRpc3BsYXlUYXNrcygpO1xuZGlzcGxheUNvbXBsZXRlZFRhc2tzKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=