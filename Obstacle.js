class Obstacle {
    constructor(position, size, speed) {
        this.position = position;
        this.size = size;
        this.speed = speed;
    }
    draw(ctx) {
        ctx.fillRect(
            this.position.x,
            this.position.y,
            this.size.width,
            this.size.height
        );
    }
    update() {
        this.position.y += this.speed.y;
        this.position.x += this.speed.x;
    }
}

export default Obstacle;
