import { useEffect, useRef, useState } from "react";
// import backendCall from "../api/LayeredNetworkApi";
import { Grid } from "../views/drawing/Grid";
import Recognizer from "../mechanics/digitrecognizer/Recognizer";
import RecognizerView from "../views/digitrecognition/RecognizerView";
import LayeredNetwork from "../mechanics/layeredneuralnetwork/LayeredNetwork";
import { drLayersString } from "../data/digitrecognition/DRNetwork";
import { trainingDataString } from "../data/digitrecognition/TrainingData";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import about from "../data/PageAbouts";
import { About } from "../views/About";
import title from "../data/PageTitles";

export const DigitRecognitionPage = () => {
	const trainingData = JSON.parse(trainingDataString);
	let tick = 0;
	const lnn: LayeredNetwork = new LayeredNetwork(JSON.parse(drLayersString));
	const [guess, setGuess] = useState(0);
	const [guessReady, setGuessReady] = useState(false);

	const demoRunning = useRef(true);
	const [demoOn, setDemoOn] = useState(true);
	let selectedDemo: null | number[] = null;

	const size: number = 28;
	const blankArray: number[][] = Array.from({length: size}, () => Array.from({length: size}, () => 0));
	const [mouseDown, setMouseDown] = useState(false);
	const [values, setValues] = useState(blankArray);

	useEffect(() => {
		let demoTimer = setInterval(() => {
			updateDemoDrawing();
		}, 20);

		return () => {
			tick = 0;
			clearInterval(demoTimer);
		} 
	}, []);

	const addIfCan = (x: number, y: number, inc: number) => {
		if (x >= 0 && x < size && y >= 0 && y < size) {
			let copy = [...values];
			copy[x][y] = Math.min(1, copy[x][y] + inc);
			setValues(copy);
		}
	};

	const bigDraw = 0.5;
	const medDraw = 0.3;
	const smlDraw = 0.1;
	const tnyDraw = 0;

	const drawAt = (x: number, y: number) => {
		if (mouseDown) {
			if (demoOn) {
				setDemoFunc(false);
			}

			addIfCan(x, y, bigDraw);

			addIfCan(x + 1, y, medDraw);
			addIfCan(x - 1, y, medDraw);
			addIfCan(x, y + 1, medDraw);
			addIfCan(x, y - 1, medDraw);

			addIfCan(x + 1, y + 1, smlDraw);
			addIfCan(x + 1, y - 1, smlDraw);
			addIfCan(x - 1, y + 1, smlDraw);
			addIfCan(x - 1, y - 1, smlDraw);

			addIfCan(x - 1, y + 2, tnyDraw);
			addIfCan(x, y + 2, tnyDraw);
			addIfCan(x + 1, y + 2, tnyDraw);
			addIfCan(x - 1, y - 2, tnyDraw);
			addIfCan(x, y - 2, tnyDraw);
			addIfCan(x + 1, y - 2, tnyDraw);

			addIfCan(x + 2, y - 1, tnyDraw);
			addIfCan(x + 2, y, tnyDraw);
			addIfCan(x + 2, y + 1, tnyDraw);
			addIfCan(x - 2, y - 1, tnyDraw);
			addIfCan(x - 2, y, tnyDraw);
			addIfCan(x - 2, y + 1, tnyDraw);

			guesser(values);
		}
	};

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
			setValues(toArea(selectedDemo, op));
		}
		tick++;
	}

	// const getDigitNetworkFunc = () => {
	// 	console.log("Making digit call...");
	// 	backendCall.get('/digitnetwork').then((response: {data: {layers: any}}) => {setupLnn(response.data.layers)}).catch((e) => console.log(e));
	// 	backendCall.get('/trainingdata').then((response: {data: number[][]}) => {
	// 		console.log(JSON.stringify(response.data));
	// 	}).catch((e) => console.log(e));
	// }

	const guesser = (drawing: number[][]) => {
		if (lnn != null) {
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
			resetValues();
		}
	}

	const resetValues = () => {
		setValues(blankArray);
		setGuessReady(false);
	}

	const resetButton = (
		<Button onClick = {() => {setDemoFunc(false)}} variant = 'danger'>
			RESET
		</Button>
	);

	return (
		<Container fluid>
				<Row>
					{title.get("digitrecognition")}
				</Row>
				<Row>
					<Col>
						<Row className="drButtonBox">
							<Col>
								<Row xs="auto" className="justify-content-md-center">
									{resetButton}
								</Row>
							</Col>
							<Col>
								<Row xs="auto" className="justify-content-md-left">
									{demoModeSwitch}
								</Row>
							</Col>
						</Row>
						<Row>
							<Grid 
								values={values}
								setMouseDown={setMouseDown}
								drawAt={drawAt}/>
						</Row>
						<Row>
							<RecognizerView guess={guess} guessReady={guessReady} demo={demoOn}/>
						</Row>
					</Col>
					<Col>
						<About abt={about.get("digitrecognition")}/>
					</Col>
				</Row>
		</Container>
	)
};