var canvas = document.getElementById("game");

if ((window.screen.width / window.screen.height) > 0.47 && window.screen.width <= 425) {
    let canvasHeight = canvas.getBoundingClientRect().height; // window.screen.width*2.17
    canvas.style.top = "-" + Math.min(canvasHeight * .15, canvasHeight - window.screen.height) + "px";
}

var ctx = canvas.getContext("2d");
ctx.scale(.6, .6);

var score;
var grid;
var game_over;
var restartMouseOver;

var restartGame = function() {
    score = 0;
    grid = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    game_over = false;

    let randI = Math.floor(Math.random()*4);
    let randJ = Math.floor(Math.random()*4);

    grid[randI][randJ] = 2;
    randI = Math.floor(Math.random()*4);
    randJ = Math.floor(Math.random()*4);
    grid[randI][randJ] = 2;
}

restartGame();

background.onload = function() {
    render(); // why can't this be assigned to onload alone?
    inputInit(); // start the game
};
