/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
//Array of task objects
let tasks = [
  {
    id: 1,
    title: "Walk the dog",
    description: "Take Bono for a 10 minute walk",
    dueDate: "2023-02-07",
    priority: "low",
    project: "My Tasks",
    complete: false,
  },
  {
    id: 2,
    title: "Practice guitar",
    description: "Learn the CAGED method",
    dueDate: "2023-02-11",
    priority: "low",
    project: "My Tasks",
    complete: false,
  },
  {
    id: 3,
    title: "Pay electricity bill",
    description: "Pay bill online",
    dueDate: "2023-02-25",
    priority: "medium",
    project: "My Tasks",
    complete: false,
  },
];

// Array of Projects
let projects = ["My Tasks"];
let selectedProject = "My Tasks";

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
const info = document.getElementById("info");

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
  updateOptions();
});

function displayAllTasks() {
  taskContainer.innerHTML = "";
  completedTaskContainer.innerHTML = "";

  tasks.forEach((task, index) => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.checked = task.complete; // Check/uncheck the checkbox based on the value of `task.complete`
    checkbox.addEventListener("click", () => {
      task.complete = !task.complete;
      displayAllTasks();
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

    if (task.complete) {
      completedTaskContainer.appendChild(taskDiv);
    } else {
      taskContainer.appendChild(taskDiv);
    }
  });

  info.innerText = JSON.stringify(tasks);
}

// Delete task function
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  displayAllTasks();
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
  displayAllTasks();
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

      displayAllTasks();
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

displayAllTasks();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vQXJyYXkgb2YgdGFzayBvYmplY3RzXG5sZXQgdGFza3MgPSBbXG4gIHtcbiAgICBpZDogMSxcbiAgICB0aXRsZTogXCJXYWxrIHRoZSBkb2dcIixcbiAgICBkZXNjcmlwdGlvbjogXCJUYWtlIEJvbm8gZm9yIGEgMTAgbWludXRlIHdhbGtcIixcbiAgICBkdWVEYXRlOiBcIjIwMjMtMDItMDdcIixcbiAgICBwcmlvcml0eTogXCJsb3dcIixcbiAgICBwcm9qZWN0OiBcIk15IFRhc2tzXCIsXG4gICAgY29tcGxldGU6IGZhbHNlLFxuICB9LFxuICB7XG4gICAgaWQ6IDIsXG4gICAgdGl0bGU6IFwiUHJhY3RpY2UgZ3VpdGFyXCIsXG4gICAgZGVzY3JpcHRpb246IFwiTGVhcm4gdGhlIENBR0VEIG1ldGhvZFwiLFxuICAgIGR1ZURhdGU6IFwiMjAyMy0wMi0xMVwiLFxuICAgIHByaW9yaXR5OiBcImxvd1wiLFxuICAgIHByb2plY3Q6IFwiTXkgVGFza3NcIixcbiAgICBjb21wbGV0ZTogZmFsc2UsXG4gIH0sXG4gIHtcbiAgICBpZDogMyxcbiAgICB0aXRsZTogXCJQYXkgZWxlY3RyaWNpdHkgYmlsbFwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlBheSBiaWxsIG9ubGluZVwiLFxuICAgIGR1ZURhdGU6IFwiMjAyMy0wMi0yNVwiLFxuICAgIHByaW9yaXR5OiBcIm1lZGl1bVwiLFxuICAgIHByb2plY3Q6IFwiTXkgVGFza3NcIixcbiAgICBjb21wbGV0ZTogZmFsc2UsXG4gIH0sXG5dO1xuXG4vLyBBcnJheSBvZiBQcm9qZWN0c1xubGV0IHByb2plY3RzID0gW1wiTXkgVGFza3NcIl07XG5sZXQgc2VsZWN0ZWRQcm9qZWN0ID0gXCJNeSBUYXNrc1wiO1xuXG5sZXQgZWRpdGluZ1Rhc2sgPSBmYWxzZTtcbmxldCBlZGl0SW5kZXg7XG5cbi8vVG9nZ2xlIHNpZGViYXIgZGlzcGxheVxuY29uc3QgbWVudUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWVudS1idG5cIik7XG5jb25zdCBtYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluXCIpO1xuY29uc3QgYWRkVGFza0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLXRhc2stYnRuXCIpO1xuY29uc3QgYWRkVGFza01vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtdGFzay1tb2RhbFwiKTtcbmNvbnN0IHRhc2tDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stY29udGFpbmVyXCIpO1xuY29uc3QgY29tcGxldGVkVGFza0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICBcImNvbXBsZXRlZC10YXNrLWNvbnRhaW5lclwiXG4pO1xuY29uc3QgYWRkVGFza0Zvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC10YXNrLWZvcm1cIik7XG5jb25zdCBwcm9qZWN0c01lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RzLW1lbnVcIik7XG5cbmNvbnN0IGFkZFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZC1uZXctcHJvamVjdFwiKTtcbmNvbnN0IGFkZFByb2plY3RNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkLXByb2plY3QtbW9kYWxcIik7XG5jb25zdCBhZGRQcm9qZWN0Rm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkLXByb2plY3QtZm9ybVwiKTtcbmNvbnN0IHByb2plY3ROYW1lSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3QtbmFtZVwiKTtcbmNvbnN0IHByb2plY3RzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0cy1jb250YWluZXJcIik7XG5jb25zdCBpbmZvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvXCIpO1xuXG4vL1RvZ2dsZSBzaWRlYmFyIHZpc2liaWxpdHlcbm1lbnVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgbWFpbi5jbGFzc0xpc3QudG9nZ2xlKFwiZm9yY2Utc2hvd1wiKTtcbn0pO1xuXG4vLyBGYWN0b3J5IGZ1bmN0aW9uIHRvIGNyZWF0ZSB0YXNrIG9iamVjdHNcbmZ1bmN0aW9uIGNyZWF0ZVRhc2soaWQsIHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QpIHtcbiAgcmV0dXJuIHtcbiAgICBpZCxcbiAgICB0aXRsZSxcbiAgICBkZXNjcmlwdGlvbixcbiAgICBkdWVEYXRlLFxuICAgIHByaW9yaXR5LFxuICAgIHByb2plY3QsXG4gICAgY29tcGxldGU6IGZhbHNlLFxuICB9O1xufVxuLy9EaXNwbGF5IHRoZSBtb2RhbFxuXG5hZGRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGFkZFRhc2tNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gIHVwZGF0ZU9wdGlvbnMoKTtcbn0pO1xuXG5mdW5jdGlvbiBkaXNwbGF5QWxsVGFza3MoKSB7XG4gIHRhc2tDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgY29tcGxldGVkVGFza0NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuXG4gIHRhc2tzLmZvckVhY2goKHRhc2ssIGluZGV4KSA9PiB7XG4gICAgY29uc3QgdGFza0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGFza0Rpdi5jbGFzc0xpc3QuYWRkKFwidGFza1wiKTtcblxuICAgIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGNoZWNrYm94LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJjaGVja2JveFwiKTtcbiAgICBjaGVja2JveC5jaGVja2VkID0gdGFzay5jb21wbGV0ZTsgLy8gQ2hlY2svdW5jaGVjayB0aGUgY2hlY2tib3ggYmFzZWQgb24gdGhlIHZhbHVlIG9mIGB0YXNrLmNvbXBsZXRlYFxuICAgIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICB0YXNrLmNvbXBsZXRlID0gIXRhc2suY29tcGxldGU7XG4gICAgICBkaXNwbGF5QWxsVGFza3MoKTtcbiAgICB9KTtcbiAgICB0YXNrRGl2LmFwcGVuZENoaWxkKGNoZWNrYm94KTtcblxuICAgIGNvbnN0IHRpdGxlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aXRsZURpdi5pbm5lclRleHQgPSB0YXNrLnRpdGxlO1xuICAgIHRpdGxlRGl2LmNsYXNzTGlzdC5hZGQoXCJ0YXNrLXRpdGxlXCIpO1xuICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQodGl0bGVEaXYpO1xuXG4gICAgY29uc3QgZGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBkZWxldGVCdXR0b24uaW5uZXJUZXh0ID0gXCJEZWxldGVcIjtcbiAgICBkZWxldGVCdXR0b24uY2xhc3NMaXN0LmFkZChcImRlbGV0ZS1idXR0b25cIik7XG4gICAgZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBkZWxldGVUYXNrKHRhc2suaWQpO1xuICAgIH0pO1xuICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQoZGVsZXRlQnV0dG9uKTtcblxuICAgIGNvbnN0IGVkaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGVkaXRCdXR0b24uaW5uZXJUZXh0ID0gXCJFZGl0XCI7XG4gICAgZWRpdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZWRpdC1idXR0b25cIik7XG4gICAgZWRpdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtdGFzay1tb2RhbFwiKS5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgICBlZGl0aW5nVGFzayA9IHRydWU7XG4gICAgICBlZGl0SW5kZXggPSBpbmRleDtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay10aXRsZVwiKS52YWx1ZSA9IHRhc2sudGl0bGU7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stZGVzY1wiKS52YWx1ZSA9IHRhc2suZGVzY3JpcHRpb247XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1ZS1kYXRlXCIpLnZhbHVlID0gdGFzay5kdWVEYXRlO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmlvcml0eVwiKS52YWx1ZSA9IHRhc2sucHJpb3JpdHk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RcIikudmFsdWUgPSB0YXNrLnByb2plY3Q7XG4gICAgfSk7XG4gICAgdGFza0Rpdi5hcHBlbmRDaGlsZChlZGl0QnV0dG9uKTtcblxuICAgIGlmICh0YXNrLmNvbXBsZXRlKSB7XG4gICAgICBjb21wbGV0ZWRUYXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tEaXYpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tEaXYpO1xuICAgIH1cbiAgfSk7XG5cbiAgaW5mby5pbm5lclRleHQgPSBKU09OLnN0cmluZ2lmeSh0YXNrcyk7XG59XG5cbi8vIERlbGV0ZSB0YXNrIGZ1bmN0aW9uXG5mdW5jdGlvbiBkZWxldGVUYXNrKGlkKSB7XG4gIHRhc2tzID0gdGFza3MuZmlsdGVyKCh0YXNrKSA9PiB0YXNrLmlkICE9PSBpZCk7XG4gIGRpc3BsYXlBbGxUYXNrcygpO1xufVxuXG4vLyBBZGQgdGFzayBmdW5jdGlvblxuXG5mdW5jdGlvbiBhZGRUYXNrKHRhc2tzKSB7XG4gIGxldCB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay10aXRsZVwiKS52YWx1ZTtcbiAgbGV0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLWRlc2NcIikudmFsdWU7XG4gIGxldCBkdWVEYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdWUtZGF0ZVwiKS52YWx1ZTtcbiAgbGV0IHByaW9yaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmlvcml0eVwiKS52YWx1ZTtcbiAgbGV0IHByb2plY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RcIikudmFsdWU7XG5cbiAgaWYgKCFlZGl0aW5nVGFzaykge1xuICAgIGNvbnN0IGlkID0gdGFza3MubGVuZ3RoICsgMTtcbiAgICBjb25zdCBuZXdUYXNrID0gY3JlYXRlVGFzayhcbiAgICAgIGlkLFxuICAgICAgdGl0bGUsXG4gICAgICBkZXNjcmlwdGlvbixcbiAgICAgIGR1ZURhdGUsXG4gICAgICBwcmlvcml0eSxcbiAgICAgIHByb2plY3RcbiAgICApO1xuICAgIHRhc2tzLnB1c2gobmV3VGFzayk7XG4gIH0gZWxzZSB7XG4gICAgdGFza3NbZWRpdEluZGV4XS50aXRsZSA9IHRpdGxlO1xuICAgIHRhc2tzW2VkaXRJbmRleF0uZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICB0YXNrc1tlZGl0SW5kZXhdLmR1ZURhdGUgPSBkdWVEYXRlO1xuICAgIHRhc2tzW2VkaXRJbmRleF0ucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICB0YXNrc1tlZGl0SW5kZXhdLnByb2plY3QgPSBwcm9qZWN0O1xuICAgIGVkaXRpbmdUYXNrID0gZmFsc2U7XG4gIH1cbiAgZGlzcGxheUFsbFRhc2tzKCk7XG4gIGNvbnNvbGUubG9nKHRhc2tzKTtcblxuICAvLyBIaWRlIHRoZSBtb2RhbFxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC10YXNrLW1vZGFsXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgLy8gUmVzZXQgZm9ybVxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC10YXNrLWZvcm1cIikucmVzZXQoKTtcbn1cblxuYWRkVGFza0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZlbnQpID0+IHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgYWRkVGFzayh0YXNrcyk7XG59KTtcblxuLy8gU2hvdyB0aGUgbW9kYWwgd2hlbiB0aGUgYWRkIHByb2plY3QgYnV0dG9uIGlzIGNsaWNrZWRcbmFkZFByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgYWRkUHJvamVjdE1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbn0pO1xuXG4vLyBBZGQgdGhlIHByb2plY3QgdG8gdGhlIHByb2plY3RzIGFycmF5IGFuZCB1cGRhdGUgdGhlIHByb2plY3RzIGxpc3QgaW4gdGhlIERPTVxuYWRkUHJvamVjdEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZlbnQpID0+IHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgYWRkUHJvamVjdCgpO1xufSk7XG5cbmZ1bmN0aW9uIGFkZFByb2plY3QoKSB7XG4gIC8vIEdldCB0aGUgcHJvamVjdCBuYW1lIGZyb20gdGhlIGlucHV0XG4gIGNvbnN0IHByb2plY3ROYW1lID0gcHJvamVjdE5hbWVJbnB1dC52YWx1ZTtcblxuICAvLyBBZGQgdGhlIHByb2plY3QgbmFtZSB0byB0aGUgcHJvamVjdHMgYXJyYXlcbiAgcHJvamVjdHMucHVzaChwcm9qZWN0TmFtZSk7XG5cbiAgLy8gVXBkYXRlIHRoZSBwcm9qZWN0cyBsaXN0IGluIHRoZSBET01cbiAgcHJvamVjdHNDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgcHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgIGNvbnN0IHByb2plY3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBwcm9qZWN0SXRlbS5pbm5lclRleHQgPSBwcm9qZWN0O1xuICAgIHByb2plY3RJdGVtLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LWl0ZW1cIik7XG4gICAgcHJvamVjdEl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIHNlbGVjdGVkUHJvamVjdCA9IHByb2plY3Q7XG4gICAgICBjb25zb2xlLmxvZyhzZWxlY3RlZFByb2plY3QpO1xuXG4gICAgICBkaXNwbGF5QWxsVGFza3MoKTtcbiAgICB9KTtcbiAgICBwcm9qZWN0c0NvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0SXRlbSk7XG4gIH0pO1xuICBjb25zb2xlLmxvZyhzZWxlY3RlZFByb2plY3QpO1xuXG4gIC8vIFJlc2V0IHRoZSBmb3JtXG4gIGFkZFByb2plY3RGb3JtLnJlc2V0KCk7XG5cbiAgLy8gSGlkZSB0aGUgbW9kYWxcbiAgYWRkUHJvamVjdE1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblxuICBjb25zb2xlLmxvZyhwcm9qZWN0cyk7XG4gIHVwZGF0ZU9wdGlvbnMoKTtcbn1cbi8vVXBkYXRlICdQcm9qZWN0JyBvcHRpb25zIGluIHRoZSBmb3JtXG5cbi8vIEdldCB0aGUgc2VsZWN0IGVsZW1lbnRcbmNvbnN0IHByb2plY3RTZWxlY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3RcIik7XG5cbmZ1bmN0aW9uIHVwZGF0ZU9wdGlvbnMoKSB7XG4gIHByb2plY3RTZWxlY3QuaW5uZXJIVE1MID0gXCJcIjtcbiAgcHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgb3B0aW9uLnZhbHVlID0gcHJvamVjdDtcbiAgICBvcHRpb24uaW5uZXJUZXh0ID0gcHJvamVjdDtcbiAgICBwcm9qZWN0U2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbik7XG4gIH0pO1xufVxuXG5kaXNwbGF5QWxsVGFza3MoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==