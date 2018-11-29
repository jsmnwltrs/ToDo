import $ from 'jquery';
import tasksData from '../../helpers/data/tasksData';
import authHelpers from '../../helpers/authHelpers';
import initializeTaskPage from '../taskPage/taskPage';

const formBuilder = (task) => {
  const form = `<input id="new-task-input" value="${task.task}" type="text" placeholder="enter new task">`;
  return form;
};

const getTaskInput = () => {
  const task = {
    task: $('#new-task-input').val(),
    isCompleted: false,
    uid: authHelpers.getUid(),
  };
  return task;
};

const buildAddForm = () => {
  const emptyTask = {
    task: '',
  };
  let domString = '<h2>Add New Task</h2>';
  domString += formBuilder(emptyTask);
  domString += '<button id="add-task">Save New Task</button>';
  $('#add-edit-tasks').html(domString).show();
  $('#taskPage').hide();
};

const printNewTask = () => {
  const newTask = getTaskInput();
  tasksData.addNewTask(newTask)
    .then(() => {
      $('#add-edit-tasks').hide();
      $('#taskPage').show();
      initializeTaskPage();
    })
    .catch((error) => {
      console.error(error);
    });
};

$('body').on('click', '#add-task', printNewTask);

$('body').on('keyup', '#new-task-input', (e) => {
  if (e.keyCode === 13) {
    printNewTask();
  }
});

export default buildAddForm;
