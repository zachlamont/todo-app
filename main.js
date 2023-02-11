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

  info.innerText = JSON.stringify(tasks);
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
      info.innerText = JSON.stringify(tasks);
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

  info.innerText = JSON.stringify(tasks);
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
info.innerText = JSON.stringify(tasks);

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRFQUE0RTtBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vQXJyYXkgb2YgdGFzayBvYmplY3RzXG5sZXQgdGFza3MgPSBbXG4gIHtcbiAgICBpZDogMSxcbiAgICB0aXRsZTogXCJXYWxrIHRoZSBkb2dcIixcbiAgICBkZXNjcmlwdGlvbjogXCJUYWtlIEJvbm8gZm9yIGEgMTAgbWludXRlIHdhbGtcIixcbiAgICBkdWVEYXRlOiBcIjIwMjMtMDItMDdcIixcbiAgICBwcmlvcml0eTogXCJsb3dcIixcbiAgICBwcm9qZWN0OiBcIvCfk50gTXkgVGFza3NcIixcbiAgICBjb21wbGV0ZTogZmFsc2UsXG4gIH0sXG4gIHtcbiAgICBpZDogMixcbiAgICB0aXRsZTogXCJQcmFjdGljZSBndWl0YXJcIixcbiAgICBkZXNjcmlwdGlvbjogXCJMZWFybiB0aGUgQ0FHRUQgbWV0aG9kXCIsXG4gICAgZHVlRGF0ZTogXCIyMDIzLTAyLTExXCIsXG4gICAgcHJpb3JpdHk6IFwibG93XCIsXG4gICAgcHJvamVjdDogXCLwn5OdIE15IFRhc2tzXCIsXG4gICAgY29tcGxldGU6IGZhbHNlLFxuICB9LFxuICB7XG4gICAgaWQ6IDMsXG4gICAgdGl0bGU6IFwiUGF5IGVsZWN0cmljaXR5IGJpbGxcIixcbiAgICBkZXNjcmlwdGlvbjogXCJQYXkgYmlsbCBvbmxpbmVcIixcbiAgICBkdWVEYXRlOiBcIjIwMjMtMDItMjVcIixcbiAgICBwcmlvcml0eTogXCJtZWRpdW1cIixcbiAgICBwcm9qZWN0OiBcIvCfk50gTXkgVGFza3NcIixcbiAgICBjb21wbGV0ZTogZmFsc2UsXG4gIH0sXG5dO1xuXG4vLyBBcnJheSBvZiBQcm9qZWN0c1xubGV0IHByb2plY3RzID0gW1wi8J+TnSBNeSBUYXNrc1wiXTtcbmxldCBzZWxlY3RlZFByb2plY3QgPSBcIvCfk50gTXkgVGFza3NcIjtcblxubGV0IGVkaXRpbmdUYXNrID0gZmFsc2U7XG5sZXQgZWRpdFRhc2tJZDtcblxuLy9Ub2dnbGUgc2lkZWJhciBkaXNwbGF5XG5jb25zdCBtZW51QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZW51LWJ0blwiKTtcbmNvbnN0IG1haW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1haW5cIik7XG5jb25zdCBhZGRUYXNrQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtdGFzay1idG5cIik7XG5jb25zdCBhZGRUYXNrTW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC10YXNrLW1vZGFsXCIpO1xuY29uc3QgdGFza0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1jb250YWluZXJcIik7XG5jb25zdCBjb21wbGV0ZWRUYXNrQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gIFwiY29tcGxldGVkLXRhc2stY29udGFpbmVyXCJcbik7XG5jb25zdCBhZGRUYXNrRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLXRhc2stZm9ybVwiKTtcbmNvbnN0IHByb2plY3RzTWVudSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdHMtbWVudVwiKTtcblxuY29uc3QgYWRkUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkLW5ldy1wcm9qZWN0XCIpO1xuY29uc3QgYWRkUHJvamVjdE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGQtcHJvamVjdC1tb2RhbFwiKTtcbmNvbnN0IGFkZFByb2plY3RGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGQtcHJvamVjdC1mb3JtXCIpO1xuY29uc3QgcHJvamVjdE5hbWVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdC1uYW1lXCIpO1xuY29uc3QgcHJvamVjdHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3RzLWNvbnRhaW5lclwiKTtcbmNvbnN0IHByb2plY3RTZWxlY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3RcIik7XG5jb25zdCBpbmZvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvXCIpO1xuXG5jb25zdCB0YXNrc0hlYWRpbmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2tzLWhlYWRpbmdcIik7XG5jb25zdCBzdWJtaXRUYXNrQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdWJtaXQtdGFzay1idXR0b25cIik7XG5cbi8vVG9nZ2xlIHNpZGViYXIgdmlzaWJpbGl0eVxubWVudUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICBtYWluLmNsYXNzTGlzdC50b2dnbGUoXCJmb3JjZS1zaG93XCIpO1xufSk7XG5cbi8vIEZhY3RvcnkgZnVuY3Rpb24gdG8gY3JlYXRlIHRhc2sgb2JqZWN0c1xuZnVuY3Rpb24gY3JlYXRlVGFzayhpZCwgdGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCkge1xuICByZXR1cm4ge1xuICAgIGlkLFxuICAgIHRpdGxlLFxuICAgIGRlc2NyaXB0aW9uLFxuICAgIGR1ZURhdGUsXG4gICAgcHJpb3JpdHksXG4gICAgcHJvamVjdCxcbiAgICBjb21wbGV0ZTogZmFsc2UsXG4gIH07XG59XG4vL0Rpc3BsYXkgdGhlIG1vZGFsXG5hZGRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIHN1Ym1pdFRhc2tCdXR0b24uaW5uZXJUZXh0ID0gXCJBZGQgVGFza1wiO1xuXG4gIGFkZFRhc2tNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gIHVwZGF0ZU9wdGlvbnMoKTtcbn0pO1xuXG4vL0Rpc3BsYXkgbGlzdHMgb2YgdGFza3NcbmZ1bmN0aW9uIGRpc3BsYXlBbGxUYXNrcygpIHtcbiAgdGFza0NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICBjb21wbGV0ZWRUYXNrQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgdGFza3NcbiAgICAuZmlsdGVyKCh0YXNrKSA9PiB0YXNrLnByb2plY3QgPT09IHNlbGVjdGVkUHJvamVjdClcbiAgICAuZm9yRWFjaCgodGFzaykgPT4ge1xuICAgICAgY29uc3QgdGFza0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICB0YXNrRGl2LmNsYXNzTGlzdC5hZGQoXCJ0YXNrXCIpO1xuXG4gICAgICBjb25zdCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgIGNoZWNrYm94LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJjaGVja2JveFwiKTtcbiAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSB0YXNrLmNvbXBsZXRlOyAvLyBDaGVjay91bmNoZWNrIHRoZSBjaGVja2JveCBiYXNlZCBvbiB0aGUgdmFsdWUgb2YgYHRhc2suY29tcGxldGVgXG4gICAgICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICB0YXNrLmNvbXBsZXRlID0gIXRhc2suY29tcGxldGU7XG4gICAgICAgIGRpc3BsYXlBbGxUYXNrcygpO1xuICAgICAgfSk7XG4gICAgICB0YXNrRGl2LmFwcGVuZENoaWxkKGNoZWNrYm94KTtcblxuICAgICAgY29uc3QgdGl0bGVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgdGl0bGVEaXYuaW5uZXJUZXh0ID0gdGFzay50aXRsZTtcbiAgICAgIHRpdGxlRGl2LmNsYXNzTGlzdC5hZGQoXCJ0YXNrLXRpdGxlXCIpO1xuICAgICAgdGFza0Rpdi5hcHBlbmRDaGlsZCh0aXRsZURpdik7XG5cbiAgICAgIGNvbnN0IGVkaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgZWRpdEJ1dHRvbi5pbm5lclRleHQgPSBcIkVkaXRcIjtcbiAgICAgIGVkaXRCdXR0b24uY2xhc3NMaXN0LmFkZChcImVkaXQtYnV0dG9uXCIpO1xuICAgICAgZWRpdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBzdWJtaXRUYXNrQnV0dG9uLmlubmVyVGV4dCA9IFwiRWRpdCBUYXNrXCI7XG5cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtdGFzay1tb2RhbFwiKS5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgICAgIGVkaXRpbmdUYXNrID0gdHJ1ZTtcbiAgICAgICAgZWRpdFRhc2tJZCA9IHRhc2suaWQ7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay10aXRsZVwiKS52YWx1ZSA9IHRhc2sudGl0bGU7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1kZXNjXCIpLnZhbHVlID0gdGFzay5kZXNjcmlwdGlvbjtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdWUtZGF0ZVwiKS52YWx1ZSA9IHRhc2suZHVlRGF0ZTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmlvcml0eVwiKS52YWx1ZSA9IHRhc2sucHJpb3JpdHk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdFwiKS52YWx1ZSA9IHRhc2sucHJvamVjdDtcbiAgICAgIH0pO1xuICAgICAgdGFza0Rpdi5hcHBlbmRDaGlsZChlZGl0QnV0dG9uKTtcblxuICAgICAgY29uc3QgbW92ZVRvUHJvamVjdERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBtb3ZlVG9Qcm9qZWN0RGl2LmNsYXNzTGlzdC5hZGQoXCJtb3ZlLXRvLXByb2plY3RcIik7XG5cbiAgICAgIGNvbnN0IG1vdmVUb1Byb2plY3RJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIG1vdmVUb1Byb2plY3RJY29uLmNsYXNzTGlzdC5hZGQoXCJtb3ZlLXRvLXByb2plY3QtYnV0dG9uXCIpO1xuICAgICAgbW92ZVRvUHJvamVjdEljb24uaW5uZXJUZXh0ID0gXCJNb3ZlIFRvIFByb2plY3RcIjtcbiAgICAgIFxuICAgICAgbGV0IHByb2plY3RMaXN0O1xuXG5tb3ZlVG9Qcm9qZWN0SWNvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBpZiAoIXByb2plY3RMaXN0KSB7XG4gICAgcHJvamVjdExpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XG4gICAgcHJvamVjdExpc3QuY2xhc3NMaXN0LmFkZChcInByb2plY3QtbGlzdFwiKTtcblxuICAgIHByb2plY3RzLmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICAgIGNvbnN0IHByb2plY3RMaXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICAgIHByb2plY3RMaXN0SXRlbS5pbm5lclRleHQgPSBwcm9qZWN0O1xuICAgICAgcHJvamVjdExpc3RJdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIHRhc2sucHJvamVjdCA9IHByb2plY3Q7XG4gICAgICAgIGRpc3BsYXlBbGxUYXNrcygpO1xuICAgICAgICBwcm9qZWN0TGlzdC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICB9KTtcbiAgICAgIHByb2plY3RMaXN0LmFwcGVuZENoaWxkKHByb2plY3RMaXN0SXRlbSk7XG4gICAgfSk7XG5cbiAgICBwcm9qZWN0TGlzdC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIG1vdmVUb1Byb2plY3REaXYuYXBwZW5kQ2hpbGQocHJvamVjdExpc3QpO1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgICAgaWYgKCFtb3ZlVG9Qcm9qZWN0RGl2LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgcHJvamVjdExpc3Quc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgfVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHByb2plY3RMaXN0LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gIH1cbn0pO1xuXG5tb3ZlVG9Qcm9qZWN0RGl2LmFwcGVuZENoaWxkKG1vdmVUb1Byb2plY3RJY29uKTtcbnRhc2tEaXYuYXBwZW5kQ2hpbGQobW92ZVRvUHJvamVjdERpdik7XG5cbiAgICAgIGNvbnN0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICBkZWxldGVCdXR0b24uaW5uZXJUZXh0ID0gXCJEZWxldGVcIjtcbiAgICAgIGRlbGV0ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZGVsZXRlLWJ1dHRvblwiKTtcbiAgICAgIGRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBkZWxldGVUYXNrKHRhc2suaWQpO1xuICAgICAgfSk7XG4gICAgICB0YXNrRGl2LmFwcGVuZENoaWxkKGRlbGV0ZUJ1dHRvbik7XG5cbiAgICAgIGlmICh0YXNrLmNvbXBsZXRlKSB7XG4gICAgICAgIGNvbXBsZXRlZFRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQodGFza0Rpdik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tEaXYpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gIHRhc2tzSGVhZGluZy5pbm5lclRleHQgPSBzZWxlY3RlZFByb2plY3Q7XG5cbiAgaW5mby5pbm5lclRleHQgPSBKU09OLnN0cmluZ2lmeSh0YXNrcyk7XG59XG5cbi8vIERlbGV0ZSB0YXNrIGZ1bmN0aW9uXG5mdW5jdGlvbiBkZWxldGVUYXNrKGlkKSB7XG4gIHRhc2tzID0gdGFza3MuZmlsdGVyKCh0YXNrKSA9PiB0YXNrLmlkICE9PSBpZCk7XG4gIGRpc3BsYXlBbGxUYXNrcygpO1xufVxuXG4vL0FkZCBhIG5ldyB0YXNrIG9iamVjdFxuZnVuY3Rpb24gYWRkVGFzayh0YXNrcykge1xuICBsZXQgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stdGl0bGVcIikudmFsdWU7XG4gIGxldCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1kZXNjXCIpLnZhbHVlO1xuICBsZXQgZHVlRGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHVlLWRhdGVcIikudmFsdWU7XG4gIGxldCBwcmlvcml0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJpb3JpdHlcIikudmFsdWU7XG4gIGxldCBwcm9qZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0XCIpLnZhbHVlO1xuXG4gIGlmICghZWRpdGluZ1Rhc2spIHtcbiAgICBjb25zdCBpZCA9XG4gICAgICB0YXNrcy5sZW5ndGggPiAwID8gTWF0aC5tYXgoLi4udGFza3MubWFwKCh0YXNrKSA9PiB0YXNrLmlkKSkgKyAxIDogMTsgLy9HaXZlIHRoZSB0YXNrIGEgdW5pcXVlIElEXG4gICAgY29uc3QgbmV3VGFzayA9IGNyZWF0ZVRhc2soXG4gICAgICBpZCxcbiAgICAgIHRpdGxlLFxuICAgICAgZGVzY3JpcHRpb24sXG4gICAgICBkdWVEYXRlLFxuICAgICAgcHJpb3JpdHksXG4gICAgICBwcm9qZWN0XG4gICAgKTtcbiAgICB0YXNrcy5wdXNoKG5ld1Rhc2spO1xuICB9IGVsc2Uge1xuICAgIHRhc2tzLmZvckVhY2goKHRhc2spID0+IHtcbiAgICAgIGlmICh0YXNrLmlkID09PSBlZGl0VGFza0lkKSB7XG4gICAgICAgIHRhc2sudGl0bGUgPSB0aXRsZTtcbiAgICAgICAgdGFzay5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgICB0YXNrLmR1ZURhdGUgPSBkdWVEYXRlO1xuICAgICAgICB0YXNrLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgICAgIHRhc2sucHJvamVjdCA9IHByb2plY3Q7XG4gICAgICB9XG4gICAgfSk7XG4gICAgZWRpdGluZ1Rhc2sgPSBmYWxzZTtcbiAgfVxuICBkaXNwbGF5QWxsVGFza3MoKTtcbiAgY29uc29sZS5sb2codGFza3MpO1xuXG4gIC8vIEhpZGUgdGhlIG1vZGFsXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLXRhc2stbW9kYWxcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAvLyBSZXNldCBmb3JtXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLXRhc2stZm9ybVwiKS5yZXNldCgpO1xufVxuXG4vL0NhbGwgYWRkVGFzayBmdW5jdGlvbiB3aGVuIGZvcm0gaXMgc3VibWl0dGVkXG5hZGRUYXNrRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldmVudCkgPT4ge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICBhZGRUYXNrKHRhc2tzKTtcbn0pO1xuXG4vLyBTaG93IHRoZSBtb2RhbCB3aGVuIHRoZSAnTmV3IFByb2plY3QnIGJ1dHRvbiBpcyBjbGlja2VkXG5hZGRQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGFkZFByb2plY3RNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG59KTtcblxuLy8gQWRkIHRoZSBwcm9qZWN0IHRvIHRoZSBwcm9qZWN0cyBhcnJheSBhbmQgdXBkYXRlIHRoZSBwcm9qZWN0cyBsaXN0IGluIHRoZSBET01cbmFkZFByb2plY3RGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2ZW50KSA9PiB7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIGFkZFByb2plY3QoKTtcbn0pO1xuXG5mdW5jdGlvbiBhZGRQcm9qZWN0KCkge1xuICAvLyBHZXQgdGhlIHByb2plY3QgbmFtZSBmcm9tIHRoZSBpbnB1dFxuICBjb25zdCBwcm9qZWN0TmFtZSA9IHByb2plY3ROYW1lSW5wdXQudmFsdWU7XG5cbiAgLy8gQWRkIHRoZSBwcm9qZWN0IG5hbWUgdG8gdGhlIHByb2plY3RzIGFycmF5IGlmIG5vdCBibGFua1xuXG4gIGlmIChwcm9qZWN0TmFtZSkge1xuICAgIHByb2plY3RzLnB1c2gocHJvamVjdE5hbWUpO1xuICB9XG5cbiAgLy8gVXBkYXRlIHRoZSBwcm9qZWN0cyBsaXN0IGluIHRoZSBET01cbiAgcHJvamVjdHNDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgcHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgIGNvbnN0IHByb2plY3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBwcm9qZWN0SXRlbS5pbm5lclRleHQgPSBwcm9qZWN0O1xuICAgIHByb2plY3RJdGVtLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LWl0ZW1cIik7XG4gICAgcHJvamVjdEl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIHNlbGVjdGVkUHJvamVjdCA9IHByb2plY3Q7XG4gICAgICBjb25zb2xlLmxvZyhzZWxlY3RlZFByb2plY3QpO1xuXG4gICAgICBkaXNwbGF5QWxsVGFza3MoKTtcbiAgICAgIGluZm8uaW5uZXJUZXh0ID0gSlNPTi5zdHJpbmdpZnkodGFza3MpO1xuICAgIH0pO1xuICAgIHByb2plY3RzQ29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3RJdGVtKTtcbiAgfSk7XG4gIGNvbnNvbGUubG9nKHNlbGVjdGVkUHJvamVjdCk7XG5cbiAgLy8gUmVzZXQgdGhlIGZvcm1cbiAgYWRkUHJvamVjdEZvcm0ucmVzZXQoKTtcblxuICAvLyBIaWRlIHRoZSBtb2RhbFxuICBhZGRQcm9qZWN0TW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXG4gIGNvbnNvbGUubG9nKHByb2plY3RzKTtcbiAgdXBkYXRlT3B0aW9ucygpO1xuXG4gIGluZm8uaW5uZXJUZXh0ID0gSlNPTi5zdHJpbmdpZnkodGFza3MpO1xufVxuXG4vLyBVcGRhdGUgc2VsZWN0IGRyb3Bkb3duIHdpdGggbGlzdCBvZiBwcm9qZWN0c1xuZnVuY3Rpb24gdXBkYXRlT3B0aW9ucygpIHtcbiAgcHJvamVjdFNlbGVjdC5pbm5lckhUTUwgPSBcIlwiO1xuICBwcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgbGV0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgb3B0aW9uLnZhbHVlID0gcHJvamVjdDtcbiAgICBvcHRpb24uaW5uZXJUZXh0ID0gcHJvamVjdDtcbiAgICBwcm9qZWN0U2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbik7XG4gIH0pO1xufVxuXG5kaXNwbGF5QWxsVGFza3MoKTtcbmFkZFByb2plY3QoKTtcbnVwZGF0ZU9wdGlvbnMoKTtcbmluZm8uaW5uZXJUZXh0ID0gSlNPTi5zdHJpbmdpZnkodGFza3MpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9