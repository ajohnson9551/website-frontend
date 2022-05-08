import ActFunc from "../../mechanics/layeredneuralnetwork/Layers/Enums/ActFunc";
import LayerModel from './WLayer';

type FullLayerModel = LayerModel & {
	A: number[][],
	b: number[],
	actFunc: ActFunc
}

export default FullLayerModel;