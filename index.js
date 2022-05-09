import PlayerSquare from './PlayerSquare.js';
import GameEvents from './GameEvents.js';
import gameConfig from './config.js';

const events = ['game_start', 'game_end', 'player_collision'];

const gameStartBtn = document.getElementById('gameStartBtn');
gameStartBtn.addEventListener('click', game);

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const { height, width } = gameConfig.canvasDimensions;

ctx.canvas.height = height;
ctx.canvas.width = width;
const playerSquare = new PlayerSquare(width, height);
const gameEvents = new GameEvents(ctx, width, height, playerSquare);

function game() {
    gameEvents.draw(ctx);
    gameEvents.update(ctx);

    requestAnimationFrame(game);
}
