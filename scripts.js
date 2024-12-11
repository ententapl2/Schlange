const segment = 5;
const speed = 22;
const rows = 20;
const cols = 20;
const boxSize = 50;
const appleSize = boxSize;

const canvas = document.getElementById("frame");
var ctx = canvas.getContext("2d");
var stillRefresh=true;


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

function endGame() {

    stillRefresh=false;
    alert("Game over! Try again");
    location.reload();
}

async function refreshGame() {

    vx = velocity.x;
    vy = velocity.y;

    for (let n=0; n<segment; n++) {

        ctx.clearRect(0,0, canvas.width, canvas.height);

        for (let x = 0; x < rows; x++) {
            for (let y = 0; y < cols; y++) {
                ctx.fillStyle = ((x-y)% 2 == 0) ? "#8ecc39" : "#a7d948";
                ctx.fillRect(x * boxSize, y * boxSize, boxSize, boxSize);
            }
        }

        ctx.fillStyle = "red";
        img = new Image();
        img.src = "assets/apple.svg";
        ctx.drawImage(img, apple.x*boxSize, apple.y*boxSize, appleSize, appleSize);

        ctx.fillStyle = "green";
        ctx.fillRect(snakeHead.x * boxSize, snakeHead.y * boxSize, boxSize, boxSize);
        t = {x:Math.round(snakeHead.x), y:Math.round(snakeHead.y)};

        if ((t.x>= canvas.width/boxSize) || (t.y >= canvas.height/boxSize) || (t.x < 0) || (t.y < 0)) {endGame();return null;}
        if ((Math.round(snakeHead.x) == apple.x) && (Math.round(snakeHead.y) == apple.y)) {

            for (let q=0; q<4; q++) snakeBody.push([apple.x, apple.y]);
            generateAppleCords();

        }

        for (let i=0; i<snakeBody.length; i++ ) {

            ctx.fillStyle = "green";
            ctx.fillRect(snakeBody[i][0] * boxSize, snakeBody[i][1]* boxSize, boxSize, boxSize);

        }
    
        if (snakeBody.length > 0) {

            for (let i = snakeBody.length - 1; i > 0; i--) {

                let p1 = snakeBody[i - 1][0];
                let p2 = snakeBody[i - 1][1];

                snakeBody[i][0] = p1;
                snakeBody[i][1] = p2;                

                
            }
            snakeBody[0][0] = snakeHead.x;
            snakeBody[0][1] = snakeHead.y;

        }

        snakeHead.x += vx*(1/segment);
        snakeHead.y += vy*(1/segment);
        await new Promise(r => setTimeout(r, speed));
    }
    if (stillRefresh == true) refreshGame();



}

function startGame() {

    canvas.width = rows * boxSize;
    canvas.height = cols * boxSize;
    generateAppleCords();
    refreshGame();

}

window.onload = startGame;
window.addEventListener("keydown", async function(a){

    if (a.key == "ArrowRight" && velocity.x >= 0 ) {velocity.x = 1; velocity.y = 0;}
    else if (a.key == "ArrowLeft" && velocity.x <= 0 ) {velocity.x = -1; velocity.y = 0;}
    else if (a.key == "ArrowUp" && velocity.y <= 0 ) {velocity.y = -1; velocity.x = 0;}
    else if (a.key == "ArrowDown" && velocity.y >= 0 ) {velocity.y = 1; velocity.x = 0;}

});