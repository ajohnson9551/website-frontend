import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { ConfidenceQuestions } from "../data/confidencecalibration/ConfidenceQuestions";
import about from "../data/PageAbouts";
import title from "../data/PageTitles";
import ConfidenceAnswer from "../mechanics/confidencecalibration/ConfidenceAnswer";
import { randomArray } from "../mechanics/confidencecalibration/RandomArray";
import { About } from "../views/About";
import { ConfidenceQuestionView } from "../views/confidencecalibration/ConfidenceQuestionView";
import { ConfidenceResultsView } from "../views/confidencecalibration/ConfidenceResultsView";

export const ConfidencePage = () => {
	const [displayingResults, setDisplayingResults] = useState(false);
	const [indexInShuffle, setIndexInShuffle] = useState(0);

	const numQuestions = ConfidenceQuestions.length;

	const [questionIndices, setQuestionIndices] = useState(randomArray(numQuestions));

	const blankAnswerArray: ConfidenceAnswer[] = questionIndices.map((i) => new ConfidenceAnswer(ConfidenceQuestions[i]));
	const [answers, setAnswers] = useState(blankAnswerArray);

	const incrementIndex = (increment: number) => {
		if (indexInShuffle + increment >= 0 && indexInShuffle + increment < numQuestions) {
			setIndexInShuffle(indexInShuffle + increment);
		}
	};

	const selectAnswer = (select: boolean) => {
		let copy = [...answers];
		copy[indexInShuffle].selectedAnswer = select ? 1 : -1;
		setAnswers(copy);
	}

	const selectConfidence = (confidence: number) => {
		let copy = [...answers];
		copy[indexInShuffle].confidence = confidence;
		setAnswers(copy);
	}

	const reset = () => {
		setAnswers(blankAnswerArray);
		setIndexInShuffle(0);
		setDisplayingResults(false);
	}

	const swapModeButton = (
		<Button onClick={() => setDisplayingResults(!displayingResults)} variant="primary">
			{displayingResults ? "Back to Questions" : "Display Results"}
		</Button>
	);

	const resultsDisplay = (
	<>
		<ConfidenceResultsView answers={answers}></ConfidenceResultsView>
	</>
	);

	const questionDisplay = (
	<>
		<Col>
			<Row>
				<ConfidenceQuestionView 
					question={ConfidenceQuestions[questionIndices[indexInShuffle]]}
					selectedAnswer={answers[indexInShuffle].selectedAnswer}
					selectedConfidence={answers[indexInShuffle].confidence}
					selectAnswer={selectAnswer}
					selectConfidence={selectConfidence}
					/>
			</Row>
			<Row>
				<Col>
					<Button 
						disabled={indexInShuffle == 0} 
						onClick={() => incrementIndex(-1)}>Previous</Button>
				</Col>
				<Col>
					<Button 
						disabled={indexInShuffle == numQuestions - 1 || !answers[indexInShuffle].fullyAnswered()} 
						onClick={() => incrementIndex(1)}>Next</Button>
				</Col>
			</Row>
			<Row>
				<p>Question {indexInShuffle+1}/{numQuestions}</p>
			</Row>
		</Col>
		
	</>
	);

	return (
		<Container fluid>
				<Row>
					{title.get("confidence")}
				</Row>
				<Row>
					<Col className="calibrationBox">
						<Row>
							{displayingResults ? resultsDisplay : questionDisplay}
						</Row>
						<Row xs="auto" className="justify-content-md-center">
							<Col>
								{swapModeButton}
							</Col>
							<Col>
								<Button variant="danger" onClick={() => reset()}>Reset All</Button>
							</Col>
						</Row>
					</Col>
					<Col>
						<About abt={about.get("confidence")}/>	
					</Col>
				</Row>
		</Container>
	)
};