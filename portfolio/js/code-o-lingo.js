/*
Code-o-lingo is an educational game inspired by Duolingo's drag and drop exercises.
It is intended to teach coding structure for HTML, CSS, and Javascript;
*/
const header = document.querySelector("header");
const main = document.querySelector("main");
const game = document.querySelector(".game");
const codeSnippets = document.querySelector(".codeSnippets");
const puzzleBox = document.querySelector(".puzzleBox");
const instructions = document.querySelector(".instructions");
const message = document.querySelector(".message");
const win = document.querySelector(".win");

//Navigation Links
const htmlNav = document.querySelector("#html");
const cssNav = document.querySelector("#css");
const jsNav = document.querySelector("#js");

//Game Buttons
const resetBtn = document.querySelector(".reset");
const checkBtn = document.querySelector(".check");
const startBtn = document.querySelector(".start");
const nextBtn = document.querySelector(".next");
const winBtn = document.querySelector(".winBtn");
const hintBtn = document.querySelector(".hint");

//Keeps track of which level the player is on
let levelCount = 0;

//Takes an array and shuffles it
const shuffle = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let j = Math.floor(Math.random() * arr.length);
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

//Vanilla JS alternatives to jQuery fadeIn/fadeOut
const fadeOut = (elm) => {;
  setInterval(function() {
    if (!elm.style.opacity) elm.style.opacity = 1;
    if (elm.style.opacity > 0) {
      elm.style.opacity -= 0.1;
    } else {
      clearInterval();
    }
  }, 100);
  setTimeout(function() {
    elm.style.display = "none";
  }, 1500);
}

const fadeIn = (elm) =>{
  let count = 0;
  setInterval(function(){
    if (!elm.style.opacity) elm.style.opacity = 0;
    if(elm.style.opacity < 1) {
      count += .1
      elm.style.opacity = count;
    } else{
      clearInterval();
    }
  }, 100);
}

//Accepts a Level object argument, checks the user's puzzle box against the Level object's solution property.
const checkSolution = (level) => {

  let checkThis = "";
  for (let i = 0; i < puzzleBox.children.length; i++) {
    checkThis += puzzleBox.children[i].getAttribute("id");
  }
  console.log(`${checkThis} is being compared to ${level.solution}`);
  if (checkThis === level.solution) {
    return true;
  } else {
    return false;
  }

}

//A Level has three properties: The language that the level is in, the array of provided nodes, and the solution string.
class Level {
  constructor(language, nodes, solution, hint) {
    this.language = language;
    this.nodes = nodes;
    this.solution = solution;
    this.hint = hint;
  }
  //Create level dynamically creates code snippet nodes and populates them into the pieces div.
  createLevel() {
    shuffle(this.nodes);
    for (let i = 0; i < this.nodes.length; i++) {
      let nodeText = this.nodes[i]
      let newNode = document.createElement("li");
      newNode.setAttribute("id", nodeText);
      newNode.innerHTML = nodeText;
      newNode.addEventListener("click", function() {
        if (instructions.style.display !== "none") instructions.style.display = "none";
        message.innerHTML = "";
        if (newNode.parentElement === codeSnippets) {
          codeSnippets.removeChild(newNode);
          puzzleBox.appendChild(newNode);
        } else {
          puzzleBox.removeChild(newNode);
          codeSnippets.appendChild(newNode);
        }
      });
      codeSnippets.appendChild(newNode);
    }
  }
}


//Level Objects

//HTML Levels
const htmlLvls = 0;
let levelOne = new Level(
  "HTML",
  ["<", "/>", ">", "p", "text", "Hello future programmer!", "<", ">", "/p", "/text"],
  "<p>Hello future programmer!</p>",
  "Create a paragraph element that says hello!"
);

let levelTwo = new Level(
  "HTML",
  ["<", "/>", ">", "a", "src=", "href=", "link", "#url.com", "url", "url.com", "\'", "\'", "This is my link", " ", "/", "<", ">", "/a", "/link", "ahref="],
  "<a href=\'url.com\'>This is my link</a>",
  "Link to url.com"
);

let levelThree = new Level(
  "HTML",
  ["<", "ul", ">", "/>", ">",
  "li", "/li", "a", "src=", "href=", "\'#about\'", "\'about\'", "About", "/a", ">", ">",
  "<", "\</", "<", "<", "ul", ">", "<", ">", " ", "list", "item", "/list", "/item"],
  "<ul><li><a href=\'#about\'>About</a></li></ul>",
  "Create a list where the first item is a link to the about section on this page."
);

//CSS Levels
const cssLvls = 3;

let levelFour = new Level(
  "CSS",
  ["<p>", "p", "{", "(", "<", "{p}", "}", ")", ">", "font-size", "text-size", ":", "=", "{", "}", "30pt", "30px", "30", ".", ";"],
  "p{font-size:30px;}",
  "I need the font of this p to be sized to 30 pixels."
);

