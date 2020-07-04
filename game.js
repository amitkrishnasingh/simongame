$(document).ready(function() {

  userClickedPattern = [];
  gamePattern = [];
  buttonColours = ["red", "blue", "green", "yellow"];

  $(".btn").click(function() {
    userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  });

  var level = 0;
  var started = false;
  $(document).keydown(function() {
    if (!started) {
      started = true;
      nextSequence();
    }
  });

  function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").html("Level " + level);
    randomNumber = Math.floor(Math.random() * 4);

    randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
  }

  function playSound(chosenColorAudio) {
    var audio = new Audio("sounds/" + chosenColorAudio + ".mp3");
    audio.play();
  }

  function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
      $("#" + currentColour).removeClass("pressed")
    }, 100);
  }

  function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
      console.log("success");

      if (userClickedPattern.length == gamePattern.length) {
        setTimeout(function() {
          nextSequence();
        }, 1000);

      }
    } else {
      console.log("failure");
      playSound("wrong");
      //Game Over
      $("body").addClass("game-over");
      //remove Game Over CSS after some time
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);
      $("h1").html("Game Over, Press Any Key to Restart");

      startOver();
    }
  }

  function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }
});
