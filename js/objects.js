var enemy;
var enemies = [];
var enHealth = 20;
var killCount;

function createEnemy() {
    var enemy = new Enemy();
    enemies.push(enemy);
}

a = 0;
function handleEnemy() {
    var rng = Math.round(Math.random() * 10);

    if (enemies.length > 0) {
        for (i = 0; i < enemies.length; i++) {
            enC = enemies[i].c;
            ctx.beginPath();
            ctx.drawImage(enemyImage, enemies[i].x - 23, enemies[i].y - 27, 45, 45);
            ctx.arc(enemies[i].x, enemies[i].y, enemies[i].r, 0, 2 * Math.PI);

            //ctx.fill();
            ctx.closePath();
            //ctx.stroke();
            if (frames % 50 === 0) {
                enemies[i].shoot();
            }
            switch (enemies[i].y) {
                case 100:
                    if (enemies[i].moveY) {
                        if (rng >= 5) {
                            enemies[i].y += 2;
                        } else {
                            enemies[i].moveY = false;
                        }
                    }
                    break;
                case 150:
                    if (enemies[i].moveY) {
                        if (rng >= 5) {
                            enemies[i].y += 2;
                        } else {
                            enemies[i].moveY = false;
                        }
                    }
                    break;
                case 200:
                    if (enemies[i].moveY) {
                        if (rng >= 5) {
                            enemies[i].y += 2;
                        } else {
                            enemies[i].moveY = false;
                        }
                    }
                    break;
                case 250:
                    if (enemies[i].moveY) {
                        if (rng >= 5) {
                            enemies[i].y += 2;
                        } else {
                            enemies[i].moveY = false;
                        }
                    }
                    break;
                case 300:
                    if (enemies[i].moveY) {
                        if (rng < -1) {
                            enemies[i].y += 2;
                        } else {
                            enemies[i].moveY = false;
                        }
                    }
                    break;
                default:
                    enemies[i].y += 2;
            }
            checkEnemyCollision(enemies[i].x, enemies[i].y, i);
        }
    }
}

var enPr;
var enemyProjectiles = [];
function createEnProjectile(enX, enY) {
    var direction = getPlayerDirection(enX, enY, ballX, ballY);
    var enPr = new EnProjectile(enX, enY, direction.x * level, direction.y * level);
    enemyProjectiles.push(enPr);
}

function handleEnProjectile() {
    enemyProjectiles.forEach(function (currentEnProj, enPrIndex) {
        var enPrR = currentEnProj.r;
        if (currentEnProj.x + enPrR < 0) {
            enemyProjectiles.splice(enPrIndex, 1);
        } else if (currentEnProj.y + enPrR > canvas.height) {
            enemyProjectiles.splice(enPrIndex, 1);
        } else {
            currentEnProj.move();
            checkEnProjectileCollision(currentEnProj.x, currentEnProj.y, enPrR, enPrIndex);
            currentEnProj.draw();
        }
    });
}

function checkEnProjectileCollision(enPrX, enPrY, enPrR, enPrIndex) {
    if (lineDistance(enPrX, enPrY, ballX, ballY) <= enPrR + ballR) {
        life -= 1;
        enemyProjectiles.splice(enPrIndex, 1);
    }
}

function checkEnemyCollision(enX, enY, enIndex) {
    if (lineDistance(enX, enY, ballX, ballY) <= 20 + ballR) {
        enemies.splice(enIndex, 1);
        life -= 1;
    }
}

function getPlayerDirection(ballX, ballY, enX, enY) {
    var dirX = enX - ballX;
    var dirY = enY - ballY;
    var nDir = {
        x: normalize(dirX, dirY).x,
        y: normalize(dirX, dirY).y,
    };
    return nDir;
}

function normalize(x, y) {
    var length = Math.sqrt(x * x + y * y); //calculating length
    x = x / length; //assigning new value to x (dividing x by length of the vector)
    y = y / length; //assigning new value to

    return {
        x: x,
        y: y,
    };
}
var lifes = [];
function createLife() {
    lifes.push(new Life());
}

function handleLife() {
    if (lifes.length > 0) {
        for (i = 0; i < lifes.length; i++) {
            ctx.beginPath();
            ctx.drawImage(lifeImage, lifes[i].x - 19, lifes[i].y - 23, 38, 38);

            ctx.arc(lifes[i].x, lifes[i].y, 18, 0, 2 * Math.PI);
            //ctx.fillStyle = 'lime';
            //ctx.fill();
            ctx.closePath();
            //ctx.stroke();
            lifes[i].y += 2;
            checkHeartCollision(lifes[i].x, lifes[i].y, i);
        }
    }
}

function checkHeartCollision(heartX, heartY, heartIndex) {
    if (lineDistance(heartX, heartY, ballX, ballY) <= 20 + ballR) {
        lifes.splice(heartIndex, 1);
        if (life < 5) {
            life++;
        }
    }
}

var powerUp = false;
var powerUps = [];
function createPowerUp() {
    powerUps.push(new PowerUp());
}

function handlePowerUp() {
    if (powerUps.length > 0) {
        for (i = 0; i < powerUps.length; i++) {
            ctx.beginPath();
            ctx.drawImage(powerUpImage, powerUps[i].x - 15, powerUps[i].y - 16, 30, 30);

            ctx.arc(powerUps[i].x, powerUps[i].y, 16, 0, 2 * Math.PI);
            //ctx.fillStyle = 'yellow';
            //ctx.fill();
            ctx.closePath();
            //ctx.stroke();
            powerUps[i].y += 3.5;
            checkPowerUpCollision(powerUps[i].x, powerUps[i].y, i);
        }
    }
}

function checkPowerUpCollision(powerX, powerY, powerIndex) {
    if (lineDistance(powerX, powerY, ballX, ballY) <= 20 + ballR) {
        powerUps.splice(powerIndex, 1);
        powerUp = true;
        setTimeout(function () {
            powerUp = false;
        }, 7500);
    }
}

function spliceAll() {
    enemies.length = 0;
    lifes.length = 0;
    projectiles.length = 0;
    enemyProjectiles.length = 0;
    powerUps.length = 0;
}

var projectile;
var projectiles = [];
function createProjectile() {
    var projectile = new Projectile(ballX, ballY);
    projectiles.push(projectile);
}

function handleProjectile() {
    projectiles.forEach(function (currentProj, prIndex) {
        var prR = currentProj.r;
        if (currentProj.x + prR < 0) {
            projectiles.splice(prIndex, 1);
        } else if (currentProj.x - prR > canvas.height) {
            projectiles.splice(prIndex, 1);
        } else {
            if (!powerUp) {
                currentProj.move(0, -5);
            } else {
                currentProj.move(0, -10);
            }
            checkProjectileCollision(currentProj.x, currentProj.y, prR, prIndex);
            currentProj.draw();
        }
    });
}

function checkProjectileCollision(prX, prY, prR, prIndex) {
    for (i = 0; i < enemies.length; i++) {
        var enX = enemies[i].x;
        var enY = enemies[i].y;
        var enR = enemies[i].r;
        if (lineDistance(prX, prY, enX, enY) <= prR + enR) {
            if (enHealth === 0) {
                enHealth += 20;
                enemies.splice(i, 1);
                killCount++;
                score += 10;
            } else {
                enHealth -= 1;
            }
            projectiles.splice(prIndex, 1);
        }
    }
}
