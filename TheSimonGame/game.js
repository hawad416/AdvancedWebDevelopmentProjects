var gamePattern = [];
var userClickedPattern = [];
var level = 0;

//array of random colors
var buttonColours = ["red", "blue", "green", "yellow"];




//function to generate random number
function nextSequence(){

var randomNumber = Math.floor(Math.random() * 4);
var randomChosenColor = buttonColours[randomNumber];

//adding random color to gamePAttern array
gamePattern.push(randomChosenColor);

var buttonSelected = $("#" + randomChosenColor);
buttonSelected.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

playSound(randomChosenColor);

level++;

$("#level-title").text("Level " + level);



}


//fucnction when user clicks to play sounds
$(".btn").on("click", handler);
function handler(){

    var userChosenColour = $(this).attr("id");

    playSound(userChosenColour);

    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100)
}

$(document).on("keydown",function(){
    var started = $(document).ready;
    if(started){
        
        $("#level-title").text("Level " + level);
        nextSequence();
        started = false;
       
    }

});
 
    
function checkAnswer(currentLevel){
    

        if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
            console.log("success");

            //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");

      //1. In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
      playSound("wrong");

      //2. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      //3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
      $("#level-title").text("Game Over, Press Any Key to Restart");

      startOver();

    }
        
    }


    function startOver(){
        level = 0;
        started = true;
        gamePattern = [];
      }

      
