console.log('Hello world!');

var INTERVAL = 20;
var MAX_STARS = 150;
var STAR_INTERVAL = 20;

$(document).ready( function() {
  console.log('Hello jQuery!');

  var $sun = $('#sun');
  var $bg = $('#background');
  var $fg = $('#foreground');

  var width = $(window).width();
  var height = $(window).height();
  var sunX = 0;
  var sunY = 0;

  var stars = [];
  var planets = [];

  var starTimer = 0;

  /**
   * Positions elements properly based on screen size
   */
  var positionElements = function() {
    width = $(window).width();
    height = $(window).height();

    sunX = (width / 2);
    sunY = (height / 2);

    var x = sunX - ($sun.width() / 2);
    var y = sunY - ($sun.height() / 2);
    $sun.css('left', x);
    $sun.css('top', y);
  }

  /**
   * Creates a new star. Deleting an old one if we're at capacity
   */
  var createStar = function() {
    var newStar = $('<img class="star" src="img/star.png" />');

    x = Math.random() * width;
    y = Math.random() * height;
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


  var loop = setInterval(function() {
    starTimer += INTERVAL;

    if(starTimer > STAR_INTERVAL) {
      starTimer = 0;
      createStar();
    }

    for(var p = 0; p < planets.length; p++) {
      planets[p].update();
    }
  }, INTERVAL);

  $(window).resize(function(e) {
    positionElements();
  });
  positionElements();

  
  var addPlanet = function() {
    planets.push(PlanetFactory());
  }
  
  var removePlanet = function() {
    if(planets.length > 0) {
      planets.pop().remove();
    }
  }

  $(window).keypress(function(e) {
    if(e.keyCode === 97) {
      addPlanet();
    }

    if(e.keyCode === 122) {
      removePlanet();
    }
  });



  function PlanetFactory() {
    var type = Math.floor(Math.random() * 6) + 1;
    var distance = Math.random() * (width / 2 - $sun.width()) + $sun.width() / 2;
    var speed = Math.random() * 0.06;
    var size = Math.random() * 30 + 20;

    return Planet(type, distance, speed, size);
  }
  
  function Planet(type, distance, speed, size) {
    var t = Math.random() * 2 * Math.PI;
    var $elem = $('<img class="planet" src="img/' + type + '.png" />');
    $elem.css('width', size);
    var x = 0;
    var y = 0;

    $fg.append($elem);

    var updatePos = function() {
      x = Math.cos(t) * distance + sunX - $elem.width()/2;
      y = Math.sin(t) * distance + sunY - $elem.width()/2;
    }

    var draw = function() {
      $elem.css('left', x);
      $elem.css('top', y);
    }

    return {
      update: function() {
        t += speed;

        pos = updatePos();
        draw();
      },
      remove: function() {
        $elem.remove();
      }
    };
  }
} );


