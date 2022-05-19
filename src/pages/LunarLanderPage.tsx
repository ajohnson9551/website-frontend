import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { LunarLanderCanvas } from "../views/lunarlander/LunarLanderCanvas";
import { LunarLanderGame } from "../mechanics/lunarlander/LunarLanderGame";

export const LunarLanderPage = (props: {game: LunarLanderGame}) => {
	const running = useRef<boolean>(false);
	const autopilot = useRef<boolean>(true);
	const [autopilotD, setAutopilotD] = useState(true);
	const [runningD, setRunningD] = useState(false);
	const [tick, setTick] = useState(0);

	useEffect(() => {
		resetGame();

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
		}, 20);

		window.document.addEventListener("keydown", doKeyDown);
		window.document.addEventListener("keyup", doKeyUp);

		return () => {
			window.document.removeEventListener("keydown", doKeyDown);
			window.document.removeEventListener("keyup", doKeyUp);
			clearInterval(gameTimer);
		}
	}, []);

	const setAutopilot = (newAutopilot: boolean) => {
		autopilot.current = newAutopilot;
		setAutopilotD(autopilot.current);
		props.game.setAutopilot(autopilot.current);
	};

	const setRunning = (newRunning: boolean) => {
		running.current = newRunning;
		setRunningD(running.current);
		props.game.running = running.current;
	};

	const resetGame = () => {
		props.game.resetGame();
		props.game.tick = 0;
		setTick(0);
	};

	const runGameSwitch = (
		<Form>
			<Form.Check
				type="switch"
				id="custom-switch"
				label="Run Game"
				checked={running.current}
				onChange={() => setRunning(!running.current)}
			/>	
		</Form>
	);

	const autopilotSwitch = (
		<Form>
			<Form.Check
				type="switch"
				id="custom-switch"
				label="Enable Autopilot"
				checked={autopilot.current}
				onChange={() => setAutopilot(!autopilot.current)}
			/>	
		</Form>
	);

	const resetGameButton = (
		<Button onClick={resetGame}>
			Reset Game
		</Button>
	);

	return (
		<>
			<p>Lunar Lander Page</p>
			<p>Running = {runningD ? "TRUE" : "FALSE"}</p>
			<p>Autopilot = {autopilotD ? "TRUE" : "FALSE"}</p>
			{resetGameButton}
			{runGameSwitch}
			{autopilotSwitch}
			<LunarLanderCanvas tick={tick} game={props.game}></LunarLanderCanvas>
		</>
	)
};