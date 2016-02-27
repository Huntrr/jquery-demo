console.log('Hello world!');

var INTERVAL = 20;
var MAX_STARS = 150;
var STAR_INTERVAL = 20;

$(document).ready( function() {
  console.log('Hello jQuery!');

  var $sun = $('#sun');
  var $bg = $('#background');

  var width = $(window).width();
  var height = $(window).height();

  var stars = [];
  var planets = [];

  var starTimer = 0;

  /**
   * Positions elements properly based on screen size
   */
  var positionElements = function() {
    width = $(window).width();
    height = $(window).height();

    var sunX = (width / 2) - ($sun.width() / 2);
    var sunY = (height / 2) - ($sun.height() / 2);
    $sun.css('left', sunX);
    $sun.css('top', sunY);
  }

  /**
   * Creates a new star. Deleting an old one if we're at capacity
   */
  var createStar = function() {
    var newStar = $('<img class="star" src="img/star.png" />');

    var x = Math.random() * width;
    var y = Math.random() * height;
    newStar.css('left', x);
    newStar.css('top', y);

    var w = Math.random() * 5;
    newStar.css('width', w);
    
    $bg.append(newStar);
    stars.push(newStar);

    while(stars.length > MAX_STARS) {
      stars.shift().remove();
    }
  }

  //for(var i = 0; i < MAX_STARS; i++) {
    //createStar();
  //}


  var loop = setInterval(function() {
    starTimer += INTERVAL;

    if(starTimer > STAR_INTERVAL) {
      starTimer = 0;
      createStar();
    }

  }, INTERVAL);

  $(window).resize(function(e) {
    positionElements();
  });
  positionElements();
} );
