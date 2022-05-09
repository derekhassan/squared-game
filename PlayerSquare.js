class PlayerSquare {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.size = {
            width: 50,
            height: 50,
        };
        this.position = {
            x: 100,
            y: 100,
        };
        this.isCooldown = false;
    }
    draw(ctx) {
        if (this.isCooldown) {
            ctx.fillStyle = 'red';
        } else {
            ctx.fillStyle = 'black';
        }
        ctx.fillRect(
            this.position.x,
            this.position.y,
            this.size.width,
            this.size.height
        );
    }
    setSpeedY(speedY) {
        this.speed.y += speedY;
    }
    setSpeedX(speedX) {
        this.speed.x += speedX;
    }
    update(speed) {
        this.position.x += speed.x;
        this.position.y += speed.y;

        if (this.position.x < 0) {
            this.position.x = 0;
        }
        if (this.position.x + this.size.width > this.gameWidth) {
            this.position.x = this.gameWidth - this.size.width;
        }

        if (this.position.y < 0) {
            this.position.y = 0;
        }
        if (this.position.y + this.size.height > this.gameHeight) {
            this.position.y = this.gameHeight - this.size.height;
        }
    }
    setCooldown(isCooldown) {
        this.isCooldown = isCooldown;
    }
    getIsCooldown() {
        return this.isCooldown;
    }
}

export default PlayerSquare;
