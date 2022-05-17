import { useEffect, useRef } from 'react';
import { Container, Row } from 'react-bootstrap';
import { LunarLanderGame } from '../../mechanics/lunarlander/LunarLanderGame';

import './lunarlandercanvas.css';

export const LunarLanderCanvas = (props: {tick: number, game: LunarLanderGame}) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		if (canvasRef.current != null) {
			canvasRef.current.width = 500;
			canvasRef.current.height = 500;
		}
	}, []);

	if (canvasRef.current instanceof HTMLCanvasElement) {
		var context = canvasRef.current.getContext("2d");
		if (context != null) {
			context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
			
			context.beginPath();
			context.arc(props.game.x, props.game.y, 40, 0, 2 * Math.PI);
			context.stroke();

			context.font = "10px Arial";
			context.fillText("tick = " + props.game.tick, 10, 50);
			context.fillText("running = " + props.game.running, 10, 90);
		}
	};

	return (
		<>
			<Container className="canvasBox">
				<Row>
					<canvas ref={canvasRef}/>
				</Row>
			</Container>
		</>
	)
};