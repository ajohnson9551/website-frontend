import Layer from "../Layer";
import ActFunc from "./Enums/ActFunc";

class ConvolutionalLayer extends Layer {
	Cs: number[][][];

	constructor(inputSize: number[], outputSize: number[], Cs: number[][][], pad: number, actFuncE: ActFunc) {
		super(inputSize, outputSize);
		this.Cs = Cs;
	}
	
	evaluate(x: number[][][]): number[][][] {
		throw new Error("Method not implemented.");
	}
}

export default ConvolutionalLayer;