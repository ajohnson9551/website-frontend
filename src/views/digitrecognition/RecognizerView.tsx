const RecognizerView = (props: {guess: number, guessReady: boolean, demo: boolean}) => {
	let prefix = props.demo ? "I see a" : "You drew a";

	if (props.guess == 8) {
		prefix += "n";
	}
	prefix += " ";

	const view = props.guessReady ? 
		<h2>{prefix} {props.guess}!</h2> 
		:
		<h2>I'm still thinking...</h2>

	return (
		<div className="guessBox">
			{view}
		</div>
	);
}

export default RecognizerView;