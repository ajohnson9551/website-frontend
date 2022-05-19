import { pdlModel } from "../../models/math/pdlModel";

export const PDL = (props: {pdl: pdlModel}) => {
	return (
		<div>
			<a href={props.pdl.path} target="blank">{props.pdl.title}</a>
			<p>Date: {props.pdl.date}</p>
			<p>Description: {props.pdl.description}</p>
		</div>
	)
};