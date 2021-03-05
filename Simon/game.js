let buttonColours = ["red", "blue", "green", "yellow"];
let randomChosenColour;
let gamePattern = [];

let userPattern = [];

let audios = new Map([["red",new Audio("sounds/red.mp3")],
    ["blue",new Audio("sounds/blue.mp3")],
    ["green", new Audio("sounds/green.mp3")], 
    ["yellow", new Audio("sounds/yellow.mp3")]
]);

let level = 0;


function nextSequence(){
    level++;
    $("#level-title").html(`Level ${level}`);

    let randomNumber;
    let min = 0;
    let max = 3;

    randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    gamePattern.forEach(function(v,i,a){
        setTimeout( () => {
            animateButton(v);
        }, i * 1000);
        
    });
    
    
}

function animateButton(color){
    $("#" + color).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    audios.get(color).volume = .3;
    audios.get(color).play();
}


function animatePress(color){
    $("#" + color).addClass("pressed");
    setTimeout(() => { $("#" + color).removeClass("pressed") }, 100)
}
function buttonClick(){
    let userChosenColour = $(this).attr("id");
    animateButton(userChosenColour);
    animatePress(userChosenColour);
    userPattern.push(userChosenColour);
    comparePatterns();
}

function comparePatterns(){
    
    let valido = true;
    userPattern.forEach((v,i,a) => {
        if(v != gamePattern[i])
            valido = false;
    });
    if(!valido){
        $("#level-title").html("Game Over. Press any key to start");
        
        $("body").addClass("game-over");
        setTimeout(() => { $("body").removeClass("game-over") }, 200)
        
        level = 0;
        gamePattern = [];
        userPattern = [];
    }
    else{
        if(userPattern.length == gamePattern.length){
            setTimeout(nextSequence, 2000);
            userPattern = [];        
        }
    }

}

$(".btn").click(buttonClick);

$(window).on("keypress", function() {
    if(level === 0){
        $("#level-title").html("Level 0");
        nextSequence();
    }
});