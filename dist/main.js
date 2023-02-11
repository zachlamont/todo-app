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

      const editButton = document.createElement("button");
      editButton.innerText = "Edit";
      editButton.classList.add("edit-button");
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
      taskDiv.appendChild(editButton);

      const moveToProjectDiv = document.createElement("div");
      moveToProjectDiv.classList.add("move-to-project");

      const moveToProjectIcon = document.createElement("button");
      moveToProjectIcon.classList.add("move-to-project-button");
      moveToProjectIcon.innerText = "Move To Project";

      let projectList;

      moveToProjectIcon.addEventListener("click", () => {
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

      moveToProjectDiv.appendChild(moveToProjectIcon);
      taskDiv.appendChild(moveToProjectDiv);

      const deleteButton = document.createElement("button");
      deleteButton.innerText = "Delete";
      deleteButton.classList.add("delete-button");
      deleteButton.addEventListener("click", () => {
        deleteTask(task.id);
      });
      taskDiv.appendChild(deleteButton);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxXQUFXOztBQUVYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsVUFBVTtBQUNWO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNEVBQTRFO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy9BcnJheSBvZiB0YXNrIG9iamVjdHNcbmxldCB0YXNrcyA9IFtcbiAge1xuICAgIGlkOiAxLFxuICAgIHRpdGxlOiBcIldhbGsgdGhlIGRvZ1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlRha2UgQm9ubyBmb3IgYSAxMCBtaW51dGUgd2Fsa1wiLFxuICAgIGR1ZURhdGU6IFwiMjAyMy0wMi0wN1wiLFxuICAgIHByaW9yaXR5OiBcImxvd1wiLFxuICAgIHByb2plY3Q6IFwi8J+TnSBNeSBUYXNrc1wiLFxuICAgIGNvbXBsZXRlOiBmYWxzZSxcbiAgfSxcbiAge1xuICAgIGlkOiAyLFxuICAgIHRpdGxlOiBcIlByYWN0aWNlIGd1aXRhclwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkxlYXJuIHRoZSBDQUdFRCBtZXRob2RcIixcbiAgICBkdWVEYXRlOiBcIjIwMjMtMDItMTFcIixcbiAgICBwcmlvcml0eTogXCJsb3dcIixcbiAgICBwcm9qZWN0OiBcIvCfk50gTXkgVGFza3NcIixcbiAgICBjb21wbGV0ZTogZmFsc2UsXG4gIH0sXG4gIHtcbiAgICBpZDogMyxcbiAgICB0aXRsZTogXCJQYXkgZWxlY3RyaWNpdHkgYmlsbFwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlBheSBiaWxsIG9ubGluZVwiLFxuICAgIGR1ZURhdGU6IFwiMjAyMy0wMi0yNVwiLFxuICAgIHByaW9yaXR5OiBcIm1lZGl1bVwiLFxuICAgIHByb2plY3Q6IFwi8J+TnSBNeSBUYXNrc1wiLFxuICAgIGNvbXBsZXRlOiBmYWxzZSxcbiAgfSxcbl07XG5cbi8vIEFycmF5IG9mIFByb2plY3RzXG5sZXQgcHJvamVjdHMgPSBbXCLwn5OdIE15IFRhc2tzXCJdO1xubGV0IHNlbGVjdGVkUHJvamVjdCA9IFwi8J+TnSBNeSBUYXNrc1wiO1xuXG5sZXQgZWRpdGluZ1Rhc2sgPSBmYWxzZTtcbmxldCBlZGl0VGFza0lkO1xuXG4vL1RvZ2dsZSBzaWRlYmFyIGRpc3BsYXlcbmNvbnN0IG1lbnVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1lbnUtYnRuXCIpO1xuY29uc3QgbWFpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpblwiKTtcbmNvbnN0IGFkZFRhc2tCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC10YXNrLWJ0blwiKTtcbmNvbnN0IGFkZFRhc2tNb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLXRhc2stbW9kYWxcIik7XG5jb25zdCB0YXNrQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLWNvbnRhaW5lclwiKTtcbmNvbnN0IGNvbXBsZXRlZFRhc2tDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgXCJjb21wbGV0ZWQtdGFzay1jb250YWluZXJcIlxuKTtcbmNvbnN0IGFkZFRhc2tGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtdGFzay1mb3JtXCIpO1xuY29uc3QgcHJvamVjdHNNZW51ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0cy1tZW51XCIpO1xuXG5jb25zdCBhZGRQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGQtbmV3LXByb2plY3RcIik7XG5jb25zdCBhZGRQcm9qZWN0TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZC1wcm9qZWN0LW1vZGFsXCIpO1xuY29uc3QgYWRkUHJvamVjdEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZC1wcm9qZWN0LWZvcm1cIik7XG5jb25zdCBwcm9qZWN0TmFtZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0LW5hbWVcIik7XG5jb25zdCBwcm9qZWN0c0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdHMtY29udGFpbmVyXCIpO1xuY29uc3QgcHJvamVjdFNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdFwiKTtcbmNvbnN0IGluZm8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZm9cIik7XG5cbmNvbnN0IHRhc2tzSGVhZGluZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFza3MtaGVhZGluZ1wiKTtcbmNvbnN0IHN1Ym1pdFRhc2tCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN1Ym1pdC10YXNrLWJ1dHRvblwiKTtcblxuLy9Ub2dnbGUgc2lkZWJhciB2aXNpYmlsaXR5XG5tZW51QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gIG1haW4uY2xhc3NMaXN0LnRvZ2dsZShcImZvcmNlLXNob3dcIik7XG59KTtcblxuLy8gRmFjdG9yeSBmdW5jdGlvbiB0byBjcmVhdGUgdGFzayBvYmplY3RzXG5mdW5jdGlvbiBjcmVhdGVUYXNrKGlkLCB0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0KSB7XG4gIHJldHVybiB7XG4gICAgaWQsXG4gICAgdGl0bGUsXG4gICAgZGVzY3JpcHRpb24sXG4gICAgZHVlRGF0ZSxcbiAgICBwcmlvcml0eSxcbiAgICBwcm9qZWN0LFxuICAgIGNvbXBsZXRlOiBmYWxzZSxcbiAgfTtcbn1cbi8vRGlzcGxheSB0aGUgbW9kYWxcbmFkZFRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgc3VibWl0VGFza0J1dHRvbi5pbm5lclRleHQgPSBcIkFkZCBUYXNrXCI7XG5cbiAgYWRkVGFza01vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgdXBkYXRlT3B0aW9ucygpO1xufSk7XG5cbi8vRGlzcGxheSBsaXN0cyBvZiB0YXNrc1xuZnVuY3Rpb24gZGlzcGxheUFsbFRhc2tzKCkge1xuICB0YXNrQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gIGNvbXBsZXRlZFRhc2tDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcblxuICB0YXNrc1xuICAgIC5maWx0ZXIoKHRhc2spID0+IHRhc2sucHJvamVjdCA9PT0gc2VsZWN0ZWRQcm9qZWN0KVxuICAgIC5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgICBjb25zdCB0YXNrRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHRhc2tEaXYuY2xhc3NMaXN0LmFkZChcInRhc2tcIik7XG5cbiAgICAgIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgY2hlY2tib3guc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImNoZWNrYm94XCIpO1xuICAgICAgY2hlY2tib3guY2hlY2tlZCA9IHRhc2suY29tcGxldGU7IC8vIENoZWNrL3VuY2hlY2sgdGhlIGNoZWNrYm94IGJhc2VkIG9uIHRoZSB2YWx1ZSBvZiBgdGFzay5jb21wbGV0ZWBcbiAgICAgIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIHRhc2suY29tcGxldGUgPSAhdGFzay5jb21wbGV0ZTtcbiAgICAgICAgZGlzcGxheUFsbFRhc2tzKCk7XG4gICAgICB9KTtcbiAgICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQoY2hlY2tib3gpO1xuXG4gICAgICBjb25zdCB0aXRsZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICB0aXRsZURpdi5pbm5lclRleHQgPSB0YXNrLnRpdGxlO1xuICAgICAgdGl0bGVEaXYuY2xhc3NMaXN0LmFkZChcInRhc2stdGl0bGVcIik7XG4gICAgICB0YXNrRGl2LmFwcGVuZENoaWxkKHRpdGxlRGl2KTtcblxuICAgICAgY29uc3QgZWRpdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICBlZGl0QnV0dG9uLmlubmVyVGV4dCA9IFwiRWRpdFwiO1xuICAgICAgZWRpdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZWRpdC1idXR0b25cIik7XG4gICAgICBlZGl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIHN1Ym1pdFRhc2tCdXR0b24uaW5uZXJUZXh0ID0gXCJFZGl0IFRhc2tcIjtcblxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC10YXNrLW1vZGFsXCIpLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICAgICAgZWRpdGluZ1Rhc2sgPSB0cnVlO1xuICAgICAgICBlZGl0VGFza0lkID0gdGFzay5pZDtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLXRpdGxlXCIpLnZhbHVlID0gdGFzay50aXRsZTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLWRlc2NcIikudmFsdWUgPSB0YXNrLmRlc2NyaXB0aW9uO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1ZS1kYXRlXCIpLnZhbHVlID0gdGFzay5kdWVEYXRlO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByaW9yaXR5XCIpLnZhbHVlID0gdGFzay5wcmlvcml0eTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0XCIpLnZhbHVlID0gdGFzay5wcm9qZWN0O1xuICAgICAgfSk7XG4gICAgICB0YXNrRGl2LmFwcGVuZENoaWxkKGVkaXRCdXR0b24pO1xuXG4gICAgICBjb25zdCBtb3ZlVG9Qcm9qZWN0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIG1vdmVUb1Byb2plY3REaXYuY2xhc3NMaXN0LmFkZChcIm1vdmUtdG8tcHJvamVjdFwiKTtcblxuICAgICAgY29uc3QgbW92ZVRvUHJvamVjdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgbW92ZVRvUHJvamVjdEljb24uY2xhc3NMaXN0LmFkZChcIm1vdmUtdG8tcHJvamVjdC1idXR0b25cIik7XG4gICAgICBtb3ZlVG9Qcm9qZWN0SWNvbi5pbm5lclRleHQgPSBcIk1vdmUgVG8gUHJvamVjdFwiO1xuXG4gICAgICBsZXQgcHJvamVjdExpc3Q7XG5cbiAgICAgIG1vdmVUb1Byb2plY3RJY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGlmICghcHJvamVjdExpc3QpIHtcbiAgICAgICAgICBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcbiAgICAgICAgICBwcm9qZWN0TGlzdC5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1saXN0XCIpO1xuXG4gICAgICAgICAgcHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdExpc3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgICAgICAgcHJvamVjdExpc3RJdGVtLmlubmVyVGV4dCA9IHByb2plY3Q7XG4gICAgICAgICAgICBwcm9qZWN0TGlzdEl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgdGFzay5wcm9qZWN0ID0gcHJvamVjdDtcbiAgICAgICAgICAgICAgZGlzcGxheUFsbFRhc2tzKCk7XG4gICAgICAgICAgICAgIHByb2plY3RMaXN0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcHJvamVjdExpc3QuYXBwZW5kQ2hpbGQocHJvamVjdExpc3RJdGVtKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHByb2plY3RMaXN0LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgbW92ZVRvUHJvamVjdERpdi5hcHBlbmRDaGlsZChwcm9qZWN0TGlzdCk7XG5cbiAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoIW1vdmVUb1Byb2plY3REaXYuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgICBwcm9qZWN0TGlzdC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJvamVjdExpc3Quc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIG1vdmVUb1Byb2plY3REaXYuYXBwZW5kQ2hpbGQobW92ZVRvUHJvamVjdEljb24pO1xuICAgICAgdGFza0Rpdi5hcHBlbmRDaGlsZChtb3ZlVG9Qcm9qZWN0RGl2KTtcblxuICAgICAgY29uc3QgZGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIGRlbGV0ZUJ1dHRvbi5pbm5lclRleHQgPSBcIkRlbGV0ZVwiO1xuICAgICAgZGVsZXRlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJkZWxldGUtYnV0dG9uXCIpO1xuICAgICAgZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGRlbGV0ZVRhc2sodGFzay5pZCk7XG4gICAgICB9KTtcbiAgICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQoZGVsZXRlQnV0dG9uKTtcblxuICAgICAgaWYgKHRhc2suY29tcGxldGUpIHtcbiAgICAgICAgY29tcGxldGVkVGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrRGl2KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQodGFza0Rpdik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgdGFza3NIZWFkaW5nLmlubmVyVGV4dCA9IHNlbGVjdGVkUHJvamVjdDtcblxuICAvL2luZm8uaW5uZXJUZXh0ID0gSlNPTi5zdHJpbmdpZnkodGFza3MpO1xufVxuXG4vLyBEZWxldGUgdGFzayBmdW5jdGlvblxuZnVuY3Rpb24gZGVsZXRlVGFzayhpZCkge1xuICB0YXNrcyA9IHRhc2tzLmZpbHRlcigodGFzaykgPT4gdGFzay5pZCAhPT0gaWQpO1xuICBkaXNwbGF5QWxsVGFza3MoKTtcbn1cblxuLy9BZGQgYSBuZXcgdGFzayBvYmplY3RcbmZ1bmN0aW9uIGFkZFRhc2sodGFza3MpIHtcbiAgbGV0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLXRpdGxlXCIpLnZhbHVlO1xuICBsZXQgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stZGVzY1wiKS52YWx1ZTtcbiAgbGV0IGR1ZURhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1ZS1kYXRlXCIpLnZhbHVlO1xuICBsZXQgcHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByaW9yaXR5XCIpLnZhbHVlO1xuICBsZXQgcHJvamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdFwiKS52YWx1ZTtcblxuICBpZiAoIWVkaXRpbmdUYXNrKSB7XG4gICAgY29uc3QgaWQgPVxuICAgICAgdGFza3MubGVuZ3RoID4gMCA/IE1hdGgubWF4KC4uLnRhc2tzLm1hcCgodGFzaykgPT4gdGFzay5pZCkpICsgMSA6IDE7IC8vR2l2ZSB0aGUgdGFzayBhIHVuaXF1ZSBJRFxuICAgIGNvbnN0IG5ld1Rhc2sgPSBjcmVhdGVUYXNrKFxuICAgICAgaWQsXG4gICAgICB0aXRsZSxcbiAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgZHVlRGF0ZSxcbiAgICAgIHByaW9yaXR5LFxuICAgICAgcHJvamVjdFxuICAgICk7XG4gICAgdGFza3MucHVzaChuZXdUYXNrKTtcbiAgfSBlbHNlIHtcbiAgICB0YXNrcy5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgICBpZiAodGFzay5pZCA9PT0gZWRpdFRhc2tJZCkge1xuICAgICAgICB0YXNrLnRpdGxlID0gdGl0bGU7XG4gICAgICAgIHRhc2suZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgICAgdGFzay5kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICAgICAgdGFzay5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgICAgICB0YXNrLnByb2plY3QgPSBwcm9qZWN0O1xuICAgICAgfVxuICAgIH0pO1xuICAgIGVkaXRpbmdUYXNrID0gZmFsc2U7XG4gIH1cbiAgZGlzcGxheUFsbFRhc2tzKCk7XG4gIGNvbnNvbGUubG9nKHRhc2tzKTtcblxuICAvLyBIaWRlIHRoZSBtb2RhbFxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC10YXNrLW1vZGFsXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgLy8gUmVzZXQgZm9ybVxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC10YXNrLWZvcm1cIikucmVzZXQoKTtcbn1cblxuLy9DYWxsIGFkZFRhc2sgZnVuY3Rpb24gd2hlbiBmb3JtIGlzIHN1Ym1pdHRlZFxuYWRkVGFza0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZlbnQpID0+IHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgYWRkVGFzayh0YXNrcyk7XG59KTtcblxuLy8gU2hvdyB0aGUgbW9kYWwgd2hlbiB0aGUgJ05ldyBQcm9qZWN0JyBidXR0b24gaXMgY2xpY2tlZFxuYWRkUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBhZGRQcm9qZWN0TW9kYWwuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xufSk7XG5cbi8vIEFkZCB0aGUgcHJvamVjdCB0byB0aGUgcHJvamVjdHMgYXJyYXkgYW5kIHVwZGF0ZSB0aGUgcHJvamVjdHMgbGlzdCBpbiB0aGUgRE9NXG5hZGRQcm9qZWN0Rm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldmVudCkgPT4ge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICBhZGRQcm9qZWN0KCk7XG59KTtcblxuZnVuY3Rpb24gYWRkUHJvamVjdCgpIHtcbiAgLy8gR2V0IHRoZSBwcm9qZWN0IG5hbWUgZnJvbSB0aGUgaW5wdXRcbiAgY29uc3QgcHJvamVjdE5hbWUgPSBwcm9qZWN0TmFtZUlucHV0LnZhbHVlO1xuXG4gIC8vIEFkZCB0aGUgcHJvamVjdCBuYW1lIHRvIHRoZSBwcm9qZWN0cyBhcnJheSBpZiBub3QgYmxhbmtcblxuICBpZiAocHJvamVjdE5hbWUpIHtcbiAgICBwcm9qZWN0cy5wdXNoKHByb2plY3ROYW1lKTtcbiAgfVxuXG4gIC8vIFVwZGF0ZSB0aGUgcHJvamVjdHMgbGlzdCBpbiB0aGUgRE9NXG4gIHByb2plY3RzQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gIHByb2plY3RzLmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcHJvamVjdEl0ZW0uaW5uZXJUZXh0ID0gcHJvamVjdDtcbiAgICBwcm9qZWN0SXRlbS5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1pdGVtXCIpO1xuICAgIHByb2plY3RJdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBzZWxlY3RlZFByb2plY3QgPSBwcm9qZWN0O1xuICAgICAgY29uc29sZS5sb2coc2VsZWN0ZWRQcm9qZWN0KTtcblxuICAgICAgZGlzcGxheUFsbFRhc2tzKCk7XG4gICAgICAvL2luZm8uaW5uZXJUZXh0ID0gSlNPTi5zdHJpbmdpZnkodGFza3MpO1xuICAgIH0pO1xuICAgIHByb2plY3RzQ29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3RJdGVtKTtcbiAgfSk7XG4gIGNvbnNvbGUubG9nKHNlbGVjdGVkUHJvamVjdCk7XG5cbiAgLy8gUmVzZXQgdGhlIGZvcm1cbiAgYWRkUHJvamVjdEZvcm0ucmVzZXQoKTtcblxuICAvLyBIaWRlIHRoZSBtb2RhbFxuICBhZGRQcm9qZWN0TW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXG4gIGNvbnNvbGUubG9nKHByb2plY3RzKTtcbiAgdXBkYXRlT3B0aW9ucygpO1xuXG4gIC8vaW5mby5pbm5lclRleHQgPSBKU09OLnN0cmluZ2lmeSh0YXNrcyk7XG59XG5cbi8vIFVwZGF0ZSBzZWxlY3QgZHJvcGRvd24gd2l0aCBsaXN0IG9mIHByb2plY3RzXG5mdW5jdGlvbiB1cGRhdGVPcHRpb25zKCkge1xuICBwcm9qZWN0U2VsZWN0LmlubmVySFRNTCA9IFwiXCI7XG4gIHByb2plY3RzLmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICBsZXQgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICBvcHRpb24udmFsdWUgPSBwcm9qZWN0O1xuICAgIG9wdGlvbi5pbm5lclRleHQgPSBwcm9qZWN0O1xuICAgIHByb2plY3RTZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcbiAgfSk7XG59XG5cbmRpc3BsYXlBbGxUYXNrcygpO1xuYWRkUHJvamVjdCgpO1xudXBkYXRlT3B0aW9ucygpO1xuLy9pbmZvLmlubmVyVGV4dCA9IEpTT04uc3RyaW5naWZ5KHRhc2tzKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==