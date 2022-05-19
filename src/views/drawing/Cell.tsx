export const Cell = (props: {val:number, x: number, y: number, drawFunc: Function, override:number}) => {
	let scaledVal = props.override == -1 ? 255 * (1 - props.val) : 255 * (1 - props.override);

	return (
		<div
			className = 'cell'
			onMouseOver = {() => props.drawFunc(props.x, props.y)}
			style = {{ backgroundColor: `rgb(${scaledVal}, ${scaledVal}, ${scaledVal})` }}
		>
		</div>
	);
};