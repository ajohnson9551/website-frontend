import { useState } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import { Cell } from './Cell';

export const Grid = (props: {
		setMouseDown: (b: boolean) => void,
		values: number[][],
		drawAt: (x: number, y: number) => void
	}) => {
	// const size: number = 28;
	// const blankArray: number[][] = Array.from({length: size}, () => Array.from({length: size}, () => 0));

	// const [values, setValues] = useState(blankArray);
	// const [mouseDown, setMouseDown] = useState(false);

	// const bigDraw = 0.5;
	// const medDraw = 0.3;
	// const smlDraw = 0.1;
	// const tnyDraw = 0;

	// const resetButton = (
	// 	<Button onClick = {() => {setValues(blankArray); props.demoSetter(false)}} variant = 'danger'>
	// 		RESET
	// 	</Button>
	// );

	// const addIfCan = (x: number, y: number, inc: number) => {
	// 	if (x >= 0 && x < size && y >= 0 && y < size) {
	// 		let copy = [...values];
	// 		copy[x][y] = Math.min(1, copy[x][y] + inc);
	// 		setValues(copy);
	// 	}
	// };

	// const drawAt = (x: number, y: number) => {
	// 	if (mouseDown) {
	// 		props.demoSetter(false);

	// 		addIfCan(x, y, bigDraw);

	// 		addIfCan(x + 1, y, medDraw);
	// 		addIfCan(x - 1, y, medDraw);
	// 		addIfCan(x, y + 1, medDraw);
	// 		addIfCan(x, y - 1, medDraw);

	// 		addIfCan(x + 1, y + 1, smlDraw);
	// 		addIfCan(x + 1, y - 1, smlDraw);
	// 		addIfCan(x - 1, y + 1, smlDraw);
	// 		addIfCan(x - 1, y - 1, smlDraw);

	// 		addIfCan(x - 1, y + 2, tnyDraw);
	// 		addIfCan(x, y + 2, tnyDraw);
	// 		addIfCan(x + 1, y + 2, tnyDraw);
	// 		addIfCan(x - 1, y - 2, tnyDraw);
	// 		addIfCan(x, y - 2, tnyDraw);
	// 		addIfCan(x + 1, y - 2, tnyDraw);

	// 		addIfCan(x + 2, y - 1, tnyDraw);
	// 		addIfCan(x + 2, y, tnyDraw);
	// 		addIfCan(x + 2, y + 1, tnyDraw);
	// 		addIfCan(x - 2, y - 1, tnyDraw);
	// 		addIfCan(x - 2, y, tnyDraw);
	// 		addIfCan(x - 2, y + 1, tnyDraw);

	// 		props.guesser(values);
	// 	}
	// };

	const grid = (
		<Container 
			className = 'grid'
			onClick = {(event) => props.setMouseDown(event.buttons === 1)}
			onMouseMove = {(event) => props.setMouseDown(event.buttons === 1)}
			onMouseLeave = {() => props.setMouseDown(false)}>
				{props.values.map((rowVals, x1) => 
				<Row key={x1}>
					{rowVals.map((value, y1) => <Cell
							key = {x1 + "," + y1}
							val = {value}
							x = {x1}
							y = {y1}
							drawFunc = {props.drawAt}/>)}
				</Row>)}
		</Container>
	);

	return (
		<>
			{grid}
		</>
	);
};