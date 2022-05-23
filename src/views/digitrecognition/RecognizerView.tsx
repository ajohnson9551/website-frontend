const RecognizerView = (props: {guess: number[], guessReady: boolean, demo: boolean}) => {
	let prefix = props.demo ? "I see a" : "You drew a";

	if (props.guess[0] == 8) {
		prefix += "n";
	}
	prefix += " ";

	const view = props.guessReady ? 
		<>
			<h2>{prefix} {props.guess[0]}!</h2> 
			<h5>Confidence: {props.guess[1]}%</h5>
		</>
		:
		<h2>I'm still thinking...</h2>

	return (
		<div className="guessBox">
			{view}
		</div>
	);
}

export default RecognizerView;