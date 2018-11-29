import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

const checkLoginStatus = (initializeTaskPage) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('#taskPage').show();
      $('#auth').hide();
      $('#navbar-logout').show();
      $('#navbar-auth').hide();
      $('#navbar-tasks').show();
      initializeTaskPage();
    } else {
      $('#taskPage').hide();
      $('#auth').show();
      $('#navbar-logout').hide();
      $('#navbar-auth').show();
      $('#navbar-tasks').hide();
    }
  });
};

const getUid = () => firebase.auth().currentUser.uid;

export default { checkLoginStatus, getUid };
