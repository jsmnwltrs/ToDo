import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user);
      $('#tasks').show();
      $('#auth').hide();
      $('#navbar-logout').show();
      $('#navbar-auth').hide();
      $('#navbar-tasks').show();
    } else {
      $('#tasks').hide();
      $('#auth').show();
      $('#navbar-logout').hide();
      $('#navbar-auth').show();
      $('#navbar-tasks').hide();
    }
  });
};

export default checkLoginStatus;
