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


// $('body').on('keyup', '#new-task-input', (e) => {
//   if (e.keyCode === 13) {
//     addEditTask.printNewTask();
//   }
// });

// const bindEvents = () => {
//   // $('body').on('click', '#edit-task-button', tasksData.editTask);
//   // $('body').on('click', '#delete-task-button', tasksData.deleteTask);
// };

const initializeTaskPage = () => {
  taskPage();
};

export default initializeTaskPage;
