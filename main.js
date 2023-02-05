/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
//Use 'npm run build'

console.log("It's working 333");

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
  };
}
//Display the modal

addTaskButton.addEventListener("click", () => {
  addTaskModal.style.display = "flex";
});

// Display tasks function
function displayTasks() {
  taskContainer.innerHTML = "";

  tasks.forEach((task, index) => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

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

// Delete task function
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  displayTasks();
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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy9Vc2UgJ25wbSBydW4gYnVpbGQnXG5cbmNvbnNvbGUubG9nKFwiSXQncyB3b3JraW5nIDMzM1wiKTtcblxubGV0IHRhc2tzID0gW1xuICB7XG4gICAgaWQ6IDEsXG4gICAgdGl0bGU6IFwiV2FsayB0aGUgZG9nXCIsXG4gICAgZGVzY3JpcHRpb246IFwiVGFrZSBCb25vIGZvciBhIDEwIG1pbnV0ZSB3YWxrXCIsXG4gICAgZHVlRGF0ZTogXCIyMDIzLTAyLTA3XCIsXG4gICAgcHJpb3JpdHk6IFwibG93XCIsXG4gICAgcHJvamVjdDogXCJEb2cgXCIsXG4gIH0sXG4gIHtcbiAgICBpZDogMixcbiAgICB0aXRsZTogXCJQcmFjdGljZSBndWl0YXJcIixcbiAgICBkZXNjcmlwdGlvbjogXCJMZWFybiB0aGUgQ0FHRUQgbWV0aG9kXCIsXG4gICAgZHVlRGF0ZTogXCIyMDIzLTAyLTExXCIsXG4gICAgcHJpb3JpdHk6IFwibG93XCIsXG4gICAgcHJvamVjdDogXCJNdXNpY1wiLFxuICB9LFxuICB7XG4gICAgaWQ6IDMsXG4gICAgdGl0bGU6IFwiUGF5IGVsZWN0cmljaXR5IGJpbGxcIixcbiAgICBkZXNjcmlwdGlvbjogXCJQYXkgYmlsbCBvbmxpbmVcIixcbiAgICBkdWVEYXRlOiBcIjIwMjMtMDItMjVcIixcbiAgICBwcmlvcml0eTogXCJtZWRpdW1cIixcbiAgICBwcm9qZWN0OiBcIk1vbmV5XCIsXG4gIH0sXG5dO1xuXG5sZXQgZWRpdGluZ1Rhc2sgPSBmYWxzZTtcbmxldCBlZGl0SW5kZXg7XG5cbi8vVG9nZ2xlIHNpZGViYXIgZGlzcGxheVxuY29uc3QgbWVudUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWVudS1idG5cIik7XG5jb25zdCBtYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluXCIpO1xuY29uc3QgYWRkVGFza0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLXRhc2stYnRuXCIpO1xuY29uc3QgYWRkVGFza01vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtdGFzay1tb2RhbFwiKTtcbmNvbnN0IHRhc2tDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stY29udGFpbmVyXCIpO1xuY29uc3QgYWRkVGFza0Zvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC10YXNrLWZvcm1cIik7XG5cbm1lbnVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgbWFpbi5jbGFzc0xpc3QudG9nZ2xlKFwiZm9yY2Utc2hvd1wiKTtcbn0pO1xuXG4vLyBGYWN0b3J5IGZ1bmN0aW9uIHRvIGNyZWF0ZSB0YXNrIG9iamVjdHNcbmZ1bmN0aW9uIGNyZWF0ZVRhc2soaWQsIHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QpIHtcbiAgcmV0dXJuIHtcbiAgICBpZCxcbiAgICB0aXRsZSxcbiAgICBkZXNjcmlwdGlvbixcbiAgICBkdWVEYXRlLFxuICAgIHByaW9yaXR5LFxuICAgIHByb2plY3QsXG4gIH07XG59XG4vL0Rpc3BsYXkgdGhlIG1vZGFsXG5cbmFkZFRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgYWRkVGFza01vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbn0pO1xuXG4vLyBEaXNwbGF5IHRhc2tzIGZ1bmN0aW9uXG5mdW5jdGlvbiBkaXNwbGF5VGFza3MoKSB7XG4gIHRhc2tDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcblxuICB0YXNrcy5mb3JFYWNoKCh0YXNrLCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IHRhc2tEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRhc2tEaXYuY2xhc3NMaXN0LmFkZChcInRhc2tcIik7XG5cbiAgICBjb25zdCB0aXRsZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGl0bGVEaXYuaW5uZXJUZXh0ID0gdGFzay50aXRsZTtcbiAgICB0aXRsZURpdi5jbGFzc0xpc3QuYWRkKFwidGFzay10aXRsZVwiKTtcbiAgICB0YXNrRGl2LmFwcGVuZENoaWxkKHRpdGxlRGl2KTtcblxuICAgIGNvbnN0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgZGVsZXRlQnV0dG9uLmlubmVyVGV4dCA9IFwiRGVsZXRlXCI7XG4gICAgZGVsZXRlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJkZWxldGUtYnV0dG9uXCIpO1xuICAgIGRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgZGVsZXRlVGFzayh0YXNrLmlkKTtcbiAgICB9KTtcbiAgICB0YXNrRGl2LmFwcGVuZENoaWxkKGRlbGV0ZUJ1dHRvbik7XG5cbiAgICBjb25zdCBlZGl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBlZGl0QnV0dG9uLmlubmVyVGV4dCA9IFwiRWRpdFwiO1xuICAgIGVkaXRCdXR0b24uY2xhc3NMaXN0LmFkZChcImVkaXQtYnV0dG9uXCIpO1xuICAgIGVkaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLXRhc2stbW9kYWxcIikuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgICAgZWRpdGluZ1Rhc2sgPSB0cnVlO1xuICAgICAgZWRpdEluZGV4ID0gaW5kZXg7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stdGl0bGVcIikudmFsdWUgPSB0YXNrLnRpdGxlO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLWRlc2NcIikudmFsdWUgPSB0YXNrLmRlc2NyaXB0aW9uO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdWUtZGF0ZVwiKS52YWx1ZSA9IHRhc2suZHVlRGF0ZTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJpb3JpdHlcIikudmFsdWUgPSB0YXNrLnByaW9yaXR5O1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0XCIpLnZhbHVlID0gdGFzay5wcm9qZWN0O1xuICAgIH0pO1xuICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQoZWRpdEJ1dHRvbik7XG5cbiAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tEaXYpO1xuICB9KTtcbn1cblxuLy8gRGVsZXRlIHRhc2sgZnVuY3Rpb25cbmZ1bmN0aW9uIGRlbGV0ZVRhc2soaWQpIHtcbiAgdGFza3MgPSB0YXNrcy5maWx0ZXIoKHRhc2spID0+IHRhc2suaWQgIT09IGlkKTtcbiAgZGlzcGxheVRhc2tzKCk7XG59XG5cbi8vIEFkZCB0YXNrIGZ1bmN0aW9uXG5cbmZ1bmN0aW9uIGFkZFRhc2sodGFza3MpIHtcbiAgbGV0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLXRpdGxlXCIpLnZhbHVlO1xuICBsZXQgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stZGVzY1wiKS52YWx1ZTtcbiAgbGV0IGR1ZURhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1ZS1kYXRlXCIpLnZhbHVlO1xuICBsZXQgcHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByaW9yaXR5XCIpLnZhbHVlO1xuICBsZXQgcHJvamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdFwiKS52YWx1ZTtcblxuICBpZiAoIWVkaXRpbmdUYXNrKSB7XG4gICAgY29uc3QgaWQgPSB0YXNrcy5sZW5ndGggKyAxO1xuICAgIGNvbnN0IG5ld1Rhc2sgPSBjcmVhdGVUYXNrKFxuICAgICAgaWQsXG4gICAgICB0aXRsZSxcbiAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgZHVlRGF0ZSxcbiAgICAgIHByaW9yaXR5LFxuICAgICAgcHJvamVjdFxuICAgICk7XG4gICAgdGFza3MucHVzaChuZXdUYXNrKTtcbiAgfSBlbHNlIHtcbiAgICB0YXNrc1tlZGl0SW5kZXhdLnRpdGxlID0gdGl0bGU7XG4gICAgdGFza3NbZWRpdEluZGV4XS5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIHRhc2tzW2VkaXRJbmRleF0uZHVlRGF0ZSA9IGR1ZURhdGU7XG4gICAgdGFza3NbZWRpdEluZGV4XS5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgIHRhc2tzW2VkaXRJbmRleF0ucHJvamVjdCA9IHByb2plY3Q7XG4gICAgZWRpdGluZ1Rhc2sgPSBmYWxzZTtcbiAgfVxuICBkaXNwbGF5VGFza3MoKTtcblxuICAvLyBIaWRlIHRoZSBtb2RhbFxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC10YXNrLW1vZGFsXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgLy8gUmVzZXQgZm9ybVxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC10YXNrLWZvcm1cIikucmVzZXQoKTtcbn1cblxuYWRkVGFza0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZlbnQpID0+IHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgYWRkVGFzayh0YXNrcyk7XG59KTtcblxuZGlzcGxheVRhc2tzKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=