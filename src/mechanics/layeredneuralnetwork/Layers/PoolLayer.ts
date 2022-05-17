import Layer from "../Layer";
import Utility from "../Utility";
import PoolType from "./Enums/PoolType";

class PoolLayer extends Layer {
	readonly stride: number;
	readonly poolTypeE: PoolType;
	readonly poolSize: number;

	constructor(inputSize: number[], outputSize: number[], poolSize: number, stride: number, poolTypeE: PoolType) {
		super(inputSize, outputSize);
		this.stride = stride;
		this.poolTypeE = poolTypeE;
		this.poolSize = poolSize;
	}

	evaluate(x: number[][][]) {
		let y = Array.from({length: this.outputSize[0]}, () => Array.from({length: this.outputSize[1]}, () => Array.from({length: this.outputSize[2]}, () => 0)));
		for (let k = 0; k < this.outputSize[2]; k++) {
			for (let j = 0; j < this.outputSize[1]; j++) {
				for (let i = 0; i < this.outputSize[0]; i++) {
					switch (this.poolTypeE) {
						case PoolType.Max:
							y[i][j][k] = this.maxInRange(x, i * this.stride, j * this.stride, k);
							break;
						case PoolType.Avg:
							y[i][j][k] = this.avgInRange(x, i * this.stride, j * this.stride, k);
							break;
					}
				}
			}
		}
		return y;
	}

	avgInRange(x: number[][][], i: number,j: number, k: number) {
		let avg = 0;
		for (let i1 = i; i1 < i + this.poolSize; i1++) {
			for (let j1 = j; j1 < j + this.poolSize; j1++) {
				avg += Utility.getOrDefault(x, i1, j1, k, 0);
			}
		}
		return avg / (this.poolSize * this.poolSize);
	}

	maxInRange(x: number[][][], i: number,j: number, k: number) {
		let max = x[i][j][k];
		for (let i1 = i; i1 < i + this.poolSize; i1++) {
			for (let j1 = j; j1 < j + this.poolSize; j1++) {
				let m = Utility.getOrDefault(x, i1, j1, k, -99999999999);
				if (m > max) {
					max = m;
				}
			}
		}
		return max;
	}
}

export default PoolLayer;