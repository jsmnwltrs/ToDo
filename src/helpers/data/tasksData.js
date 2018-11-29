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

const addNewTask = taskObject => axios.post(`${firebaseUrl}/tasks.json`, JSON.stringify(taskObject));


export default { getTasks, addNewTask };
