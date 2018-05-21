$(document).ready(function(){
    $('.welcome').fadeIn(1000).css('display', 'block');
    $('.container').fadeIn(1000).css('display', 'block');
});

window.sr = ScrollReveal({ reset: true });
sr.reveal('.reveal', { duration: 400 }, 50);

$('.dropdown').click(function(){
  $(this).children('.dropdown-content').slideToggle('fast');
});

$('.hamburger').click(function(){
  $('.navCollapse').slideToggle();
});
