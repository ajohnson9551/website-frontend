import ConvolutionalLayerModel from "../../models/layeredneuralnetwork/WConvolutionalLayer";
import FullLayerModel from "../../models/layeredneuralnetwork/WFullLayer";
import LayerModel from "../../models/layeredneuralnetwork/WLayer";
import PoolLayerModel from "../../models/layeredneuralnetwork/WPoolLayer";
import Layer from "./Layer";
import ConvolutionalLayer from "./Layers/ConvolutionalLayer";
import LayerType from "./Layers/Enums/LayerType";
import FullLayer from "./Layers/FullLayer";
import PoolLayer from "./Layers/PoolLayer";
import Utility from "./Utility";

class LayeredNetwork {
	layers: Layer[];

	constructor(wlayers: LayerModel[]) {
		this.layers = wlayers.map((wlayer) => {return this.createLayerFromModel(wlayer)});
	}

	createLayerFromModel(wlayer: LayerModel) {
		let layer: Layer;
		switch (wlayer.layerType) {
			case LayerType.Full:
				layer = new FullLayer(wlayer.inputSize, wlayer.outputSize, (wlayer as FullLayerModel).A, (wlayer as FullLayerModel).b, (wlayer as FullLayerModel).actFunc);
				break;
			case LayerType.Conv:
				layer = new ConvolutionalLayer(wlayer.inputSize, wlayer.outputSize, (wlayer as ConvolutionalLayerModel).Cs, (wlayer as ConvolutionalLayerModel).pad, (wlayer as ConvolutionalLayerModel).actFunc);
				break;
			case LayerType.Pool:
				layer = new PoolLayer(wlayer.inputSize, wlayer.outputSize, (wlayer as PoolLayerModel).poolSize, (wlayer as PoolLayerModel).stride, (wlayer as PoolLayerModel).poolType);
				break;
		}
		return layer;
	}

	evaluate(x: number[]) {
		let result: number[][][] = Utility.convertToVol(x, this.layers[0].inputSize);
		this.layers.forEach((layer) => result = layer.evaluate(result))
		return Utility.convertToArr(result);
	}
}

export default LayeredNetwork;