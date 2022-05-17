import PoolType from "../../mechanics/layeredneuralnetwork/Layers/Enums/PoolType"
import LayerModel from "./WLayer"

type PoolLayerModel = LayerModel & {
	stride: number,
	poolSize: number,
	poolType: PoolType
}

export default PoolLayerModel;