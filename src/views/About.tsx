import { Container, Col, Row } from "react-bootstrap";

export const About = (props: {abt: {imgPath: string, desc: string, vert: boolean}}) => {

	const content = props.abt.vert
		?
		<Col>
			<Row className="imageBox" md="auto">
				<img src={props.abt.imgPath} className="responsiveImageCentered"/>
			</Row>
			<Row className="centerMe" md="auto">
				{props.abt.desc}
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