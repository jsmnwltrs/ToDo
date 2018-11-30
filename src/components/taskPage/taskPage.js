import $ from 'jquery';

import tasksData from '../../helpers/data/tasksData';
import authHelpers from '../../helpers/authHelpers';


const printTasks = (tasksArray) => {
  let domString = '';
  tasksArray.forEach((task) => {
    domString += `
      <p>${task.task}</p>
      <button data-edit-id='${task.id}' class='btn btn-info edit-task-button'>Edit</button>
      <button data-delete-id='${task.id}' class='btn btn-danger delete-task-button'>Delete</button>`;
  });
  $('#tasks').html(domString);
};


const taskPage = () => {
  const uid = authHelpers.getUid();
  tasksData.getTasks(uid)
    .then((tasksArray) => {
      printTasks(tasksArray);
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

const deleteEvent = () => {
  $('body').on('click', '.delete-task-button', removeTask);
};

const initializeTaskPage = () => {
  taskPage();
  deleteEvent();
};

export default initializeTaskPage;
