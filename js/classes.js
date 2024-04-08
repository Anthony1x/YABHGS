class Enemy {
    constructor() {
        this.x = Math.random() * (canvas.width - 20 - 20) + 20;
        this.y = -20;
        this.r = 20;
        this.c = 'red';
        this.moveY = true;
        this.shoot = function () {
            if (this.moveY === false) {
                createEnProjectile(this.x, this.y);
            }
        };
    }
}

class Life {
    constructor() {
        this.x = Math.random() * (canvas.width - 20 - 20) + 20;
        this.y = -20;
        this.c = 'rgba(255,255,255,1)';
    }
}

class PowerUp {
    constructor() {
        this.x = Math.random() * (canvas.width - 20 - 20) + 20;
        this.y = -20;
        this.c = 'rgba(255,255,255,1)';
    }
}

class Projectile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 5;
        this.c = 'rgba(255,255,255,1)';
        this.move = function (speedX, speedY) {
            this.x += speedX;
            this.y += speedY;
        };
        this.draw = function () {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
            ctx.fillStyle = 'red';
            ctx.fill();
            ctx.closePath();
        };
    }
}

class EnProjectile {
    constructor(x, y, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.r = 5;
        this.speedX = speedX;
        this.speedY = speedY;
        this.c = 'rgba(255,255,255,1)';

        this.move = function () {
            this.x += this.speedX;
            this.y += this.speedY;
        };

        this.draw = function () {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
            ctx.fillStyle = 'red';
            ctx.fill();
            ctx.closePath();
        };
    }
}
