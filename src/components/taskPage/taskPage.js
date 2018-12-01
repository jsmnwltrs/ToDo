import $ from 'jquery';

import tasksData from '../../helpers/data/tasksData';
import authHelpers from '../../helpers/authHelpers';


const printTasks = (tasksArray) => {
  let domString = '';
  tasksArray.forEach((task) => {
    domString += `
      <div>
        <input type="checkbox" class="is-complete-checkbox" id="${task.id}">
        <p class="listed-task">${task.task}</p>
        <button data-edit-id='${task.id}' class='btn btn-info edit-task-button'>Edit</button>
        <button data-delete-id='${task.id}' class='btn btn-danger delete-task-button'>Delete</button>
      </div>`;
    $('#tasks').html(domString);
  });
};

const printCompletedTasks = (completedTasksArray) => {
  let domString = '';
  completedTasksArray.forEach((task) => {
    domString += `
      <div>
        <input type="checkbox" class="is-complete-checkbox" id="${task.id}" checked>
        <p class="listed-task crossed-out">${task.task}</p>
        <button data-edit-id='${task.id}' class='btn btn-info edit-task-button'>Edit</button>
        <button data-delete-id='${task.id}' class='btn btn-danger delete-task-button'>Delete</button>
      </div>`;
    $('#completed-tasks').html(domString);
  });
};


const taskPage = () => {
  const uid = authHelpers.getUid();
  tasksData.getTasks(uid)
    .then((tasksArray) => {
      const toDoTasks = tasksArray.filter(task => task.isCompleted === false);
      const completedTasks = tasksArray.filter(task => task.isCompleted === true);
      printTasks(toDoTasks);
      printCompletedTasks(completedTasks);
    })
    .catch((error) => {
      console.error('error on taskPage', error);
    });
};

const removeTask = (e) => {
  const idToDelete = e.target.dataset.deleteId;
  tasksData.deleteTask(idToDelete)
    .then(() => {
      taskPage();
    })
    .catch((error) => {
      console.error('error on removeTask', error);
    });
};

const updateIsCompleted = (e) => {
  const taskId = e.target.id;
  const isCompleted = e.target.checked;
  tasksData.updateCheckbox(taskId, isCompleted)
    .then(() => {
      taskPage();
    })
    .catch((error) => {
      console.error('error on updateIsCompleted', error);
    });
};

const bindEvents = () => {
  $('body').on('click', '.delete-task-button', removeTask);
  $('body').on('change', '.is-complete-checkbox', updateIsCompleted);
};

const initializeTaskPage = () => {
  taskPage();
  bindEvents();
};

export default initializeTaskPage;
