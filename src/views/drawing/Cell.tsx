export const Cell = (props: {val:number, x: number, y: number, drawFunc: Function}) => {
	let scaledVal = 255 * (1 - props.val);

	return (
		<div
			className = 'cell'
			onMouseOver = {() => props.drawFunc(props.x, props.y)}
			style = {{ backgroundColor: `rgba(41, 168, 71, ${props.val})` }}
		>
		</div>
	);
};