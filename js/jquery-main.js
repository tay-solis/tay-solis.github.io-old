/*jQuery Version*/


/* Each slide in the slideshow consists of a header image, a title, an description, and a link to the proper page.*/
class Slide {
  constructor(imgUrl, title, desc, link) {
    this.imgUrl = imgUrl;
    this.title = title;
    this.desc = desc;
    this.link = link;
  }
  createSlide() {
    let elm = `
                  <div class="label">
                  <h2>${this.title}</h2>
                    <p>${this.desc}</p>
                  </div>
                `
    $('.slideshow').css('background-image', `url(${this.imgUrl})`)
    return elm;
  }
}

const codeolingoSlide = new Slide(
  'img/slides/codeolingoSlide.png',
  'Code-o-Lingo',
  'A web app for testing beginning coding knowledge modelled after Duolingo\'s language-learning app',
  '#'
);

const syncSlide = new Slide(
  'img/slides/syncSlide.jpg',
  'SYNC',
  'A short science fiction comic created for Stack Deck Press\'s We\'re Still Here anthology',
  '#'
);

const christineSlide = new Slide(
  'img/slides/christineSlide.png',
  'Christine Cueto Portfolio',
  'A portfolio website designed for photographer Christine Cueto on Squarespace',
  '#'
);

const wanderlustSlide = new Slide(
  'img/slides/wanderlustSlide.jpg',
  'Wanderlust',
  'A speculative fiction graphic novel about Mars Colonization',
  '#'
);

let slideshow = [wanderlustSlide, codeolingoSlide, syncSlide, christineSlide];
let place = 0;

/*
Receives an image URL from NASA's Astronomy Picture of the Day API and sets it as the header background
If the API is down, it leaves the default background up.
*/
$.ajax({
  method: 'GET',
  url: 'https://api.nasa.gov/planetary/apod?api_key=dcBZXp3YhRP5hfMxGNxJqCVEGHfPENe04CAdJste',
  success: function(response) {
    $('header').css("background-image", `url(${response.hdurl})`);
  },
  error: function() {
    $('header').css("background-image"), 'url("../img/default-bg.jpg")'
  }
});

const setUpSlideshow = () => {
  for (let i = 0; i < slideshow.length; i++) {
    $('.place-dots').append(`<div class="dot"></div>`);
  }
  $('.place-dots').children().eq(0).addClass('selected');
  $('.slides').append(slideshow[0].createSlide());

  $('.next').on('click', function() {
    place++;
    if (place < slideshow.length) {
      $('.place-dots').children().removeClass('selected');
      $('.place-dots').children().eq(place).addClass('selected');
      $('.slides').html(slideshow[place].createSlide());
    } else {
      place = 0;
      $('.place-dots').children().removeClass('selected');
      $('.place-dots').children().eq(place).addClass('selected');
      $('.slides').html(slideshow[place].createSlide());
    }
  });
  $('.prev').on('click', function() {
    place--;
    if (place > 0) {
      $('.place-dots').children().removeClass('selected');
      $('.place-dots').children().eq(place).addClass('selected');
      $('.slides').html(slideshow[place].createSlide());
    } else {
      place = slideshow.length - 1;
      $('.place-dots').children().removeClass('selected');
      $('.place-dots').children().eq(place).addClass('selected');
      $('.slides').html(slideshow[place].createSlide());
    }
  });
  $('.hamburger').on("click", function() {
    $('.nav-links').slideToggle();
    $('nav').toggleClass('shadow');
  });

  $("a[href*='#']").on('click', function(e) {
    e.preventDefault();
    var target = $(this.hash);
    $('html, body').animate({
      scrollTop: target.offset().top
    }, 1000, function() {
      target.focus();
      if (target.is(":focus")) { // Checking if the target was focused
        return false;
      } else {
        target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
        target.focus();
      }
    });
  });

  window.addEventListener("resize", function() {
    if (window.matchMedia("(min-width: 480px)").matches) {
      $('.nav-links').attr('style', 'display: flex;');
    } else {
      $('.nav-links').attr('style', 'display: none;')
    }
  });
}

setUpSlideshow();
