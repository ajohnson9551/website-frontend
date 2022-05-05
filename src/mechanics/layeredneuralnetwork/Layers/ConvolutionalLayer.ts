import { NumberLiteralType } from "typescript";
import Layer from "../Layer";
import Utility from "../Utility";
import ActFunc from "./Enums/ActFunc";

class ConvolutionalLayer extends Layer {
	Cs: number[][][];
	numConvs: number;
	convRadius: number;
	convMod: number;
	actFuncE: ActFunc;

	constructor(inputSize: number[], outputSize: number[], Cs: number[][][], pad: number, actFuncE: ActFunc) {
		super(inputSize, outputSize);
		this.Cs = Cs;
		this.numConvs = Cs.length;
		this.convRadius = 1 + ((Cs[0].length - 1) / 2);
		this.convMod = Math.min(0, 1 + pad - this.convRadius);
		this.actFuncE = actFuncE;
	}
	
	evaluate(x: number[][][]) {
		let y = Array.from({length: this.outputSize[0]}, () => Array.from({length: this.outputSize[1]}, () => Array.from({length: this.outputSize[2]}, () => 0)));
		for (let n = 0; n < this.numConvs; n++) {
			for (let k = 0; k < this.inputSize[2]; k++) {
				for (let j = 0; j < this.outputSize[1]; j++) {
					for (let i = 0; i < this.outputSize[0]; i++) {
						let rawConv = this.convolve(x, i - this.convMod, j - this.convMod, k, n);
						y[i][j][n + k * this.numConvs] = Utility.actFunc(rawConv, this.actFuncE);
					}
				}
			}
		}
		return y;
	}

	convolve(x: number[][][], i: number, j: number, k: number, n: number) {
		let result = 0;
		let r = this.convRadius - 1;
		for (let cj = -r; cj <= r; cj++) {
			for (let ci = -r; ci <= r; ci++) {
				result += Utility.getOrDefault(x, i + ci, j + cj, k, 0) * this.Cs[n][ci + r][cj + r];
			}
		}
		return result;
	}
}

export default ConvolutionalLayer;