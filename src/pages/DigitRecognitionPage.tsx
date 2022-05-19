import { useEffect, useRef, useState } from "react";
import backendCall from "../api/LayeredNetworkApi";
import { Grid } from "../views/drawing/Grid";
import Recognizer from "../mechanics/digitrecognizer/Recognizer";
import RecognizerView from "../mechanics/digitrecognizer/RecognizerView";
import LayeredNetwork from "../mechanics/layeredneuralnetwork/LayeredNetwork";
import { drLayersString } from "../data/digitrecognition/DRNetwork";
import { trainingDataString } from "../data/digitrecognition/TrainingData";
import { Form } from "react-bootstrap";

export const DigitRecognitionPage = () => {
	const trainingData = JSON.parse(trainingDataString);
	let tick = 0;
	const [lnn, setLnn] = useState(null as any);
	const [guess, setGuess] = useState(0);
	const [guessReady, setGuessReady] = useState(false);
	const [networkReady, setNetworkReady] = useState(false);

	const demoRunning = useRef(true);
	const [demoOn, setDemoOn] = useState(true);
	let selectedDemo: null | number[] = null;
	const [drawThis, setDrawThis] = useState<null | number[][]>(null);

	useEffect(() => {
		if (!networkReady) {
			getDigitNetworkFunc();
		}

		let demoTimer = setInterval(() => {
			updateDemoDrawing();
		}, 20);

		return () => {
			tick = 0;
			clearInterval(demoTimer);
		} 
	}, []);

	const toArea = (arr: number[], op: number) => {	
		let out = Array.from({length: 28}, () => Array.from({length: 28}, () => 0));
		for (let i = 0; i < 28; i++) {
			for (let j = 0; j < 28; j++) {
				out[i][j] = op * arr[i * 28 + j];
			}
		}
		return out;
	}

	const updateDemoDrawing = () => {
		if (!demoRunning.current) {
			tick = 0;
			return;
		}
		if (tick % 100 == 0) {
			// setDrawThis(null);
			selectedDemo = null;
		}
		let op = 0;
		if (tick % 100 <= 50) {
			op = (tick % 100) / 50;
		} else {
			op = (100 - (tick % 100)) / 50;
		}
		if (selectedDemo == null) {
			selectedDemo = trainingData[Math.round(1000 * Math.random())];
			if (selectedDemo != null) {
				guesser(toArea(selectedDemo, 1));
			}
		}
		if (selectedDemo != null) {
			setDrawThis(toArea(selectedDemo, op));
		}
		tick++;
	}

	const getDigitNetworkFunc = () => {
		// console.log("Making digit call...");
		// backendCall.get('/digitnetwork').then((response: {data: {layers: any}}) => {setupLnn(response.data.layers)}).catch((e) => console.log(e));
		// backendCall.get('/trainingdata').then((response: {data: number[][]}) => {
		// 	console.log(JSON.stringify(response.data));
		// }).catch((e) => console.log(e));
		setupLnn(JSON.parse(drLayersString));
	}

	const setupLnn = (layers: any) => {
		setLnn(new LayeredNetwork(layers));
		setNetworkReady(true);
	}

	const guesser = (drawing: number[][]) => {
		setGuessReady(false);
		if (networkReady) {
			setGuess(Recognizer(lnn, drawing));
			setGuessReady(true);
		}
	};

	const demoModeSwitch = (
		<Form>
			<Form.Check
				type="switch"
				id="custom-switch"
				label="Cycle Training Data"
				checked={demoOn}
				onChange={() => setDemoFunc(!demoOn)}
			/>	
		</Form>
	);

	const setDemoFunc = (newDemo: boolean) => {
		setDemoOn(newDemo);
		demoRunning.current = newDemo;
		if (!newDemo) {
			tick = 0;
			selectedDemo = null;
			setDrawThis(null);
		}
	}

	return (
		<div>
			<p>
				Digit Recognition
			</p>
			<p>
				DemoOn = {"" + demoOn}
			</p>
			{demoModeSwitch}
			<Grid guesser = {guesser} demoSetter={setDemoFunc} drawThis={drawThis}/>
			<RecognizerView guess={guess} guessReady={guessReady} demo={demoOn}/>
		</div>
	)
};