import 'bootstrap';
import './index.scss';

import firebase from 'firebase/app';
import $ from 'jquery';

import apiKeys from '../db/apiKeys.json';
import addNavbar from './components/navbar/navbar';
import loginButton from './components/auth/auth';
import authHelpers from './helpers/authHelpers';
import initializeTaskPage from './components/taskPage/taskPage';
import buildForm from './components/addEditTask/addEditTask';

const initializeApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  addNavbar();
  loginButton();
  authHelpers.checkLoginStatus(initializeTaskPage);
  $('#show-task-form').on('click', buildForm);
};

initializeApp();
