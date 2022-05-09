class InputHandler {
    constructor() {
        this.keysPressed = [];
        this.validKeys = ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'];
        document.addEventListener('keydown', (e) => {
            if (this.validKeys.find((key) => (key = e.key))) {
                this.keysPressed.push(e.key);
            }
        });
        document.addEventListener('keyup', (e) => {
            this.keysPressed = this.keysPressed.filter((key) => key !== e.key);
        });
    }
    getPressedKeys() {
        return this.keysPressed;
    }
    calculateSpeed() {
        const speed = {
            x: 0,
            y: 0,
        };
        this.keysPressed.forEach((key) => {
            switch (key) {
                case 'ArrowRight':
                    speed.x = 10;
                    break;
                case 'ArrowLeft':
                    speed.x = -10;
                    break;
                case 'ArrowUp':
                    speed.y = -10;
                    break;
                case 'ArrowDown':
                    speed.y = 10;
                    break;
            }
        });
        return speed;
    }
}

export default InputHandler;
