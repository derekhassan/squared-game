class GameInterface {
    constructor(startingLives) {
        this.livesCounter = document.getElementById('livesCounter');
        this.livesCounter.innerHTML = `Lives Left: ${startingLives}`;
    }
    updateLivesLeft(livesLeft) {
        this.livesCounter.innerHTML = `Lives Left: ${livesLeft}`;
    }
}

export default GameInterface;
