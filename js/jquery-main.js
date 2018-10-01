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
    $('.portfolio-link').attr('href', this.link);
    let elm = `
                  <div class="label">
                  <h2>${this.title}</h2>
                    <p>${this.desc}</p>
                  </div>
                `
    $('.slideshow').css('background-image', `url(${this.imgUrl})`);
    return elm;
  }
}

const codeolingoSlide = new Slide(
  'img/slides/codeolingoSlide.png',
  'Code-o-Lingo',
  'A web app for testing beginning coding knowledge modelled after Duolingo\'s language-learning app',
  'portfolio/code-o-lingo.html'
);

const syncSlide = new Slide(
  'img/slides/syncSlide.jpg',
  'SYNC',
  'A short science fiction comic created for Stack Deck Press\'s We\'re Still Here anthology',
  'portfolio/sync.html'
);

const christineSlide = new Slide(
  'img/slides/christineSlide.png',
  'Christine Cueto Portfolio',
  'A portfolio website designed for photographer Christine Cueto on Squarespace',
  'https://christinecueto.com'
);

const wanderlustSlide = new Slide(
  'img/slides/wanderlustSlide.jpg',
  'Wanderlust',
  'A speculative fiction graphic novel about Mars Colonization',
  'portfolio/wanderlust.html'
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

/* Receives the currently reading shelf from my Goodreads account and displays it in my About section.*/
const goodreadsKey = 'JlxWctDXteHbx9kpoXmYQ';
const goodreadsShelfUrl = 'https://www.goodreads.com/review/list/17900080.xml?key=JlxWctDXteHbx9kpoXmYQ&shelf=currently-reading'

$.ajax({
  method: 'GET',
  url: goodreadsShelfUrl,
  dataType: "xml",
  success: function(response) {
    $('.currently-reading').prepend('<h2>What I\'m Reading</h2>');
    let books = $(response).find('books').children();
    for (let i = 0; i < books.length; i++) {

      let book = books[i];

      let title = book.querySelector('title').innerHTML;
      let author = book.querySelector('name').innerHTML;
      let link = book.querySelector('link').innerHTML;
      let imageurl = book.querySelector('image_url').innerHTML;

      let html = `<li class="reveal">
                    <a href="${link}">
                    <img src="${imageurl}"/>
                    <p><em>${title}</em> <br/>by ${author}</p>
                    </a>
                    </li>`;

      $('.reading-list').append(html);
    }
  }
});

/* Changes the slide image and which dot is selected becaused on the index of the slide.*/

const nextSlide = () => {
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
}

const prevSlide = () => {
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
}

const setUpSlideshow = () => {
  for (let i = 0; i < slideshow.length; i++) {
    $('.place-dots').append(`<div class="dot"></div>`);
    $('.dot').on('click', function() {
      $('.place-dots').children().removeClass('selected');
      $(this).addClass('selected');
      $('.slides').html(slideshow[$('.dot.selected').index()].createSlide());

    });
  }
  $('.place-dots').children().eq(0).addClass('selected');
  $('.slides').append(slideshow[0].createSlide());


  $('.next').on('click', function() {
    nextSlide();
  });

  $('.prev').on('click', function() {
    prevSlide();
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

    $(window).scroll(function() {
      let scrollDistance = $(window).scrollTop();

      // Assign active class to nav links while scolling
      $('nav li').removeClass('active');
      $('section').each(function(i) {
        if ($(this).position().top <= scrollDistance) {
          $('nav li').removeClass('active');
          $('nav li').eq(i).addClass('active');
        }
      });
    }).scroll();

  window.addEventListener("resize", function() {
    if (window.matchMedia("(min-width: 480px)").matches) {
      $('.nav-links').attr('style', 'display: flex;');
    } else {
      $('.nav-links').attr('style', 'display: none;')
    }
  });

  $('form').on('submit', function(e) {
    e.preventDefault();
    console.log("User Submitted");
    $(this).find('input').not("input[type='submit']").filter(function() {
      let name = $(this).attr('name');
      if ($(this).val() == "") {
        $(this).addClass('error');
        $(`label[for=${name}]`).text(`Please enter a valid ${name}`);
      } else {
        $(this).removeClass('error');
        $(`label[for=${name}]`).text(``);
      }
    });
    $(this).find('textarea').filter(function() {
      if ($(this).val() == "Message") {
        $(this).addClass('error');
        $('label[for="message"]').text('Message cannot be empty');
      } else {
        $(this).removeClass('error');
        $('label[for="message"]').text('');
      }
    });
  });

//Uses the ScrollReveal Library to have images appear when they enter the window
  ScrollReveal().reveal('.reveal-reset', {
    reset: true,
    delay: 400,
    interval: 100
  });

  ScrollReveal().reveal('.reveal-stay', {
    reset: false,
    delay: 400,
    interval: 100
  });
}

setUpSlideshow();
