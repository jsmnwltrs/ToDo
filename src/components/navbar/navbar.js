import './navbar.scss';
import $ from 'jquery';

import firebase from 'firebase/app';
import 'firebase/auth';

const navbarEvents = () => {
  $('.nav-link').on('click', (e) => {
    if (e.target.id === 'navbar-logout') {
      firebase.auth().signOut().then(() => {
        $('#auth').show();
        $('#tasks').hide();
      }).catch((error) => {
        console.error('navbarEvents error', error);
      });
    } else if (e.target.id === 'navbar-auth') {
      $('#auth').show();
      $('#tasks').hide();
    } else if (e.target.id === 'navbar-tasks') {
      $('#auth').hide();
      $('#tasks').show();
    }
  });
};

const addNavbar = () => {
  const domString = `<nav class="navbar navbar-expand-lg navbar-info bg-info">
  <a class="navbar-brand">To Do</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item active">
        <a id="navbar-auth" class="nav-link">Authentication</a>
      </li>
      <li class="nav-item active">
      <a id="navbar-tasks" class="nav-link">Tasks</a>
      </li>
      <li class="nav-item active">
        <a id="navbar-logout" class="nav-link">Logout</a>
      </li>
    </ul>
  </div>
</nav>`;

  $('#navbar').html(domString);
  navbarEvents();
};

export default addNavbar;
