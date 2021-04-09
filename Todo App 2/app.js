// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// Functions
function addTodo(event) {
  // Prevent form from submitting
  event.preventDefault();

  const todoDiv = createTodoDiv(todoInput.value);
  todoList.appendChild(todoDiv);

  // ADD TODO TO LOCAL STORAGE
  saveLocalTodos(todoInput.value);

  // Clear Todo Input Value
  todoInput.value = '';
}

function createTodoDiv(content) {
  // Todo div
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  // Create LI
  const newTodo = document.createElement('li');
  newTodo.innerText = content;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);

  // CHECK MARK BUTTON
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add('complete-btn');
  todoDiv.appendChild(completedButton);

  // TRASH BUTTON
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add('trash-btn');
  todoDiv.appendChild(trashButton);

  return todoDiv;
}

function deleteCheck(e) {
  const item = e.target;
  // DELETE TODO
  if (item.classList[0] === 'trash-btn') {
    const todo = item.parentElement;
    // Animation
    todo.classList.add('fall');
    removeLocalTodos(todo);
    todo.addEventListener('transitionend', function () {
      todo.remove();
    });
  }

  // CHECK MARK
  if (item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  let todos = grabTodosFromLocalStorage();

  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function grabTodosFromLocalStorage() {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  return todos;
}

function getTodos() {
  let todos = grabTodosFromLocalStorage();
  todos.forEach(function (todo) {
    todoList.appendChild(createTodoDiv(todo));
  });
}

function removeLocalTodos(todo) {
  let todos = grabTodosFromLocalStorage();
  console.dir(todo.children[0].innerText);
}
