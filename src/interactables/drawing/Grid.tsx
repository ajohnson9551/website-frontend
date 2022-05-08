import { useState } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import { Cell } from './Cell';

import './drawing.css';

export const Grid = (props: {guesser: (drawing: number[][]) => void}) => {
	const size: number = 28;
	const blankArray: number[][] = Array.from({length: size}, () => Array.from({length: size}, () => 0));

	const [values, setValues] = useState(blankArray);
	const [mouseDown, setMouseDown] = useState(false);

	const bigDraw = 0.5;
	const medDraw = 0.3;
	const smlDraw = 0.1;
	const tnyDraw = 0.1;

	const resetButton = (
		<Button onClick = {() => {setValues(blankArray)}} variant = 'danger'>
			RESET
		</Button>
	);

	const addIfCan = (x: number, y: number, inc: number) => {
		if (x >= 0 && x < size && y > 0 && y < size) {
			let copy = [...values];
			copy[x][y] = Math.min(1, copy[x][y] + inc);
			setValues(copy);
		}
	};

	const drawAt = (x: number, y: number) => {
		if (mouseDown) {
			addIfCan(x, y, bigDraw);

			addIfCan(x + 1, y, medDraw);
			addIfCan(x - 1, y, medDraw);
			addIfCan(x, y + 1, medDraw);
			addIfCan(x, y - 1, medDraw);

			addIfCan(x + 1, y + 1, smlDraw);
			addIfCan(x + 1, y - 1, smlDraw);
			addIfCan(x - 1, y + 1, smlDraw);
			addIfCan(x - 1, y - 1, smlDraw);

			addIfCan(x - 1, y + 2, tnyDraw);
			addIfCan(x, y + 2, tnyDraw);
			addIfCan(x + 1, y + 2, tnyDraw);
			addIfCan(x - 1, y - 2, tnyDraw);
			addIfCan(x, y - 2, tnyDraw);
			addIfCan(x + 1, y - 2, tnyDraw);

			addIfCan(x + 2, y - 1, tnyDraw);
			addIfCan(x + 2, y, tnyDraw);
			addIfCan(x + 2, y + 1, tnyDraw);
			addIfCan(x - 2, y - 1, tnyDraw);
			addIfCan(x - 2, y, tnyDraw);
			addIfCan(x - 2, y + 1, tnyDraw);

			props.guesser(values);
		}
	};

	const grid = (
		<Container 
			className = 'grid'
			onMouseMove = {(event) => setMouseDown(event.buttons === 1)}
			onMouseLeave = {() => setMouseDown(false)}>
				{values.map((rowVals, x1) => 
				<Row>
					{rowVals.map((value, y1) => <Cell
							val = {value}
							x = {x1}
							y = {y1}
							drawFunc = {drawAt}/>)}
				</Row>)}
		</Container>
	);

	return (
		<>
			<div className = "text-center">
				{resetButton}
			</div>
			{grid}
		</>
	);
};