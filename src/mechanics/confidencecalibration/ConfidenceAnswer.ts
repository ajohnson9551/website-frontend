import ConfidenceQuestion from "./ConfidenceQuestion";

class ConfidenceAnswer {
	readonly question: ConfidenceQuestion;
	selectedAnswer: number = 0; // 0 = undecided, -1 = false, 1 = true
	confidence: number = 0; // 0 = undecided, otherwise 50, 60, 70, 80, 90, or 100

	constructor(question: ConfidenceQuestion) {
		this.question = question;
	}

	fullyAnswered() {
		return this.selectedAnswer != 0 && this.confidence != 0;
	}

	isCorrect() {
		return this.selectedAnswer == (this.question.realAnswer ? 1 : -1);
	}
}

export default ConfidenceAnswer;