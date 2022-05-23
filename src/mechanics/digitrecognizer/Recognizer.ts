import LayeredNetwork from "../layeredneuralnetwork/LayeredNetwork";
import Utility from "../layeredneuralnetwork/Utility";

const Recognizer = (net: LayeredNetwork, drawing: number[][]) => {
	let drawingArr = Array.from({length: 28 * 28}, () => 0);
	for (let i: number = 0; i < 28 * 28; i++) {
		drawingArr[i] = drawing[Math.floor(i / 28)][i % 28];
	}
	const result = net.evaluate(drawingArr);
	return Utility.maxIndexWithConfidence(result);
}

export default Recognizer;