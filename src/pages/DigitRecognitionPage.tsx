import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import backendCall from "../api/LayeredNetworkApi";
import { Grid } from "../interactables/drawing/Grid";
import Recognizer from "../mechanics/digitrecognizer/Recognizer";
import RecognizerView from "../mechanics/digitrecognizer/RecognizerView";
import LayeredNetwork from "../mechanics/layeredneuralnetwork/LayeredNetwork";

export const DigitRecognitionPage = () => {
	const [lnn, setLnn] = useState(null as any);
	const [guess, setGuess] = useState(0);
	const [guessReady, setGuessReady] = useState(false);
	const [networkReady, setNetworkReady] = useState(false);

	useEffect(() => {
		if (!networkReady) {
			getDigitNetworkFunc();
		}
	}, []);

	const getTestFunc = () => {
		console.log("Making test call...");
		backendCall.get('/test').then((response) => console.log(response)).catch((e) => console.log(e));
	}

	const getDigitNetworkFunc = () => {
		console.log("Making digit call...");
		backendCall.get('/digitnetwork').then((response: {data: {layers: any}}) => {setupLnn(response.data.layers)}).catch((e) => console.log(e));
	}

	const setupLnn = (layers: any) => {
		setLnn(new LayeredNetwork(layers));
		setNetworkReady(true);
	}

	const testButton = (
		<Button onClick = {() => getTestFunc()}>
			TryMe!
		</Button>
	);

	const guesser = (drawing: number[][]) => {
		setGuessReady(false);
		if (networkReady) {
			console.log(lnn);
			setGuess(Recognizer(lnn, drawing));
			setGuessReady(true);
		}
	};

	return (
		<div>
			<p>
				Digit Recognition
			</p>
			{testButton}
			<Grid guesser = {guesser}/>
			<RecognizerView guess={guess} guessReady={guessReady}/>
		</div>
	)
};