//script.js
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var heartIcon = new Image();
heartIcon.src = 'img/heart.svg';
var enemyImage = new Image();
enemyImage.src = 'img/enemy.svg';
var powerUpImage = new Image();
powerUpImage.src = 'img/powerUp.svg';
var lifeImage = new Image();
lifeImage.src = 'img/life.svg';
var spaceShipImage = new Image();
spaceShipImage.src = 'img/ship.svg';
var gameOverSound = new Audio('sounds/FATALITY.mp3');
var backgroundMusic = new Audio('sounds/bgm.mp3');

canvas.width = 600;
canvas.height = 850;
var isPlaying = false;
var frames;
var ballX;
var ballY;
var ballR;
var level;
var game;
var started = false;
var lastShot = 0;

function setup() {
    level = 1;
    ballR = 0;
    frames = 0;
    multi = 1;
    lifes = [];
    life = 2;
    ballX = canvas.width / 2;
    score = 0;
    finalScore = 0;
    ballY = canvas.height - ballR - 50;
    killCount = 0;
    backgroundMusic.currentTime = 0;
}

function draw() {
    document.getElementById('debug').innerHTML = 'x: ' + ballX + ' y: ' + ballY;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frames++;
    if (frames % 100 == 0) {
        var randomNumber = Math.round(Math.random() * 10);
        level += 0.1;
        score++;
        if (randomNumber > 5) {
            createEnemy();
        }
        if (randomNumber > 7) {
            createLife();
        }
    }
    if (frames % 3000 == 0) {
        multi *= 1.05;
    }
    if (frames % 1000 == 0) {
        if (randomNumber > 8) {
            createPowerUp();
        }
        createEnemy();
    }

    handleLife();
    drawLifes();
    handleEnemy();
    handleProjectile();
    handleEnProjectile();
    if (!powerUp) {
        handleBall();
    } else {
        handlePowerBall();
    }
    drawLevel();
    handlePowerUp();
    drawScore();
    drawBall();
    displayHearts();
}

function drawBall() {
    ctx.beginPath();
    ballR = 27;
    ctx.arc(ballX, ballY, ballR, 0, 2 * Math.PI);
    ctx.drawImage(spaceShipImage, ballX - 25, ballY - 27, 50, 50);
    //ctx.fillStyle = 'rgba(189,189,189,0.3)';
    //ctx.fill();
    ctx.closePath();
    //ctx.stroke();
}

function lineDistance(x1, y1, x2, y2) {
    var xs = 0;
    var ys = 0;

    xs = x2 - x1;
    xs = xs * xs;

    ys = y2 - y1;
    ys = ys * ys;

    return Math.sqrt(xs + ys);
}

function drawScore() {
    ctx.fillStyle = '#000000';
    ctx.font = '18px Courier New';
    ctx.fillText('Score: ' + score, canvas.width - 120, 30);
}

function displayHearts() {
    if (life == -1) {
        gameOver();
    }
}
//objects.js

//keyHandler.js
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
var wPressed = false;
var aPressed = false;
var sPressed = false;
var dPressed = false;
var shiftPressed = false;
var spacePressed = false;
var multiPress = false;
var ePressed = false;
function keyUpHandler(e) {
    switch (e.key) {
        case 'w':
            wPressed = false;
            break;
        case 'a':
            aPressed = false;
            break;
        case 's':
            sPressed = false;
            break;
        case 'd':
            dPressed = false;
            break;
        case 'e':
            ePressed = false;
            break;
        case 'Shift':
            shiftPressed = false;
            break;
        case ' ':
            spacePressed = false;
            break;
        default:
    }
}

function keyDownHandler(e) {
    switch (e.key) {
        case 'w':
            wPressed = true;
            break;
        case 'a':
            aPressed = true;
            break;
        case 's':
            sPressed = true;
            break;
        case 'd':
            dPressed = true;
            break;
        case 'e':
            ePressed = false;
            break;
        case 'Shift':
            shiftPressed = true;
            break;
        case ' ':
            spacePressed = true;
            break;
        default:
    }
}

