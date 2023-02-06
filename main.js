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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy9Vc2UgJ25wbSBydW4gYnVpbGQnXG5cbmNvbnNvbGUubG9nKFwiSXQncyB3b3JraW5nIDMzM1wiKTtcblxuLy9BcnJheSBvZiB0YXNrIG9iamVjdHNcbmxldCB0YXNrcyA9IFtcbiAge1xuICAgIGlkOiAxLFxuICAgIHRpdGxlOiBcIldhbGsgdGhlIGRvZ1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlRha2UgQm9ubyBmb3IgYSAxMCBtaW51dGUgd2Fsa1wiLFxuICAgIGR1ZURhdGU6IFwiMjAyMy0wMi0wN1wiLFxuICAgIHByaW9yaXR5OiBcImxvd1wiLFxuICAgIHByb2plY3Q6IFwiRG9nIFwiLFxuICB9LFxuICB7XG4gICAgaWQ6IDIsXG4gICAgdGl0bGU6IFwiUHJhY3RpY2UgZ3VpdGFyXCIsXG4gICAgZGVzY3JpcHRpb246IFwiTGVhcm4gdGhlIENBR0VEIG1ldGhvZFwiLFxuICAgIGR1ZURhdGU6IFwiMjAyMy0wMi0xMVwiLFxuICAgIHByaW9yaXR5OiBcImxvd1wiLFxuICAgIHByb2plY3Q6IFwiTXVzaWNcIixcbiAgfSxcbiAge1xuICAgIGlkOiAzLFxuICAgIHRpdGxlOiBcIlBheSBlbGVjdHJpY2l0eSBiaWxsXCIsXG4gICAgZGVzY3JpcHRpb246IFwiUGF5IGJpbGwgb25saW5lXCIsXG4gICAgZHVlRGF0ZTogXCIyMDIzLTAyLTI1XCIsXG4gICAgcHJpb3JpdHk6IFwibWVkaXVtXCIsXG4gICAgcHJvamVjdDogXCJNb25leVwiLFxuICB9LFxuXTtcblxuLy8gQXJyYXkgb2YgUHJvamVjdHNcbmxldCBwcm9qZWN0cyA9IFtdO1xuXG5sZXQgZWRpdGluZ1Rhc2sgPSBmYWxzZTtcbmxldCBlZGl0SW5kZXg7XG5cbi8vVG9nZ2xlIHNpZGViYXIgZGlzcGxheVxuY29uc3QgbWVudUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWVudS1idG5cIik7XG5jb25zdCBtYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluXCIpO1xuY29uc3QgYWRkVGFza0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLXRhc2stYnRuXCIpO1xuY29uc3QgYWRkVGFza01vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtdGFzay1tb2RhbFwiKTtcbmNvbnN0IHRhc2tDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stY29udGFpbmVyXCIpO1xuY29uc3QgY29tcGxldGVkVGFza0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICBcImNvbXBsZXRlZC10YXNrLWNvbnRhaW5lclwiXG4pO1xuY29uc3QgYWRkVGFza0Zvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC10YXNrLWZvcm1cIik7XG5jb25zdCBwcm9qZWN0c01lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RzLW1lbnVcIik7XG5cbmNvbnN0IGFkZFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZC1uZXctcHJvamVjdFwiKTtcbmNvbnN0IGFkZFByb2plY3RNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkLXByb2plY3QtbW9kYWxcIik7XG5jb25zdCBhZGRQcm9qZWN0Rm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkLXByb2plY3QtZm9ybVwiKTtcbmNvbnN0IHByb2plY3ROYW1lSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3QtbmFtZVwiKTtcbmNvbnN0IHByb2plY3RzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0cy1jb250YWluZXJcIik7XG5cbi8vVG9nZ2xlIHNpZGViYXIgdmlzaWJpbGl0eVxubWVudUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICBtYWluLmNsYXNzTGlzdC50b2dnbGUoXCJmb3JjZS1zaG93XCIpO1xufSk7XG5cbi8vIEZhY3RvcnkgZnVuY3Rpb24gdG8gY3JlYXRlIHRhc2sgb2JqZWN0c1xuZnVuY3Rpb24gY3JlYXRlVGFzayhpZCwgdGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCkge1xuICByZXR1cm4ge1xuICAgIGlkLFxuICAgIHRpdGxlLFxuICAgIGRlc2NyaXB0aW9uLFxuICAgIGR1ZURhdGUsXG4gICAgcHJpb3JpdHksXG4gICAgcHJvamVjdCxcbiAgICBjb21wbGV0ZTogZmFsc2UsXG4gIH07XG59XG4vL0Rpc3BsYXkgdGhlIG1vZGFsXG5cbmFkZFRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgYWRkVGFza01vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgZGlzcGxheVByb2plY3RzKCk7XG59KTtcblxuLy8gRGlzcGxheSB0YXNrcyBmdW5jdGlvblxuZnVuY3Rpb24gZGlzcGxheVRhc2tzKCkge1xuICB0YXNrQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgdGFza3NcbiAgICAuZmlsdGVyKCh0YXNrKSA9PiAhdGFzay5jb21wbGV0ZSlcbiAgICAuZm9yRWFjaCgodGFzaywgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHRhc2tEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgdGFza0Rpdi5jbGFzc0xpc3QuYWRkKFwidGFza1wiKTtcblxuICAgICAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICBjaGVja2JveC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiY2hlY2tib3hcIik7XG4gICAgICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICB0YXNrLmNvbXBsZXRlID0gIXRhc2suY29tcGxldGU7XG4gICAgICAgIGRpc3BsYXlUYXNrcygpO1xuICAgICAgICBkaXNwbGF5Q29tcGxldGVkVGFza3MoKTtcbiAgICAgIH0pO1xuICAgICAgdGFza0Rpdi5hcHBlbmRDaGlsZChjaGVja2JveCk7XG5cbiAgICAgIGNvbnN0IHRpdGxlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHRpdGxlRGl2LmlubmVyVGV4dCA9IHRhc2sudGl0bGU7XG4gICAgICB0aXRsZURpdi5jbGFzc0xpc3QuYWRkKFwidGFzay10aXRsZVwiKTtcbiAgICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQodGl0bGVEaXYpO1xuXG4gICAgICBjb25zdCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgZGVsZXRlQnV0dG9uLmlubmVyVGV4dCA9IFwiRGVsZXRlXCI7XG4gICAgICBkZWxldGVCdXR0b24uY2xhc3NMaXN0LmFkZChcImRlbGV0ZS1idXR0b25cIik7XG4gICAgICBkZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgZGVsZXRlVGFzayh0YXNrLmlkKTtcbiAgICAgIH0pO1xuICAgICAgdGFza0Rpdi5hcHBlbmRDaGlsZChkZWxldGVCdXR0b24pO1xuXG4gICAgICBjb25zdCBlZGl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIGVkaXRCdXR0b24uaW5uZXJUZXh0ID0gXCJFZGl0XCI7XG4gICAgICBlZGl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJlZGl0LWJ1dHRvblwiKTtcbiAgICAgIGVkaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtdGFzay1tb2RhbFwiKS5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgICAgIGVkaXRpbmdUYXNrID0gdHJ1ZTtcbiAgICAgICAgZWRpdEluZGV4ID0gaW5kZXg7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay10aXRsZVwiKS52YWx1ZSA9IHRhc2sudGl0bGU7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1kZXNjXCIpLnZhbHVlID0gdGFzay5kZXNjcmlwdGlvbjtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdWUtZGF0ZVwiKS52YWx1ZSA9IHRhc2suZHVlRGF0ZTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmlvcml0eVwiKS52YWx1ZSA9IHRhc2sucHJpb3JpdHk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdFwiKS52YWx1ZSA9IHRhc2sucHJvamVjdDtcbiAgICAgIH0pO1xuICAgICAgdGFza0Rpdi5hcHBlbmRDaGlsZChlZGl0QnV0dG9uKTtcblxuICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrRGl2KTtcbiAgICB9KTtcbn1cblxuLy8gRGlzcGxheSBjb21wbGV0ZWQgdGFza3MgZnVuY3Rpb25cbmZ1bmN0aW9uIGRpc3BsYXlDb21wbGV0ZWRUYXNrcygpIHtcbiAgY29tcGxldGVkVGFza0NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuXG4gIHRhc2tzXG4gICAgLmZpbHRlcigodGFzaykgPT4gdGFzay5jb21wbGV0ZSlcbiAgICAuZm9yRWFjaCgodGFzaywgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHRhc2tEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgdGFza0Rpdi5jbGFzc0xpc3QuYWRkKFwidGFza1wiKTtcblxuICAgICAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICBjaGVja2JveC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiY2hlY2tib3hcIik7XG4gICAgICBjaGVja2JveC5jaGVja2VkID0gdGFzay5jb21wbGV0ZTtcbiAgICAgIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIHRhc2suY29tcGxldGUgPSAhdGFzay5jb21wbGV0ZTtcbiAgICAgICAgZGlzcGxheVRhc2tzKCk7XG4gICAgICAgIGRpc3BsYXlDb21wbGV0ZWRUYXNrcygpO1xuICAgICAgfSk7XG4gICAgICB0YXNrRGl2LmFwcGVuZENoaWxkKGNoZWNrYm94KTtcblxuICAgICAgY29uc3QgdGl0bGVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgdGl0bGVEaXYuaW5uZXJUZXh0ID0gdGFzay50aXRsZTtcbiAgICAgIHRpdGxlRGl2LmNsYXNzTGlzdC5hZGQoXCJ0YXNrLXRpdGxlXCIpO1xuICAgICAgdGFza0Rpdi5hcHBlbmRDaGlsZCh0aXRsZURpdik7XG5cbiAgICAgIGNvbnN0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICBkZWxldGVCdXR0b24uaW5uZXJUZXh0ID0gXCJEZWxldGVcIjtcbiAgICAgIGRlbGV0ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZGVsZXRlLWJ1dHRvblwiKTtcbiAgICAgIGRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBkZWxldGVUYXNrKHRhc2suaWQpO1xuICAgICAgfSk7XG4gICAgICB0YXNrRGl2LmFwcGVuZENoaWxkKGRlbGV0ZUJ1dHRvbik7XG5cbiAgICAgIGNvbnN0IGVkaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgZWRpdEJ1dHRvbi5pbm5lclRleHQgPSBcIkVkaXRcIjtcbiAgICAgIGVkaXRCdXR0b24uY2xhc3NMaXN0LmFkZChcImVkaXQtYnV0dG9uXCIpO1xuICAgICAgZWRpdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC10YXNrLW1vZGFsXCIpLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICAgICAgZWRpdGluZ1Rhc2sgPSB0cnVlO1xuICAgICAgICBlZGl0SW5kZXggPSBpbmRleDtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLXRpdGxlXCIpLnZhbHVlID0gdGFzay50aXRsZTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLWRlc2NcIikudmFsdWUgPSB0YXNrLmRlc2NyaXB0aW9uO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1ZS1kYXRlXCIpLnZhbHVlID0gdGFzay5kdWVEYXRlO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByaW9yaXR5XCIpLnZhbHVlID0gdGFzay5wcmlvcml0eTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0XCIpLnZhbHVlID0gdGFzay5wcm9qZWN0O1xuICAgICAgfSk7XG4gICAgICB0YXNrRGl2LmFwcGVuZENoaWxkKGVkaXRCdXR0b24pO1xuXG4gICAgICBjb21wbGV0ZWRUYXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tEaXYpO1xuICAgIH0pO1xufVxuXG4vLyBEZWxldGUgdGFzayBmdW5jdGlvblxuZnVuY3Rpb24gZGVsZXRlVGFzayhpZCkge1xuICB0YXNrcyA9IHRhc2tzLmZpbHRlcigodGFzaykgPT4gdGFzay5pZCAhPT0gaWQpO1xuICBkaXNwbGF5VGFza3MoKTtcbiAgZGlzcGxheUNvbXBsZXRlZFRhc2tzKCk7XG59XG5cbi8vIEFkZCB0YXNrIGZ1bmN0aW9uXG5cbmZ1bmN0aW9uIGFkZFRhc2sodGFza3MpIHtcbiAgbGV0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLXRpdGxlXCIpLnZhbHVlO1xuICBsZXQgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stZGVzY1wiKS52YWx1ZTtcbiAgbGV0IGR1ZURhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1ZS1kYXRlXCIpLnZhbHVlO1xuICBsZXQgcHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByaW9yaXR5XCIpLnZhbHVlO1xuICBsZXQgcHJvamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdFwiKS52YWx1ZTtcblxuICBpZiAoIWVkaXRpbmdUYXNrKSB7XG4gICAgY29uc3QgaWQgPSB0YXNrcy5sZW5ndGggKyAxO1xuICAgIGNvbnN0IG5ld1Rhc2sgPSBjcmVhdGVUYXNrKFxuICAgICAgaWQsXG4gICAgICB0aXRsZSxcbiAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgZHVlRGF0ZSxcbiAgICAgIHByaW9yaXR5LFxuICAgICAgcHJvamVjdFxuICAgICk7XG4gICAgdGFza3MucHVzaChuZXdUYXNrKTtcbiAgfSBlbHNlIHtcbiAgICB0YXNrc1tlZGl0SW5kZXhdLnRpdGxlID0gdGl0bGU7XG4gICAgdGFza3NbZWRpdEluZGV4XS5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIHRhc2tzW2VkaXRJbmRleF0uZHVlRGF0ZSA9IGR1ZURhdGU7XG4gICAgdGFza3NbZWRpdEluZGV4XS5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgIHRhc2tzW2VkaXRJbmRleF0ucHJvamVjdCA9IHByb2plY3Q7XG4gICAgZWRpdGluZ1Rhc2sgPSBmYWxzZTtcbiAgfVxuICBkaXNwbGF5VGFza3MoKTtcbiAgZGlzcGxheUNvbXBsZXRlZFRhc2tzKCk7XG4gIGNvbnNvbGUubG9nKHRhc2tzKTtcblxuICAvLyBIaWRlIHRoZSBtb2RhbFxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC10YXNrLW1vZGFsXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgLy8gUmVzZXQgZm9ybVxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC10YXNrLWZvcm1cIikucmVzZXQoKTtcbn1cblxuYWRkVGFza0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZlbnQpID0+IHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgYWRkVGFzayh0YXNrcyk7XG59KTtcblxuLy8gU2hvdyB0aGUgbW9kYWwgd2hlbiB0aGUgYWRkIHByb2plY3QgYnV0dG9uIGlzIGNsaWNrZWRcbmFkZFByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgYWRkUHJvamVjdE1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbn0pO1xuXG4vLyBBZGQgdGhlIHByb2plY3QgdG8gdGhlIHByb2plY3RzIGFycmF5IGFuZCB1cGRhdGUgdGhlIHByb2plY3RzIGxpc3QgaW4gdGhlIERPTVxuYWRkUHJvamVjdEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZlbnQpID0+IHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgYWRkUHJvamVjdCgpO1xufSk7XG5cbmZ1bmN0aW9uIGFkZFByb2plY3QoKSB7XG4gIC8vIEdldCB0aGUgcHJvamVjdCBuYW1lIGZyb20gdGhlIGlucHV0XG4gIGNvbnN0IHByb2plY3ROYW1lID0gcHJvamVjdE5hbWVJbnB1dC52YWx1ZTtcblxuICAvLyBBZGQgdGhlIHByb2plY3QgbmFtZSB0byB0aGUgcHJvamVjdHMgYXJyYXlcbiAgcHJvamVjdHMucHVzaChwcm9qZWN0TmFtZSk7XG5cbiAgLy8gVXBkYXRlIHRoZSBwcm9qZWN0cyBsaXN0IGluIHRoZSBET01cbiAgcHJvamVjdHNDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgZm9yIChjb25zdCBwcm9qZWN0IG9mIHByb2plY3RzKSB7XG4gICAgY29uc3QgcHJvamVjdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgcHJvamVjdEl0ZW0udGV4dENvbnRlbnQgPSBwcm9qZWN0O1xuICAgIHByb2plY3RzQ29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3RJdGVtKTtcbiAgfVxuXG4gIC8vIFJlc2V0IHRoZSBmb3JtXG4gIGFkZFByb2plY3RGb3JtLnJlc2V0KCk7XG5cbiAgLy8gSGlkZSB0aGUgbW9kYWxcbiAgYWRkUHJvamVjdE1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblxuICBjb25zb2xlLmxvZyhwcm9qZWN0cyk7XG4gIHVwZGF0ZU9wdGlvbnMoKTtcbn1cbi8vVXBkYXRlICdQcm9qZWN0JyBvcHRpb25zIGluIHRoZSBmb3JtXG5cbi8vIEdldCB0aGUgc2VsZWN0IGVsZW1lbnRcbmNvbnN0IHByb2plY3RTZWxlY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3RcIik7XG5cbmZ1bmN0aW9uIHVwZGF0ZU9wdGlvbnMoKSB7XG4gIHByb2plY3RTZWxlY3QuaW5uZXJIVE1MID0gXCJcIjtcbiAgcHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgb3B0aW9uLnZhbHVlID0gcHJvamVjdDtcbiAgICBvcHRpb24uaW5uZXJUZXh0ID0gcHJvamVjdDtcbiAgICBwcm9qZWN0U2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbik7XG4gIH0pO1xufVxuXG5kaXNwbGF5VGFza3MoKTtcbmRpc3BsYXlDb21wbGV0ZWRUYXNrcygpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9