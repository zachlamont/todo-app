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
    project: "📝 My Tasks",
    complete: false,
  },
  {
    id: 2,
    title: "Practice guitar",
    description: "Learn the CAGED method",
    dueDate: "2023-02-11",
    priority: "low",
    project: "📝 My Tasks",
    complete: false,
  },
  {
    id: 3,
    title: "Pay electricity bill",
    description: "Pay bill online",
    dueDate: "2023-02-25",
    priority: "medium",
    project: "📝 My Tasks",
    complete: false,
  },
];

// Array of Projects
let projects = ["📝 My Tasks"];
let selectedProject = "📝 My Tasks";

let editingTask = false;
let editTaskId;

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
const projectSelect = document.querySelector("#project");
const info = document.getElementById("info");

const tasksHeading = document.getElementById("tasks-heading");
const submitTaskButton = document.getElementById("submit-task-button");

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
  submitTaskButton.innerText = "Add Task";

  addTaskModal.style.display = "flex";
  updateOptions();
});

//Display lists of tasks
function displayAllTasks() {
  taskContainer.innerHTML = "";
  completedTaskContainer.innerHTML = "";

  tasks
    .filter((task) => task.project === selectedProject)
    .forEach((task) => {
      const taskDiv = document.createElement("div");
      taskDiv.classList.add("task");

      const buttonsContainer = document.createElement("div");
      buttonsContainer.classList.add("buttons-container");

      const checkbox = document.createElement("input");
      checkbox.setAttribute("type", "checkbox");
      checkbox.checked = task.complete; // Check/uncheck the checkbox based on the value of `task.complete`
      checkbox.addEventListener("click", () => {
        task.complete = !task.complete;
        displayAllTasks();
      });
      taskDiv.appendChild(checkbox);

      //Insert task title
      const titleDiv = document.createElement("div");
      titleDiv.innerText = task.title;
      titleDiv.classList.add("task-title");
      taskDiv.appendChild(titleDiv);

      //Indert Edit button
      const editButton = document.createElement("button");
      editButton.innerText = "";
      editButton.classList.add("task-button");
      editButton.classList.add("tooltip");
      editButton.title = "Edit";

      const editIcon = document.createElement("img");
      editIcon.classList.add("task-icon");
      editIcon.src = "icons/edit.svg";
      editIcon.alt = "Edit Icon";

      editButton.appendChild(editIcon);

      const editTooltip = document.createElement("span");
      editTooltip.classList.add("tooltiptext", "left-tooltip");
      editTooltip.innerText = "Edit";

      editButton.appendChild(editTooltip);

      editButton.addEventListener("click", () => {
        submitTaskButton.innerText = "Edit Task";

        document.getElementById("add-task-modal").style.display = "flex";
        editingTask = true;
        editTaskId = task.id;
        document.getElementById("task-title").value = task.title;
        document.getElementById("task-desc").value = task.description;
        document.getElementById("due-date").value = task.dueDate;
        document.getElementById("priority").value = task.priority;
        document.getElementById("project").value = task.project;
      });
      buttonsContainer.appendChild(editButton);

      const moveToProjectDiv = document.createElement("div");
      moveToProjectDiv.classList.add("move-to-project");

      const moveToProjectButton = document.createElement("button");
      moveToProjectButton.classList.add("task-button");
      moveToProjectButton.innerText = "";
      moveToProjectButton.title = "Move To Project";

      const moveToProjectIcon = document.createElement("img");
      moveToProjectIcon.classList.add("task-icon");
      moveToProjectIcon.src = "icons/arrow-right-circle.svg";
      moveToProjectIcon.alt = "Move To Project Icon";

      moveToProjectButton.appendChild(moveToProjectIcon);

      let projectList;

      moveToProjectButton.addEventListener("click", () => {
        if (!projectList) {
          projectList = document.createElement("ul");
          projectList.classList.add("project-list");

          projects.forEach((project) => {
            const projectListItem = document.createElement("li");
            projectListItem.innerText = project;
            projectListItem.addEventListener("click", () => {
              task.project = project;
              displayAllTasks();
              projectList.style.display = "none";
            });
            projectList.appendChild(projectListItem);
          });

          projectList.style.display = "block";
          moveToProjectDiv.appendChild(projectList);

          document.addEventListener("click", (event) => {
            if (!moveToProjectDiv.contains(event.target)) {
              projectList.style.display = "none";
            }
          });
        } else {
          projectList.style.display = "block";
        }
      });

      moveToProjectDiv.appendChild(moveToProjectButton);
      buttonsContainer.appendChild(moveToProjectDiv);

      const deleteButton = document.createElement("button");
      deleteButton.innerText = "";
      deleteButton.classList.add("task-button");
      deleteButton.title = "Delete";
      deleteButton.addEventListener("click", () => {
        deleteTask(task.id);
      });

      const deleteIcon = document.createElement("img");
      deleteIcon.classList.add("task-icon");
      deleteIcon.src = "icons/trash-2.svg";
      deleteIcon.alt = "Delete Icon";

      deleteButton.appendChild(deleteIcon);

      buttonsContainer.appendChild(deleteButton);

      taskDiv.appendChild(buttonsContainer);

      if (task.complete) {
        completedTaskContainer.appendChild(taskDiv);
      } else {
        taskContainer.appendChild(taskDiv);
      }
    });

  tasksHeading.innerText = selectedProject;

  //info.innerText = JSON.stringify(tasks);
}

