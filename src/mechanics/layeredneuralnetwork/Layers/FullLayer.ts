import Layer from "../Layer";
import Utility from "../Utility";
import ActFunc from "./Enums/ActFunc";

class FullLayer extends Layer {
	A: number[][];
	b: number[];
	actFuncE: ActFunc;

	constructor(inputSize: number[], outputSize: number[], A: number[][], b: number[], actFuncE: ActFunc) {
		super(inputSize, outputSize);
		this.A = A;
		this.b = b;
		this.actFuncE = actFuncE;
	}

	evaluate(x: number[][][]): number[][][] {
		return Utility.convertToVolLin(Utility.evaluate(this.A, this.b, Utility.convertToArr(x), this.actFuncE));
	}
}

export default FullLayer;