import { $ } from "./ajax.js";

// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
document.addEventListener("click", function (e) {
  const modalItem = document.querySelector(".modal");
  const clickedItem = e.target;
  if (clickedItem === modalItem) {
    modalItem.remove();
  }
});
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// Functions
function addTodo(event) {
  // Prevent form from submitting
  event.preventDefault();

  const newTodo = {
    completed: false,
    task: todoInput.value,
  };

  // ADD TODO TO DATABASE
  $.makeRequest("POST", "http://localhost:8080/api/v1/todo", newTodo);

  // create TODO UI
  const todoDiv = createTodoDiv(newTodo);
  todoList.appendChild(todoDiv);

  // Clear Todo Input Value
  todoInput.value = "";
}

function createTodoDiv(todo) {
  // Todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // Check if the task has been completed
  if (todo.completed) {
    todoDiv.classList.add("completed");
  }

  // Create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todo.task;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  // CHECK MARK BUTTON
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  // TRASH BUTTON
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  return todoDiv;
}

function deleteCheck(e) {
  const item = e.target;
  // DELETE TODO
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    // Show confirmation msg
    //createAndShowModal(todo);
  }

  // CHECK MARK
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    //changeTodoItemState(todo);
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

async function getTodos() {
  let todos = await $.makeRequest(
    "GET",
    "http://localhost:8080/api/v1/todo",
    {}
  );
  todos = JSON.parse(todos);
  todos.forEach(function (todo) {
    todoList.appendChild(createTodoDiv(todo));
  });
}

function changeTodoItemState(todo) {
  let todos = grabTodosFromLocalStorage();
  todos.map(function (item) {
    if (item.task === todo.children[0].innerText) {
      if (item.isCompleted === true) {
        item.isCompleted = false;
      } else {
        item.isCompleted = true;
      }
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function createAndShowModal(todo) {
  const divModal = document.createElement("div");
  divModal.classList.add("modal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("content");

  const exclamationIcon = document.createElement("i");
  exclamationIcon.classList.add("fas", "fa-exclamation");

  const modalText = document.createElement("p");
  modalText.innerText = "Are you sure, you want to delete this TODO ?";

  const yesButton = document.createElement("button");
  yesButton.classList.add("yes-btn");
  yesButton.innerText = "Yes, I'm sure";
  yesButton.addEventListener("click", function () {
    document.querySelector(".modal").remove();
    // Animation
    removeLocalTodos(todo);
    todo.classList.add("fall");
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  });

  const noButton = document.createElement("button");
  noButton.classList.add("no-btn");
  noButton.innerText = "Cancel";
  noButton.addEventListener("click", function () {
    document.querySelector(".modal").remove();
  });

  modalContent.appendChild(exclamationIcon);
  modalContent.appendChild(modalText);
  modalContent.appendChild(yesButton);
  modalContent.appendChild(noButton);

  divModal.appendChild(modalContent);

  document.body.prepend(divModal);
}
