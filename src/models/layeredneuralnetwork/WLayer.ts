import LayerType from "../../mechanics/layeredneuralnetwork/Layers/Enums/LayerType";

interface LayerModel {
	inputSize: number[],
	outputSize: number[],
	layerType: LayerType
}

export default LayerModel;