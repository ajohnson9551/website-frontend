export class LunarLanderGame {
	tick = 0;
	running = false;
	keys = new Set();

	x = 0;
	y = 0;

	xVel = 10;
	yVel = 10;

	incrementTick() {
		this.tick = this.tick + 1;
		this.y -= this.keys.has("w") ? this.yVel : 0;
		this.y += this.keys.has("s") ? this.yVel : 0;
		this.x -= this.keys.has("a") ? this.xVel : 0;
		this.x += this.keys.has("d") ? this.xVel : 0;
	}
}