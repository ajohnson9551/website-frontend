import list from '../data/math/pdls';
import { PDL } from '../views/math/PdfDescriptionLink';
import { pdlModel } from '../models/math/pdlModel';

export const MathPage = () => {

	const links = list.map((pdl: pdlModel) => <PDL pdl={pdl} key={pdl.path}/>)

	return (
		<div>
			<p>
				Here you can find a handful of select math PDFs written by myself over the course of my education, mostly regarding set theory and model theory. \n
				Often papers were written alongside reading courses and as such references are sometimes not given. Though I can recommend dozens of textbooks upon request.
			</p>
			{links}
		</div>
	)
};