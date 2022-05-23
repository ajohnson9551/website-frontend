import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { LunarLanderCanvas } from "../views/lunarlander/LunarLanderCanvas";
import { LunarLanderGame } from "../mechanics/lunarlander/LunarLanderGame";
import about from "../data/PageAbouts";
import { About } from "../views/About";
import title from "../data/PageTitles";

export const LunarLanderPage = (props: {game: LunarLanderGame}) => {
	const running = useRef<boolean>(true);
	const autopilot = useRef<boolean>(true);
	const [autopilotD, setAutopilotD] = useState(true);
	const [runningD, setRunningD] = useState(true);
	const [tick, setTick] = useState(0);

	useEffect(() => {
		resetGame();
		props.game.running = true;

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
		<Button onClick={resetGame} variant="danger">
			RESET
		</Button>
	);

	return (
		<Container fluid>
				<Row>
					{title.get("lunarlander")}
				</Row>
				<Row>
					<Col>
						<Row className="llButtonBox">
							<Col>
								<Row xs="auto" className="justify-content-md-center">
									{resetGameButton}
								</Row>
							</Col>
							<Col>
								<Row xs="auto" className="justify-content-md-center">
									{runGameSwitch}
								</Row>
							</Col>
							<Col>
								<Row xs="auto" className="justify-content-md-center">
									{autopilotSwitch}
								</Row>	
							</Col>
						</Row>
						<Row>
							<LunarLanderCanvas tick={tick} game={props.game}></LunarLanderCanvas>
						</Row>
						<Row>
							<div className="scoreBox">
								<h5> Score = (100 - Impact Speed) + (0.05 * Remaining Fuel)</h5>
							</div>
						</Row>
					</Col>
					<Col>
						<About abt={about.get("lunarlander")}/>
					</Col>
				</Row>
		</Container>
	)
};