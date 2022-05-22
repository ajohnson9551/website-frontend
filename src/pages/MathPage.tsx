import list from '../data/math/pdls';
import { PDL } from '../views/math/PdfDescriptionLink';
import { pdlModel } from '../models/math/pdlModel';
import { Container, Row, Col } from 'react-bootstrap';
import { About } from '../views/About';
import about from '../data/PageAbouts';
import title from '../data/PageTitles';

export const MathPage = () => {

	const links = list.map((pdl: pdlModel) => <PDL pdl={pdl} key={pdl.path}/>)

	return (
		<div>
			<Container fluid>
				<Row>
					{title.get("math")}
				</Row>
				<Row>
					<Col>
						{links}
					</Col>
					<Col>
						<About abt={about.get("math")}/>
					</Col>
				</Row>
			</Container>	
		</div>
	)
};