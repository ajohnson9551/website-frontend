import ActFunc from "../../mechanics/layeredneuralnetwork/Layers/Enums/ActFunc"
import LayerModel from "./WLayer"

type ConvolutionalLayerModel = LayerModel & {
	Cs: number[][][],
	pad: number,
	actFunc: ActFunc
}

export default ConvolutionalLayerModel