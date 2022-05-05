import Layer from "../Layer";
import PoolType from "./Enums/PoolType";

class PoolLayer extends Layer {
	constructor(inputSize: number[], outputSize: number[], poolSize: number, stride: number, poolTypeE: PoolType) {
		super(inputSize, outputSize);
	}

	evaluate(x: number[][][]): number[][][] {
		throw new Error("Method not implemented.");
	}
}

export default PoolLayer;