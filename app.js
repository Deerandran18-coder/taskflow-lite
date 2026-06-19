
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');

    const taskText = document.createElement('span');
    taskText.textContent = task.text;

    if (task.completed) {
      taskText.classList.add('completed');
    }

    taskText.addEventListener('click', () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    });

    const actions = document.createElement('div');
    actions.classList.add('task-actions');

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit-btn');

    editBtn.addEventListener('click', () => {
      const updatedTask = prompt('Edit Task', task.text);

      if (updatedTask !== null && updatedTask.trim() !== '') {
        task.text = updatedTask;
        saveTasks();
        renderTasks();
      }
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');

    deleteBtn.addEventListener('click', () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(taskText);
    li.appendChild(actions);

    taskList.appendChild(li);
  });
}

addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();

  if (taskText === '') {
    alert('Please enter a task');
    return;
  }

  tasks.push({
    text: taskText,
    completed: false
  });

  saveTasks();
  renderTasks();

  taskInput.value = '';
});

renderTasks();
