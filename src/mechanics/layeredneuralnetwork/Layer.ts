import ConvolutionalLayerModel from "../../models/layeredneuralnetwork/WConvolutionalLayer";
import FullLayerModel from "../../models/layeredneuralnetwork/WFullLayer";
import LayerModel from "../../models/layeredneuralnetwork/WLayer";
import PoolLayerModel from "../../models/layeredneuralnetwork/WPoolLayer";
import ConvolutionalLayer from "./Layers/ConvolutionalLayer";
import LayerType from "./Layers/Enums/LayerType";
import FullLayer from "./Layers/FullLayer";
import PoolLayer from "./Layers/PoolLayer";

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