function startGameFrame() {


    Area.start();
    
    Frame = new component(40, 40, "red", 200, 200);
    Snake = new component(40, 40, "green", 40, 120);
}

function component(width, height, colour, x,y) {
    this.width = width;
    this.height = height; 
    this.x = x;
    this.y = y;
    this.update = function () {

        ctx = Area.context;
        ctx.fillStyle = colour;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.strokeStyle = "rgb(2,7,159)";
        for (var x = padding; x < 1000; x += 40) {
          for (var y = padding; y < 600; y += 40) {
            ctx.strokeRect(x, y, 40, 40);
          }
        }
    }

    this.Smash = function(c) {

        let mTop = this.y;
        let mLeft = this.x
        let mBottom = this.y + (this.height);
        let mRight = this.x + (this.width);

        let cTop = c.y;
        let cLeft = c.x;
        let cBottom = c.y + (c.height);
        let cRight = c.x + (c.width);

        if ((mBottom < cTop) || (mTop > cBottom) || (mRight < cLeft) || (mLeft > cRight) ) {return false;}
        else {return true;}

    }

}

var Area = {

    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1000;
        this.canvas.height = 600;
        this.key = false;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameFrame, 100);

    

    },
    clear: function()  {this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);},
    stop : function () {clearInterval(this.interval); alert("Game over");}
}


function updateGameFrame() {


    

    if (Snake.Smash(Frame)) {Area.stop(); }
    else {

        Area.clear();
        Snake.update();
        Frame.update();
        
        if (Direct == "ArrowRight") Snake.x += 40;
        else if (Direct == "ArrowLeft") Snake.x += -40;
        else if (Direct == "ArrowUp") Snake.y += -40;
        else if (Direct == "ArrowDown") Snake.y += 40;

        if (Area.key != false) Direct = Area.key;

    }


}

const padding = 40;
var Direct="ArrowRight";
var Snake;
var Frame;
window.onload = startGameFrame; 
window.addEventListener('keydown', (a)=>{Area.key =  (["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(a.key)) ? a.key : false})
window.addEventListener('keyup', (a)=>{Area.key = false;})