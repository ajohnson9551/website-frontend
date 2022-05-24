import { Container, Col, Row } from "react-bootstrap";

export const About = (props: {abt: {imgPath: string, desc: string, vert: boolean}}) => {

	// old formatting unused
	const content = true
		?
		<Col>
			<Row className="imageBox" md="auto">
				<img src={props.abt.imgPath} className="responsiveImageCentered"/>
			</Row>
			<Row md="auto">
				<Col className="centerMe">
					{props.abt.desc}
				</Col>
			</Row>
		</Col>
		: 
		<Row>
			<Col className="imageBox" md="auto">
				<img src={props.abt.imgPath} className="responsiveImage"/>
			</Col>
			<Col md="auto">
				{props.abt.desc}
			</Col>
		</Row>;

	return (
		<Container fluid className="aboutBox">
			{content}
		</Container>
	)
};