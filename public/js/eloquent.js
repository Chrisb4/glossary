// The event beforeunload fires before a page is left or refreshed
// Use this event to stop a client from navigating away without a prompt.
// window.addEventListener("beforeunload", function (event) {
//   event.returnValue = "\o/";
// });

//Update github 

// Mouse Motion //////////////////////
var lastX; // Tracks the last observed mouse x position
var rect = document.querySelector('div.drag-bar');


rect.addEventListener('mousedown', function(event){
  if (event.which == 1) {
    lastX = event.pageX;
    addEventListener('mousemove', moved);
    event.prefentDefault(); // Prevent selection
  }
});

function buttonPressed(event) {
  if (event.buttons == null)
    return event.which != 0;
    else
      return event.buttons != 0;
}

function moved(event) {
  if (!buttonPressed(event)) {
    removeEventListener('mousemove', moved);
  } else {
    var dist = event.pageX - lastX;
    var newWidth = Math.max(10, rect.offsetWidth + dist);
    rect.style.width = newWidth +'px';
    lastX = event.pageX
  }
}
///////////////////////////////
// Scroll Progress bar
var parentBar = document.querySelector('.progress');
var bar = document.querySelector('.progress div');
addEventListener('scroll', function() {
  let docHeight = document.body.scrollHeight;
  var max = document.body.scrollHeight - innerHeight;
  var percent = (pageYOffset / max) * 100;
  bar.style.width = percent + '%';
  // console.log(pageYOffset);
});
var btnProgress = document.querySelector('#progress-button');

btnProgress.addEventListener('click', function() {
  parentBar.classList.toggle('progress-sticky');
  console.log(parentBar.classList[1]);
  // parentBar.setAttribute('class', 'progress progress-sticky');
});

///////////////////////////
// Focus Events

var help = document.querySelector('#help');
var fields = document.querySelectorAll('input');
for (var i = 0;  i < fields.length; i++) {
  fields[i].addEventListener('focus', function(event){
    var text = event.target.getAttribute('data-help');
    help.textContent = text;
    help.classList.toggle('dotted');
  });
  fields[i].addEventListener('blur', function(event){
    help.textContent = '';
    help.classList.toggle('dotted');
  });
}

// Mouse Tails /////////////
function showCoords(evt){
  console.log(
    "clientX value: " + evt.clientX + "\n" +
    "clientY value: " + evt.clientY + "\n"
  );
}
var mouseDiv = document.querySelector('#mouse-div');

function addMouse(posX, posY) {
  let move = posX;
  if (move != move) {

  }
}

mouseDiv.addEventListener('mouseover', function(event) {
  mouseDiv.addEventListener('mousemove', function(e) {
    var posX = e.clientX;
    var posY = e.clientY;
    console.log(posX, posY);

  })
});


/////////////////

// Setting Timers //////////////
// var bombTimer = setTimeout(function() {
//   console.log("BOOM!");
// }, 500);
//
// if (Math.random() < 0.5) {
//   console.log('Defused.');
//   clearTimeout(bombTimer);
// };
//
// var ticks = 0;
// var MStimer = 1000;
// var clock = setInterval(function() {
//   console.log(ticks++ + ' *', MStimer, 'milliseconds');
//   if (ticks == 10) {
//     clearInterval(clock);
//     console.log('stop');
//   }
// }, MStimer);
//////////////////
// dots is an array of Dot objects,
// mouse is an object used to track the X and Y position
   // of the mouse, set with a mousemove event listener below
var dots = [],
    mouse = {
      x: 0,
      y: 0
    };

// The Dot object used to scaffold the dots
var Dot = function() {
  this.x = 0;
  this.y = 0;
  this.node = (function(){
    var n = document.createElement("div");
    n.className = "trail";
    document.body.appendChild(n);
    return n;
  }());
};
// The Dot.prototype.draw() method sets the position of
  // the object's <div> node
Dot.prototype.draw = function() {
  this.node.style.left = this.x + "px";
  this.node.style.top = this.y + "px";
};

// Creates the Dot objects, populates the dots array
for (var i = 0; i < 12; i++) {
  var d = new Dot();
  dots.push(d);
}

// This is the screen redraw function
function draw() {
  // Make sure the mouse position is set everytime
    // draw() is called.
  var x = mouse.x,
      y = mouse.y;

  // This loop is where all the 90s magic happens
  dots.forEach(function(dot, index, dots) {
    var nextDot = dots[index + 1] || dots[0];

    dot.x = x;
    dot.y = y;
    dot.draw();
    x += (nextDot.x - dot.x) * .6;
    y += (nextDot.y - dot.y) * .6;

  });
}

addEventListener("mousemove", function(event) {
  //event.preventDefault();
  mouse.x = event.pageX;
  mouse.y = event.pageY;
});

// animate() calls draw() then recursively calls itself
  // everytime the screen repaints via requestAnimationFrame().
function animate() {
  draw();
  requestAnimationFrame(animate);
}

// And get it started by calling animate().
// animate();
