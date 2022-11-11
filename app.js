// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-add-btn");
const todoList = document.querySelector(".todo-item-list");
const filterOption = document.querySelector(".filter-todo");

const mainBody = document.querySelector(".main-body");
const popupMsg = document.querySelector(".alert-msg");

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// Functions

// Add New Todo Items
function addTodo(e) {
  // Prevent form from submitting
  e.preventDefault();

  // Check the input value empty or not
  if (todoInput.value == "") {
    popupMsg.style.right = "3%";
    popupMsg.innerHTML = "No Input Value Found!";
    mainBody.appendChild(popupMsg);
  } else {
    // Remove Alert
    popupMsg.style.right = "-100%";

    // Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Create LI
    const newTodo = document.createElement("li");
    newTodo.innerHTML = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // Trash Button
    const trashButton = document.createElement("div");
    trashButton.innerHTML = '<i class="fi-rr-trash"></i>';
    trashButton.classList.add("todo-delete-btn");
    todoDiv.appendChild(trashButton);

    // Check Mark Button
    const completeButton = document.createElement("div");
    completeButton.innerHTML = '<i class="fi-rr-check"></i>';
    completeButton.classList.add("todo-complete-btn");
    todoDiv.appendChild(completeButton);

    // Append to List
    todoList.appendChild(todoDiv);

    // Store todo Item in Local Storage
    saveLocalTodos(todoInput.value);

    // Clear todo input value
    todoInput.value = "";
  }
}

// Todo "Check Mark & Delete"
function deleteCheck(e) {
  const item = e.target;
  // Delete Todo
  if (item.classList[0] === "todo-delete-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");

    // Delete todo item from Local Storage
    removeLocalTodos(todo);

    // Animation
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  // Check Mark
  if (item.classList[0] === "todo-complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

// Filter todo items
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    // console.log(todo);
    switch (e.target.value) {
      case "all":
        todo.style.display = "block";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "block";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "block";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

// Store data in Browser Local Storage
function saveLocalTodos(todo) {
  // Checking Any Previous Todo data is there or not
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Show Todos from the Local Storage

function getTodos() {
  // Checking for have any todo Item in Local Storage
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    // Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Create LI
    const newTodo = document.createElement("li");
    newTodo.innerHTML = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // Trash Button
    const trashButton = document.createElement("div");
    trashButton.innerHTML = '<i class="fi-rr-trash"></i>';
    trashButton.classList.add("todo-delete-btn");
    todoDiv.appendChild(trashButton);

    // Check Mark Button
    const completeButton = document.createElement("div");
    completeButton.innerHTML = '<i class="fi-rr-check"></i>';
    completeButton.classList.add("todo-complete-btn");
    todoDiv.appendChild(completeButton);

    // Append to List
    todoList.appendChild(todoDiv);
  });
}

// Delete todo Item from Local Storage
function removeLocalTodos(todo) {
  // Check andthing have on the Local Storage
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.childNodes[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//
