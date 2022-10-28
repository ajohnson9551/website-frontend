import { Button, Col, Container, Row } from "react-bootstrap";
import ConfidenceQuestion from "../../mechanics/confidencecalibration/ConfidenceQuestion";

export const ConfidenceQuestionView = (props: {
		question: ConfidenceQuestion,
		selectedAnswer: number,
		selectedConfidence: number,
		selectAnswer: {(select: boolean): void},
		selectConfidence: {(confidence: number): void}
	}) => {

	const confidences = [50, 60, 70, 80, 90, 100];

	const getConfidenceText = (confidence: number): string => {
		switch(confidence) {
			case 50: {
				return "Random Guess";
			}
			case 100: {
				return "Dead Certain";
			}
		}
		return "";
	}

	const getSelectedAnswerText = () => {
		if (props.selectedAnswer === -1) {
			return <h4 className="redText">FALSE</h4>
		}
		if (props.selectedAnswer === 1) {
			return <h4 className="greenText">TRUE</h4>
		}
		return <></>;
	}

	const questionBox = (
		<>
			<Container>
				<Col>
					<Row>
						<p>{props.question.category}</p>
					</Row>
					<Row>
						<h2>{props.question.question}</h2>
					</Row>
					<Row>
						<Col>
							<Button variant="success" onClick={() => props.selectAnswer(true)}>TRUE</Button>
						</Col>
						<Col>
							{getSelectedAnswerText()}
						</Col>
						<Col>
							<Button variant="danger" onClick={() => props.selectAnswer(false)}>FALSE</Button>
						</Col>
					</Row>
					<Row>
						{props.selectedAnswer == 0 ? <p>Answer True or False</p> : <p>How confident are you?</p>}
					</Row>
					<Row>
						{confidences.map((confidence: number) => {return (
						<Col>
							<Row>
								<Button 
									variant={props.selectedConfidence == confidence ? "primary" : "info"}
									onClick={() => props.selectConfidence(confidence)}
									disabled={props.selectedAnswer == 0}
								>{confidence}%</Button>
							</Row>
							<Row>
								<p>{getConfidenceText(confidence)}</p>
							</Row>
						</Col>)})}
					</Row>
				</Col>
				
			</Container>
		</>
	);

	return (
		<>
			{questionBox}
		</>
	);
}