import './navbar.scss';
import $ from 'jquery';

const navbarEvents = () => {
  $('.nav-link').on('click', (e) => {
    console.log(e.target.id);
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
        <a id="navbar-login" class="nav-link">Login</a>
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
