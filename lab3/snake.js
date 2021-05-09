const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");


let menu = new Menu(ctx, "start menu");

cvs.addEventListener("mousedown", function(e) {
    let clickCoordinates = getMousePosition(cvs, e);
    menu.click(clickCoordinates.x, clickCoordinates.y);
});

function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    return {x, y};
}


let isGameEnd = false;

// create the unit
const box = 32;
let snakeSpeed = 100;

// load images

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

// load audio files

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

// create the snake

let snake = [];

snake[0] = {
    x : 9 * box,
    y : 10 * box
};

// create the food

let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

// create the score var

let score = 0;

//control the snake
let d;

document.addEventListener("keydown",direction);

function direction(event) {
    if (menu.isHidden) {
        let key = event.keyCode;
        if( key == 37 && d != "RIGHT"){
            d = "LEFT";

            if (menu.isSoundOn)
                left.play();


        }else if(key == 38 && d != "DOWN"){
            d = "UP";

            if (menu.isSoundOn)
                up.play();

        }else if(key == 39 && d != "LEFT"){

            d = "RIGHT";

            if (menu.isSoundOn)
                right.play();

        }else if(key == 40 && d != "UP"){
            d = "DOWN";

            if (menu.isSoundOn)
                down.play();
        }
    }
}

// cheack collision function
function collision(head,array) {
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// draw everything to the canvas

function draw() {

    ctx.drawImage(ground,0,0);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }



    ctx.drawImage(foodImg, food.x, food.y);
    
    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    // which direction
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;
    
    // if the snake eats the food
    if(snakeX == food.x && snakeY == food.y){
        score++;

        if (menu.isSoundOn)
            eat.play();

        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
        // we don't remove the tail
    }else{
        // remove the tail
        snake.pop();
    }
    
    // add new Head
    
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    // game over

    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){

        menu.title = "you score: " + score;
        resetGame();
        menu.isHidden = false;
        menu.drawMenu();

        if (menu.isSoundOn)
            dead.play();

    }

    if (!isGameEnd){
        snake.unshift(newHead);
    } else{
        snake.unshift({x: 9*box, y: 10*box});
    }

    
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2*box, 1.6*box);

    menu.drawMenu();
}


function resetGame() {

    isGameEnd = true;

    snake = [];

    score = 0;

    d = "";

}

function startGame() {

    clearInterval(game);
    let choice = menu.getMenuItemChoice();

    if (choice === "slow") {
        snakeSpeed = 150;
    }

    if (choice === "medium") {
        snakeSpeed = 100;
    }

    if (choice === "fast") {
        snakeSpeed = 75;
    }

    isGameEnd = false;

    game = setInterval(draw, snakeSpeed);
}


let game = setInterval(draw, 100);












