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

  // Hide the modal
  document.getElementById("add-task-modal").style.display = "none";
  // Reset form
  document.getElementById("add-task-form").reset();
}

addTaskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addTask(tasks);
});

displayTasks();
displayCompletedTasks();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy9Vc2UgJ25wbSBydW4gYnVpbGQnXG5cbmNvbnNvbGUubG9nKFwiSXQncyB3b3JraW5nIDMzM1wiKTtcblxuLy9BcnJheSBvZiB0YXNrIG9iamVjdHNcbmxldCB0YXNrcyA9IFtcbiAge1xuICAgIGlkOiAxLFxuICAgIHRpdGxlOiBcIldhbGsgdGhlIGRvZ1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlRha2UgQm9ubyBmb3IgYSAxMCBtaW51dGUgd2Fsa1wiLFxuICAgIGR1ZURhdGU6IFwiMjAyMy0wMi0wN1wiLFxuICAgIHByaW9yaXR5OiBcImxvd1wiLFxuICAgIHByb2plY3Q6IFwiRG9nIFwiLFxuICB9LFxuICB7XG4gICAgaWQ6IDIsXG4gICAgdGl0bGU6IFwiUHJhY3RpY2UgZ3VpdGFyXCIsXG4gICAgZGVzY3JpcHRpb246IFwiTGVhcm4gdGhlIENBR0VEIG1ldGhvZFwiLFxuICAgIGR1ZURhdGU6IFwiMjAyMy0wMi0xMVwiLFxuICAgIHByaW9yaXR5OiBcImxvd1wiLFxuICAgIHByb2plY3Q6IFwiTXVzaWNcIixcbiAgfSxcbiAge1xuICAgIGlkOiAzLFxuICAgIHRpdGxlOiBcIlBheSBlbGVjdHJpY2l0eSBiaWxsXCIsXG4gICAgZGVzY3JpcHRpb246IFwiUGF5IGJpbGwgb25saW5lXCIsXG4gICAgZHVlRGF0ZTogXCIyMDIzLTAyLTI1XCIsXG4gICAgcHJpb3JpdHk6IFwibWVkaXVtXCIsXG4gICAgcHJvamVjdDogXCJNb25leVwiLFxuICB9LFxuXTtcblxubGV0IGVkaXRpbmdUYXNrID0gZmFsc2U7XG5sZXQgZWRpdEluZGV4O1xuXG4vL1RvZ2dsZSBzaWRlYmFyIGRpc3BsYXlcbmNvbnN0IG1lbnVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1lbnUtYnRuXCIpO1xuY29uc3QgbWFpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpblwiKTtcbmNvbnN0IGFkZFRhc2tCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC10YXNrLWJ0blwiKTtcbmNvbnN0IGFkZFRhc2tNb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLXRhc2stbW9kYWxcIik7XG5jb25zdCB0YXNrQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLWNvbnRhaW5lclwiKTtcbmNvbnN0IGNvbXBsZXRlZFRhc2tDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgXCJjb21wbGV0ZWQtdGFzay1jb250YWluZXJcIlxuKTtcbmNvbnN0IGFkZFRhc2tGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtdGFzay1mb3JtXCIpO1xuXG5tZW51QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gIG1haW4uY2xhc3NMaXN0LnRvZ2dsZShcImZvcmNlLXNob3dcIik7XG59KTtcblxuLy8gRmFjdG9yeSBmdW5jdGlvbiB0byBjcmVhdGUgdGFzayBvYmplY3RzXG5mdW5jdGlvbiBjcmVhdGVUYXNrKGlkLCB0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0KSB7XG4gIHJldHVybiB7XG4gICAgaWQsXG4gICAgdGl0bGUsXG4gICAgZGVzY3JpcHRpb24sXG4gICAgZHVlRGF0ZSxcbiAgICBwcmlvcml0eSxcbiAgICBwcm9qZWN0LFxuICAgIGNvbXBsZXRlOiBmYWxzZSxcbiAgfTtcbn1cbi8vRGlzcGxheSB0aGUgbW9kYWxcblxuYWRkVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBhZGRUYXNrTW9kYWwuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xufSk7XG5cbi8vIERpc3BsYXkgdGFza3MgZnVuY3Rpb25cbmZ1bmN0aW9uIGRpc3BsYXlUYXNrcygpIHtcbiAgdGFza0NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuXG4gIHRhc2tzXG4gICAgLmZpbHRlcigodGFzaykgPT4gIXRhc2suY29tcGxldGUpXG4gICAgLmZvckVhY2goKHRhc2ssIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCB0YXNrRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHRhc2tEaXYuY2xhc3NMaXN0LmFkZChcInRhc2tcIik7XG5cbiAgICAgIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgY2hlY2tib3guc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImNoZWNrYm94XCIpO1xuICAgICAgY2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgdGFzay5jb21wbGV0ZSA9ICF0YXNrLmNvbXBsZXRlO1xuICAgICAgICBkaXNwbGF5VGFza3MoKTtcbiAgICAgICAgZGlzcGxheUNvbXBsZXRlZFRhc2tzKCk7XG4gICAgICB9KTtcbiAgICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQoY2hlY2tib3gpO1xuXG4gICAgICBjb25zdCB0aXRsZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICB0aXRsZURpdi5pbm5lclRleHQgPSB0YXNrLnRpdGxlO1xuICAgICAgdGl0bGVEaXYuY2xhc3NMaXN0LmFkZChcInRhc2stdGl0bGVcIik7XG4gICAgICB0YXNrRGl2LmFwcGVuZENoaWxkKHRpdGxlRGl2KTtcblxuICAgICAgY29uc3QgZGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIGRlbGV0ZUJ1dHRvbi5pbm5lclRleHQgPSBcIkRlbGV0ZVwiO1xuICAgICAgZGVsZXRlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJkZWxldGUtYnV0dG9uXCIpO1xuICAgICAgZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGRlbGV0ZVRhc2sodGFzay5pZCk7XG4gICAgICB9KTtcbiAgICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQoZGVsZXRlQnV0dG9uKTtcblxuICAgICAgY29uc3QgZWRpdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICBlZGl0QnV0dG9uLmlubmVyVGV4dCA9IFwiRWRpdFwiO1xuICAgICAgZWRpdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZWRpdC1idXR0b25cIik7XG4gICAgICBlZGl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLXRhc2stbW9kYWxcIikuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgICAgICBlZGl0aW5nVGFzayA9IHRydWU7XG4gICAgICAgIGVkaXRJbmRleCA9IGluZGV4O1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stdGl0bGVcIikudmFsdWUgPSB0YXNrLnRpdGxlO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stZGVzY1wiKS52YWx1ZSA9IHRhc2suZGVzY3JpcHRpb247XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHVlLWRhdGVcIikudmFsdWUgPSB0YXNrLmR1ZURhdGU7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJpb3JpdHlcIikudmFsdWUgPSB0YXNrLnByaW9yaXR5O1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RcIikudmFsdWUgPSB0YXNrLnByb2plY3Q7XG4gICAgICB9KTtcbiAgICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQoZWRpdEJ1dHRvbik7XG5cbiAgICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQodGFza0Rpdik7XG4gICAgfSk7XG59XG5cbi8vIERpc3BsYXkgY29tcGxldGVkIHRhc2tzIGZ1bmN0aW9uXG5mdW5jdGlvbiBkaXNwbGF5Q29tcGxldGVkVGFza3MoKSB7XG4gIGNvbXBsZXRlZFRhc2tDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcblxuICB0YXNrc1xuICAgIC5maWx0ZXIoKHRhc2spID0+IHRhc2suY29tcGxldGUpXG4gICAgLmZvckVhY2goKHRhc2ssIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCB0YXNrRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHRhc2tEaXYuY2xhc3NMaXN0LmFkZChcInRhc2tcIik7XG5cbiAgICAgIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgY2hlY2tib3guc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImNoZWNrYm94XCIpO1xuICAgICAgY2hlY2tib3guY2hlY2tlZCA9IHRhc2suY29tcGxldGU7XG4gICAgICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICB0YXNrLmNvbXBsZXRlID0gIXRhc2suY29tcGxldGU7XG4gICAgICAgIGRpc3BsYXlUYXNrcygpO1xuICAgICAgICBkaXNwbGF5Q29tcGxldGVkVGFza3MoKTtcbiAgICAgIH0pO1xuICAgICAgdGFza0Rpdi5hcHBlbmRDaGlsZChjaGVja2JveCk7XG5cbiAgICAgIGNvbnN0IHRpdGxlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHRpdGxlRGl2LmlubmVyVGV4dCA9IHRhc2sudGl0bGU7XG4gICAgICB0aXRsZURpdi5jbGFzc0xpc3QuYWRkKFwidGFzay10aXRsZVwiKTtcbiAgICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQodGl0bGVEaXYpO1xuXG4gICAgICBjb25zdCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgZGVsZXRlQnV0dG9uLmlubmVyVGV4dCA9IFwiRGVsZXRlXCI7XG4gICAgICBkZWxldGVCdXR0b24uY2xhc3NMaXN0LmFkZChcImRlbGV0ZS1idXR0b25cIik7XG4gICAgICBkZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgZGVsZXRlVGFzayh0YXNrLmlkKTtcbiAgICAgIH0pO1xuICAgICAgdGFza0Rpdi5hcHBlbmRDaGlsZChkZWxldGVCdXR0b24pO1xuXG4gICAgICBjb25zdCBlZGl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIGVkaXRCdXR0b24uaW5uZXJUZXh0ID0gXCJFZGl0XCI7XG4gICAgICBlZGl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJlZGl0LWJ1dHRvblwiKTtcbiAgICAgIGVkaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtdGFzay1tb2RhbFwiKS5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgICAgIGVkaXRpbmdUYXNrID0gdHJ1ZTtcbiAgICAgICAgZWRpdEluZGV4ID0gaW5kZXg7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay10aXRsZVwiKS52YWx1ZSA9IHRhc2sudGl0bGU7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1kZXNjXCIpLnZhbHVlID0gdGFzay5kZXNjcmlwdGlvbjtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdWUtZGF0ZVwiKS52YWx1ZSA9IHRhc2suZHVlRGF0ZTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmlvcml0eVwiKS52YWx1ZSA9IHRhc2sucHJpb3JpdHk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdFwiKS52YWx1ZSA9IHRhc2sucHJvamVjdDtcbiAgICAgIH0pO1xuICAgICAgdGFza0Rpdi5hcHBlbmRDaGlsZChlZGl0QnV0dG9uKTtcblxuICAgICAgY29tcGxldGVkVGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrRGl2KTtcbiAgICB9KTtcbn1cblxuLy8gRGVsZXRlIHRhc2sgZnVuY3Rpb25cbmZ1bmN0aW9uIGRlbGV0ZVRhc2soaWQpIHtcbiAgdGFza3MgPSB0YXNrcy5maWx0ZXIoKHRhc2spID0+IHRhc2suaWQgIT09IGlkKTtcbiAgZGlzcGxheVRhc2tzKCk7XG4gIGRpc3BsYXlDb21wbGV0ZWRUYXNrcygpO1xufVxuXG4vLyBBZGQgdGFzayBmdW5jdGlvblxuXG5mdW5jdGlvbiBhZGRUYXNrKHRhc2tzKSB7XG4gIGxldCB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay10aXRsZVwiKS52YWx1ZTtcbiAgbGV0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLWRlc2NcIikudmFsdWU7XG4gIGxldCBkdWVEYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdWUtZGF0ZVwiKS52YWx1ZTtcbiAgbGV0IHByaW9yaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmlvcml0eVwiKS52YWx1ZTtcbiAgbGV0IHByb2plY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RcIikudmFsdWU7XG5cbiAgaWYgKCFlZGl0aW5nVGFzaykge1xuICAgIGNvbnN0IGlkID0gdGFza3MubGVuZ3RoICsgMTtcbiAgICBjb25zdCBuZXdUYXNrID0gY3JlYXRlVGFzayhcbiAgICAgIGlkLFxuICAgICAgdGl0bGUsXG4gICAgICBkZXNjcmlwdGlvbixcbiAgICAgIGR1ZURhdGUsXG4gICAgICBwcmlvcml0eSxcbiAgICAgIHByb2plY3RcbiAgICApO1xuICAgIHRhc2tzLnB1c2gobmV3VGFzayk7XG4gIH0gZWxzZSB7XG4gICAgdGFza3NbZWRpdEluZGV4XS50aXRsZSA9IHRpdGxlO1xuICAgIHRhc2tzW2VkaXRJbmRleF0uZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICB0YXNrc1tlZGl0SW5kZXhdLmR1ZURhdGUgPSBkdWVEYXRlO1xuICAgIHRhc2tzW2VkaXRJbmRleF0ucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICB0YXNrc1tlZGl0SW5kZXhdLnByb2plY3QgPSBwcm9qZWN0O1xuICAgIGVkaXRpbmdUYXNrID0gZmFsc2U7XG4gIH1cbiAgZGlzcGxheVRhc2tzKCk7XG4gIGRpc3BsYXlDb21wbGV0ZWRUYXNrcygpO1xuXG4gIC8vIEhpZGUgdGhlIG1vZGFsXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLXRhc2stbW9kYWxcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAvLyBSZXNldCBmb3JtXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLXRhc2stZm9ybVwiKS5yZXNldCgpO1xufVxuXG5hZGRUYXNrRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldmVudCkgPT4ge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICBhZGRUYXNrKHRhc2tzKTtcbn0pO1xuXG5kaXNwbGF5VGFza3MoKTtcbmRpc3BsYXlDb21wbGV0ZWRUYXNrcygpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9