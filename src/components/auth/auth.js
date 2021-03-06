import './auth.scss';
import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

const loginButton = () => {
  const domString = `<button id="googleAuth">login
    <img src="">
  </button>`;
  $('#auth').html(domString);
  $('#googleAuth').on('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  });
};

export default loginButton;
