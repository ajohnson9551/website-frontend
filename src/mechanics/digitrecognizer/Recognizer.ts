import LayeredNetwork from "../layeredneuralnetwork/LayeredNetwork";
import Utility from "../layeredneuralnetwork/Utility";

const Recognizer = (net: LayeredNetwork, drawing: number[][]) => {
	let drawingArr = Array.from({length: 28 * 28}, () => 0);
	for (let i: number = 0; i < 28 * 28; i++) {
		drawingArr[i] = drawing[Math.floor(i / 28)][i % 28];
	}
	console.log(drawingArr);
	const result = net.evaluate(drawingArr);
	console.log(result);
	return Utility.maxIndex(result);
}

export default Recognizer;