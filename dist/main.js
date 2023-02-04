/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
//Use 'npm run build'

console.log("It's working 333");

let tasks = [];

//Toggle sidebar display
const menuButton = document.getElementById("menu-btn");
const main = document.getElementById("main");

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
const addTaskButton = document.getElementById("add-task-btn");
const addTaskModal = document.getElementById("add-task-modal");

addTaskButton.addEventListener("click", () => {
  addTaskModal.style.display = "flex";
});

// Display tasks function
function displayTasks() {
  const taskContainer = document.getElementById("task-container");
  taskContainer.innerHTML = "";

  tasks.forEach((task) => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    const titleDiv = document.createElement("div");
    titleDiv.innerText = task.title;
    titleDiv.classList.add("task-title");
    taskDiv.appendChild(titleDiv);

    const dateDiv = document.createElement("div");
    dateDiv.innerText = task.dueDate;
    dateDiv.classList.add("task-date");
    taskDiv.appendChild(dateDiv);

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", () => {
      deleteTask(task.id);
    });
    taskDiv.appendChild(deleteButton);

    taskContainer.appendChild(taskDiv);
  });
}

// Delete task function
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  displayTasks();
}

// Add task function
window.addEventListener("load", () => {
  const addTaskForm = document.getElementById("add-task-form");
  addTaskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let title = document.getElementById("task-title").value;
    let description = document.getElementById("task-desc").value;
    let dueDate = document.getElementById("due-date").value;
    let priority = document.getElementById("priority").value;
    let project = document.getElementById("project").value;

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

    displayTasks();

    event.target.reset();

    // Hide the modal
    document.getElementById("add-task-modal").style.display = "none";
  });
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vVXNlICducG0gcnVuIGJ1aWxkJ1xuXG5jb25zb2xlLmxvZyhcIkl0J3Mgd29ya2luZyAzMzNcIik7XG5cbmxldCB0YXNrcyA9IFtdO1xuXG4vL1RvZ2dsZSBzaWRlYmFyIGRpc3BsYXlcbmNvbnN0IG1lbnVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1lbnUtYnRuXCIpO1xuY29uc3QgbWFpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpblwiKTtcblxubWVudUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICBtYWluLmNsYXNzTGlzdC50b2dnbGUoXCJmb3JjZS1zaG93XCIpO1xufSk7XG5cbi8vIEZhY3RvcnkgZnVuY3Rpb24gdG8gY3JlYXRlIHRhc2sgb2JqZWN0c1xuZnVuY3Rpb24gY3JlYXRlVGFzayhpZCwgdGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCkge1xuICByZXR1cm4ge1xuICAgIGlkLFxuICAgIHRpdGxlLFxuICAgIGRlc2NyaXB0aW9uLFxuICAgIGR1ZURhdGUsXG4gICAgcHJpb3JpdHksXG4gICAgcHJvamVjdCxcbiAgfTtcbn1cbi8vRGlzcGxheSB0aGUgbW9kYWxcbmNvbnN0IGFkZFRhc2tCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC10YXNrLWJ0blwiKTtcbmNvbnN0IGFkZFRhc2tNb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLXRhc2stbW9kYWxcIik7XG5cbmFkZFRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgYWRkVGFza01vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbn0pO1xuXG4vLyBEaXNwbGF5IHRhc2tzIGZ1bmN0aW9uXG5mdW5jdGlvbiBkaXNwbGF5VGFza3MoKSB7XG4gIGNvbnN0IHRhc2tDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stY29udGFpbmVyXCIpO1xuICB0YXNrQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgdGFza3MuZm9yRWFjaCgodGFzaykgPT4ge1xuICAgIGNvbnN0IHRhc2tEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRhc2tEaXYuY2xhc3NMaXN0LmFkZChcInRhc2tcIik7XG5cbiAgICBjb25zdCB0aXRsZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGl0bGVEaXYuaW5uZXJUZXh0ID0gdGFzay50aXRsZTtcbiAgICB0aXRsZURpdi5jbGFzc0xpc3QuYWRkKFwidGFzay10aXRsZVwiKTtcbiAgICB0YXNrRGl2LmFwcGVuZENoaWxkKHRpdGxlRGl2KTtcblxuICAgIGNvbnN0IGRhdGVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGRhdGVEaXYuaW5uZXJUZXh0ID0gdGFzay5kdWVEYXRlO1xuICAgIGRhdGVEaXYuY2xhc3NMaXN0LmFkZChcInRhc2stZGF0ZVwiKTtcbiAgICB0YXNrRGl2LmFwcGVuZENoaWxkKGRhdGVEaXYpO1xuXG4gICAgY29uc3QgZGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBkZWxldGVCdXR0b24uaW5uZXJUZXh0ID0gXCJEZWxldGVcIjtcbiAgICBkZWxldGVCdXR0b24uY2xhc3NMaXN0LmFkZChcImRlbGV0ZS1idXR0b25cIik7XG4gICAgZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBkZWxldGVUYXNrKHRhc2suaWQpO1xuICAgIH0pO1xuICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQoZGVsZXRlQnV0dG9uKTtcblxuICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQodGFza0Rpdik7XG4gIH0pO1xufVxuXG4vLyBEZWxldGUgdGFzayBmdW5jdGlvblxuZnVuY3Rpb24gZGVsZXRlVGFzayhpZCkge1xuICB0YXNrcyA9IHRhc2tzLmZpbHRlcigodGFzaykgPT4gdGFzay5pZCAhPT0gaWQpO1xuICBkaXNwbGF5VGFza3MoKTtcbn1cblxuLy8gQWRkIHRhc2sgZnVuY3Rpb25cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XG4gIGNvbnN0IGFkZFRhc2tGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtdGFzay1mb3JtXCIpO1xuICBhZGRUYXNrRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldmVudCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stdGl0bGVcIikudmFsdWU7XG4gICAgbGV0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLWRlc2NcIikudmFsdWU7XG4gICAgbGV0IGR1ZURhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1ZS1kYXRlXCIpLnZhbHVlO1xuICAgIGxldCBwcmlvcml0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJpb3JpdHlcIikudmFsdWU7XG4gICAgbGV0IHByb2plY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RcIikudmFsdWU7XG5cbiAgICBjb25zdCBpZCA9IHRhc2tzLmxlbmd0aCArIDE7XG4gICAgY29uc3QgbmV3VGFzayA9IGNyZWF0ZVRhc2soXG4gICAgICBpZCxcbiAgICAgIHRpdGxlLFxuICAgICAgZGVzY3JpcHRpb24sXG4gICAgICBkdWVEYXRlLFxuICAgICAgcHJpb3JpdHksXG4gICAgICBwcm9qZWN0XG4gICAgKTtcbiAgICB0YXNrcy5wdXNoKG5ld1Rhc2spO1xuXG4gICAgZGlzcGxheVRhc2tzKCk7XG5cbiAgICBldmVudC50YXJnZXQucmVzZXQoKTtcblxuICAgIC8vIEhpZGUgdGhlIG1vZGFsXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtdGFzay1tb2RhbFwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIH0pO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=