# Personal Website
by Tay J Solis
General Assembly
Web Development Immersive
Project 0

This project is a rework of my original personal website. It simplifies my original website by using CSS3 layout tools (grid and flexbox), better responsive design, and individual web development projects.

## Technologies
- HTML5
- CSS3, Animations, Flexbox
- Javascript ES6
- jQuery
- ScrollRevealJS: https://scrollrevealjs.org/
- NASA Astronomy Picture of the Day API
- GoodReads Shelf API

## Approach
I tackled this project first by doing a thorough review/test of my original website. I noted the following major problems:

- Redundant image display — within the Javascript, there was formerly an array of images, but within the HTML the images were also present. This website dynamically creates the images, eliminating the need for the pre-coded HTML images, thus simplifying future image updates.
- The original website had too many categories, including older work. In lieu of this, my portfolio have been updated to only include the most recent projects.
- There were several formatting problems, including but not limited to text that flowed outside of divs on window resize.
- Updated to a more modern style

After meeting these challenges, I proceeded to work on styling and content. I was particularly interested in:

- A polished user experience, including responsiveness and ease of mobile use.
- More interesting content in my About section
- Integrating APIs to my website content

## Notable Moments
### Victories
- I have been meaning to call the NASA APOD API and have had trouble in the past. Turns out I was just using an invalid key. The implementation was straightforward after that.
```JavaScript
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
```
- I used a CSS animation on some of my images. Because there were many different kinds of images I wanted to spin, I decided to create a class to DRY up my code.

### Challenges
- I used the Goodreads Shelf API to create a What I'm Reading Section. I had a lot of trouble with this API - I had a CORS violation that I had to download a Chrome extension to work around (meaning most people won't see what I got out of the API anyways), and on top of that the API was served to me in a convoluted XML file. I've never worked with an XML file before, so after all the work that I put in reading it, using the information from the API was another challenge. All in all, I'm happy that I was able to meet this challenge.

```javascript
.ajax({
  method: 'GET',
  url: goodreadsShelfUrl,
  dataType: "xml",
  success: function(response) {
    $('.currently-reading').prepend('<h2>What I\'m Reading</h2>');
    let books = $(response).find('books').children();
    for (let i = 0; i < books.length; i++) {

      let book = books[i];
      debugger;

      let title = book.querySelector('title').innerHTML;
      let author = book.querySelector('name').innerHTML;
      let link = book.querySelector('link').innerHTML;
      let imageurl = book.querySelector('image_url').innerHTML;

      let html = `<li>
                    <a href="${link}">
                    <img src="${imageurl}"/>
                    <p><em>${title}</em> <br/>by ${author}</p>
                    </a>
                    </li>`;

      $('.reading-list').append(html);
    }
  }
});
```

## To Do
- Reveal Animation
- Swipe on Slideshow
