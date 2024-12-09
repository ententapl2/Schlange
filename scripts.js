const rows = 20;
const cols = 20;
const boxSize = 25;

const canvas = document.getElementById("frame");
var ctx = canvas.getContext("2d");


var snakeBody = [];
var velocity = {
    x:0,
    y:0
}
var snakeHead = {
    x:0,
    y:0
};

function refreshGame() {

    ctx.clearRect(0,0, canvas.width, canvas.height);

    for (let x = 0; x < rows; x++) {
        for (let y = 0; y < cols; y++) {
            ctx.fillStyle = ((x-y)% 2 == 0) ? "#8ecc39" : "#a7d948";
            ctx.fillRect(x * boxSize, y * boxSize, boxSize, boxSize);
        }
    }

    ctx.fillStyle = "green";
    ctx.fillRect(snakeHead.x * boxSize, snakeHead.y * boxSize, boxSize, boxSize);

    snakeHead.x += velocity.x;
    snakeHead.y += velocity.y;

}

function startGame() {


    canvas.width = rows * boxSize;
    canvas.height = cols * boxSize;
    setInterval(refreshGame, 100);

}



window.onload = startGame;
window.addEventListener("keydown", (a)=>{
    if (a.key == "ArrowRight" && velocity.x >= 0 ) {velocity.x = 1; velocity.y = 0;}
    else if (a.key == "ArrowLeft" && velocity.x <= 0 ) {velocity.x = -1; velocity.y = 0;}
    else if (a.key == "ArrowUp" && velocity.y >= 0 ) {velocity.y = -1; velocity.x = 0;}
    else if (a.key == "ArrowDown" && velocity.y <= 0 ) {velocity.y = 1; velocity.x = 0;}

    console.log(a.key);
    
});