import { useEffect, useRef, useState } from "react";
import { Container, Row } from "react-bootstrap";

export const DigitRecognitionCanvas = (props: {
	values: number[][],
	drawAt: (x: number, y: number) => void,
	setMouseDown: (b: boolean) => void}) => {

	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	const [mousePos, setMousePos] = useState([-1, -1]);

	useEffect(() => {
		if (canvasRef.current != null) {
			canvasRef.current.width = 500;
			canvasRef.current.height = 500;
		}
	}, []);

	const forceDraw = () => {
		if (canvasRef.current instanceof HTMLCanvasElement) {
			var context = canvasRef.current.getContext("2d");
			if (context != null) {
				context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
				const sideLength = canvasRef.current.width / 28;
				for (let x = 0; x < 28; x++) {
					for (let y = 0; y < 28; y++) {
						context.fillStyle = `rgba(41, 168, 71, ${props.values[y][x]})`;
						context.fillRect(x * sideLength, y * sideLength, sideLength, sideLength);
					}
				}
			}
		};
		
	}

	const registerMouse = (e: React.PointerEvent<HTMLCanvasElement>) => {
		if (canvasRef.current != null) {
			const rect = canvasRef.current.getBoundingClientRect();
			const newPos = [
				Math.floor(28 * ((e.clientY - rect.top) / rect.height)),
				Math.floor(28 * ((e.clientX - rect.left) / rect.width))];
			if (mousePos[0] != newPos[0] || mousePos[1] != newPos[1]) {
				setMousePos(newPos);
				props.drawAt(newPos[0], newPos[1]);
			}
		}
	}

	forceDraw();

	return (
		<>
			<Container className="drCanvasBox">
				<Row>
					<canvas 
						ref={canvasRef} 
						className="drCanvas"
						onPointerDown={(e) => {props.setMouseDown(true); registerMouse(e);}}
						onPointerMove={(e) => {registerMouse(e)}}
						onPointerUp={() => {props.setMouseDown(false)}}
						onPointerCancel={() => {props.setMouseDown(false)}}
						onPointerLeave={() => {props.setMouseDown(false)}}/>
				</Row>
			</Container>
		</>
	);

}