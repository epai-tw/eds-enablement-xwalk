// add delayed functionality here

// eslint-disable-next-line import/no-extraneous-dependencies
import $ from 'jquery';

// eslint-disable-next-line no-debugger
debugger

console.log('jQuery', $(
  'body',
));

// 在這裡使用 jQuery
$(document).ready(() => {
  console.log('jQuery 已經成功載入！');
  $('body').css('background-color', 'lightgray');
});

console.log('window.Swiper', window.Swiper);
