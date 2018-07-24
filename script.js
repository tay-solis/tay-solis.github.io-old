var href = "";
var slides = "";

if (document.location.href.match(/[^\/]+$/) != null){
  href = document.location.href.match(/[^\/]+$/)[0];
  slides = getSlides(href);

  function getSlides(href){
    // if(href === "homo.html"){
    switch (href){
      case "homo.html":
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
      case "/art/homo.html":
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

      case "/art/wanderlust.html":
        slides = [
          "https://res.cloudinary.com/tayjsolis/image/upload/v1522699787/exhibit_poster_art_printing.jpg",
          "https://res.cloudinary.com/tayjsolis/image/upload/v1530551692/2014-05-28_19.59.01_copy.jpg",
          "https://res.cloudinary.com/tayjsolis/image/upload/v1530551595/wanderlust_sample_page-Recovered_copy.jpg"
        ];
        break;
        case "wanderlust.html":
          slides = [
            "https://res.cloudinary.com/tayjsolis/image/upload/v1522699787/exhibit_poster_art_printing.jpg",
            "https://res.cloudinary.com/tayjsolis/image/upload/v1530551692/2014-05-28_19.59.01_copy.jpg",
            "https://res.cloudinary.com/tayjsolis/image/upload/v1530551595/wanderlust_sample_page-Recovered_copy.jpg"
          ];
          break;
        case "sync.html":
          slides = [
            "https://res.cloudinary.com/tayjsolis/image/upload/v1530549978/WSHcover.jpg",
            "https://res.cloudinary.com/tayjsolis/image/upload/v1530549993/Screen_Shot_2018-07-02_at_9.45.22_AM.png"
          ];
          break;
        case "/art/sync.html":
          slides = [
            "https://res.cloudinary.com/tayjsolis/image/upload/v1530549978/WSHcover.jpg",
            "https://res.cloudinary.com/tayjsolis/image/upload/v1530549993/Screen_Shot_2018-07-02_at_9.45.22_AM.png"
          ];
          break;

    }
    return slides;

  }

var currentSlide = 0;
var e = "taysolis";


$(document).ready(function(){
    $('.welcome').fadeIn(1000).css('display', 'block');
    $('.container').fadeIn(1000).css('display', 'block');
    $('.slides').children('#show').attr('src', slides[currentSlide]);

    // Treehouse Json
      t = "https://teamtreehouse.com/" + e + ".json",

      // Badges JQuery Identifier
      n = $("#badges"),

      // Badges Array
      r = [],

      // Badges Count
      i = 0;

      // Json Parse Treehouse User Badges Info
      $.getJSON(t, function (e) {

        // User Json Parse Select Badges Info
      	var t = e.badges;

        // Construct Each badge's HTML
      	$.each(t, function (e, t) {
      	 r += '<li><a href="' + t.url + '" target="_blank"><img src="' + t.icon_url + '" alt="' + t.name + '" title="' + t.name + '"/></a></li>';
      		i++
      	});

        // Append Badge to #badges
      	n.append(r);

        // Header Badges count generator
      	$("#treehouse-count").append('I have earned ' + i + ' badges at Treehouse!');

        });

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
    $('.dropdown-content').css('display','none');
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
};
