'use strict';
var gamePattern = [], userClickedPattern = [], buttonColours = ['red', 'blue', 'green', 'yellow'], level = 0, started = false;

$(document).keydown(function (x) {
  if (!started) {
    $('#level-title').text('level ' + level);
    nextSequence();
    started = true;
  }
});

// TODO USER CLICKS
$('.btn').on('click', function (x) {
  // console.log(x);
  // console.log(x.target);
  // console.log(x.target.id);
  var userChosenColor = $(this).attr('id');
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

// TODO CHECK ANSWER
function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound('wrong');
    $('body').addClass('game-over');
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 200);
    startOver();
  }
}

// TODO GAME SEQUENCE (Random)
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4), randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// TODO USER CLICK ANIMATE PRESS
function animatePress(currentColor) {
  $('#' + currentColor).addClass('pressed');
  setTimeout(() => {
    $('#' + currentColor).removeClass('pressed');
  }, 100);
}

// TODO PLAY SOUND(Random)
function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

// TODO START OVER
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}