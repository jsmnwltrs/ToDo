// import $ from 'jquery';
import 'bootstrap';
import './index.scss';

import firebase from 'firebase/app';
import apiKeys from '../db/apiKeys.json';
import addNavbar from './components/navbar/navbar';

const initializeApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  addNavbar();
};

initializeApp();
