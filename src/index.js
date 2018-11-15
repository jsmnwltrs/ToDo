import $ from 'jquery';
import 'bootstrap';
import './index.scss';

$('.btn').click(() => {
  $('#div').append('Heythere');
});
