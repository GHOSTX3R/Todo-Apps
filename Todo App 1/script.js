const tasks = [];
let index = 0;

// Dom stuff

const inputField = document.getElementById('input');
const addButton = document.getElementById('addButton');
const resultsContainer = document.querySelector('.results');
const taskList = document.getElementById('task-list');

inputField.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    if (inputField.value.trim() !== '') addTask(inputField.value);
  } else {
    // showing a modal
  }
});

addButton.addEventListener('click', () => {
  if (inputField.value.trim() !== '') addTask(inputField.value);
  else {
    // showing a modal
  }
});

function addTask(task) {
  index++;

  entry = {
    id: index,
    description: task,
  };

  tasks.push(entry);

  const newTask = document.createElement('li');
  let indexAttribute = document.createAttribute('index');
  indexAttribute.value = entry.id;
  newTask.setAttributeNode(indexAttribute);
  newTask.appendChild(document.createTextNode(entry.description));
  taskList.appendChild(newTask);

  inputField.value = '';
  resultsContainer.scrollTop = resultsContainer.scrollHeight;
}
