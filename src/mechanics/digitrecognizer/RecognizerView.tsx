const RecognizerView = (props: {guess: number, guessReady: boolean, demo: boolean}) => {
	let prefix = props.demo ? "I think I see a " : "I think you drew a ";

	const view = props.guessReady ? 
		<p>{prefix} {props.guess}!</p> 
		:
		<p>I'm still thinking...</p>

	return (
		<>{view}</>
	);
}

export default RecognizerView;