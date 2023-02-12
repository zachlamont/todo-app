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
