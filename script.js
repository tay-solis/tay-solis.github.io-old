var href = document.location.href.match(/[^\/]+$/)[0];
var slides = getSlides(href);

function getSlides(href){
  // if(href === "homo.html"){
  switch (href){
    case "homo.html": case "/art/homo.html":
      slides = [
        "https://res.cloudinary.com/tayjsolis/image/upload/v1522699906/09011603.jpg.jpg",
        "https://res.cloudinary.com/tayjsolis/image/upload/v1522699611/homo_web.jpg",
        "https://res.cloudinary.com/tayjsolis/image/upload/v1522699863/07081602.jpg",
        "https://res.cloudinary.com/tayjsolis/image/upload/v1522699987/smol.jpg",
        "https://res.cloudinary.com/tayjsolis/image/upload/v1522699877/07081607.jpg",
        "https://res.cloudinary.com/tayjsolis/image/upload/v1522699982/meet_peep_web.jpg",
        "https://res.cloudinary.com/tayjsolis/image/upload/v1522699974/meet_peep_6.jpg",
        "https://res.cloudinary.com/tayjsolis/image/upload/v1522699890/meep_peep_1.jpg"
      ];
      break;
    case "wanderlust.html":
      slides = [
        "https://res.cloudinary.com/tayjsolis/image/upload/v1522699787/exhibit_poster_art_printing.jpg"
      ];
      break;
  }
  return slides;

}

var currentSlide = 0;


$(document).ready(function(){
    $('.welcome').fadeIn(1000).css('display', 'block');
    $('.container').fadeIn(1000).css('display', 'block');
    $$('.slides').children('#show').attr('src', slides[currentSlide]);


});

window.sr = ScrollReveal({ reset: true });
sr.reveal('.reveal', { duration: 400 }, 50);

$('.dropdown').click(function(){
  $(this).children('.dropdown-content').slideToggle('fast');
});

$('.hamburger').click(function(){
  $('.navCollapse').slideToggle();
});

$(window).resize(function(){
  if($(window).width() <= 800){
    currentSlide = 0;
    $('.slides').children('#show').attr('src', slides[currentSlide]);
  }
});

$('.prev').click(function(){
  if(currentSlide === 0){
    currentSlide = slides.length - 1;
    $('.slides').children('#show').attr('src', slides[currentSlide]);
  } else{
    currentSlide = currentSlide - 1;
    $('.slides').children('#show').attr('src', slides[currentSlide]);
  }
});

$('.next').click(function(){
  if(currentSlide === slides.length - 1){
    currentSlide = 0;
    $('.slides').children('#show').attr('src', slides[currentSlide]);
  } else{
    currentSlide = currentSlide + 1;
    $('.slides').children('#show').attr('src', slides[currentSlide]);
  }
});
