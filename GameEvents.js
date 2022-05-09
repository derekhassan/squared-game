import Obstacle from './Obstacle.js';
import InputHandler from './InputHandler.js';
import GameInterface from './ui.js';

const OBSTACLE_LENGTH = 80;
const OBSTACLE_THICKNESS = 10;

const leftSpeed = {
    x: -5,
    y: 0,
};
const rightSpeed = {
    x: 5,
    y: 0,
};
const downSpeed = {
    x: 0,
    y: 5,
};
const upSpeed = {
    x: 0,
    y: -5,
};

const GAME_STATE = {
    GAME_OVER: 0,
    GAME_RUNNING: 1,
};

class GameEvents {
    constructor(ctx, gameWidth, gameHeight, playerSquare) {
        this.gameInterface = new GameInterface(3);
        this.gameState = GAME_STATE.GAME_RUNNING;
        this.playerSquare = playerSquare;
        this.currentObstacles = [];
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.lives = 3;
        this.inputHandler = new InputHandler();
        this.spawnObstacleInterval = setInterval(() => {
            this.currentObstacles = [];
            this.spawnObstacles(ctx);
        }, 2000);
    }
    isTouchingX(obstacle, playerSquare) {
        return (
            obstacle.position.x >= playerSquare.position.x &&
            obstacle.position.x + obstacle.size.width <=
                playerSquare.position.x + playerSquare.size.width
        );
    }
    isTouchingY(obstacle, playerSquare) {
        const obstacleTop = obstacle.position.y;
        const obstacleBottom = obstacle.position.y + obstacle.size.height;

        const playerSquareTop = playerSquare.position.y;
        const playerSquareBottom =
            playerSquare.position.y + playerSquare.size.height;

        const isTopTouching =
            playerSquareTop <= obstacleBottom &&
            playerSquareBottom >= obstacleBottom;

        const isBottomTouching =
            playerSquareBottom >= obstacleTop && playerSquareTop <= obstacleTop;

        const isIntersecting =
            playerSquareTop >= obstacleTop &&
            playerSquareBottom <= obstacleBottom;

        return isTopTouching || isBottomTouching || isIntersecting;
    }
    detectCollision(playerSquare) {
        this.currentObstacles.forEach((obstacle) => {
            if (playerSquare.getIsCooldown() || this.lives === 0) {
                return;
            }
            if (
                this.isTouchingX(obstacle, playerSquare) &&
                this.isTouchingY(obstacle, playerSquare)
            ) {
                this.lives--;
                this.gameInterface.updateLivesLeft(this.lives);
                if (this.lives <= 0) {
                    this.gameState = GAME_STATE.GAME_OVER;
                    return;
                }
                playerSquare.setCooldown(true);
                setTimeout(() => playerSquare.setCooldown(false), 1000);
            }
        });
    }
    spawnObstacle(ctx, position, size, speed) {
        const obstacle = new Obstacle(position, size, speed);
        obstacle.draw(ctx);
        this.currentObstacles.push(obstacle);
    }
    spawnObstacles(ctx) {
        for (let i = 0; i <= 6; i++) {
            if (i % 2) {
                this.spawnObstacle(
                    ctx,
                    { x: 0, y: i * OBSTACLE_LENGTH },
                    { width: OBSTACLE_THICKNESS, height: OBSTACLE_LENGTH },
                    rightSpeed
                );
                this.spawnObstacle(
                    ctx,
                    { x: i * OBSTACLE_LENGTH, y: 0 },
                    { width: OBSTACLE_LENGTH, height: OBSTACLE_THICKNESS },
                    downSpeed
                );
            } else {
                this.spawnObstacle(
                    ctx,
                    { x: this.gameWidth, y: i * OBSTACLE_LENGTH },
                    { width: OBSTACLE_THICKNESS, height: OBSTACLE_LENGTH },
                    leftSpeed
                );
                this.spawnObstacle(
                    ctx,
                    { x: i * OBSTACLE_LENGTH, y: this.gameHeight },
                    { width: OBSTACLE_LENGTH, height: OBSTACLE_THICKNESS },
                    upSpeed
                );
            }
        }
    }
    update() {
        this.currentObstacles.forEach((obstacle) => obstacle.update());
        this.detectCollision(this.playerSquare);
        this.playerSquare.update(this.inputHandler.calculateSpeed());
    }
    draw(ctx) {
        ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
        if (this.gameState === GAME_STATE.GAME_OVER) {
            clearInterval(this.spawnObstacleInterval);
            return;
        }
        this.currentObstacles.forEach((obstacle) => obstacle.draw(ctx));
        this.playerSquare.draw(ctx);
    }
}

export default GameEvents;
