import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { LunarLanderCanvas } from "../interactables/lunarlander/LunarLanderCanvas";
import { LunarLanderGame } from "../mechanics/lunarlander/LunarLanderGame";

export const LunarLanderPage = (props: {game: LunarLanderGame}) => {
	const running = useRef<boolean>(false);
	const [runningD, setRunningD] = useState(false);
	const [tick, setTick] = useState(0);

	useEffect(() => {
		const doKeyDown = (e: KeyboardEvent) => {
			props.game.keys.add(e.key);
		};

		const doKeyUp = (e: KeyboardEvent) => {
			props.game.keys.delete(e.key);
		};

		let gameTimer = setInterval(() => {
			if (running.current) {
				props.game.incrementTick();
				setTick(props.game.tick);
			}
		}, 100);

		window.document.addEventListener("keydown", doKeyDown);
		window.document.addEventListener("keyup", doKeyUp);

		return () => {
			window.document.removeEventListener("keydown", doKeyDown);
			window.document.removeEventListener("keyup", doKeyUp);
			clearInterval(gameTimer);
		}
	}, []);

	const toggleRunning = () => {
		running.current = !running.current;
		setRunningD(running.current);
		props.game.running = running.current;
	}

	const runGameSwitch = (
		<Form>
			<Form.Check
				type="switch"
				id="custom-switch"
				label="Run Game"
				checked={running.current}
				onClick={toggleRunning}
			/>	
		</Form>
	);

	return (
		<>
			<p>Lunar Lander Page</p>
			<p>Running = {runningD ? "TRUE" : "FALSE"}</p>
			{runGameSwitch}
			<LunarLanderCanvas tick={tick} game={props.game}></LunarLanderCanvas>
		</>
	)
};