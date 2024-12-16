const segment = 8;
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


var eating = document.createElement("audio");
eating.src = "./assets/apple.wav";

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
        startGame();
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
    if (Math.floor(Math.random() * 3) == 2) boom.play(); else death.play();
    if (SCORE > BESTSCORE) localStorage.snake_best_score = SCORE;

    alert( (overType == true) ? ("Game over! Try again") : ("You've won. Congrats!"));
    location.reload();
}

async function refreshGame() {

    if (key == "ArrowRight" && velocity.x >= 0) { velocity.x = 1; velocity.y = 0; }
    else if (key == "ArrowLeft" && velocity.x <= 0) { velocity.x = -1; velocity.y = 0; }
    else if (key == "ArrowUp" && velocity.y <= 0) { velocity.y = -1; velocity.x = 0; }
    else if (key == "ArrowDown" && velocity.y >= 0) { velocity.y = 1; velocity.x = 0; }

    vx = velocity.x;
    vy = velocity.y;

    for (let n=0; n<segment; n++) {


        /* --------  POCZĄTEK RYSOWANIA OBIEKTÓW --------  */

        snakeHead.x += vx * (1/segment);
        snakeHead.y += vy * (1/segment);

        ctx.shadowBlur = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let n = 0; n < segment; n++) {

            ctx.shadowBlur = 0;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
    
            for (let x = 0; x < rows; x++) {
                for (let y = 0; y < cols; y++) {
    
                    ctx.fillStyle = ((x - y) % 2 == 0) ? "#8ecc39" : "#a7d948";
                    ctx.fillRect(x * boxSize, y * boxSize, boxSize, boxSize);
                }
            }
        }

        ctx.fillStyle = "yellow";
        ctx.fillRect(snakeHead.x * boxSize, snakeHead.y * boxSize, boxSize, boxSize);

        for (let i = 0; i < snakeBody.length; i++) {

            ctx.fillStyle = "green";
            ctx.fillRect(snakeBody[i][0] * boxSize, snakeBody[i][1] * boxSize, boxSize, boxSize);

        }

        img = new Image();
        img.src = fruitType;
        ctx.drawImage(img, apple.x * boxSize, apple.y * boxSize, appleSize, appleSize);

        ctx.shadowColor = "black";
        ctx.shadowBlur = 13;
        ctx.lineWidth = 3;
        ctx.fillStyle = "white";
        ctx.font = "16px Courier New";

        ctx.strokeText(("SCORE: " + SCORE), 6 , 30);
        ctx.fillText(("SCORE: " + SCORE), 6, 30);
        ctx.strokeText(("BEST SCORE: " + BESTSCORE), 6, 70);
        ctx.fillText(("BEST SCORE: " + BESTSCORE), 6, 70);

        /* -------- KONIEC OBSZARU RYSOWANIA --------  */


        if (snakeBody.length > 0)
        {
    
            for (let i = snakeBody.length - 1; i > 0; i--) {

                snakeBody[i][0] = snakeBody[i - 1][0];
                snakeBody[i][1] = snakeBody[i - 1][1];
                if ((snakeBody[i][0]) == (snakeHead.x) && (snakeBody[i][1]) == (snakeHead.y)) {endGame(true);return;}
    
            }
            snakeBody[0][0] = snakeHead.x;
            snakeBody[0][1] = snakeHead.y;
            
    
        }
        t = { x: (snakeHead.x), y: (snakeHead.y) };
        if ((t.x >= canvas.width / boxSize) || (t.y >= canvas.height / boxSize) || (t.x < 0) || (t.y < 0)) {endGame(true);return;}


        await new Promise(r => setTimeout(r, firstSpeed));

    }
    if (snakeHead.x == apple.x && snakeHead.y == apple.y) 
    {
        for (let q=0; q<segment-1; q++) {snakeBody.push([apple.x, apple.y])}; 
        firstSpeed += (fruitType == "./assets/apple.svg") ? 0.25 : -3;
        SCORE++;
        if((snakeBody.length) / (segment - 1) == cols * rows) {endGame(false);return;}
        eating.play();
        generateAppleCords();

    } 
    if (stillRefresh == true) refreshGame();


}

function startGame() {

    canvas.width = rows * boxSize;
    canvas.height = cols * boxSize;
    document.querySelector("#gameFrame").style.width = canvas.width;
    document.querySelector("#gameFrame").style.height = canvas.height;
    generateAppleCords();
    refreshGame();

}


window.addEventListener("keydown", (a)=>{key = a.key;});
window.addEventListener("keydown", pressTostartGame)