import { Container, Col, Row } from "react-bootstrap";

export const About = (props: {abt: {imgPath: string, desc: string}}) => {
	return (
		<Container fluid className="aboutBox">
			<Row>
				<Col className="imageBox" md="auto">
					<img src={props.abt.imgPath}/>
				</Col>
				<Col className="aboutTextBox" md="auto">
					{props.abt.desc}
				</Col>
			</Row>
		</Container>
	)
};