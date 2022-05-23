import { pdlModel } from "../../models/math/pdlModel";

export const PDL = (props: {pdl: pdlModel}) => {
	return (
		<div>
			<h5><a href={props.pdl.path}>{props.pdl.title}</a></h5>
			<p>Date: {props.pdl.date}</p>
			{props.pdl.description}
		</div>
	)
};