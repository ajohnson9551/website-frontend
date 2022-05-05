import Layer from "./Layer";
import Utility from "./Utility";

class LayeredNetwork {
	layers: Layer[];

	constructor(layers: Layer[]) {
		this.layers = layers;
	}

	evaluate(x: number[]) {
		let result: number[][][] = Utility.convertToVol(x, this.layers[0].inputSize);
		this.layers.forEach((layer) => result = layer.evaluate(result))
		return Utility.convertToArr(result);
	}
}

export default LayeredNetwork;