let levelFive = new Level(
  "CSS",
  ["div", "<div>", "{div}", "div:", "\{", "\}", "<", ">", "=", "(", ")", "area: 1600px", "width: 400px; height: 400px;", "width-height: 400px;", "position: center;", "align: center", "margin: 0 auto", ";", "margin=0 auto;", "width", "400pt", "400px;", "height=400px;"],
  "div\{width: 400px; height: 400px;margin: 0 auto;\}",
  "I need a div centered on the page with a width and height of 400px."
);

let levelSix = new Level(
  "CSS",
  ["body", "\{", "display:flex;", "display:flexbox;", "position:flexbox;", "flexbox:row;", "flex-direction:row;", "flex-arrangement:row", ";", "justify-content:center", "flex-justify:center", "align-items:center", ";", ";", ";","}", "justify-items:center;", "align-content:center;"],
  "body{display:flex;flex-direction:row;justify-content:center;align-items:center;\}",
  "I need a flexbox layout with everythhing centered horizontally and vertically."
);

//Javascript Levels
const jsLvls = 6;

let levelSeven = new Level(
  "JS",
  [";", "\'", "\'", "=0", "=1", "for(", "times(", "times 10", ")", "\{", "\}", "\;", "i", "=", "\<", "int i", "let i", "print", "log","console.log", "i++", ";","until i", "arr", "(", ")", "arr", "[i]", ".(i)", "arr.length", "make i", "const i"],
  "for(let i=0;i<arr.length;i++){console.log(arr[i];}",
  "I need to iterate through an array and log the value of each part of the array into the console."
);

let levelEight = new Level(
  "JS",
  ["array", ".forEach", "(", "function(", "currentValue,", "i,", "arr", "){","currentValue", "+=i", ";", "});", ".each", "eachItem", ".for", ","],
  "array.forEach(function(currentValue,i,arr){currentValue+=i;});",
  "I want to add each value in an array with its index."
);

let levelNine = new Level(
  "JS",
  ["document", "body", "potato", ".querySelector", "getElement", ".get", ".withClass", ".select", "(\'potato\')", "(\'.potato\')", "(potato)", "(.potato)", ".add", ".on", ".onClick", ".setEventListener", ".event", ".addEventListener", "(", ")", "};", "{", "\'click\'", "click", ",", "function", "(){", "{", "}", "bake", "()", ";", "});", "(", ")"],
  "document.querySelector(\'.potato\').addEventListener(\'click\',function(){bake();});",
  "I have a potato on my page, and when I click on it, I want to bake it."
);

let levelTen = new Level(
  "JS",
  ["function", "sort(color)", "switch", "color", "(color)",":", "case:", "case", "red:", "\'red\':","boxColor=\'red\'", ";", "boxColor", "red", "case \'blue\'", "case blue", ":", "boxColor=\'blue\';", "boxColor", "=\'green\';", "{", "case green", "case \'green\'", "blue;", "box Color", "=", "]", "}", "{", "]", "}", "break;", "break", ";", "break;"],
  "functionsort(color){switch(color){case\'red\':boxColor=\'red\';break;case \'green\':boxColor=\'green\';break;case \'blue\':boxColor=\'blue\';break;}}",
  "I need a switch case that changes the boxColor to red, green, and blue (in that order), depending on what I click."
);



let levels = [levelOne, levelTwo, levelThree, levelFour, levelFive, levelSix, levelSeven, levelEight, levelNine];

//Resets the board (usually on the current level)
const reset = (level) => {
  puzzleBox.innerHTML = "";
  codeSnippets.innerHTML = "";
  message.innerHTML = "";
  setUpGame(level);
}

const setUpGame = (level) => {
  level.createLevel();
}

const init = () => {
  let level = levels[0];
  startBtn.addEventListener("click", function() {
    fadeOut(header);
    setTimeout(function() {
      main.style.display = "block";
      fadeIn(main);
    }, 1600);
    setUpGame(levels[0]);
  });

  checkBtn.addEventListener("click", function() {
    if (checkSolution(levels[levelCount])) {
      if (levelCount === levels.length - 1) {
        game.style.display = "none";
        win.style.display = "block";
      }
      message.innerHTML = "Correct!";
      checkBtn.style.display = "none";
      nextBtn.style.display = "inline";
    } else {
      message.innerHTML = "Whoops, try again.";
    }
  });

  nextBtn.addEventListener("click", function() {
    checkBtn.style.display = "inline";
    nextBtn.style.display = "none";
    levelCount++;
    reset(levels[levelCount]);
  });

  resetBtn.addEventListener("click", function() {
    reset(levels[levelCount]);
  });

  winBtn.addEventListener("click", function() {
    levelCount = 0;
    win.style.display = "none";
    game.style.display = "block";
    reset(levels[0]);
  });

  htmlNav.addEventListener("click", function(){
    levelCount = htmlLvls;
    reset(levels[levelCount]);
  });

  cssNav.addEventListener("click", function(){
    levelCount = cssLvls;
    reset(levels[levelCount]);
  });

  jsNav.addEventListener("click", function(){
    levelCount = jsLvls;
    reset(levels[levelCount]);
  });

  hintBtn.addEventListener("click", function(){
    message.innerHTML = levels[levelCount].hint;
  });
}

init();
