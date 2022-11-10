// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-add-btn");
const todoList = document.querySelector(".todo-item-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// Functions
function addTodo(even) {
  // Prevent form from submitting
  even.preventDefault();

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

  // Clear todo input value
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  // Delete Todo
  if (item.classList[0] === "todo-delete-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");

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
  todos.forEach();
}
