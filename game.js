
var level = 0;
var started = false;

var gamePattern = [];
var userClickedPattern = [];

function nextSequence() {
    updateLevel();
    
    var rand = Math.floor(Math.random() * 4) + 1;
    var randButton = "btn"+rand;
    playSound(randButton);

    gamePattern.push(randButton);
    $("#" + randButton).fadeOut(200).fadeIn(200);
}

function updateLevel(){
    level++;
    $("header").html("level " + level);
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        // updateLevel();

        if(userClickedPattern.length === gamePattern.length){
         var intervalId  = setInterval(function(){
                nextSequence();
            }, 2000);
        }
    }
    else{
        gameOver();
        startOver();
        // clearInterval(intervalId);
    } 
}

function gameOver(){
    playSound("gameOver");
    $("header").html("Oops! Try Again");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);
    
}

function startOver(){
    // started = false;
    // level = 0;
    // gamePattern = [];
    setTimeout(function(){
        location.reload();
    }, 1000);
    
}

$(document).keydown(function () {
    if (!started) {
        nextSequence();
        $("header").html("Level "+level);
        started = true;        
    }
});

$("button").click(function () {
    var activeButtonId = this.id;
    $(activeButtonId).fadeOut(100).fadeIn(100);

    userClickedPattern.push(activeButtonId);
//    console.log(userClickedPattern);
    
    playSound(activeButtonId);

    checkAnswer(userClickedPattern.length-1);
});



function playSound(btn) {
    var sound;
    switch (btn) {
        case "btn1":
            sound = new Audio("sounds/green.mp3");
            break;

        case "btn2":
            sound = new Audio("sounds/red.mp3");
            break;

        case "btn3":
            sound = new Audio("sounds/yellow.mp3");
            break;

        case "btn4":
            sound = new Audio("sounds/blue.mp3");
            break;

        case "gameOver":
            sound = new Audio("sounds/wrong.mp3");
            break;
    }
    sound.play();
}