// Delete task function
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  displayAllTasks();
}

//Add a new task object
function addTask(tasks) {
  let title = document.getElementById("task-title").value;
  let description = document.getElementById("task-desc").value;
  let dueDate = document.getElementById("due-date").value;
  let priority = document.getElementById("priority").value;
  let project = document.getElementById("project").value;

  if (!editingTask) {
    const id =
      tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1; //Give the task a unique ID
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
    tasks.forEach((task) => {
      if (task.id === editTaskId) {
        task.title = title;
        task.description = description;
        task.dueDate = dueDate;
        task.priority = priority;
        task.project = project;
      }
    });
    editingTask = false;
  }
  displayAllTasks();
  console.log(tasks);

  // Hide the modal
  document.getElementById("add-task-modal").style.display = "none";
  // Reset form
  document.getElementById("add-task-form").reset();
}

//Call addTask function when form is submitted
addTaskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addTask(tasks);
});

// Show the modal when the 'New Project' button is clicked
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

  // Add the project name to the projects array if not blank

  if (projectName) {
    projects.push(projectName);
  }

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
      //info.innerText = JSON.stringify(tasks);
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

  //info.innerText = JSON.stringify(tasks);
}

// Update select dropdown with list of projects
function updateOptions() {
  projectSelect.innerHTML = "";
  projects.forEach((project) => {
    let option = document.createElement("option");
    option.value = project;
    option.innerText = project;
    projectSelect.appendChild(option);
  });
}

