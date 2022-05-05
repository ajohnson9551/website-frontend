import { isArrayLiteralExpression } from "typescript";

abstract class Layer {
	readonly inputSize: number[];
	readonly outputSize: number[];

	constructor(inputSize: number[], outputSize: number[]) {
		this.inputSize = inputSize;
		this.outputSize = outputSize;
	}

	abstract evaluate(x: number[][][]): number[][][];
}

export default Layer;