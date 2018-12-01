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

const getUpdatedTaskInput = () => {
  const checkboxValue = $('#form-checkbox').val();
  const parseValue = JSON.parse(checkboxValue);
  const task = {
    task: $('#new-task-input').val(),
    isCompleted: parseValue,
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

const showEditForm = (e) => {
  const idToEdit = e.target.dataset.editId;
  tasksData.getSingleTask(idToEdit)
    .then((task) => {
      let domString = '<h2>Edit Task</h2>';
      domString += formBuilder(task);
      domString += `<button id="save-task" data-single-edit-id="${task.id}">Save Task</button>`;
      domString += `<input id="form-checkbox" value="${task.isCompleted}">`;
      $('#new-task-input').data('single-edit-id', task.id);
      $('#add-edit-tasks').html(domString).show();
      $('#taskPage').hide();
      $('#form-checkbox').hide();
    })
    .catch((error) => {
      console.error('error on showEditForm', error);
    });
};

const editTask = (e) => {
  const updatedTask = getUpdatedTaskInput();
  const taskId = e.target.dataset.singleEditId;
  tasksData.updateTask(updatedTask, taskId)
    .then(() => {
      $('#add-edit-tasks').html('').hide();
      $('#taskPage').show();
      initializeTaskPage();
    })
    .catch((error) => {
      console.error('error on editTask', error);
    });
};

$('body').on('click', '.edit-task-button', showEditForm);
$('body').on('click', '#save-task', editTask);
// $('body').on('keyup', '.edit', (e) => {
//   if (e.keyCode === 13) {
//     editTask();
//   }
// });


$('body').on('click', '#add-task', printNewTask);
$('body').on('keyup', '#new-task-input', (e) => {
  if (e.keyCode === 13) {
    printNewTask();
  }
});

export default buildAddForm;
