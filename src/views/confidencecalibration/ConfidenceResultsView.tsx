import { Col, Container, Row } from "react-bootstrap";
import ConfidenceAnswer from "../../mechanics/confidencecalibration/ConfidenceAnswer";
import { Chart } from "react-google-charts";

export const ConfidenceResultsView = (props: {
		answers: ConfidenceAnswer[]
	}) => {

	const confidences = [50, 60, 70, 80, 90, 100];
	const correctPerConfidence = new Map();
	const answeredPerConfidence = new Map();

	for (let confidence of confidences) {
		correctPerConfidence.set(confidence, 0);
		answeredPerConfidence.set(confidence, 0);
	}

	for (let answer of props.answers) {
		if (!answer.fullyAnswered()) {
			continue;
		}
		const c = answeredPerConfidence.get(answer.confidence);
		answeredPerConfidence.set(answer.confidence, c + 1);
		if (answer.isCorrect()) {
			const x = correctPerConfidence.get(answer.confidence);
			correctPerConfidence.set(answer.confidence, x + 1)
		}
	}

	const data = [
		["", "You", "Ideal"],
		...confidences.map((confidence: number) => [`${confidence}%`, (100 * correctPerConfidence.get(confidence)/answeredPerConfidence.get(confidence)), confidence])
	];

	const options = {
		curveType: "function",
		legend: { position: "bottom" },
		vAxis: {title: "% Correct", minValue: 0, maxValue: 100, viewWindow: { min: 0 }, ticks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]},
		hAxis: {title: "Confidence Category"},
		backgroundColor: "rgb(83, 83, 83)",
		colors: ['#007bff', '#21cc49'],
		seriesType: "scatter",
		series: {1: {type: "line"}},
		tooltip : { trigger: 'none' }
	};

	const resultsBox = (
		<Container className="calibrationBox">
			<Row>
				<h2>Your Calibration</h2>
			</Row>
			<Row className="chartDiv">
				<Col>
					<Chart 
					chartType="ComboChart"
					width="800px"
					height="600px"
					data={data}
					options={options}
					/>
				</Col>
			</Row>
		</Container>
	);

	return (
		<>
			{resultsBox}
		</>
	);
}