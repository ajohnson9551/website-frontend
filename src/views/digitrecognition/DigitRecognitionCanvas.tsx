import { useEffect, useRef, useState } from "react";
import { Container, Row } from "react-bootstrap";

export const DigitRecognitionCanvas = (props: {
	values: number[][],
	drawAt: (x: number, y: number) => void,
	setMouseDown: (b: boolean) => void}) => {

	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const canvasDivRef = useRef<HTMLDivElement | any>(null);

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

	const registerMouse = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
		if (canvasRef.current != null && canvasDivRef != null) {
			const newPos = [
				Math.floor(28 * ((e.pageY - canvasRef.current.offsetTop) / canvasRef.current.getBoundingClientRect().height)), 
				Math.floor(28 * ((e.pageX - canvasRef.current.offsetLeft) / canvasRef.current.getBoundingClientRect().width))];
			if (mousePos[0] != newPos[0] || mousePos[1] != newPos[1]) {
				setMousePos(newPos);
				props.drawAt(mousePos[0], mousePos[1]);
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
						onMouseDown={(e) => {props.setMouseDown(true); registerMouse(e);}}
						onMouseMove={(e) => {registerMouse(e)}}
						onMouseUp={() => {props.setMouseDown(false)}}
						onMouseLeave={() => {props.setMouseDown(false)}}/>
				</Row>
			</Container>
		</>
	);

}