function handleBall() {
    if (dPressed === true && ballX + ballR < canvas.width && !multiPress) {
        ballX += 4;
    } else if (aPressed === true && ballX - ballR > 0 && !multiPress) {
        ballX -= 4;
    } else if (wPressed === true && ballY - ballR > 0 && !multiPress) {
        ballY -= 5;
    } else if (sPressed === true && ballY + ballR < canvas.height && !multiPress) {
        ballY += 4;
    }
    if (wPressed && aPressed && ballY - ballR > 0 && ballX - ballR > 0) {
        multiPress = true;
        ballY -= 4;
        ballX -= 4;
    } else if (wPressed && dPressed && ballY - ballR > 0 && ballX + ballR < canvas.width) {
        multiPress = true;
        ballY -= 4;
        ballX += 4;
    } else if (sPressed && aPressed && ballY + ballR < canvas.height && ballX - ballR > 0) {
        multiPress = true;
        ballY += 4;
        ballX -= 4;
    } else if (sPressed && dPressed && ballY + ballR < canvas.height && ballX + ballR < canvas.width) {
        multiPress = true;
        ballY += 4;
        ballX += 4;
    } else {
        multiPress = false;
    }

    if (spacePressed && frames % 2 === 0) {
        createProjectile();
    }

    if (shiftPressed) {
        gameOver();
    }
}

function handlePowerBall() {
    if (dPressed === true && ballX + ballR < canvas.width && !multiPress) {
        ballX += 6;
    } else if (aPressed === true && ballX - ballR > 0 && !multiPress) {
        ballX -= 6;
    } else if (wPressed === true && ballY - ballR > 0 && !multiPress) {
        ballY -= 7;
    } else if (sPressed === true && ballY + ballR < canvas.height && !multiPress) {
        ballY += 6;
    }
    if (wPressed && aPressed && ballY - ballR > 0 && ballX - ballR > 0) {
        multiPress = true;
        ballY -= 6;
        ballX -= 6;
    } else if (wPressed && dPressed && ballY - ballR > 0 && ballX + ballR < canvas.width) {
        multiPress = true;
        ballY -= 6;
        ballX += 6;
    } else if (sPressed && aPressed && ballY + ballR < canvas.height && ballX - ballR > 0) {
        multiPress = true;
        ballY += 6;
        ballX -= 6;
    } else if (sPressed && dPressed && ballY + ballR < canvas.height && ballX + ballR < canvas.width) {
        multiPress = true;
        ballY += 6;
        ballX += 6;
    } else {
        multiPress = false;
    }
    if (spacePressed) {
        createProjectile();
    }

    if (shiftPressed) {
        gameOver();
    }
}

//OOC.js
function startGame() {
    if (!started) {
        if (!isPlaying) {
            backgroundMusic.volume = document.getElementById('volume').value / 10;
            backgroundMusic.play();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            spliceAll();
            setup();
            draw();
            game = setInterval(draw, 10);
            isPlaying = true;
            started = true;
        } else {
            console.log('Nope.');
        }
    } else {
        if (!isPlaying) {
            backgroundMusic.volume = document.getElementById('volume').value / 10;
            backgroundMusic.play();
            game = setInterval(draw, 10);
            isPlaying = true;
            draw();
        } else {
            console.log('Nope.');
        }
    }
}

function stopGame() {
    clearInterval(game);
    isPlaying = false;
    backgroundMusic.pause();
}

function resetGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    spliceAll();
    setup();
    draw();
}

function gameOver() {
    gameOverSound.play();
    backgroundMusic.volume = document.getElementById('volume').value / 10;
    finalScore = score * killCount * multi;
    clearInterval(game);
    isPlaying = false;
    backgroundMusic.pause();
    started = false;
    ctx.fillStyle = '#ffffff';
    ctx.font = '32px Courier New';
    ctx.fillText('Game Over!', canvas.width / 2 - 80, canvas.height / 2 - 30);
    ctx.fillText('Score: ' + Math.round(finalScore), canvas.width / 2 - 80, canvas.height / 2);
}

function showInfo() {
    switch (document.getElementById('info').style.display) {
        case 'block':
            document.getElementById('info').style.display = 'none';
            break;
        default:
            document.getElementById('info').style.display = 'block';
    }
}

//score.js
var score = 0;
var finalScore;
var multi; // Multipliziert überlebte Minuten mit 1,05
function drawScore() {
    ctx.fillStyle = '#ffffff';
    ctx.font = '18px Courier New';
    ctx.fillText('Score: ' + Math.round(score), canvas.width - 120, 30);
    ctx.fillStyle = '#ffffff';
    ctx.font = '18px Courier New';
    ctx.fillText(Math.round((multi + Number.EPSILON) * 100) / 100, canvas.width - 67, 50);
    ctx.fillStyle = '#ffffff';
    ctx.font = '18px Courier New';
    ctx.fillText('Kills: ' + killCount, 20, 30);
}

function drawLifes() {
    for (i = 0; i < life; i++) {
        ctx.drawImage(heartIcon, 20 * i * 2 + 20, canvas.height - 30, 20, 20);
    }
}

function drawLevel() {
    ctx.fillStyle = '#ffffff';
    ctx.font = '18px Courier New';

    ctx.fillText('Level: ' + Math.round(level), canvas.width - 120, 70);
}
