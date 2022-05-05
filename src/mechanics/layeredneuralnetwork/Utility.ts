import ActFunc from "./Layers/Enums/ActFunc";

abstract class Utility {
	static convertToVol(x: number[], inputSize: number[]) {
		let vol = Array.from({length: inputSize[0]}, () => Array.from({length: inputSize[1]}, () => Array.from({length: inputSize[2]}, () => 0)));
		for (let k = 0; k < inputSize[2]; k++) {
			for (let j = 0; j < inputSize[1]; j++) {
				for (let i = 0; i < inputSize[0]; i++) {
					vol[i][j][k] = x[i + j * inputSize[0] + k * inputSize[1] * inputSize[0]];
				}
			}
		}
		return vol;
	}

	static convertToVolLin(x: number[]) {
		let vol = Array.from({length: x.length}, () => Array.from({length: 1}, () => Array.from({length: 1}, () => 0)));
		for (let i in x) {
			vol[i][0][0] = x[i];
		}
		return vol;
	}

	static convertToArr(vol: number[][][]) {
		let arr = Array.from({length: vol.length * vol[0].length * vol[0][0].length}, () => 0);
		for (let i = 0; i < arr.length; i++) {
			arr[i] = vol[i % vol.length][(i / vol.length) % vol[0].length][i / (vol.length * vol[0].length)];
		}
		return arr;
	}

	static dotProd(a: number[], x: number[]) {
		let v = 0;
		for (let i = 0; i < a.length; i++) {
			v += a[i] * x[i];
		}
		return v;
	}

	static evaluate(A: number[][], b: number[], x: number[], actFuncE: ActFunc) {
		let y = Array.from({length: A.length}, () => 0);
		for (let i = 0; i < A.length; i++) {
			y[i] += Utility.dotProd(A[i], x) + b[i];
		}
		Utility.actFuncify(y, actFuncE);
		return y;
	}

	static actFuncify(x: number[], actFuncE: ActFunc) {
		x = x.map((a) => {return this.actFunc(a, actFuncE)})
	}

	static actFunc(a: number, actFuncE: ActFunc) {
		let f: (a: number) => number;
		switch(actFuncE) {
			case ActFunc.Relu:
				f = Utility.relu;
				break;
			case ActFunc.Sigmoid:
				f = Utility.sigmoid;
				break;
			case ActFunc.Identity:
				f = Utility.identity;
				break;
		};
		return f(a);
	}

	static sigmoid(a: number) {
		return Math.exp(a / 10.0) / (1 + Math.exp(a / 10.0));
	}

	static relu(a: number) {
		return a > 0 ? a : 0;
	}

	static identity(a: number) {
		return a;
	}

	static getOrDefault(x: number[][][], i: number, j: number, k: number, def: number) {
		if (i < 0 || i >= x.length || j < 0 || j >= x[0].length || k < 0 || k >= x[0][0].length) {
			return def;
		}
		return x[i][j][k];
	}

	static maxIndex(x: number[]) {
		let i = 0;
		let max = x[0];
		for (let j = 0; j < x.length; j++) {
			if (x[j] > max) {
				max = x[j];
				i = j;
			}
		}
		return i;
	}
}

export default Utility;