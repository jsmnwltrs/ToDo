import $ from 'jquery';

import tasksData from '../../helpers/data/tasksData';
import authHelpers from '../../helpers/authHelpers';


const printTasks = (tasksArray) => {
  let domString = '';
  tasksArray.forEach((task) => {
    domString += `
      <p>${task.task}</p>
      <button id="edit-task-button" class='btn btn-info'>Edit</button>
      <button id="delete-task-button" class='btn btn-danger'>Delete</button>`;
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
