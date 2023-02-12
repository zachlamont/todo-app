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

function setupModal(buttonText) {
  let taskModalOpen = false;

  // Display the modal
  addTaskButton.addEventListener("click", () => {
    submitTaskButton.innerText = buttonText;
    addTaskModal.style.display = "flex";
    taskModalOpen = true;
    updateOptions();
  });

  // Hide the modal when the user clicks outside of addTaskForm
  addTaskModal.addEventListener("click", (event) => {
    if (taskModalOpen && !addTaskForm.contains(event.target)) {
      addTaskModal.style.display = "none";
      taskModalOpen = false;
    }
  });
}

setupModal("Add Task");

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
      editTooltip.classList.add("tooltiptext", "bottom-tooltip");
      editTooltip.innerText = "Edit";

      editButton.appendChild(editTooltip);

      let taskModalOpen = false;

      editButton.addEventListener("click", () => {
        submitTaskButton.innerText = "Edit Task";
        addTaskModal.style.display = "flex";
        taskModalOpen = true;

        editingTask = true;
        editTaskId = task.id;
        document.getElementById("task-title").value = task.title;
        document.getElementById("task-desc").value = task.description;
        document.getElementById("due-date").value = task.dueDate;
        document.getElementById("priority").value = task.priority;
        document.getElementById("project").value = task.project;
      });

      // Hide the modal when the user clicks outside of addTaskForm
      addTaskModal.addEventListener("click", (event) => {
        if (taskModalOpen && !addTaskForm.contains(event.target)) {
          addTaskModal.style.display = "none";
          taskModalOpen = false;
        }
      });

      buttonsContainer.appendChild(editButton);

      const moveToProjectDiv = document.createElement("div");
      moveToProjectDiv.classList.add("move-to-project");

      const moveToProjectButton = document.createElement("button");
      moveToProjectButton.classList.add("task-button", "tooltip");
      moveToProjectButton.innerText = "";
      moveToProjectButton.title = "Move To Project";

      const moveToProjectIcon = document.createElement("img");
      moveToProjectIcon.classList.add("task-icon");
      moveToProjectIcon.src = "icons/arrow-right-circle.svg";
      moveToProjectIcon.alt = "Move To Project Icon";

      moveToProjectButton.appendChild(moveToProjectIcon);

      const moveToProjectTooltip = document.createElement("span");
      moveToProjectTooltip.classList.add("tooltiptext", "bottom-tooltip");
      moveToProjectTooltip.innerText = "Move To Project";

      moveToProjectButton.appendChild(moveToProjectTooltip);

      let projectList;

      moveToProjectButton.addEventListener("click", () => {
        if (!projectList) {
          projectList = document.createElement("ul");
          projectList.classList.add("project-list");

          projects.forEach((project) => {
            const projectListItem = document.createElement("li");
            projectListItem.classList.add("project-list-item");
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
      deleteButton.classList.add("task-button", "tooltip");
      deleteButton.title = "Delete";
      deleteButton.addEventListener("click", () => {
        deleteTask(task.id);
      });

      const deleteIcon = document.createElement("img");
      deleteIcon.classList.add("task-icon");
      deleteIcon.src = "icons/trash-2.svg";
      deleteIcon.alt = "Delete Icon";

      deleteButton.appendChild(deleteIcon);

      const deleteTooltip = document.createElement("span");
      deleteTooltip.classList.add("tooltiptext", "bottom-tooltip");
      deleteTooltip.innerText = "Delete";

      deleteButton.appendChild(deleteTooltip);

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

let projectModalOpen = false;

// Show the modal when the 'New Project' button is clicked
addProjectButton.addEventListener("click", () => {
  addProjectModal.style.display = "flex";
  projectModalOpen = true;
});

// Hide the modal when the user clicks outside of addProjectForm
addProjectModal.addEventListener("click", (event) => {
  if (projectModalOpen && !addProjectForm.contains(event.target)) {
    addProjectModal.style.display = "none";
    projectModalOpen = false;
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdDQUF3QztBQUN4QztBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxXQUFXOztBQUVYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsVUFBVTtBQUNWO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRFQUE0RTtBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvL0FycmF5IG9mIHRhc2sgb2JqZWN0c1xubGV0IHRhc2tzID0gW1xuICB7XG4gICAgaWQ6IDEsXG4gICAgdGl0bGU6IFwiV2FsayB0aGUgZG9nXCIsXG4gICAgZGVzY3JpcHRpb246IFwiVGFrZSBCb25vIGZvciBhIDEwIG1pbnV0ZSB3YWxrXCIsXG4gICAgZHVlRGF0ZTogXCIyMDIzLTAyLTA3XCIsXG4gICAgcHJpb3JpdHk6IFwibG93XCIsXG4gICAgcHJvamVjdDogXCLwn5OdIE15IFRhc2tzXCIsXG4gICAgY29tcGxldGU6IGZhbHNlLFxuICB9LFxuICB7XG4gICAgaWQ6IDIsXG4gICAgdGl0bGU6IFwiUHJhY3RpY2UgZ3VpdGFyXCIsXG4gICAgZGVzY3JpcHRpb246IFwiTGVhcm4gdGhlIENBR0VEIG1ldGhvZFwiLFxuICAgIGR1ZURhdGU6IFwiMjAyMy0wMi0xMVwiLFxuICAgIHByaW9yaXR5OiBcImxvd1wiLFxuICAgIHByb2plY3Q6IFwi8J+TnSBNeSBUYXNrc1wiLFxuICAgIGNvbXBsZXRlOiBmYWxzZSxcbiAgfSxcbiAge1xuICAgIGlkOiAzLFxuICAgIHRpdGxlOiBcIlBheSBlbGVjdHJpY2l0eSBiaWxsXCIsXG4gICAgZGVzY3JpcHRpb246IFwiUGF5IGJpbGwgb25saW5lXCIsXG4gICAgZHVlRGF0ZTogXCIyMDIzLTAyLTI1XCIsXG4gICAgcHJpb3JpdHk6IFwibWVkaXVtXCIsXG4gICAgcHJvamVjdDogXCLwn5OdIE15IFRhc2tzXCIsXG4gICAgY29tcGxldGU6IGZhbHNlLFxuICB9LFxuXTtcblxuLy8gQXJyYXkgb2YgUHJvamVjdHNcbmxldCBwcm9qZWN0cyA9IFtcIvCfk50gTXkgVGFza3NcIl07XG5sZXQgc2VsZWN0ZWRQcm9qZWN0ID0gXCLwn5OdIE15IFRhc2tzXCI7XG5cbmxldCBlZGl0aW5nVGFzayA9IGZhbHNlO1xubGV0IGVkaXRUYXNrSWQ7XG5cbi8vVG9nZ2xlIHNpZGViYXIgZGlzcGxheVxuY29uc3QgbWVudUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWVudS1idG5cIik7XG5jb25zdCBtYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluXCIpO1xuY29uc3QgYWRkVGFza0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLXRhc2stYnRuXCIpO1xuY29uc3QgYWRkVGFza01vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtdGFzay1tb2RhbFwiKTtcbmNvbnN0IHRhc2tDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stY29udGFpbmVyXCIpO1xuY29uc3QgY29tcGxldGVkVGFza0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICBcImNvbXBsZXRlZC10YXNrLWNvbnRhaW5lclwiXG4pO1xuY29uc3QgYWRkVGFza0Zvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC10YXNrLWZvcm1cIik7XG5jb25zdCBwcm9qZWN0c01lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RzLW1lbnVcIik7XG5cbmNvbnN0IGFkZFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZC1uZXctcHJvamVjdFwiKTtcbmNvbnN0IGFkZFByb2plY3RNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkLXByb2plY3QtbW9kYWxcIik7XG5jb25zdCBhZGRQcm9qZWN0Rm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkLXByb2plY3QtZm9ybVwiKTtcbmNvbnN0IHByb2plY3ROYW1lSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3QtbmFtZVwiKTtcbmNvbnN0IHByb2plY3RzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0cy1jb250YWluZXJcIik7XG5jb25zdCBwcm9qZWN0U2VsZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0XCIpO1xuY29uc3QgaW5mbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mb1wiKTtcblxuY29uc3QgdGFza3NIZWFkaW5nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrcy1oZWFkaW5nXCIpO1xuY29uc3Qgc3VibWl0VGFza0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3VibWl0LXRhc2stYnV0dG9uXCIpO1xuXG4vL1RvZ2dsZSBzaWRlYmFyIHZpc2liaWxpdHlcbm1lbnVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgbWFpbi5jbGFzc0xpc3QudG9nZ2xlKFwiZm9yY2Utc2hvd1wiKTtcbn0pO1xuXG4vLyBGYWN0b3J5IGZ1bmN0aW9uIHRvIGNyZWF0ZSB0YXNrIG9iamVjdHNcbmZ1bmN0aW9uIGNyZWF0ZVRhc2soaWQsIHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QpIHtcbiAgcmV0dXJuIHtcbiAgICBpZCxcbiAgICB0aXRsZSxcbiAgICBkZXNjcmlwdGlvbixcbiAgICBkdWVEYXRlLFxuICAgIHByaW9yaXR5LFxuICAgIHByb2plY3QsXG4gICAgY29tcGxldGU6IGZhbHNlLFxuICB9O1xufVxuXG5mdW5jdGlvbiBzZXR1cE1vZGFsKGJ1dHRvblRleHQpIHtcbiAgbGV0IHRhc2tNb2RhbE9wZW4gPSBmYWxzZTtcblxuICAvLyBEaXNwbGF5IHRoZSBtb2RhbFxuICBhZGRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgc3VibWl0VGFza0J1dHRvbi5pbm5lclRleHQgPSBidXR0b25UZXh0O1xuICAgIGFkZFRhc2tNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgdGFza01vZGFsT3BlbiA9IHRydWU7XG4gICAgdXBkYXRlT3B0aW9ucygpO1xuICB9KTtcblxuICAvLyBIaWRlIHRoZSBtb2RhbCB3aGVuIHRoZSB1c2VyIGNsaWNrcyBvdXRzaWRlIG9mIGFkZFRhc2tGb3JtXG4gIGFkZFRhc2tNb2RhbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgaWYgKHRhc2tNb2RhbE9wZW4gJiYgIWFkZFRhc2tGb3JtLmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgIGFkZFRhc2tNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICB0YXNrTW9kYWxPcGVuID0gZmFsc2U7XG4gICAgfVxuICB9KTtcbn1cblxuc2V0dXBNb2RhbChcIkFkZCBUYXNrXCIpO1xuXG4vL0Rpc3BsYXkgbGlzdHMgb2YgdGFza3NcbmZ1bmN0aW9uIGRpc3BsYXlBbGxUYXNrcygpIHtcbiAgdGFza0NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICBjb21wbGV0ZWRUYXNrQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgdGFza3NcbiAgICAuZmlsdGVyKCh0YXNrKSA9PiB0YXNrLnByb2plY3QgPT09IHNlbGVjdGVkUHJvamVjdClcbiAgICAuZm9yRWFjaCgodGFzaykgPT4ge1xuICAgICAgY29uc3QgdGFza0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICB0YXNrRGl2LmNsYXNzTGlzdC5hZGQoXCJ0YXNrXCIpO1xuXG4gICAgICBjb25zdCBidXR0b25zQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGJ1dHRvbnNDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImJ1dHRvbnMtY29udGFpbmVyXCIpO1xuXG4gICAgICBjb25zdCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgIGNoZWNrYm94LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJjaGVja2JveFwiKTtcbiAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSB0YXNrLmNvbXBsZXRlOyAvLyBDaGVjay91bmNoZWNrIHRoZSBjaGVja2JveCBiYXNlZCBvbiB0aGUgdmFsdWUgb2YgYHRhc2suY29tcGxldGVgXG4gICAgICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICB0YXNrLmNvbXBsZXRlID0gIXRhc2suY29tcGxldGU7XG4gICAgICAgIGRpc3BsYXlBbGxUYXNrcygpO1xuICAgICAgfSk7XG4gICAgICB0YXNrRGl2LmFwcGVuZENoaWxkKGNoZWNrYm94KTtcblxuICAgICAgLy9JbnNlcnQgdGFzayB0aXRsZVxuICAgICAgY29uc3QgdGl0bGVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgdGl0bGVEaXYuaW5uZXJUZXh0ID0gdGFzay50aXRsZTtcbiAgICAgIHRpdGxlRGl2LmNsYXNzTGlzdC5hZGQoXCJ0YXNrLXRpdGxlXCIpO1xuICAgICAgdGFza0Rpdi5hcHBlbmRDaGlsZCh0aXRsZURpdik7XG5cbiAgICAgIC8vSW5kZXJ0IEVkaXQgYnV0dG9uXG4gICAgICBjb25zdCBlZGl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIGVkaXRCdXR0b24uaW5uZXJUZXh0ID0gXCJcIjtcbiAgICAgIGVkaXRCdXR0b24uY2xhc3NMaXN0LmFkZChcInRhc2stYnV0dG9uXCIpO1xuICAgICAgZWRpdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwidG9vbHRpcFwiKTtcbiAgICAgIGVkaXRCdXR0b24udGl0bGUgPSBcIkVkaXRcIjtcblxuICAgICAgY29uc3QgZWRpdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgZWRpdEljb24uY2xhc3NMaXN0LmFkZChcInRhc2staWNvblwiKTtcbiAgICAgIGVkaXRJY29uLnNyYyA9IFwiaWNvbnMvZWRpdC5zdmdcIjtcbiAgICAgIGVkaXRJY29uLmFsdCA9IFwiRWRpdCBJY29uXCI7XG5cbiAgICAgIGVkaXRCdXR0b24uYXBwZW5kQ2hpbGQoZWRpdEljb24pO1xuXG4gICAgICBjb25zdCBlZGl0VG9vbHRpcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgZWRpdFRvb2x0aXAuY2xhc3NMaXN0LmFkZChcInRvb2x0aXB0ZXh0XCIsIFwiYm90dG9tLXRvb2x0aXBcIik7XG4gICAgICBlZGl0VG9vbHRpcC5pbm5lclRleHQgPSBcIkVkaXRcIjtcblxuICAgICAgZWRpdEJ1dHRvbi5hcHBlbmRDaGlsZChlZGl0VG9vbHRpcCk7XG5cbiAgICAgIGxldCB0YXNrTW9kYWxPcGVuID0gZmFsc2U7XG5cbiAgICAgIGVkaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgc3VibWl0VGFza0J1dHRvbi5pbm5lclRleHQgPSBcIkVkaXQgVGFza1wiO1xuICAgICAgICBhZGRUYXNrTW9kYWwuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgICAgICB0YXNrTW9kYWxPcGVuID0gdHJ1ZTtcblxuICAgICAgICBlZGl0aW5nVGFzayA9IHRydWU7XG4gICAgICAgIGVkaXRUYXNrSWQgPSB0YXNrLmlkO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stdGl0bGVcIikudmFsdWUgPSB0YXNrLnRpdGxlO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stZGVzY1wiKS52YWx1ZSA9IHRhc2suZGVzY3JpcHRpb247XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHVlLWRhdGVcIikudmFsdWUgPSB0YXNrLmR1ZURhdGU7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJpb3JpdHlcIikudmFsdWUgPSB0YXNrLnByaW9yaXR5O1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RcIikudmFsdWUgPSB0YXNrLnByb2plY3Q7XG4gICAgICB9KTtcblxuICAgICAgLy8gSGlkZSB0aGUgbW9kYWwgd2hlbiB0aGUgdXNlciBjbGlja3Mgb3V0c2lkZSBvZiBhZGRUYXNrRm9ybVxuICAgICAgYWRkVGFza01vZGFsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRhc2tNb2RhbE9wZW4gJiYgIWFkZFRhc2tGb3JtLmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICBhZGRUYXNrTW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgIHRhc2tNb2RhbE9wZW4gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGJ1dHRvbnNDb250YWluZXIuYXBwZW5kQ2hpbGQoZWRpdEJ1dHRvbik7XG5cbiAgICAgIGNvbnN0IG1vdmVUb1Byb2plY3REaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgbW92ZVRvUHJvamVjdERpdi5jbGFzc0xpc3QuYWRkKFwibW92ZS10by1wcm9qZWN0XCIpO1xuXG4gICAgICBjb25zdCBtb3ZlVG9Qcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIG1vdmVUb1Byb2plY3RCdXR0b24uY2xhc3NMaXN0LmFkZChcInRhc2stYnV0dG9uXCIsIFwidG9vbHRpcFwiKTtcbiAgICAgIG1vdmVUb1Byb2plY3RCdXR0b24uaW5uZXJUZXh0ID0gXCJcIjtcbiAgICAgIG1vdmVUb1Byb2plY3RCdXR0b24udGl0bGUgPSBcIk1vdmUgVG8gUHJvamVjdFwiO1xuXG4gICAgICBjb25zdCBtb3ZlVG9Qcm9qZWN0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICBtb3ZlVG9Qcm9qZWN0SWNvbi5jbGFzc0xpc3QuYWRkKFwidGFzay1pY29uXCIpO1xuICAgICAgbW92ZVRvUHJvamVjdEljb24uc3JjID0gXCJpY29ucy9hcnJvdy1yaWdodC1jaXJjbGUuc3ZnXCI7XG4gICAgICBtb3ZlVG9Qcm9qZWN0SWNvbi5hbHQgPSBcIk1vdmUgVG8gUHJvamVjdCBJY29uXCI7XG5cbiAgICAgIG1vdmVUb1Byb2plY3RCdXR0b24uYXBwZW5kQ2hpbGQobW92ZVRvUHJvamVjdEljb24pO1xuXG4gICAgICBjb25zdCBtb3ZlVG9Qcm9qZWN0VG9vbHRpcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgbW92ZVRvUHJvamVjdFRvb2x0aXAuY2xhc3NMaXN0LmFkZChcInRvb2x0aXB0ZXh0XCIsIFwiYm90dG9tLXRvb2x0aXBcIik7XG4gICAgICBtb3ZlVG9Qcm9qZWN0VG9vbHRpcC5pbm5lclRleHQgPSBcIk1vdmUgVG8gUHJvamVjdFwiO1xuXG4gICAgICBtb3ZlVG9Qcm9qZWN0QnV0dG9uLmFwcGVuZENoaWxkKG1vdmVUb1Byb2plY3RUb29sdGlwKTtcblxuICAgICAgbGV0IHByb2plY3RMaXN0O1xuXG4gICAgICBtb3ZlVG9Qcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGlmICghcHJvamVjdExpc3QpIHtcbiAgICAgICAgICBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcbiAgICAgICAgICBwcm9qZWN0TGlzdC5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1saXN0XCIpO1xuXG4gICAgICAgICAgcHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdExpc3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgICAgICAgcHJvamVjdExpc3RJdGVtLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LWxpc3QtaXRlbVwiKTtcbiAgICAgICAgICAgIHByb2plY3RMaXN0SXRlbS5pbm5lclRleHQgPSBwcm9qZWN0O1xuICAgICAgICAgICAgcHJvamVjdExpc3RJdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAgIHRhc2sucHJvamVjdCA9IHByb2plY3Q7XG4gICAgICAgICAgICAgIGRpc3BsYXlBbGxUYXNrcygpO1xuICAgICAgICAgICAgICBwcm9qZWN0TGlzdC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHByb2plY3RMaXN0LmFwcGVuZENoaWxkKHByb2plY3RMaXN0SXRlbSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBwcm9qZWN0TGlzdC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgIG1vdmVUb1Byb2plY3REaXYuYXBwZW5kQ2hpbGQocHJvamVjdExpc3QpO1xuXG4gICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFtb3ZlVG9Qcm9qZWN0RGl2LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgICAgcHJvamVjdExpc3Quc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByb2plY3RMaXN0LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBtb3ZlVG9Qcm9qZWN0RGl2LmFwcGVuZENoaWxkKG1vdmVUb1Byb2plY3RCdXR0b24pO1xuICAgICAgYnV0dG9uc0NvbnRhaW5lci5hcHBlbmRDaGlsZChtb3ZlVG9Qcm9qZWN0RGl2KTtcblxuICAgICAgY29uc3QgZGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIGRlbGV0ZUJ1dHRvbi5pbm5lclRleHQgPSBcIlwiO1xuICAgICAgZGVsZXRlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWJ1dHRvblwiLCBcInRvb2x0aXBcIik7XG4gICAgICBkZWxldGVCdXR0b24udGl0bGUgPSBcIkRlbGV0ZVwiO1xuICAgICAgZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGRlbGV0ZVRhc2sodGFzay5pZCk7XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgZGVsZXRlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICBkZWxldGVJY29uLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWljb25cIik7XG4gICAgICBkZWxldGVJY29uLnNyYyA9IFwiaWNvbnMvdHJhc2gtMi5zdmdcIjtcbiAgICAgIGRlbGV0ZUljb24uYWx0ID0gXCJEZWxldGUgSWNvblwiO1xuXG4gICAgICBkZWxldGVCdXR0b24uYXBwZW5kQ2hpbGQoZGVsZXRlSWNvbik7XG5cbiAgICAgIGNvbnN0IGRlbGV0ZVRvb2x0aXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgIGRlbGV0ZVRvb2x0aXAuY2xhc3NMaXN0LmFkZChcInRvb2x0aXB0ZXh0XCIsIFwiYm90dG9tLXRvb2x0aXBcIik7XG4gICAgICBkZWxldGVUb29sdGlwLmlubmVyVGV4dCA9IFwiRGVsZXRlXCI7XG5cbiAgICAgIGRlbGV0ZUJ1dHRvbi5hcHBlbmRDaGlsZChkZWxldGVUb29sdGlwKTtcblxuICAgICAgYnV0dG9uc0NvbnRhaW5lci5hcHBlbmRDaGlsZChkZWxldGVCdXR0b24pO1xuXG4gICAgICB0YXNrRGl2LmFwcGVuZENoaWxkKGJ1dHRvbnNDb250YWluZXIpO1xuXG4gICAgICBpZiAodGFzay5jb21wbGV0ZSkge1xuICAgICAgICBjb21wbGV0ZWRUYXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tEaXYpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrRGl2KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICB0YXNrc0hlYWRpbmcuaW5uZXJUZXh0ID0gc2VsZWN0ZWRQcm9qZWN0O1xuXG4gIC8vaW5mby5pbm5lclRleHQgPSBKU09OLnN0cmluZ2lmeSh0YXNrcyk7XG59XG5cbi8vIERlbGV0ZSB0YXNrIGZ1bmN0aW9uXG5mdW5jdGlvbiBkZWxldGVUYXNrKGlkKSB7XG4gIHRhc2tzID0gdGFza3MuZmlsdGVyKCh0YXNrKSA9PiB0YXNrLmlkICE9PSBpZCk7XG4gIGRpc3BsYXlBbGxUYXNrcygpO1xufVxuXG4vL0FkZCBhIG5ldyB0YXNrIG9iamVjdFxuZnVuY3Rpb24gYWRkVGFzayh0YXNrcykge1xuICBsZXQgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stdGl0bGVcIikudmFsdWU7XG4gIGxldCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1kZXNjXCIpLnZhbHVlO1xuICBsZXQgZHVlRGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHVlLWRhdGVcIikudmFsdWU7XG4gIGxldCBwcmlvcml0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJpb3JpdHlcIikudmFsdWU7XG4gIGxldCBwcm9qZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0XCIpLnZhbHVlO1xuXG4gIGlmICghZWRpdGluZ1Rhc2spIHtcbiAgICBjb25zdCBpZCA9XG4gICAgICB0YXNrcy5sZW5ndGggPiAwID8gTWF0aC5tYXgoLi4udGFza3MubWFwKCh0YXNrKSA9PiB0YXNrLmlkKSkgKyAxIDogMTsgLy9HaXZlIHRoZSB0YXNrIGEgdW5pcXVlIElEXG4gICAgY29uc3QgbmV3VGFzayA9IGNyZWF0ZVRhc2soXG4gICAgICBpZCxcbiAgICAgIHRpdGxlLFxuICAgICAgZGVzY3JpcHRpb24sXG4gICAgICBkdWVEYXRlLFxuICAgICAgcHJpb3JpdHksXG4gICAgICBwcm9qZWN0XG4gICAgKTtcbiAgICB0YXNrcy5wdXNoKG5ld1Rhc2spO1xuICB9IGVsc2Uge1xuICAgIHRhc2tzLmZvckVhY2goKHRhc2spID0+IHtcbiAgICAgIGlmICh0YXNrLmlkID09PSBlZGl0VGFza0lkKSB7XG4gICAgICAgIHRhc2sudGl0bGUgPSB0aXRsZTtcbiAgICAgICAgdGFzay5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgICB0YXNrLmR1ZURhdGUgPSBkdWVEYXRlO1xuICAgICAgICB0YXNrLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgICAgIHRhc2sucHJvamVjdCA9IHByb2plY3Q7XG4gICAgICB9XG4gICAgfSk7XG4gICAgZWRpdGluZ1Rhc2sgPSBmYWxzZTtcbiAgfVxuICBkaXNwbGF5QWxsVGFza3MoKTtcbiAgY29uc29sZS5sb2codGFza3MpO1xuXG4gIC8vIEhpZGUgdGhlIG1vZGFsXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLXRhc2stbW9kYWxcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAvLyBSZXNldCBmb3JtXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLXRhc2stZm9ybVwiKS5yZXNldCgpO1xufVxuXG4vL0NhbGwgYWRkVGFzayBmdW5jdGlvbiB3aGVuIGZvcm0gaXMgc3VibWl0dGVkXG5hZGRUYXNrRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldmVudCkgPT4ge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICBhZGRUYXNrKHRhc2tzKTtcbn0pO1xuXG5sZXQgcHJvamVjdE1vZGFsT3BlbiA9IGZhbHNlO1xuXG4vLyBTaG93IHRoZSBtb2RhbCB3aGVuIHRoZSAnTmV3IFByb2plY3QnIGJ1dHRvbiBpcyBjbGlja2VkXG5hZGRQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGFkZFByb2plY3RNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gIHByb2plY3RNb2RhbE9wZW4gPSB0cnVlO1xufSk7XG5cbi8vIEhpZGUgdGhlIG1vZGFsIHdoZW4gdGhlIHVzZXIgY2xpY2tzIG91dHNpZGUgb2YgYWRkUHJvamVjdEZvcm1cbmFkZFByb2plY3RNb2RhbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gIGlmIChwcm9qZWN0TW9kYWxPcGVuICYmICFhZGRQcm9qZWN0Rm9ybS5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgYWRkUHJvamVjdE1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBwcm9qZWN0TW9kYWxPcGVuID0gZmFsc2U7XG4gIH1cbn0pO1xuXG4vLyBBZGQgdGhlIHByb2plY3QgdG8gdGhlIHByb2plY3RzIGFycmF5IGFuZCB1cGRhdGUgdGhlIHByb2plY3RzIGxpc3QgaW4gdGhlIERPTVxuYWRkUHJvamVjdEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZlbnQpID0+IHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgYWRkUHJvamVjdCgpO1xufSk7XG5cbmZ1bmN0aW9uIGFkZFByb2plY3QoKSB7XG4gIC8vIEdldCB0aGUgcHJvamVjdCBuYW1lIGZyb20gdGhlIGlucHV0XG4gIGNvbnN0IHByb2plY3ROYW1lID0gcHJvamVjdE5hbWVJbnB1dC52YWx1ZTtcblxuICAvLyBBZGQgdGhlIHByb2plY3QgbmFtZSB0byB0aGUgcHJvamVjdHMgYXJyYXkgaWYgbm90IGJsYW5rXG5cbiAgaWYgKHByb2plY3ROYW1lKSB7XG4gICAgcHJvamVjdHMucHVzaChwcm9qZWN0TmFtZSk7XG4gIH1cblxuICAvLyBVcGRhdGUgdGhlIHByb2plY3RzIGxpc3QgaW4gdGhlIERPTVxuICBwcm9qZWN0c0NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICBwcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgY29uc3QgcHJvamVjdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHByb2plY3RJdGVtLmlubmVyVGV4dCA9IHByb2plY3Q7XG4gICAgcHJvamVjdEl0ZW0uY2xhc3NMaXN0LmFkZChcInByb2plY3QtaXRlbVwiKTtcbiAgICBwcm9qZWN0SXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgc2VsZWN0ZWRQcm9qZWN0ID0gcHJvamVjdDtcbiAgICAgIGNvbnNvbGUubG9nKHNlbGVjdGVkUHJvamVjdCk7XG5cbiAgICAgIGRpc3BsYXlBbGxUYXNrcygpO1xuICAgICAgLy9pbmZvLmlubmVyVGV4dCA9IEpTT04uc3RyaW5naWZ5KHRhc2tzKTtcbiAgICB9KTtcbiAgICBwcm9qZWN0c0NvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0SXRlbSk7XG4gIH0pO1xuICBjb25zb2xlLmxvZyhzZWxlY3RlZFByb2plY3QpO1xuXG4gIC8vIFJlc2V0IHRoZSBmb3JtXG4gIGFkZFByb2plY3RGb3JtLnJlc2V0KCk7XG5cbiAgLy8gSGlkZSB0aGUgbW9kYWxcbiAgYWRkUHJvamVjdE1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblxuICBjb25zb2xlLmxvZyhwcm9qZWN0cyk7XG4gIHVwZGF0ZU9wdGlvbnMoKTtcblxuICAvL2luZm8uaW5uZXJUZXh0ID0gSlNPTi5zdHJpbmdpZnkodGFza3MpO1xufVxuXG4vLyBVcGRhdGUgc2VsZWN0IGRyb3Bkb3duIHdpdGggbGlzdCBvZiBwcm9qZWN0c1xuZnVuY3Rpb24gdXBkYXRlT3B0aW9ucygpIHtcbiAgcHJvamVjdFNlbGVjdC5pbm5lckhUTUwgPSBcIlwiO1xuICBwcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgbGV0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgb3B0aW9uLnZhbHVlID0gcHJvamVjdDtcbiAgICBvcHRpb24uaW5uZXJUZXh0ID0gcHJvamVjdDtcbiAgICBwcm9qZWN0U2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbik7XG4gIH0pO1xufVxuXG5kaXNwbGF5QWxsVGFza3MoKTtcbmFkZFByb2plY3QoKTtcbnVwZGF0ZU9wdGlvbnMoKTtcbi8vaW5mby5pbm5lclRleHQgPSBKU09OLnN0cmluZ2lmeSh0YXNrcyk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=