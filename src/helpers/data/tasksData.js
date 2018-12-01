import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getTasks = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/tasks.json?orderBy="uid"&equalTo="${uid}"`)
    .then((result) => {
      const taskObject = result.data;
      const taskArray = [];
      if (taskObject != null) {
        Object.keys(taskObject).forEach((taskId) => {
          taskObject[taskId].id = taskId;
          taskArray.push(taskObject[taskId]);
        });
      }
      resolve(taskArray);
    })
    .catch((error) => {
      reject(error);
    });
});


const getSingleTask = taskId => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/tasks/${taskId}.json`)
    .then((result) => {
      const singleTask = result.data;
      singleTask.id = taskId;
      resolve(singleTask);
    })
    .catch((error) => {
      reject(error);
    });
});

const addNewTask = taskObject => axios.post(`${firebaseUrl}/tasks.json`, JSON.stringify(taskObject));

const updateTask = (taskObject, taskId) => axios.put(`${firebaseUrl}/tasks/${taskId}.json`, JSON.stringify(taskObject));

const deleteTask = taskId => axios.delete(`${firebaseUrl}/tasks/${taskId}.json`);

const updateCheckbox = (taskId, isCompleted) => axios.patch(`${firebaseUrl}/tasks/${taskId}.json`, { isCompleted });

export default {
  getTasks,
  addNewTask,
  getSingleTask,
  updateTask,
  deleteTask,
  updateCheckbox,
};
