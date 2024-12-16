const segment = 7;
const speed = 22;
const rows = 10;
const cols = 10;
const boxSize = 40;
const appleSize = boxSize;

let canInput = true;

const canvas = document.getElementById("frame");
var ctx = canvas.getContext("2d");
var SCORE = 0;
var BESTSCORE = localStorage.getItem("snake_best_score");
BESTSCORE = (BESTSCORE == null) ? 0 : BESTSCORE;


var sound = document.createElement("audio");
sound.src = "./assets/apple.wav";

var boom = document.createElement("audio");
boom.src = "./assets/boom.wav";

var death = document.createElement("audio");
death.src = "./assets/death.wav";



var stillRefresh = false;
var snakeBody = [];
var fruitType = "";
var firstSpeed = speed;

var apple = {
    x: 0,
    y: 0
}

var velocity = {
    x: 0,
    y: 0
}
var snakeHead = {
    x: 1,
    y: 1
};

function pressTostartGame(a) {

    if (a.key.includes("Arrow")) {

        document.querySelector('#gameFrame').style.filter = "blur(0px)";
        document.querySelector('#info').style.display = "none";

        stillRefresh = true;
        refreshGame();
        window.removeEventListener('keydown', pressTostartGame);

    }
}

function generateAppleCords() {

    let isOn = false;
    let x = Math.floor(Math.random() * rows);
    let y = Math.floor(Math.random() * cols);
    snakeBody.forEach((item) => { if (Math.round(item[0]) == x && Math.round(item[1]) == y) {isOn=true; }})
    apple = { x: x, y: y };
    fruitType = (Math.floor(Math.random() * 100)<15) ? "./assets/mango.svg" : "./assets/apple.svg";

    if (isOn == true) generateAppleCords();

}

function endGame(overType) {

    stillRefresh = false;
    if (Math.floor(Math.random() * 3) == 2) boom.play();
    else death.play();
    if (SCORE > BESTSCORE) localStorage.snake_best_score = SCORE;

    alert( (overType == true) ? ("Game over! Try again") : ("You've won. Congrats!"));
    location.reload();
}

async function refreshGame() {
    canInput = true;

    vx = velocity.x;
    vy = velocity.y;

    for (let n = 0; n < segment; n++) {

        ctx.shadowBlur = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let x = 0; x < rows; x++) {
            for (let y = 0; y < cols; y++) {

                ctx.fillStyle = ((x - y) % 2 == 0) ? "#8ecc39" : "#a7d948";
                ctx.fillRect(x * boxSize, y * boxSize, boxSize, boxSize);
            }
        }


        ctx.fillStyle = "yellow";
        ctx.fillRect(snakeHead.x * boxSize, snakeHead.y * boxSize, boxSize, boxSize);
        t = { x: Math.round(snakeHead.x), y: Math.round(snakeHead.y) };

        if ((t.x >= canvas.width / boxSize) || (t.y >= canvas.height / boxSize) || (t.x < 0) || (t.y < 0)) { endGame(true); return null; }
        if ((Math.round(snakeHead.x) == apple.x) && (Math.round(snakeHead.y) == apple.y)) {

            for (let q = 0; q < segment-1; q++) snakeBody.push([apple.x, apple.y]);
            sound.play();
            if((snakeBody.length) / (segment - 1) == cols * rows){
                endGame(false);
                return;
            }
            if (fruitType == "./assets/apple.svg") firstSpeed += 0.25;
            else firstSpeed -= 3;

            generateAppleCords();
            SCORE++;



        }

        for (let i = 0; i < snakeBody.length; i++) {

            ctx.fillStyle = "green";
            ctx.fillRect(snakeBody[i][0] * boxSize, snakeBody[i][1] * boxSize, boxSize, boxSize);

        }

        ctx.fillStyle = "red";
        img = new Image();
        img.src = fruitType;
        ctx.drawImage(img, apple.x * boxSize, apple.y * boxSize, appleSize, appleSize);

        if (snakeBody.length > 0) {

            for (let i = snakeBody.length - 1; i > 0; i--) {
                if ((snakeHead.x == snakeBody[i][0] && snakeHead.y == snakeBody[i][1])) { endGame(true); return null; }

                let p1 = snakeBody[i - 1][0];
                let p2 = snakeBody[i - 1][1];

                snakeBody[i][0] = p1;
                snakeBody[i][1] = p2;


            }
            snakeBody[0][0] = snakeHead.x;
            snakeBody[0][1] = snakeHead.y;

        }

        snakeHead.x += vx * (1 / segment);
        snakeHead.y += vy * (1 / segment);

        ctx.shadowColor = "black";
        ctx.shadowBlur = 13;
        ctx.lineWidth = 3;
        ctx.fillStyle = "white";
        ctx.font = "24px Courier New";

        ctx.strokeText(("SCORE: " + SCORE), 6 , 30);
        ctx.fillText(("SCORE: " + SCORE), 6, 30);
        ctx.strokeText(("BEST SCORE: " + BESTSCORE), 6, 70);
        ctx.fillText(("BEST SCORE: " + BESTSCORE), 6, 70);

        await new Promise(r => setTimeout(r, firstSpeed));
    }
    if (stillRefresh == true) {
        refreshGame();
        
    }



}

function startGame() {

    canvas.width = rows * boxSize;
    canvas.height = cols * boxSize;
    document.querySelector("#gameFrame").style.width = canvas.width;
    document.querySelector("#gameFrame").style.height = canvas.height;
    generateAppleCords();
    refreshGame();

}

window.onload = startGame;
window.addEventListener("keydown", async function (a) {
    if(!canInput) return;

    if (a.key == "ArrowRight" && velocity.x >= 0) { velocity.x = 1; velocity.y = 0; }
    else if (a.key == "ArrowLeft" && velocity.x <= 0) { velocity.x = -1; velocity.y = 0; }
    else if (a.key == "ArrowUp" && velocity.y <= 0) { velocity.y = -1; velocity.x = 0; }
    else if (a.key == "ArrowDown" && velocity.y >= 0) { velocity.y = 1; velocity.x = 0; }

    canInput = false;
});

window.addEventListener("keydown", pressTostartGame)