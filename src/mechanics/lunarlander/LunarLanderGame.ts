import FullLayerModel from "../../models/layeredneuralnetwork/WFullLayer";
import LayeredNetwork from "../layeredneuralnetwork/LayeredNetwork";
import ActFunc from "../layeredneuralnetwork/Layers/Enums/ActFunc";
import LayerType from "../layeredneuralnetwork/Layers/Enums/LayerType";
import FullLayer from "../layeredneuralnetwork/Layers/FullLayer";
import Utility from "../layeredneuralnetwork/Utility";

export class LunarLanderGame {
	// RUNNING
	tick = 0;
	running = false;
	gameOver = false;
	tickEndedOn = 0;
	tickSpeed = 50; // ticks per second, must be <1000 and 1000 div by this - DON'T TOUCH THIS

	// DATA
	fuel = 0;
    pos = [400, 300];
    vel = [0, 0];
    acc = [0, 0];
    ang = 0; // 0 = straight up, measured clockwise in radians
    cos = 1;
    sin = 0;

	// CONTROLS
	autopilot = true;
	thrusting = false;
	turning = 0;
	keys = new Set();

	// DO NOT CHANGE THESE CONSTANTS! THE AUTOPILOT WAS TRAINED TO FUNCTION IN THESE CONDITIONS
	thrust = 10000.0;
    startFuel = 100.0;
    fuelConsumptionRate = 7.0;
    turnRate = 3.0;
    shipMass = 150.0;
    gravity = 5000.0;

	// AUTOPILOT BRAIN!
	// let A: number[][] = [
	// 	[ 0.003361297, 0.037884766, -0.005720813, 0.001076574], 
	// 	[ -0.022175891, -0.004686958, 0.004698960, -0.009150483 ], 
	// 	[ 0.002816207, -0.025733583, -0.006315906, -0.000235997 ], 
	// 	[ -0.006254906, -0.009348009, 0.001544761, -0.023071966 ]
	// ]
	// let b: number[] = [0.005522210, -0.001296235, 0.006831446, -0.020266760];

	net: LayeredNetwork;

	constructor() {
		let A: number[][] = [
			[ 0.003361297, 0.037884766, -0.005720813, 0.001076574], 
			[ -0.022175891, -0.004686958, 0.004698960, -0.009150483 ], 
			[ 0.002816207, -0.025733583, -0.006315906, -0.000235997 ], 
			[ -0.006254906, -0.009348009, 0.001544761, -0.023071966 ]
		]
		let b: number[] = [0.005522210, -0.001296235, 0.006831446, -0.020266760];
		let wlayers: FullLayerModel[] = [
			{
				inputSize: [1, 1, 4],
				outputSize: [1, 1, 4],
				layerType: LayerType.Full,
				A: A,
				b: b,
				actFunc: ActFunc.Identity
			}
		];
		this.net = new LayeredNetwork(wlayers);
	}

	screenY() {
		return 545 - this.pos[1];
	}

	incrementTick() {
		this.tick = this.tick + 1;
		if (!this.gameOver) {
			if (this.autopilot) {
				this.doThink();
			} else {
				this.doAct();
			}
			this.updateAng();
			this.updateAcc();
			this.vel[0] += this.acc[0] / this.tickSpeed;
			this.vel[1] += this.acc[1] / this.tickSpeed;
			this.pos[0] += this.vel[0] / this.tickSpeed;
			this.pos[1] += this.vel[1] / this.tickSpeed;
			this.pos[0] = this.goodMod(this.pos[0], 800);
			if (this.fuel > 0 && this.thrusting) {
				this.fuel -= this.fuelConsumptionRate / this.tickSpeed;
			}
			if (this.fuel <= 0) {
				this.toggleEngine(false);
				this.fuel = 0;
			}
			if (this.checkGameOver()) {
				this.gameOver = true;
				this.tickEndedOn = this.tick;
			}
		} else {
			if (this.tickEndedOn < this.tick - 100) {
				this.resetGame();
			}
		}
	}

	goodMod(x: number, mod: number) {
		x = x % mod;
		while (x < 0) {
			x = x + mod;
		}
		return x;
	}
	
	doAct() {
		if (this.keys.has("ArrowUp")) {
			this.toggleEngine(true);
		} else {
			this.toggleEngine(false);
		}
		this.turning = 0;
		this.turning += this.keys.has("ArrowRight") ? 1 : 0;
		this.turning += this.keys.has("ArrowLeft") ? -1 : 0;
	}

	doThink() {
		let out: number[] = this.net.evaluate([this.pos[1], this.ang, this.vel[0], this.vel[1]]);
		out = out.map((x) => {return (2 * Math.exp(x) / (1 + Math.exp(x))) - 1});
		this.toggleEngine(out[3] > 0);
        this.turning = Utility.maxIndex([out[0], out[1], out[2]]) - 1;
	}

