const rows = 20;
const cols = 20;
const boxSize = 25;

const canvas = document.getElementById("frame");
var ctx = canvas.getContext("2d");


var snakeBody = [];

var apple = {
    x:0,
    y:0
}

var velocity = {
    x:0,
    y:0
}
var snakeHead = {
    x:5,
    y:5
};

function generateAppleCords() {

    let x = Math.floor(Math.random() * rows);
    let y = Math.floor(Math.random() * cols);

    apple =  {x:x, y:y};

}

function refreshGame() {

    ctx.clearRect(0,0, canvas.width, canvas.height);

    for (let x = 0; x < rows; x++) {
        for (let y = 0; y < cols; y++) {
            ctx.fillStyle = ((x-y)% 2 == 0) ? "#8ecc39" : "#a7d948";
            ctx.fillRect(x * boxSize, y * boxSize, boxSize, boxSize);
        }
    }

    ctx.fillStyle = "red";
    ctx.fillRect(apple.x*boxSize, apple.y*boxSize, boxSize, boxSize);

    ctx.fillStyle = "green";
    ctx.fillRect(snakeHead.x * boxSize, snakeHead.y * boxSize, boxSize, boxSize);

    if ((snakeHead.x >= canvas.width/boxSize) || (snakeHead.y >= canvas.height/boxSize) || (snakeHead.x < 0) || (snakeHead.y < 0)) {
        "..."
    }

    if ((snakeHead.x == apple.x) && (snakeHead.y == apple.y)) {
        snakeBody.push([apple.x, apple.y]);
        generateAppleCords();

    }

    for (let i=0; i<snakeBody.length; i++ ) {

        ctx.fillStyle = "green";
        ctx.fillRect(snakeBody[i][0] * boxSize, snakeBody[i][1]* boxSize, boxSize, boxSize);

    }
   
    if (snakeBody.length > 0) {

        for (let i = snakeBody.length - 1; i > 0; i--) {
            snakeBody[i][0] = snakeBody[i - 1][0];
            snakeBody[i][1] = snakeBody[i - 1][1];
        }
        snakeBody[0][0] = snakeHead.x;
        snakeBody[0][1] = snakeHead.y;

}

    snakeHead.x += velocity.x;
    snakeHead.y += velocity.y;



}

function startGame() {


    canvas.width = rows * boxSize;
    canvas.height = cols * boxSize;
    generateAppleCords();
    setInterval(refreshGame, 100);

}

window.onload = startGame;
window.addEventListener("keydown", (a)=>{
    if (a.key == "ArrowRight" && velocity.x >= 0 ) {velocity.x = 1; velocity.y = 0;}
    else if (a.key == "ArrowLeft" && velocity.x <= 0 ) {velocity.x = -1; velocity.y = 0;}
    else if (a.key == "ArrowUp" && velocity.y >= 0 ) {velocity.y = -1; velocity.x = 0;}
    else if (a.key == "ArrowDown" && velocity.y <= 0 ) {velocity.y = 1; velocity.x = 0;}

});