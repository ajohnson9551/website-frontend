import ConfidenceQuestionCategory from "./enum/ConfidenceQuestionCategory";

interface ConfidenceQuestion {
	readonly category: ConfidenceQuestionCategory,
	readonly question: string,
	readonly realAnswer: boolean
}

export default ConfidenceQuestion;