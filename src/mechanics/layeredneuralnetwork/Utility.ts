import ActFunc from "./Layers/Enums/ActFunc";

abstract class Utility {
	static convertToVol(x: number[], inputSize: number[]) {
		const vol: number[][][] = Array.from({length: inputSize[0]}, () => Array.from({length: inputSize[1]}, () => Array.from({length: inputSize[2]}, () => 0)));
		for (let k: number = 0; k < inputSize[2]; k++) {
			for (let j: number = 0; j < inputSize[1]; j++) {
				for (let i: number = 0; i < inputSize[0]; i++) {
					vol[i][j][k] = x[i + j * inputSize[0] + k * inputSize[1] * inputSize[0]];
				}
			}
		}
		return vol;
	}

	static convertToVolLin(x: number[]) {
		const vol: number[][][] = Array.from({length: x.length}, () => Array.from({length: 1}, () => Array.from({length: 1}, () => 0)));
		for (let i in x) {
			vol[i][0][0] = x[i];
		}
		return vol;
	}

	static convertToArr(vol: number[][][]) {
		const arr: number[] = Array.from({length: vol.length * vol[0].length * vol[0][0].length}, () => 0);
		for (let i: number = 0; i < arr.length; i++) {
			arr[i] = vol[i % vol.length][(i / vol.length) % vol[0].length][i / (vol.length * vol[0].length)];
		}
		return arr;
	}

	static dotProd(a: number[], x: number[]) {
		let v: number = 0;
		for (let i: number = 0; i < a.length; i++) {
			v += a[i] * x[i];
		}
		return v;
	}

	static evaluate(A: number[][], b: number[], x: number[], actFuncE: ActFunc) {
		let y: number[] = Array.from({length: A.length}, () => 0);
		for (let i: number = 0; i < A.length; i++) {
			y[i] += Utility.dotProd(A[i], x) + b[i];
		}
		Utility.actFuncify(y, actFuncE);
		return y;
	}

	static actFuncify(x: number[], actFuncE: ActFunc) {
		let actFunc: (a: number) => number;
		switch(actFuncE) {
			case ActFunc.Relu:
				actFunc = Utility.relu;
				break;
			case ActFunc.Sigmoid:
				actFunc = Utility.sigmoid;
				break;
			case ActFunc.Identity:
				actFunc = Utility.identity;
				break;
		};
		x = x.map((a) => {return actFunc(a)})
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
}

export default Utility;