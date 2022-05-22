import { useEffect, useRef } from 'react';
import { Container, Row } from 'react-bootstrap';
import { LunarLanderGame } from '../../mechanics/lunarlander/LunarLanderGame';

export const LunarLanderCanvas = (props: {tick: number, game: LunarLanderGame}) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	const width = 800;
	const height = 600;

	const surfaceHeight = 50;
	const shipYOffset = 5;


	useEffect(() => {
		if (canvasRef.current != null) {
			canvasRef.current.width = width;
			canvasRef.current.height = height;
		}
	}, []);

	const clear = (context: CanvasRenderingContext2D) => {
		context.clearRect(0, 0, width, height);
	};

	const round = (x: number) => {
		return Math.round(x * 10) / 10;
	}

	const drawInfo = (context: CanvasRenderingContext2D) => {
		context.font = "20px Courier";
		context.fillStyle = "white";
		context.fillText("FUEL: " + round(props.game.fuel), 20, 30);
		context.fillText("ALT: " + round(props.game.pos[1]), 20, 50)
		context.fillText("X VEL: " + round(props.game.vel[0]), 20, 70);
		context.fillText("Y VEL: " + round(props.game.vel[1]), 20, 90);
		if (props.game.autopilot) {
			context.fillText("AUTOPILOT ENABLED", 20, 130);
		}
		if (!props.game.running) {
			context.fillText("PAUSED", 370, 300);
		}
		if (props.game.gameOver) {
			context.fillText("SCORE: " + props.game.getScore(), 320, 150);
		}
	};

	const drawBg = (context: CanvasRenderingContext2D) => {
		// should really have an array with the crater data...
		context.fillStyle = "black";
		context.fillRect(0, 0, width, height);
		context.fillStyle = "grey";
        context.fillRect(0, height - surfaceHeight, width, surfaceHeight);
		context.fillStyle = "#262626";
		context.beginPath();
        context.ellipse(70, height - surfaceHeight + 15, 50, 10, 0, 0, 2 * Math.PI);
		context.fill();
		context.beginPath();
		context.ellipse(300, height - surfaceHeight + 25 + 15, 25, 5, 0, 0, 2 * Math.PI);
		context.fill();
		context.beginPath();
		context.ellipse(450, height - surfaceHeight + 10 + 15, 40, 8, 0, 0, 2 * Math.PI);
		context.fill();
		context.beginPath();
		context.ellipse(700, height - surfaceHeight + 15 + 15, 38, 8, 0, 0, 2 * Math.PI);
		context.fill();
	};

	const drawShip = (context: CanvasRenderingContext2D) => {
		context.strokeStyle = "green";
        drawPoly(context, props.game.getShipPolyPoints());
        if (props.game.thrusting) {
			context.strokeStyle = "red";
            drawPoly(context, props.game.getEnginePolyPoints());
			context.strokeStyle = "yellow";
			drawPoly(context, props.game.getEnginePolyPoints2());
        }
	};

	const drawPoly = (context: CanvasRenderingContext2D, points: number[][]) => {
		context.beginPath();
		context.moveTo(points[0][0], points[1][0]);
		for (let i = 1; i < points[0].length; i++) {
			context.lineTo(points[0][i], points[1][i]);
		}
		context.closePath();
		context.stroke();
	}

	const forceDraw = () => {
		if (canvasRef.current instanceof HTMLCanvasElement) {
			var context = canvasRef.current.getContext("2d");
			if (context != null) {
				clear(context);
				drawBg(context);
				drawShip(context);
				drawInfo(context);
			}
		};
	};
	
	forceDraw();

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