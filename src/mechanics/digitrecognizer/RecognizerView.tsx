const RecognizerView = (props: {guess: number, guessReady: boolean}) => {
	const view = props.guessReady ? 
		<p>I think you drew a {props.guess}!</p> 
		:
		<p>I'm still thinking...</p>

	return (
		<>{view}</>
	);
}

export default RecognizerView;