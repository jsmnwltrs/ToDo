// import $ from 'jquery';
import 'bootstrap';
import './index.scss';

import firebase from 'firebase/app';
import apiKeys from '../db/apiKeys.json';
import addNavbar from './components/navbar/navbar';
import loginButton from './components/auth/auth';
import checkLoginStatus from './helpers/authHelpers';

const initializeApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  addNavbar();
  loginButton();
  checkLoginStatus();
};

initializeApp();
