/* Vanilla JS Version*/

/*
Receives an image URL from NASA's Astronomy Picture of the Day API and sets it as the header background
If the API is down, it leaves the default background up.
*/

let header = document.querySelector('header');
var request = new XMLHttpRequest();
request.open('GET', 'https://api.nasa.gov/planetary/apod?api_key=dcBZXp3YhRP5hfMxGNxJqCVEGHfPENe04CAdJste', true);

request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    var data = JSON.parse(request.responseText);
    header.style.backgroundImage = `url(${data.url})`;
  } else {
    // We reached our target server, but it returned an error

  }
};

request.send();