	resetGame() {
		// DO NOT CHANGE THESE MAGIC NUMBERS!
		// THE AUTOPILOT WAS TRAINED TO WORK WITHIN THESE RANGES
		this.fuel = this.startFuel;
		this.gameOver = false;
		this.tickEndedOn = 0;
		this.tick = 0;
		this.vel[0] = 150.0 * ((2.0 * Math.random()) - 1.0);
        this.vel[1] = 20.0 * ((2.0 * Math.random()) - 1.0);
		this.pos[0] = this.vel[0] > 0 ? 100 : 700;
        this.pos[1] = 200.0 + (300.0 * Math.random());
        this.ang = 2 * Math.PI * Math.random();
        this.cos = Math.cos(this.ang);
        this.sin = Math.sin(this.ang);
	}

	getScore() {
		let raw = (100 - this.getSpeed()) + 0.05 * this.fuel;
		return Math.round(raw * 10) / 10;
	}

	getSpeed() {
        return Math.sqrt((this.vel[0] * this.vel[0]) + (this.vel[1] * this.vel[1]));
    }

	toggleEngine(active: boolean) {
		if (active && this.fuel > 0) {
			this.thrusting = true;
		} else {
			this.thrusting = false;
		}
	}

	updateAcc() {
		// F = m * a
        let engineForce = this.thrusting ? this.thrust : 0;
        this.acc[0] = this.sin * engineForce / this.shipMass;
        this.acc[1] = ((this.cos * engineForce) - this.gravity) / this.shipMass;
	}

	updateAng() {
		this.ang += (this.turning * this.turnRate) / this.tickSpeed;
        if (this.turning != 0) {
            this.cos = Math.cos(this.ang);
            this.sin = Math.sin(this.ang);
        }
	}

	checkGameOver() {
		return this.pos[1] <= 0;
	}

	getEnginePolyPoints2() {
        let poly: number[][] = [[0, 0, 0], [0, 0, 0]];
        poly[0][0] = 2;
        poly[1][0] = 2;
        poly[0][1] = 4;
        poly[1][1] = 2;
        poly[0][2] = 3;
        poly[1][2] = 0;
        for (let j = 0; j < 3; j++) {
            poly[0][j] -= 3;
            poly[1][j] -= 1;
            poly[1][j] *= -1;
        }
        this.rotate(poly);
        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < 2; i++) {
                poly[i][j] *= 5;
            }
            poly[0][j] += this.pos[0];
            poly[1][j] += this.screenY();
        }
        return poly;
    }

    rotate(poly: number[][]) {
        for (let j = 0; j < poly[0].length; j++) {
            let a = poly[0][j];
            let b = poly[1][j];
            poly[0][j] = (a * this.cos) + (-b * this.sin);
            poly[1][j] = (a * this.sin) + (b * this.cos);
        }
    }

    getEnginePolyPoints() {
        let poly: number[][] = [[0, 0, 0], [0, 0, 0]];
        poly[0][0] = 2;
        poly[1][0] = 2;
        poly[0][1] = 4;
        poly[1][1] = 2;
        poly[0][2] = 3;
        poly[1][2] = 1;
        for (let j = 0; j < 3; j++) {
            poly[0][j] -= 3;
            poly[1][j] -= 1;
            poly[1][j] *= -1;
        }
        this.rotate(poly);
        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < 2; i++) {
                poly[i][j] *= 5;
            }
            poly[0][j] += this.pos[0];
            poly[1][j] += this.screenY();
        }
        return poly;
    }

    getShipPolyPoints() {
        let poly: number[][] = [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]];
        poly[0][0] = 0;
        poly[1][0] = 0;
        poly[0][1] = 2;
        poly[1][1] = 4;
        poly[0][2] = 4;
        poly[1][2] = 4;
        poly[0][3] = 6;
        poly[1][3] = 0;
        poly[0][4] = 5;
        poly[1][4] = 0;
        poly[0][5] = 4;
        poly[1][5] = 2;
        poly[0][6] = 2;
        poly[1][6] = 2;
        poly[0][7] = 1;
        poly[1][7] = 0;
        for (let j = 0; j < 8; j++) {
            poly[0][j] -= 3;
            poly[1][j] -= 1;
            poly[1][j] *= -1;
        }
        this.rotate(poly);
        for (let j = 0; j < 8; j++) {
            for (let i = 0; i < 2; i++) {
                poly[i][j] *= 5;
            }
            poly[0][j] += this.pos[0];
            poly[1][j] += this.screenY();
        }
        return poly;
    }

	setAutopilot(newAutopilot: boolean) {
		this.ang = this.ang % (2 * Math.PI);
		if (this.ang > Math.PI) {
			this.ang -= 2 * Math.PI;
		}
		if (this.ang < -Math.PI) {
			this.ang += 2 * Math.PI;
		}
		this.autopilot = newAutopilot;
	}
}