displayAllTasks();
addProject();
updateOptions();
//info.innerText = JSON.stringify(tasks);

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEM7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFdBQVc7O0FBRVg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxVQUFVO0FBQ1Y7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0RUFBNEU7QUFDNUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvL0FycmF5IG9mIHRhc2sgb2JqZWN0c1xubGV0IHRhc2tzID0gW1xuICB7XG4gICAgaWQ6IDEsXG4gICAgdGl0bGU6IFwiV2FsayB0aGUgZG9nXCIsXG4gICAgZGVzY3JpcHRpb246IFwiVGFrZSBCb25vIGZvciBhIDEwIG1pbnV0ZSB3YWxrXCIsXG4gICAgZHVlRGF0ZTogXCIyMDIzLTAyLTA3XCIsXG4gICAgcHJpb3JpdHk6IFwibG93XCIsXG4gICAgcHJvamVjdDogXCLwn5OdIE15IFRhc2tzXCIsXG4gICAgY29tcGxldGU6IGZhbHNlLFxuICB9LFxuICB7XG4gICAgaWQ6IDIsXG4gICAgdGl0bGU6IFwiUHJhY3RpY2UgZ3VpdGFyXCIsXG4gICAgZGVzY3JpcHRpb246IFwiTGVhcm4gdGhlIENBR0VEIG1ldGhvZFwiLFxuICAgIGR1ZURhdGU6IFwiMjAyMy0wMi0xMVwiLFxuICAgIHByaW9yaXR5OiBcImxvd1wiLFxuICAgIHByb2plY3Q6IFwi8J+TnSBNeSBUYXNrc1wiLFxuICAgIGNvbXBsZXRlOiBmYWxzZSxcbiAgfSxcbiAge1xuICAgIGlkOiAzLFxuICAgIHRpdGxlOiBcIlBheSBlbGVjdHJpY2l0eSBiaWxsXCIsXG4gICAgZGVzY3JpcHRpb246IFwiUGF5IGJpbGwgb25saW5lXCIsXG4gICAgZHVlRGF0ZTogXCIyMDIzLTAyLTI1XCIsXG4gICAgcHJpb3JpdHk6IFwibWVkaXVtXCIsXG4gICAgcHJvamVjdDogXCLwn5OdIE15IFRhc2tzXCIsXG4gICAgY29tcGxldGU6IGZhbHNlLFxuICB9LFxuXTtcblxuLy8gQXJyYXkgb2YgUHJvamVjdHNcbmxldCBwcm9qZWN0cyA9IFtcIvCfk50gTXkgVGFza3NcIl07XG5sZXQgc2VsZWN0ZWRQcm9qZWN0ID0gXCLwn5OdIE15IFRhc2tzXCI7XG5cbmxldCBlZGl0aW5nVGFzayA9IGZhbHNlO1xubGV0IGVkaXRUYXNrSWQ7XG5cbi8vVG9nZ2xlIHNpZGViYXIgZGlzcGxheVxuY29uc3QgbWVudUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWVudS1idG5cIik7XG5jb25zdCBtYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluXCIpO1xuY29uc3QgYWRkVGFza0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLXRhc2stYnRuXCIpO1xuY29uc3QgYWRkVGFza01vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtdGFzay1tb2RhbFwiKTtcbmNvbnN0IHRhc2tDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stY29udGFpbmVyXCIpO1xuY29uc3QgY29tcGxldGVkVGFza0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICBcImNvbXBsZXRlZC10YXNrLWNvbnRhaW5lclwiXG4pO1xuY29uc3QgYWRkVGFza0Zvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC10YXNrLWZvcm1cIik7XG5jb25zdCBwcm9qZWN0c01lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RzLW1lbnVcIik7XG5cbmNvbnN0IGFkZFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZC1uZXctcHJvamVjdFwiKTtcbmNvbnN0IGFkZFByb2plY3RNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkLXByb2plY3QtbW9kYWxcIik7XG5jb25zdCBhZGRQcm9qZWN0Rm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkLXByb2plY3QtZm9ybVwiKTtcbmNvbnN0IHByb2plY3ROYW1lSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3QtbmFtZVwiKTtcbmNvbnN0IHByb2plY3RzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0cy1jb250YWluZXJcIik7XG5jb25zdCBwcm9qZWN0U2VsZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0XCIpO1xuY29uc3QgaW5mbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mb1wiKTtcblxuY29uc3QgdGFza3NIZWFkaW5nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrcy1oZWFkaW5nXCIpO1xuY29uc3Qgc3VibWl0VGFza0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3VibWl0LXRhc2stYnV0dG9uXCIpO1xuXG4vL1RvZ2dsZSBzaWRlYmFyIHZpc2liaWxpdHlcbm1lbnVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgbWFpbi5jbGFzc0xpc3QudG9nZ2xlKFwiZm9yY2Utc2hvd1wiKTtcbn0pO1xuXG4vLyBGYWN0b3J5IGZ1bmN0aW9uIHRvIGNyZWF0ZSB0YXNrIG9iamVjdHNcbmZ1bmN0aW9uIGNyZWF0ZVRhc2soaWQsIHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QpIHtcbiAgcmV0dXJuIHtcbiAgICBpZCxcbiAgICB0aXRsZSxcbiAgICBkZXNjcmlwdGlvbixcbiAgICBkdWVEYXRlLFxuICAgIHByaW9yaXR5LFxuICAgIHByb2plY3QsXG4gICAgY29tcGxldGU6IGZhbHNlLFxuICB9O1xufVxuLy9EaXNwbGF5IHRoZSBtb2RhbFxuYWRkVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBzdWJtaXRUYXNrQnV0dG9uLmlubmVyVGV4dCA9IFwiQWRkIFRhc2tcIjtcblxuICBhZGRUYXNrTW9kYWwuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICB1cGRhdGVPcHRpb25zKCk7XG59KTtcblxuLy9EaXNwbGF5IGxpc3RzIG9mIHRhc2tzXG5mdW5jdGlvbiBkaXNwbGF5QWxsVGFza3MoKSB7XG4gIHRhc2tDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgY29tcGxldGVkVGFza0NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuXG4gIHRhc2tzXG4gICAgLmZpbHRlcigodGFzaykgPT4gdGFzay5wcm9qZWN0ID09PSBzZWxlY3RlZFByb2plY3QpXG4gICAgLmZvckVhY2goKHRhc2spID0+IHtcbiAgICAgIGNvbnN0IHRhc2tEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgdGFza0Rpdi5jbGFzc0xpc3QuYWRkKFwidGFza1wiKTtcblxuICAgICAgY29uc3QgYnV0dG9uc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBidXR0b25zQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJidXR0b25zLWNvbnRhaW5lclwiKTtcblxuICAgICAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICBjaGVja2JveC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiY2hlY2tib3hcIik7XG4gICAgICBjaGVja2JveC5jaGVja2VkID0gdGFzay5jb21wbGV0ZTsgLy8gQ2hlY2svdW5jaGVjayB0aGUgY2hlY2tib3ggYmFzZWQgb24gdGhlIHZhbHVlIG9mIGB0YXNrLmNvbXBsZXRlYFxuICAgICAgY2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgdGFzay5jb21wbGV0ZSA9ICF0YXNrLmNvbXBsZXRlO1xuICAgICAgICBkaXNwbGF5QWxsVGFza3MoKTtcbiAgICAgIH0pO1xuICAgICAgdGFza0Rpdi5hcHBlbmRDaGlsZChjaGVja2JveCk7XG5cbiAgICAgIC8vSW5zZXJ0IHRhc2sgdGl0bGVcbiAgICAgIGNvbnN0IHRpdGxlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHRpdGxlRGl2LmlubmVyVGV4dCA9IHRhc2sudGl0bGU7XG4gICAgICB0aXRsZURpdi5jbGFzc0xpc3QuYWRkKFwidGFzay10aXRsZVwiKTtcbiAgICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQodGl0bGVEaXYpO1xuXG4gICAgICAvL0luZGVydCBFZGl0IGJ1dHRvblxuICAgICAgY29uc3QgZWRpdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICBlZGl0QnV0dG9uLmlubmVyVGV4dCA9IFwiXCI7XG4gICAgICBlZGl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWJ1dHRvblwiKTtcbiAgICAgIGVkaXRCdXR0b24uY2xhc3NMaXN0LmFkZChcInRvb2x0aXBcIik7XG4gICAgICBlZGl0QnV0dG9uLnRpdGxlID0gXCJFZGl0XCI7XG5cbiAgICAgIGNvbnN0IGVkaXRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgIGVkaXRJY29uLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWljb25cIik7XG4gICAgICBlZGl0SWNvbi5zcmMgPSBcImljb25zL2VkaXQuc3ZnXCI7XG4gICAgICBlZGl0SWNvbi5hbHQgPSBcIkVkaXQgSWNvblwiO1xuXG4gICAgICBlZGl0QnV0dG9uLmFwcGVuZENoaWxkKGVkaXRJY29uKTtcblxuICAgICAgY29uc3QgZWRpdFRvb2x0aXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgIGVkaXRUb29sdGlwLmNsYXNzTGlzdC5hZGQoXCJ0b29sdGlwdGV4dFwiLCBcImxlZnQtdG9vbHRpcFwiKTtcbiAgICAgIGVkaXRUb29sdGlwLmlubmVyVGV4dCA9IFwiRWRpdFwiO1xuXG4gICAgICBlZGl0QnV0dG9uLmFwcGVuZENoaWxkKGVkaXRUb29sdGlwKTtcblxuICAgICAgZWRpdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBzdWJtaXRUYXNrQnV0dG9uLmlubmVyVGV4dCA9IFwiRWRpdCBUYXNrXCI7XG5cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtdGFzay1tb2RhbFwiKS5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgICAgIGVkaXRpbmdUYXNrID0gdHJ1ZTtcbiAgICAgICAgZWRpdFRhc2tJZCA9IHRhc2suaWQ7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay10aXRsZVwiKS52YWx1ZSA9IHRhc2sudGl0bGU7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1kZXNjXCIpLnZhbHVlID0gdGFzay5kZXNjcmlwdGlvbjtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdWUtZGF0ZVwiKS52YWx1ZSA9IHRhc2suZHVlRGF0ZTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmlvcml0eVwiKS52YWx1ZSA9IHRhc2sucHJpb3JpdHk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdFwiKS52YWx1ZSA9IHRhc2sucHJvamVjdDtcbiAgICAgIH0pO1xuICAgICAgYnV0dG9uc0NvbnRhaW5lci5hcHBlbmRDaGlsZChlZGl0QnV0dG9uKTtcblxuICAgICAgY29uc3QgbW92ZVRvUHJvamVjdERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBtb3ZlVG9Qcm9qZWN0RGl2LmNsYXNzTGlzdC5hZGQoXCJtb3ZlLXRvLXByb2plY3RcIik7XG5cbiAgICAgIGNvbnN0IG1vdmVUb1Byb2plY3RCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgbW92ZVRvUHJvamVjdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwidGFzay1idXR0b25cIik7XG4gICAgICBtb3ZlVG9Qcm9qZWN0QnV0dG9uLmlubmVyVGV4dCA9IFwiXCI7XG4gICAgICBtb3ZlVG9Qcm9qZWN0QnV0dG9uLnRpdGxlID0gXCJNb3ZlIFRvIFByb2plY3RcIjtcblxuICAgICAgY29uc3QgbW92ZVRvUHJvamVjdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgbW92ZVRvUHJvamVjdEljb24uY2xhc3NMaXN0LmFkZChcInRhc2staWNvblwiKTtcbiAgICAgIG1vdmVUb1Byb2plY3RJY29uLnNyYyA9IFwiaWNvbnMvYXJyb3ctcmlnaHQtY2lyY2xlLnN2Z1wiO1xuICAgICAgbW92ZVRvUHJvamVjdEljb24uYWx0ID0gXCJNb3ZlIFRvIFByb2plY3QgSWNvblwiO1xuXG4gICAgICBtb3ZlVG9Qcm9qZWN0QnV0dG9uLmFwcGVuZENoaWxkKG1vdmVUb1Byb2plY3RJY29uKTtcblxuICAgICAgbGV0IHByb2plY3RMaXN0O1xuXG4gICAgICBtb3ZlVG9Qcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGlmICghcHJvamVjdExpc3QpIHtcbiAgICAgICAgICBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcbiAgICAgICAgICBwcm9qZWN0TGlzdC5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1saXN0XCIpO1xuXG4gICAgICAgICAgcHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdExpc3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgICAgICAgcHJvamVjdExpc3RJdGVtLmlubmVyVGV4dCA9IHByb2plY3Q7XG4gICAgICAgICAgICBwcm9qZWN0TGlzdEl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgdGFzay5wcm9qZWN0ID0gcHJvamVjdDtcbiAgICAgICAgICAgICAgZGlzcGxheUFsbFRhc2tzKCk7XG4gICAgICAgICAgICAgIHByb2plY3RMaXN0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcHJvamVjdExpc3QuYXBwZW5kQ2hpbGQocHJvamVjdExpc3RJdGVtKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHByb2plY3RMaXN0LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgbW92ZVRvUHJvamVjdERpdi5hcHBlbmRDaGlsZChwcm9qZWN0TGlzdCk7XG5cbiAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoIW1vdmVUb1Byb2plY3REaXYuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgICBwcm9qZWN0TGlzdC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJvamVjdExpc3Quc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIG1vdmVUb1Byb2plY3REaXYuYXBwZW5kQ2hpbGQobW92ZVRvUHJvamVjdEJ1dHRvbik7XG4gICAgICBidXR0b25zQ29udGFpbmVyLmFwcGVuZENoaWxkKG1vdmVUb1Byb2plY3REaXYpO1xuXG4gICAgICBjb25zdCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgZGVsZXRlQnV0dG9uLmlubmVyVGV4dCA9IFwiXCI7XG4gICAgICBkZWxldGVCdXR0b24uY2xhc3NMaXN0LmFkZChcInRhc2stYnV0dG9uXCIpO1xuICAgICAgZGVsZXRlQnV0dG9uLnRpdGxlID0gXCJEZWxldGVcIjtcbiAgICAgIGRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBkZWxldGVUYXNrKHRhc2suaWQpO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGRlbGV0ZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgZGVsZXRlSWNvbi5jbGFzc0xpc3QuYWRkKFwidGFzay1pY29uXCIpO1xuICAgICAgZGVsZXRlSWNvbi5zcmMgPSBcImljb25zL3RyYXNoLTIuc3ZnXCI7XG4gICAgICBkZWxldGVJY29uLmFsdCA9IFwiRGVsZXRlIEljb25cIjtcblxuICAgICAgZGVsZXRlQnV0dG9uLmFwcGVuZENoaWxkKGRlbGV0ZUljb24pO1xuXG4gICAgICBidXR0b25zQ29udGFpbmVyLmFwcGVuZENoaWxkKGRlbGV0ZUJ1dHRvbik7XG5cbiAgICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQoYnV0dG9uc0NvbnRhaW5lcik7XG5cbiAgICAgIGlmICh0YXNrLmNvbXBsZXRlKSB7XG4gICAgICAgIGNvbXBsZXRlZFRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQodGFza0Rpdik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tEaXYpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gIHRhc2tzSGVhZGluZy5pbm5lclRleHQgPSBzZWxlY3RlZFByb2plY3Q7XG5cbiAgLy9pbmZvLmlubmVyVGV4dCA9IEpTT04uc3RyaW5naWZ5KHRhc2tzKTtcbn1cblxuLy8gRGVsZXRlIHRhc2sgZnVuY3Rpb25cbmZ1bmN0aW9uIGRlbGV0ZVRhc2soaWQpIHtcbiAgdGFza3MgPSB0YXNrcy5maWx0ZXIoKHRhc2spID0+IHRhc2suaWQgIT09IGlkKTtcbiAgZGlzcGxheUFsbFRhc2tzKCk7XG59XG5cbi8vQWRkIGEgbmV3IHRhc2sgb2JqZWN0XG5mdW5jdGlvbiBhZGRUYXNrKHRhc2tzKSB7XG4gIGxldCB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay10aXRsZVwiKS52YWx1ZTtcbiAgbGV0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLWRlc2NcIikudmFsdWU7XG4gIGxldCBkdWVEYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdWUtZGF0ZVwiKS52YWx1ZTtcbiAgbGV0IHByaW9yaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmlvcml0eVwiKS52YWx1ZTtcbiAgbGV0IHByb2plY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RcIikudmFsdWU7XG5cbiAgaWYgKCFlZGl0aW5nVGFzaykge1xuICAgIGNvbnN0IGlkID1cbiAgICAgIHRhc2tzLmxlbmd0aCA+IDAgPyBNYXRoLm1heCguLi50YXNrcy5tYXAoKHRhc2spID0+IHRhc2suaWQpKSArIDEgOiAxOyAvL0dpdmUgdGhlIHRhc2sgYSB1bmlxdWUgSURcbiAgICBjb25zdCBuZXdUYXNrID0gY3JlYXRlVGFzayhcbiAgICAgIGlkLFxuICAgICAgdGl0bGUsXG4gICAgICBkZXNjcmlwdGlvbixcbiAgICAgIGR1ZURhdGUsXG4gICAgICBwcmlvcml0eSxcbiAgICAgIHByb2plY3RcbiAgICApO1xuICAgIHRhc2tzLnB1c2gobmV3VGFzayk7XG4gIH0gZWxzZSB7XG4gICAgdGFza3MuZm9yRWFjaCgodGFzaykgPT4ge1xuICAgICAgaWYgKHRhc2suaWQgPT09IGVkaXRUYXNrSWQpIHtcbiAgICAgICAgdGFzay50aXRsZSA9IHRpdGxlO1xuICAgICAgICB0YXNrLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgICAgIHRhc2suZHVlRGF0ZSA9IGR1ZURhdGU7XG4gICAgICAgIHRhc2sucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICAgICAgdGFzay5wcm9qZWN0ID0gcHJvamVjdDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBlZGl0aW5nVGFzayA9IGZhbHNlO1xuICB9XG4gIGRpc3BsYXlBbGxUYXNrcygpO1xuICBjb25zb2xlLmxvZyh0YXNrcyk7XG5cbiAgLy8gSGlkZSB0aGUgbW9kYWxcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtdGFzay1tb2RhbFwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIC8vIFJlc2V0IGZvcm1cbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtdGFzay1mb3JtXCIpLnJlc2V0KCk7XG59XG5cbi8vQ2FsbCBhZGRUYXNrIGZ1bmN0aW9uIHdoZW4gZm9ybSBpcyBzdWJtaXR0ZWRcbmFkZFRhc2tGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2ZW50KSA9PiB7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIGFkZFRhc2sodGFza3MpO1xufSk7XG5cbi8vIFNob3cgdGhlIG1vZGFsIHdoZW4gdGhlICdOZXcgUHJvamVjdCcgYnV0dG9uIGlzIGNsaWNrZWRcbmFkZFByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgYWRkUHJvamVjdE1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbn0pO1xuXG4vLyBBZGQgdGhlIHByb2plY3QgdG8gdGhlIHByb2plY3RzIGFycmF5IGFuZCB1cGRhdGUgdGhlIHByb2plY3RzIGxpc3QgaW4gdGhlIERPTVxuYWRkUHJvamVjdEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZlbnQpID0+IHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgYWRkUHJvamVjdCgpO1xufSk7XG5cbmZ1bmN0aW9uIGFkZFByb2plY3QoKSB7XG4gIC8vIEdldCB0aGUgcHJvamVjdCBuYW1lIGZyb20gdGhlIGlucHV0XG4gIGNvbnN0IHByb2plY3ROYW1lID0gcHJvamVjdE5hbWVJbnB1dC52YWx1ZTtcblxuICAvLyBBZGQgdGhlIHByb2plY3QgbmFtZSB0byB0aGUgcHJvamVjdHMgYXJyYXkgaWYgbm90IGJsYW5rXG5cbiAgaWYgKHByb2plY3ROYW1lKSB7XG4gICAgcHJvamVjdHMucHVzaChwcm9qZWN0TmFtZSk7XG4gIH1cblxuICAvLyBVcGRhdGUgdGhlIHByb2plY3RzIGxpc3QgaW4gdGhlIERPTVxuICBwcm9qZWN0c0NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICBwcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgY29uc3QgcHJvamVjdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHByb2plY3RJdGVtLmlubmVyVGV4dCA9IHByb2plY3Q7XG4gICAgcHJvamVjdEl0ZW0uY2xhc3NMaXN0LmFkZChcInByb2plY3QtaXRlbVwiKTtcbiAgICBwcm9qZWN0SXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgc2VsZWN0ZWRQcm9qZWN0ID0gcHJvamVjdDtcbiAgICAgIGNvbnNvbGUubG9nKHNlbGVjdGVkUHJvamVjdCk7XG5cbiAgICAgIGRpc3BsYXlBbGxUYXNrcygpO1xuICAgICAgLy9pbmZvLmlubmVyVGV4dCA9IEpTT04uc3RyaW5naWZ5KHRhc2tzKTtcbiAgICB9KTtcbiAgICBwcm9qZWN0c0NvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0SXRlbSk7XG4gIH0pO1xuICBjb25zb2xlLmxvZyhzZWxlY3RlZFByb2plY3QpO1xuXG4gIC8vIFJlc2V0IHRoZSBmb3JtXG4gIGFkZFByb2plY3RGb3JtLnJlc2V0KCk7XG5cbiAgLy8gSGlkZSB0aGUgbW9kYWxcbiAgYWRkUHJvamVjdE1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblxuICBjb25zb2xlLmxvZyhwcm9qZWN0cyk7XG4gIHVwZGF0ZU9wdGlvbnMoKTtcblxuICAvL2luZm8uaW5uZXJUZXh0ID0gSlNPTi5zdHJpbmdpZnkodGFza3MpO1xufVxuXG4vLyBVcGRhdGUgc2VsZWN0IGRyb3Bkb3duIHdpdGggbGlzdCBvZiBwcm9qZWN0c1xuZnVuY3Rpb24gdXBkYXRlT3B0aW9ucygpIHtcbiAgcHJvamVjdFNlbGVjdC5pbm5lckhUTUwgPSBcIlwiO1xuICBwcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgbGV0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgb3B0aW9uLnZhbHVlID0gcHJvamVjdDtcbiAgICBvcHRpb24uaW5uZXJUZXh0ID0gcHJvamVjdDtcbiAgICBwcm9qZWN0U2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbik7XG4gIH0pO1xufVxuXG5kaXNwbGF5QWxsVGFza3MoKTtcbmFkZFByb2plY3QoKTtcbnVwZGF0ZU9wdGlvbnMoKTtcbi8vaW5mby5pbm5lclRleHQgPSBKU09OLnN0cmluZ2lmeSh0YXNrcyk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=